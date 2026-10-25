import { readManagedContent } from '@/lib/content-store';

export async function GET() {
  try {
    const content = await readManagedContent();
    const publicContent = {
      ...content,
      work: content.work?.filter((place) => place.isPublished !== false) ?? null,
      itineraries: content.itineraries ? {
        en: { ...content.itineraries.en, journeys: content.itineraries.en.journeys.filter((journey) => journey.isPublished !== false) },
        zhTW: { ...content.itineraries.zhTW, journeys: content.itineraries.zhTW.journeys.filter((journey) => journey.isPublished !== false) },
      } : null,
    };
    return Response.json(publicContent, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ version: 1, work: null, itineraries: null }, { headers: { 'Cache-Control': 'no-store' } });
  }
}
