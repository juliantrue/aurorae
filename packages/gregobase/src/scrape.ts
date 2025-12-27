import { writeFile } from 'node:fs/promises';
import { sources } from './solesmes_liber_antiphonarius_1960';

export type ScrapeOptions = {
  delayMs: number;
  limit: number;
  outputPath: string;
};

const defaultOptions: ScrapeOptions = {
  delayMs: 1000,
  limit: Number.POSITIVE_INFINITY,
  outputPath: 'liber_antiphonarius.json',
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function logStartEstimate(total: number, delayMs: number): void {
  const estimatedMs = total * delayMs;
  const estimatedMinutes = estimatedMs / (60 * 1000);
  const estimatedTime =
    estimatedMinutes >= 60
      ? `${(estimatedMinutes / 60).toFixed(1)}h`
      : `${estimatedMinutes.toFixed(1)}m`;
  console.log(
    `Starting scrape for ${total} item(s). Estimated time: ~${estimatedTime} at ${delayMs}ms delay.`,
  );
}

export async function scrapeSite(options: ScrapeOptions = defaultOptions): Promise<void> {
  let count = 0;
  const results: Array<{ text: string; gabc: string }> = [];
  const total = Math.min(options.limit, sources.length);
  logStartEstimate(total, options.delayMs);
  let wroteOutput = false;
  let interrupted = false;

  const writeResults = async (label: string): Promise<void> => {
    if (wroteOutput) {
      return;
    }
    wroteOutput = true;
    await writeFile(options.outputPath, JSON.stringify(results, null, 2) + '\n');
    console.log(`Wrote ${results.length} item(s) to ${options.outputPath} (${label}).`);
  };

  const handleSigint = (): void => {
    if (interrupted) {
      return;
    }
    interrupted = true;
    console.log('Received SIGINT, writing partial output...');
    void writeResults('partial').finally(() => {
      process.exit(130);
    });
  };

  process.once('SIGINT', handleSigint);
  for (const { href, text } of sources) {
    if (count >= options.limit) {
      break;
    }
    if (interrupted) {
      break;
    }
    console.log(`[${count + 1}/${total}] Fetching: ${text}`);
    let response = await fetch(href);
    if (!response.ok) {
      console.warn(`Failed to fetch ${href}: ${response.status} ${response.statusText}`);
      continue;
    }

    let gabc = await response.text();
    if (gabc.trim() === '') {
      const fallbackHref = `${href}&elem=1`;
      console.warn(`Empty gabc for ${text}. Retrying with ${fallbackHref}`);
      response = await fetch(fallbackHref);
      if (!response.ok) {
        console.warn(`Failed to fetch ${fallbackHref}: ${response.status} ${response.statusText}`);
        continue;
      }
      gabc = await response.text();
    }
    results.push({ text, gabc });

    count += 1;
    await sleep(options.delayMs);
  }

  process.removeListener('SIGINT', handleSigint);
  await writeResults('complete');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  scrapeSite().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
