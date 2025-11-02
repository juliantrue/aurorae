import { spawn } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';

type HoraCommand =
  | 'Matutinum'
  | 'Laudes'
  | 'Prima'
  | 'Tertia'
  | 'Sexta'
  | 'Nona'
  | 'Vesperae'
  | 'Completorium';

export interface RunDivinumOfficiumOptions {
  /**
   * Target hour in Divinum Officium parlance, used to build `command=pray<Hora>`.
   */
  hora: HoraCommand;
  /**
   * Date to request, in ISO `YYYY-MM-DD`. Converted to `MM-DD-YYYY` for the CGI script.
   */
  isoDate?: string;
  /**
   * Additional query parameters to append to the CGI request.
   * Keys and values will be URL encoded.
   */
  params?: Record<string, string | undefined>;
  /**
   * Optional override of environment variables passed to the Perl process.
   */
  env?: NodeJS.ProcessEnv;
  /**
   * Emit debug logging to STDOUT to aid troubleshooting request failures.
   */
  verbose?: boolean;
}

export interface RunDivinumOfficiumResult {
  /**
   * Map of response headers (e.g. `Content-type`, `Set-Cookie`).
   */
  headers: Record<string, string[]>;
  /**
   * Raw HTML body returned by the CGI script.
   */
  body: string;
  /**
   * Combined STDOUT emitted by the CGI script, prior to parsing.
   */
  rawOutput: string;
}

const REPO_ROOT = path.join(__dirname, '..', '..');
const PERL_LIB_DIR = path.join(REPO_ROOT, 'vendor', 'perl5', 'lib', 'perl5');
const OFFICIUM_SCRIPT = path.join(
  REPO_ROOT,
  'vendor',
  'divinum-officium',
  'web',
  'cgi-bin',
  'horas',
  'officium.pl'
);

function encodeParams(params: Record<string, string | undefined>): string {
  return Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

function isoDateToDivinum(date: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    throw new Error(`Expected ISO date (YYYY-MM-DD), received "${date}"`);
  }
  const [, year, month, day] = match;
  return `${month}-${day}-${year}`;
}

function mergeEnv(base: NodeJS.ProcessEnv, extra: NodeJS.ProcessEnv | undefined): NodeJS.ProcessEnv {
  return {
    ...base,
    ...(extra ?? {})
  };
}

function parseHeadersAndBody(output: string): RunDivinumOfficiumResult {
  const [rawHeaders, ...bodyParts] = output.split(/\r?\n\r?\n/);
  const body = bodyParts.join('\n\n');
  const headerLines = rawHeaders.split(/\r?\n/).filter((line) => Boolean(line.trim()));

  const headers: Record<string, string[]> = {};

  for (const line of headerLines) {
    const [rawKey, ...valueParts] = line.split(':');
    if (!rawKey || valueParts.length === 0) continue;
    const key = rawKey.trim().toLowerCase();
    const value = valueParts.join(':').trim();
    if (!headers[key]) headers[key] = [];
    headers[key].push(value);
  }

  return {
    headers,
    body,
    rawOutput: output
  };
}

/**
 * Run the Divinum Officium CGI script for a specific hour and return the rendered HTML.
 */
export async function runDivinumOfficium(
  options: RunDivinumOfficiumOptions
): Promise<RunDivinumOfficiumResult> {
  const queryParams: Record<string, string> = {
    command: `pray${options.hora}`,
    ...(options.params ?? {})
  };

  if (options.isoDate) {
    queryParams.date1 = isoDateToDivinum(options.isoDate);
  }

  const queryString = encodeParams(queryParams);

  const perlEnv: NodeJS.ProcessEnv = {
    ...process.env,
    REQUEST_METHOD: 'GET',
    QUERY_STRING: queryString,
    GATEWAY_INTERFACE: 'CGI/1.1',
    SCRIPT_NAME: '/cgi-bin/horas/officium.pl',
    SERVER_NAME: 'localhost',
    SERVER_PORT: '80',
    SERVER_PROTOCOL: 'HTTP/1.1',
    PERL5LIB: [PERL_LIB_DIR, process.env.PERL5LIB].filter(Boolean).join(':')
  };

  if (options.verbose) {
    // eslint-disable-next-line no-console
    console.log(`[DivinumOfficium] QUERY_STRING=${queryString}`);
  }

  const child = spawn('perl', [OFFICIUM_SCRIPT], {
    cwd: REPO_ROOT,
    env: mergeEnv(perlEnv, options.env)
  });

  let stdout = '';
  let stderr = '';

  child.stdout.setEncoding('utf8');
  child.stderr.setEncoding('utf8');

  child.stdout.on('data', (chunk) => {
    stdout += chunk;
  });
  child.stderr.on('data', (chunk) => {
    stderr += chunk;
  });

  const [code] = (await once(child, 'close')) as [number | null, NodeJS.Signals | null];

  if (options.verbose && stderr) {
    // eslint-disable-next-line no-console
    console.warn('[DivinumOfficium:stderr]', stderr);
  }

  if (code !== 0) {
    throw new Error(
      `Divinum Officium script exited with code ${code}. Stderr:\n${stderr || '(empty)'}`
    );
  }

  return parseHeadersAndBody(stdout);
}

export const horaFromOfficeHour: Record<string, HoraCommand> = {
  MATUTINUM: 'Matutinum',
  LAUDES: 'Laudes',
  PRIMA: 'Prima',
  TERTIA: 'Tertia',
  SEXTA: 'Sexta',
  NONA: 'Nona',
  VESPERAE: 'Vesperae',
  COMPLETORIUM: 'Completorium'
};
