'use client';

/* oxlint-disable next/no-html-link-for-pages -- Vinext's production router currently requires plain anchors for internal navigation. */

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ExternalLink, ImagePlus, LogOut, Map, MapPinned, Pencil, Plus, Save, Trash2, X } from 'lucide-react';
import type { ManagedContent, WorkPlace } from '@/lib/managed-content-types';
import type { Day, Journey, ManagedItineraries } from '@/lib/itinerary-types';
import { defaultWorkPlaces } from '@/lib/work-defaults';
import { english, traditionalChinese } from '@/lib/itinerary-defaults';
import { prepareContentUpload } from '@/lib/prepare-content-upload';

type Section = 'work' | 'itineraries';
type LocaleKey = 'en' | 'zhTW';

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }
function id(prefix: string): string { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }

async function uploadImage(file: File): Promise<string> {
  const prepared = await prepareContentUpload(file);
  const form = new FormData(); form.append('image', prepared);
  const response = await fetch('/api/admin/upload', { method: 'POST', body: form });
  const result = await response.json() as { url?: string; message?: string };
  if (!response.ok || !result.url) throw new Error(result.message || 'Image upload failed.');
  return result.url;
}

function Field({ label, value, onChange, textarea = false, placeholder = '' }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean; placeholder?: string }) {
  return <label className="admin-field"><span>{label}</span>{textarea ? <textarea value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /> : <input value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function LocaleTabs({ value, onChange }: { value: LocaleKey; onChange: (value: LocaleKey) => void }) {
  return <div className="admin-locale-tabs"><button className={value === 'en' ? 'is-active' : ''} onClick={() => onChange('en')}>English</button><button className={value === 'zhTW' ? 'is-active' : ''} onClick={() => onChange('zhTW')}>繁體中文</button></div>;
}

function ImagePicker({ src, alt, onUpload, uploading }: { src: string; alt: string; onUpload: (file: File) => void; uploading: boolean }) {
  return <label className="admin-image-picker"><span className="admin-image-preview">{src && <Image src={src} alt={alt || 'Content image'} fill sizes="480px" unoptimized />}</span><span className="admin-image-action"><ImagePlus size={18} />{uploading ? 'Preparing image…' : 'Replace image'}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file); event.target.value = ''; }} /></span></label>;
}

export function AdminDashboard() {
  const [section, setSection] = useState<Section>('work');
  const [work, setWork] = useState<WorkPlace[]>(clone(defaultWorkPlaces));
  const [itineraries, setItineraries] = useState<ManagedItineraries>({ en: clone(english), zhTW: clone(traditionalChinese) });
  const [updatedAt, setUpdatedAt] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [workEditor, setWorkEditor] = useState<number | null>(null);
  const [journeyEditor, setJourneyEditor] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([fetch('/api/admin/session', { cache: 'no-store' }), fetch('/api/admin/content', { cache: 'no-store' })])
      .then(async ([sessionResponse, contentResponse]) => {
        if (!sessionResponse.ok) { window.location.replace('/admin/login'); return; }
        const session = await sessionResponse.json() as { email: string };
        const content = await contentResponse.json() as ManagedContent;
        setAdminEmail(session.email);
        if (content.work) setWork(content.work);
        if (content.itineraries) setItineraries(content.itineraries);
        setUpdatedAt(content.updatedAt);
      })
      .catch(() => setError('Unable to load the content studio.'))
      .finally(() => setLoading(false));
  }, []);

  async function save(nextWork = work, nextItineraries = itineraries) {
    setSaving(true); setError(''); setMessage('');
    const payload: ManagedContent = { version: 1, updatedAt: new Date().toISOString(), work: nextWork, itineraries: nextItineraries };
    try {
      const response = await fetch('/api/admin/content', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json() as { message?: string; updatedAt?: string };
      if (!response.ok) throw new Error(result.message || 'Unable to save.');
      setUpdatedAt(result.updatedAt || new Date().toISOString());
      setMessage('Published successfully.');
      window.setTimeout(() => setMessage(''), 3000);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to save.'); }
    finally { setSaving(false); }
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.replace('/admin/login'); }

  if (loading) return <main className="admin-loading"><Image src="/brand/egypt-hidden-wonders-emblem.png" alt="" width={76} height={76} /><span>Opening content studio…</span></main>;

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-sidebar-brand"><Image src="/brand/egypt-hidden-wonders-emblem.png" alt="Egypt Hidden Wonders" width={62} height={62} /><span>Content<br />Studio</span></a>
        <nav><button className={section === 'work' ? 'is-active' : ''} onClick={() => setSection('work')}><MapPinned size={19} />Work places</button><button className={section === 'itineraries' ? 'is-active' : ''} onClick={() => setSection('itineraries')}><Map size={19} />Journeys</button></nav>
        <div className="admin-sidebar-foot"><span>{adminEmail}</span><button onClick={logout}><LogOut size={17} />Sign out</button></div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar"><div><p className="admin-kicker">Egypt Hidden Wonders</p><h1>{section === 'work' ? 'Work places' : 'Journeys'}</h1><p>{section === 'work' ? 'Curate the places shown on the Work page.' : 'Edit routes, daily plans, prices, and journey imagery.'}</p></div><div className="admin-top-actions"><a href={section === 'work' ? '/work' : '/itinerary'} target="_blank" rel="noreferrer">View live page <ExternalLink size={15} /></a><button className="admin-primary" onClick={() => save()} disabled={saving}><Save size={17} />{saving ? 'Publishing…' : 'Publish changes'}</button></div></header>
        {(message || error) && <div className={`admin-notice${error ? ' is-error' : ''}`}>{error || message}<button onClick={() => { setError(''); setMessage(''); }}><X size={16} /></button></div>}
        <div className="admin-meta"><span>{section === 'work' ? `${work.length} places` : `${itineraries.en.journeys.length} journeys`}</span><span>{updatedAt && new Date(updatedAt).getTime() > 0 ? `Last published ${new Date(updatedAt).toLocaleString()}` : 'Using original website content'}</span></div>
        {section === 'work' ? <WorkManager items={work} setItems={setWork} editor={workEditor} setEditor={setWorkEditor} setError={setError} /> : <JourneyManager data={itineraries} setData={setItineraries} editor={journeyEditor} setEditor={setJourneyEditor} setError={setError} />}
      </section>
    </main>
  );
}

function WorkManager({ items, setItems, editor, setEditor, setError }: { items: WorkPlace[]; setItems: (items: WorkPlace[]) => void; editor: number | null; setEditor: (index: number | null) => void; setError: (value: string) => void }) {
  const [locale, setLocale] = useState<LocaleKey>('en');
  const [uploading, setUploading] = useState(false);
  const current = editor === null ? null : items[editor];
  function patchItem(patch: Partial<WorkPlace>) { if (editor === null) return; const next = clone(items); next[editor] = { ...next[editor], ...patch }; setItems(next); }
  function patchText(field: 'title' | 'kicker' | 'description' | 'imageAlt', value: string) { if (!current) return; patchItem({ [field]: { ...current[field], [locale]: value } }); }
  function add() { const next: WorkPlace = { id: id('place'), title: { en: 'New place', zhTW: '新地點' }, kicker: { en: '', zhTW: '' }, description: { en: '', zhTW: '' }, image: '/images/abu-simbel.jpeg', imageAlt: { en: '', zhTW: '' }, isPublished: false }; setItems([...items, next]); setEditor(items.length); }
  function move(index: number, delta: number) { const target = index + delta; if (target < 0 || target >= items.length) return; const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; setItems(next); setEditor(target); }
  async function image(file: File) { setUploading(true); setError(''); try { patchItem({ image: await uploadImage(file) }); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Upload failed.'); } finally { setUploading(false); } }

  return <div className="admin-manager"><div className="admin-list-head"><h2>Places</h2><button className="admin-secondary" onClick={add}><Plus size={17} />Add place</button></div><div className="admin-card-list">{items.map((item, index) => <article key={item.id} className={`admin-content-card${editor === index ? ' is-selected' : ''}`}><span className="admin-card-image"><Image src={item.image} alt="" fill sizes="150px" unoptimized /></span><div><span className={`admin-status${item.isPublished ? '' : ' is-draft'}`}>{item.isPublished ? 'Published' : 'Draft'}</span><h3>{item.title.en || 'Untitled place'}</h3><p>{item.kicker.en || 'No category details'}</p></div><div className="admin-row-actions"><button onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up"><ArrowUp size={17} /></button><button onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down"><ArrowDown size={17} /></button><button onClick={() => setEditor(index)}><Pencil size={17} />Edit</button></div></article>)}</div>{current && <div className="admin-editor"><div className="admin-editor-head"><div><p className="admin-kicker">Place {String(editor! + 1).padStart(2, '0')}</p><h2>Edit place</h2></div><button onClick={() => setEditor(null)}><X size={20} /></button></div><div className="admin-editor-grid"><ImagePicker src={current.image} alt={current.imageAlt[locale]} onUpload={image} uploading={uploading} /><div><div className="admin-publish-row"><label><input type="checkbox" checked={current.isPublished} onChange={(event) => patchItem({ isPublished: event.target.checked })} />Visible on website</label><button className="admin-danger-link" onClick={() => { if (confirm('Delete this place?')) { setItems(items.filter((_, index) => index !== editor)); setEditor(null); } }}><Trash2 size={16} />Delete</button></div><LocaleTabs value={locale} onChange={setLocale} /><Field label="Place title" value={current.title[locale]} onChange={(value) => patchText('title', value)} /><Field label="Small category line" value={current.kicker[locale]} onChange={(value) => patchText('kicker', value)} /><Field label="Description" value={current.description[locale]} onChange={(value) => patchText('description', value)} textarea /><Field label="Image description" value={current.imageAlt[locale]} onChange={(value) => patchText('imageAlt', value)} /></div></div></div>}</div>;
}

function JourneyManager({ data, setData, editor, setEditor, setError }: { data: ManagedItineraries; setData: (data: ManagedItineraries) => void; editor: number | null; setEditor: (index: number | null) => void; setError: (value: string) => void }) {
  const [locale, setLocale] = useState<LocaleKey>('en');
  const [uploading, setUploading] = useState(false);
  const current = editor === null ? null : data[locale].journeys[editor];
  const counterpart = editor === null ? null : data[locale === 'en' ? 'zhTW' : 'en'].journeys[editor];
  const summaries = data.en.journeys;
  function patchJourney(patch: Partial<Journey>, both = false) { if (editor === null) return; const next = clone(data); next[locale].journeys[editor] = { ...next[locale].journeys[editor], ...patch }; if (both) next[locale === 'en' ? 'zhTW' : 'en'].journeys[editor] = { ...next[locale === 'en' ? 'zhTW' : 'en'].journeys[editor], ...patch }; setData(next); }
  function add() { const journeyId = id('journey'); const make = (chinese: boolean): Journey => ({ id: journeyId, number: String(summaries.length + 1).padStart(2, '0'), title: chinese ? '新旅程' : 'New journey', daysLabel: chinese ? '1 天' : '1 day', route: '', image: '/images/abu-simbel.jpeg', imageAlt: '', introduction: '', price: '', priceNote: '', group: '', days: [], included: [], excluded: [], isPublished: false }); const next = clone(data); next.en.journeys.push(make(false)); next.zhTW.journeys.push(make(true)); setData(next); setEditor(summaries.length); }
  function move(index: number, delta: number) { const target = index + delta; if (target < 0 || target >= summaries.length) return; const next = clone(data); for (const key of ['en', 'zhTW'] as LocaleKey[]) [next[key].journeys[index], next[key].journeys[target]] = [next[key].journeys[target], next[key].journeys[index]]; next.en.journeys.forEach((item, i) => item.number = String(i + 1).padStart(2, '0')); next.zhTW.journeys.forEach((item, i) => item.number = String(i + 1).padStart(2, '0')); setData(next); setEditor(target); }
  function remove() { if (editor === null || !confirm('Delete this journey and every day inside it?')) return; const next = clone(data); next.en.journeys.splice(editor, 1); next.zhTW.journeys.splice(editor, 1); for (const key of ['en', 'zhTW'] as LocaleKey[]) next[key].journeys.forEach((item, i) => item.number = String(i + 1).padStart(2, '0')); setData(next); setEditor(null); }
  async function image(file: File) { setUploading(true); setError(''); try { patchJourney({ image: await uploadImage(file) }, true); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Upload failed.'); } finally { setUploading(false); } }
  function patchDay(index: number, patch: Partial<Day>) { if (!current) return; const days = clone(current.days); days[index] = { ...days[index], ...patch }; patchJourney({ days }); }
  function addDay() { if (!current || !counterpart) return; const next = clone(data); next[locale].journeys[editor!].days.push({ title: locale === 'en' ? 'New day' : '新的一天', place: '', stay: '', details: [] }); next[locale === 'en' ? 'zhTW' : 'en'].journeys[editor!].days.push({ title: locale === 'en' ? '新的一天' : 'New day', place: '', stay: '', details: [] }); setData(next); }
  function deleteDay(index: number) { const next = clone(data); next.en.journeys[editor!].days.splice(index, 1); next.zhTW.journeys[editor!].days.splice(index, 1); setData(next); }
  const list = (value: string[]) => value.join('\n');
  const fromList = (value: string) => value.split('\n').map((item) => item.trim()).filter(Boolean);

  return <div className="admin-manager"><div className="admin-list-head"><h2>Journeys</h2><button className="admin-secondary" onClick={add}><Plus size={17} />Add journey</button></div><div className="admin-card-list">{summaries.map((item, index) => <article key={item.id} className={`admin-content-card${editor === index ? ' is-selected' : ''}`}><span className="admin-card-image"><Image src={item.image} alt="" fill sizes="150px" unoptimized /></span><div><span className={`admin-status${item.isPublished === false ? ' is-draft' : ''}`}>{item.isPublished === false ? 'Draft' : 'Published'}</span><h3>{item.title}</h3><p>{item.daysLabel} · {item.route}</p></div><div className="admin-row-actions"><button onClick={() => move(index, -1)} disabled={index === 0}><ArrowUp size={17} /></button><button onClick={() => move(index, 1)} disabled={index === summaries.length - 1}><ArrowDown size={17} /></button><button onClick={() => setEditor(index)}><Pencil size={17} />Edit</button></div></article>)}</div>{current && <div className="admin-editor admin-journey-editor"><div className="admin-editor-head"><div><p className="admin-kicker">Journey {current.number}</p><h2>Edit journey</h2></div><button onClick={() => setEditor(null)}><X size={20} /></button></div><div className="admin-publish-row"><label><input type="checkbox" checked={current.isPublished !== false} onChange={(event) => patchJourney({ isPublished: event.target.checked }, true)} />Visible on website</label><button className="admin-danger-link" onClick={remove}><Trash2 size={16} />Delete journey</button></div><LocaleTabs value={locale} onChange={setLocale} /><div className="admin-editor-grid"><ImagePicker src={current.image} alt={current.imageAlt} onUpload={image} uploading={uploading} /><div className="admin-form-grid"><Field label="Journey title" value={current.title} onChange={(value) => patchJourney({ title: value })} /><Field label="Duration" value={current.daysLabel} onChange={(value) => patchJourney({ daysLabel: value })} /><Field label="Route" value={current.route} onChange={(value) => patchJourney({ route: value })} /><Field label="Group" value={current.group} onChange={(value) => patchJourney({ group: value })} /><Field label="Price" value={current.price} onChange={(value) => patchJourney({ price: value })} /><Field label="Price note" value={current.priceNote} onChange={(value) => patchJourney({ priceNote: value })} /><Field label="Image description" value={current.imageAlt} onChange={(value) => patchJourney({ imageAlt: value })} /><Field label="Introduction" value={current.introduction} onChange={(value) => patchJourney({ introduction: value })} textarea /></div></div><section className="admin-subsection"><div className="admin-list-head"><div><p className="admin-kicker">Daily plan</p><h3>{current.days.length} days</h3></div><button className="admin-secondary" onClick={addDay}><Plus size={16} />Add day</button></div><div className="admin-days">{current.days.map((day, index) => <article key={`${current.id}-${index}`}><div className="admin-day-head"><span>Day {index + 1}</span><button onClick={() => deleteDay(index)}><Trash2 size={15} /></button></div><div className="admin-form-grid"><Field label="Title" value={day.title} onChange={(value) => patchDay(index, { title: value })} /><Field label="Place" value={day.place} onChange={(value) => patchDay(index, { place: value })} /><Field label="Stay" value={day.stay} onChange={(value) => patchDay(index, { stay: value })} /><Field label="Activities — one per line" value={list(day.details)} onChange={(value) => patchDay(index, { details: fromList(value) })} textarea /></div></article>)}</div></section><section className="admin-subsection admin-form-grid"><Field label="Included — one item per line" value={list(current.included)} onChange={(value) => patchJourney({ included: fromList(value) })} textarea /><Field label="Not included — one item per line" value={list(current.excluded)} onChange={(value) => patchJourney({ excluded: fromList(value) })} textarea /><Field label="Payment note" value={current.payment || ''} onChange={(value) => patchJourney({ payment: value })} textarea /></section></div>}</div>;
}
