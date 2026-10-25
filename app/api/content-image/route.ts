import { get } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { LOCAL_CONTENT_IMAGE_DIR } from '@/lib/content-images';

const VALID_PATH = /^content\/[a-zA-Z0-9_-]+\.webp$/;

export async function GET(request: Request) {
  const pathname = new URL(request.url).searchParams.get('path')?.trim();
  if (!pathname || !VALID_PATH.test(pathname)) return new Response(null, { status: 400 });
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
      const result = await get(pathname, { access: 'private' });
      if (!result || result.statusCode !== 200) return new Response(null, { status: 404 });
      return new Response(result.stream, { headers: { 'Content-Type': result.blob.contentType || 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
    }
    const buffer = await readFile(path.join(LOCAL_CONTENT_IMAGE_DIR, path.basename(pathname)));
    return new Response(buffer, { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
  } catch { return new Response(null, { status: 404 }); }
}
