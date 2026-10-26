import type { ManagedItineraries } from '@/lib/itinerary-types';

export type LocalizedText = {
  en: string;
  zhTW: string;
};

export type WorkPlace = {
  id: string;
  title: LocalizedText;
  kicker: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  isPublished: boolean;
};

export type ManagedImageAsset = {
  id: string;
  image: string;
  imageAlt: LocalizedText;
};

export type SiteImages = {
  homeHero: ManagedImageAsset;
  homeJourneys: ManagedImageAsset[];
  aboutGuides: ManagedImageAsset[];
};

export type ManagedContent = {
  version: 1;
  updatedAt: string;
  work: WorkPlace[] | null;
  itineraries: ManagedItineraries | null;
  siteImages: SiteImages | null;
};
