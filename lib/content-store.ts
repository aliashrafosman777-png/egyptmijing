import fs from 'node:fs';
import path from 'node:path';
import { get, head, put } from '@vercel/blob';
import type { ManagedContent } from '@/lib/managed-content-types';

const CONTENT_PATH = 'private/egypt-hidden-wonders/content.json';
const LOCAL_DIR = path.join(process.cwd(), 'data');
const LOCAL_FILE = path.join(LOCAL_DIR, 'site-content.json');

function emptyContent(): ManagedContent {
  return { version: 1, updatedAt: new Date(0).toISOString(), work: null, itineraries: null, siteImages: null };
}

function hasBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function parseContent(value: string): ManagedContent {
  const parsed = JSON.parse(value) as Partial<ManagedContent>;
  if (parsed.version !== 1) throw new Error('Unsupported content format.');
  return {
    version: 1,
    updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString(),
    work: Array.isArray(parsed.work) ? parsed.work : null,
    itineraries: parsed.itineraries && typeof parsed.itineraries === 'object' ? parsed.itineraries : null,
    siteImages: parsed.siteImages && typeof parsed.siteImages === 'object' ? parsed.siteImages : null,
  };
}

export async function readManagedContent(): Promise<ManagedContent> {
  if (hasBlob()) {
    const result = await get(CONTENT_PATH, { access: 'private', useCache: false });
    if (!result) return emptyContent();
    if (result.statusCode !== 200) throw new Error('Unable to read managed content.');
    return parseContent(await new Response(result.stream).text());
  }
  if (!fs.existsSync(LOCAL_FILE)) return emptyContent();
  return parseContent(fs.readFileSync(LOCAL_FILE, 'utf8'));
}

export async function writeManagedContent(next: ManagedContent): Promise<void> {
  const payload = JSON.stringify({ ...next, version: 1, updatedAt: new Date().toISOString() });
  if (hasBlob()) {
    let etag: string | undefined;
    try { etag = (await head(CONTENT_PATH)).etag; } catch { etag = undefined; }
    await put(CONTENT_PATH, payload, {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: Boolean(etag),
      ifMatch: etag,
      contentType: 'application/json',
    });
    return;
  }
  if (process.env.VERCEL) throw new Error('Connect a private Vercel Blob store before saving content.');
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  const temp = `${LOCAL_FILE}.tmp`;
  fs.writeFileSync(temp, payload, 'utf8');
  fs.renameSync(temp, LOCAL_FILE);
}
