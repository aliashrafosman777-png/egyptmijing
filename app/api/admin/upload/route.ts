import { getAdminSession } from '@/lib/admin-session';
import { storeContentImage } from '@/lib/content-images';

export async function POST(request: Request) {
  if (!await getAdminSession()) return Response.json({ message: 'Unauthorized' }, { status: 401 });
  const form = await request.formData();
  const image = form.get('image');
  if (!(image instanceof File) || image.size === 0) return Response.json({ message: 'Choose an image.' }, { status: 400 });
  if (image.type !== 'image/webp' || image.size > 8_000_000) return Response.json({ message: 'Upload a WebP image under 8 MB.' }, { status: 400 });
  try { return Response.json({ url: await storeContentImage(image) }); }
  catch (error) { return Response.json({ message: error instanceof Error ? error.message : 'Upload failed.' }, { status: 503 }); }
}
