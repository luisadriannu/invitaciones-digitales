import type { InvitationPlan } from "@/app/data/plans";

export type EventType =
  | "cumple"
  | "boda"
  | "xv"
  | "babyshower"
  | "bautizo"
  | "graduacion"
  | "primeracomunion";

export type EventVariant =
  | "basic"
  | "base"
  | "elegant"
  | "modern"
  | "personalized"
  | "dinosaur"
  | "light"
  | "azure"
  | "pastel"
  | "pop"
  | "dinoParty"
  | "flash"
  | "sirena"
  | "itzia"
  | "roseGarden"
  | "western"
  | "oliveVintage";

export interface SeoInfo {
  title: string;
  description: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface EventInfo {
  name: string;
  age?: number;
  date: string;
  /** IANA zone of the event venue; defaults to central Mexico. */
  timeZone?: string;
  /** @deprecated Countdown uses date + partyHour + timeZone. */
  startsAt?: string;
  ceremonyHour?: string;
  partyHour: string;
  phrase?: string;
  dressCode: string;
  dressCodeNote?: string;
  specialMusic?: string;
  giftMessage?: string;
  favorites?: {
    title: string;
    toys: string[];
    activities: string[];
    clothingSize: string;
    clothingNote?: string;
    shoeSize: string;
  };
  itinerary?: {
    hour: string;
    title: string;
    description?: string;
  }[];
}

export interface MediaInfo {
  coverImage: string;
  portraitImage?: string;
  gallery: string[];
  music?: string;
}

export interface LocationInfo {
  mapUrl?: string;
  church?: string;
  churchMapUrl?: string;
  event?: string;
  reception?: string;
  receptionMapUrl?: string;
  place?: string;
}

export interface ContactInfo {
  phone: string;
  confirmationLink?: string;
}

export interface FamilyInfo {
  groomParents?: {
    mother: string;
    father: string;
  };
  brideParents?: {
    mother: string;
    father: string;
  };
  presentationGodparents?: string[];
  parents?: {
    mother: string;
    father: string;
  };
  godparents?: {
    man: string;
    woman: string;
  };
}

export interface DesignInfo {
  variant?: EventVariant;

  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
  };

  backgroundImage?: string;
}

export interface EventData {
  tipo: EventType;
  seo: SeoInfo;
  event: EventInfo;
  media: MediaInfo;
  location: LocationInfo;
  contact: ContactInfo;
  family?: FamilyInfo;
  design?: DesignInfo;
  plan: InvitationPlan;
}

