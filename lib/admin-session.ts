import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE = 'ehw_admin_session';
const DURATION_SECONDS = 7 * 24 * 60 * 60;

function key(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('SESSION_SECRET must contain at least 32 characters.');
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${DURATION_SECONDS}s`)
    .sign(key());
  const store = await cookies();
  store.set(COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: DURATION_SECONDS });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE)?.value;
    if (!token) return null;
    const result = await jwtVerify(token, key(), { algorithms: ['HS256'] });
    return typeof result.payload.email === 'string' ? { email: result.payload.email } : null;
  } catch { return null; }
}
