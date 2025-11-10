import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import {
  HORA_COMMANDS,
  isHoraCommand,
  parseDivinumOfficiumHtml,
  runDivinumOfficium,
} from './index';

function parseCliParams(paramFlags: string[] | undefined): Record<string, string> | undefined {
  if (!paramFlags || paramFlags.length === 0) return undefined;

  const params: Record<string, string> = {};

  for (const flag of paramFlags) {
    const separatorIndex = flag.indexOf('=');
    if (separatorIndex === -1) {
      throw new Error(`Invalid --param value "${flag}". Expected "key=value".`);
    }
    const key = flag.slice(0, separatorIndex).trim();
    const value = flag.slice(separatorIndex + 1).trim();
    if (!key) {
      throw new Error(`Invalid --param value "${flag}". Key cannot be empty.`);
    }
    params[key] = value;
  }

  return params;
}

async function runFromCli(): Promise<void> {
  const { values, positionals } = parseArgs({
    options: {
      hora: { type: 'string', short: 'h' },
      date: { type: 'string', short: 'd' },
      verbose: { type: 'boolean', default: false },
      param: { type: 'string', multiple: true },
    },
    allowPositionals: true,
  });

  const horaInput = (values.hora ?? positionals[0]) as string | undefined;
  if (!isHoraCommand(horaInput)) {
    const allowed = HORA_COMMANDS.join(', ');
    throw new Error(
      `Missing or invalid hora. Provide one of: ${allowed}. Example: --hora Vesperae`,
    );
  }

  const isoDate = (values.date ?? positionals[1]) as string | undefined;
  const params = parseCliParams(values.param as string[] | undefined);

  const result = await runDivinumOfficium({
    hora: horaInput,
    isoDate,
    params,
    verbose: Boolean(values.verbose),
  });

  const parsed = parseDivinumOfficiumHtml(result.body);
  process.stdout.write(`${JSON.stringify(parsed, null, 2)}\n`);
}

const MODULE_FILE = path.resolve(fileURLToPath(import.meta.url));
const IS_DIRECT_EXECUTION =
  Boolean(process.argv[1]) && path.resolve(process.argv[1]!) === MODULE_FILE;

if (IS_DIRECT_EXECUTION) {
  runFromCli().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
}
