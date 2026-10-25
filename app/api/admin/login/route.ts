import { createAdminSession } from '@/lib/admin-session';
import { verifyAdminCredentials } from '@/lib/admin-auth';

const attempts = new Map<string, { count: number; reset: number }>();

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const now = Date.now();
  const current = attempts.get(ip);
  if (current && current.reset > now && current.count >= 5) return Response.json({ message: 'Too many attempts. Please try again in 15 minutes.' }, { status: 429 });
  const body = await request.json().catch(() => null) as { email?: unknown; password?: unknown } | null;
  const email = typeof body?.email === 'string' ? body.email.slice(0, 320) : '';
  const password = typeof body?.password === 'string' ? body.password.slice(0, 200) : '';
  const valid = email && password ? await verifyAdminCredentials(email, password) : false;
  if (!valid) {
    attempts.set(ip, { count: current && current.reset > now ? current.count + 1 : 1, reset: now + 15 * 60_000 });
    return Response.json({ message: 'Invalid email or password.' }, { status: 401 });
  }
  attempts.delete(ip);
  await createAdminSession(email);
  return Response.json({ success: true });
}
