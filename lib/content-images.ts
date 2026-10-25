import fs from 'node:fs';
import path from 'node:path';
import { put } from '@vercel/blob';

export const LOCAL_CONTENT_IMAGE_DIR = path.join(process.cwd(), 'data', 'content-images');

export async function storeContentImage(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const slug = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.webp`;
  const blobPath = `content/${slug}`;
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    const blob = await put(blobPath, buffer, { access: 'private', addRandomSuffix: false, contentType: 'image/webp' });
    return `/api/content-image?path=${encodeURIComponent(blob.pathname)}`;
  }
  if (process.env.VERCEL) throw new Error('Connect a private Vercel Blob store before uploading images.');
  fs.mkdirSync(LOCAL_CONTENT_IMAGE_DIR, { recursive: true });
  fs.writeFileSync(path.join(LOCAL_CONTENT_IMAGE_DIR, slug), buffer);
  return `/api/content-image?path=${encodeURIComponent(blobPath)}`;
}
