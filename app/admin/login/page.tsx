'use client';

/* oxlint-disable next/no-html-link-for-pages -- Vinext's production router currently requires plain anchors for internal navigation. */

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Eye, EyeOff, LockKeyhole } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(''); setLoading(true);
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || 'Unable to sign in.');
      window.location.assign('/admin');
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to sign in.'); }
    finally { setLoading(false); }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-brand"><Image src="/brand/egypt-hidden-wonders-emblem.png" alt="Egypt Hidden Wonders" width={88} height={88} /><span>Private content studio</span></div>
        <p className="admin-kicker">Egypt Hidden Wonders</p>
        <h1>Welcome back.</h1>
        <p className="admin-login-copy">Sign in to curate places and journeys.</p>
        <form onSubmit={submit}>
          <label>Email<input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
          <label>Password<span className="admin-password"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></span></label>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary" type="submit" disabled={loading}><LockKeyhole size={17} />{loading ? 'Signing in…' : 'Enter dashboard'}<ArrowRight size={17} /></button>
        </form>
        <a className="admin-back-link" href="/">← Return to website</a>
      </section>
    </main>
  );
}
