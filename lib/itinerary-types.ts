export type Day = {
  title: string;
  place: string;
  stay: string;
  details: string[];
};

export type Journey = {
  id: string;
  number: string;
  title: string;
  daysLabel: string;
  route: string;
  image: string;
  imageAlt: string;
  introduction: string;
  price: string;
  priceNote: string;
  group: string;
  days: Day[];
  included: string[];
  excluded: string[];
  payment?: string;
  isPublished?: boolean;
};

export type PageContent = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  choose: string;
  routeLabel: string;
  guestsLabel: string;
  investmentLabel: string;
  dayLabel: string;
  stayLabel: string;
  includedLabel: string;
  excludedLabel: string;
  paymentLabel: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaCopy: string;
  ctaButton: string;
  journeys: Journey[];
};

export type ManagedItineraries = {
  en: PageContent;
  zhTW: PageContent;
};
