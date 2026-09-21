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
  | "pastel"
  | "pop"
  | "dinoParty"
  | "flash"
  | "sirena"
  | "itzia"
  | "roseGarden";



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
  startsAt?: string;
  ceremonyHour?: string;
  partyHour: string;
  phrase?: string;
  dressCode: string;
  dressCodeNote?: string;
  specialMusic?: string;
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
  gallery: string[];
  music?: string;
}

export interface LocationInfo {
  mapUrl?: string;
  church?: string;
  event?: string;
  reception?: string;
  place?: string;
}

export interface ContactInfo {
  phone: string;
  confirmationLink?: string;
}

export interface FamilyInfo {
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
