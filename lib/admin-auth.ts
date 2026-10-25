import bcrypt from 'bcryptjs';

export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!configuredEmail || !passwordHash) return false;
  const passwordMatches = await bcrypt.compare(password, passwordHash);
  return email.trim().toLowerCase() === configuredEmail && passwordMatches;
}
