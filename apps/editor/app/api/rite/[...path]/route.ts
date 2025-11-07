import { NextResponse } from 'next/server';
import path from 'node:path';
import fs from 'node:fs/promises';
import fssync from 'node:fs';
import { fileURLToPath } from 'node:url';

// Resolve the data directory robustly for both dev and prod.
// Prefer path relative to this file, with a fallback to process.cwd().
const here = path.dirname(fileURLToPath(import.meta.url));
const byFile = path.resolve(here, '../../../../../../data');
const byCwd = path.resolve(process.cwd(), '..', '..', 'data');
const dataRoot = fssync.existsSync(byFile) ? byFile : byCwd;

const isPathInside = (parent: string, child: string) => {
  const rel = path.relative(parent, child);
  // Allow equality (rel === '') and any subpath inside parent
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
};

export async function GET(
  _req: Request,
  ctx: any
) {
  try {
    const segments: string[] = ctx?.params?.path ?? [];
    const rawTarget = path.join(dataRoot, ...segments);
    const target = path.resolve(rawTarget);

    // Prevent path traversal outside of dataRoot
    if (!isPathInside(dataRoot, target)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    if (!fssync.existsSync(target)) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const stat = await fs.stat(target);
    if (stat.isDirectory()) {
      const entries = await fs.readdir(target, { withFileTypes: true });
      const listing = entries.map((e) => ({
        name: e.name,
        type: e.isDirectory() ? 'dir' : 'file'
      }));
      return NextResponse.json({
        base: path.relative(dataRoot, target) || '.',
        entries: listing
      });
    }

    const ext = path.extname(target).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.json') contentType = 'application/json; charset=utf-8';
    else if (ext === '.xml') contentType = 'application/xml; charset=utf-8';
    else if (ext === '.txt') contentType = 'text/plain; charset=utf-8';

    const buf = await fs.readFile(target);
    const array = new Uint8Array(buf);
    return new Response(array, { headers: { 'content-type': contentType } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
