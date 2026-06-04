export type EventType =
  | "cumple"
  | "boda"
  | "xv"
  | "babyshower"
  | "bautizo"
  | "graduacion"
  | "primeracomunion";

export type EventVariant = "base" | "elegant" | "modern" | "personalized";

export type Suscription = "classic" | "premiun";

export interface SeoInfo {
  title: string;
  description: string;
  image: string;
}

export interface EventInfo {
  name: string;
  age?: number;
  date: string;
  ceremonyHour?: string;
  partyHour: string;
  phrase?: string;
  dressCode: string;
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
  mapUrl: string;
  church?: string;
  event?: string;
  reception?: string;
}

export interface ContactInfo {
  phone: string;
  confirmationLink?: string;
}

export interface FamilyInfo {
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
  suscription: Suscription;
}
