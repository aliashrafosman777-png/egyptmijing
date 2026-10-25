import { getAdminSession } from '@/lib/admin-session';
import { readManagedContent, writeManagedContent } from '@/lib/content-store';
import type { ManagedContent } from '@/lib/managed-content-types';

export async function GET() {
  if (!await getAdminSession()) return Response.json({ message: 'Unauthorized' }, { status: 401 });
  return Response.json(await readManagedContent(), { headers: { 'Cache-Control': 'no-store' } });
}

export async function PUT(request: Request) {
  if (!await getAdminSession()) return Response.json({ message: 'Unauthorized' }, { status: 401 });
  const body = await request.json().catch(() => null) as ManagedContent | null;
  if (!body || body.version !== 1 || (body.work !== null && !Array.isArray(body.work)) || (body.itineraries !== null && typeof body.itineraries !== 'object')) {
    return Response.json({ message: 'Invalid content.' }, { status: 400 });
  }
  const size = new TextEncoder().encode(JSON.stringify(body)).length;
  if (size > 2_000_000) return Response.json({ message: 'Content is too large.' }, { status: 413 });
  try {
    await writeManagedContent(body);
    return Response.json({ success: true, updatedAt: new Date().toISOString() });
  } catch (error) {
    return Response.json({ message: error instanceof Error ? error.message : 'Unable to save content.' }, { status: 503 });
  }
}
