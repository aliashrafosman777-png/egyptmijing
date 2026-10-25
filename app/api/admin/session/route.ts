import { getAdminSession } from '@/lib/admin-session';

export async function GET() {
  const session = await getAdminSession();
  return session ? Response.json({ authenticated: true, email: session.email }) : Response.json({ authenticated: false }, { status: 401 });
}
