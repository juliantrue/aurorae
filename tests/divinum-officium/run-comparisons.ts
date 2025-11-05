import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { OfficeHour } from '@prisma/client';
import { diffWords } from 'diff';

import { fetchOfficeBySlugAndHour, closePrisma, ImportedSection } from './database';
import { extractLatinColumn, normalizeForComparison } from './html';
import { sanitizeSectionBody, shouldSkipSection } from './sections';
import {
  horaFromOfficeHour,
  runDivinumOfficium,
  RunDivinumOfficiumOptions,
} from '../../scripts/liturgy/divinumOfficiumRunner';

interface ComparisonCase {
  slug: string;
  isoDate: string;
  hour: OfficeHour;
  horaOverride?: string;
  description?: string;
  params?: Record<string, string>;
}

interface ComparisonOutcome {
  success: boolean;
  failureReason?: string;
}

function resolveCasesPath(): string {
  const override = process.argv[2];
  if (override) {
    return path.resolve(process.cwd(), override);
  }
  return path.resolve(process.cwd(), 'tests', 'divinum-officium', 'cases.json');
}

async function loadCases(): Promise<ComparisonCase[]> {
  const casesPath = resolveCasesPath();
  const raw = await readFile(casesPath, 'utf8');
  const parsed = JSON.parse(raw) as ComparisonCase[];
  return parsed;
}

function buildDoOptions(testCase: ComparisonCase): RunDivinumOfficiumOptions {
  const hora = testCase.horaOverride ?? horaFromOfficeHour[testCase.hour];

  if (!hora) {
    throw new Error(
      `Cannot determine Divinum Officium hora for OfficeHour ${testCase.hour}. Provide horaOverride.`,
    );
  }

  return {
    hora,
    isoDate: testCase.isoDate,
    params: {
      lang1: 'Latin',
      lang2: 'English',
      version: 'Rubrics 1960 - 1960',
      ...(testCase.params ?? {}),
    },
  };
}

function formatSectionForLog(section: ImportedSection): string {
  return `${section.key}: ${section.body.split('\n')[0] ?? ''}`;
}

function reportMissingSection(section: ImportedSection, htmlText: string): string {
  const sanitized = sanitizeSectionBody(section);
  if (!sanitized) {
    return `Section "${section.key}" skipped for comparison (contains external reference).`;
  }
  const sectionNormalized = normalizeForComparison(sanitized);
  const htmlNormalized = normalizeForComparison(htmlText);

  const diff = diffWords(sectionNormalized, htmlNormalized)
    .filter((part) => part.added || part.removed)
    .map((part) => {
      const prefix = part.added ? '+ ' : part.removed ? '- ' : '  ';
      return `${prefix}${part.value.trim()}`;
    })
    .join(' ');

  return `Section "${section.key}" content not found. Diff snapshot: ${diff.slice(0, 500)}`;
}

async function compareCase(testCase: ComparisonCase): Promise<ComparisonOutcome> {
  const dbOffice = await fetchOfficeBySlugAndHour(testCase.slug, testCase.hour);
  if (!dbOffice) {
    return {
      success: false,
      failureReason: `No Office found for slug=${testCase.slug}, hour=${testCase.hour}`,
    };
  }

  const doOptions = buildDoOptions(testCase);
  const doResult = await runDivinumOfficium(doOptions);
  const latinColumn = extractLatinColumn(doResult.body, doOptions.hora);
  const normalizedLatin = normalizeForComparison(latinColumn);

  const missingSections: ImportedSection[] = [];

  for (const section of dbOffice.metadata.sections) {
    if (shouldSkipSection(section)) continue;

    const sanitized = sanitizeSectionBody(section);
    if (!sanitized) continue;

    const normalizedSection = normalizeForComparison(sanitized);

    if (!normalizedLatin.includes(normalizedSection)) {
      missingSections.push(section);
    }
  }

  if (missingSections.length > 0) {
    const details = missingSections
      .slice(0, 3)
      .map((section) => reportMissingSection(section, latinColumn))
      .join('\n');

    return {
      success: false,
      failureReason: `Missing ${missingSections.length} section(s): ${missingSections
        .map(formatSectionForLog)
        .join(', ')}\n${details}`,
    };
  }

  return { success: true };
}

async function main(): Promise<void> {
  const cases = await loadCases();
  if (cases.length === 0) {
    console.warn('No comparison cases provided. Add entries to tests/divinum-officium/cases.json.');
    return;
  }

  const failures: Array<{ testCase: ComparisonCase; reason: string }> = [];

  for (const testCase of cases) {
    const label = testCase.description ?? `${testCase.slug}:${testCase.hour}`;
    process.stdout.write(`• ${label} … `);
    try {
      const outcome = await compareCase(testCase);
      if (outcome.success) {
        process.stdout.write('ok\n');
      } else {
        process.stdout.write('FAILED\n');
        failures.push({ testCase, reason: outcome.failureReason ?? 'Unknown reason' });
      }
    } catch (error) {
      process.stdout.write('ERROR\n');
      failures.push({
        testCase,
        reason: (error as Error).stack ?? (error as Error).message,
      });
    }
  }

  await closePrisma();

  if (failures.length > 0) {
    console.error('\nComparison failures:');
    for (const failure of failures) {
      console.error(`- ${failure.testCase.description ?? failure.testCase.slug}`);
      console.error(`  ${failure.reason}\n`);
    }
    process.exitCode = 1;
  } else {
    console.log('\nAll comparisons completed successfully.');
  }
}

main().catch((error) => {
  console.error(error);
  closePrisma()
    .catch(() => {
      // noop
    })
    .finally(() => {
      process.exit(1);
    });
});
