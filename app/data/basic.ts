import type { EventData } from "@/app/types/EventData";
import invitation0 from "@/app/data/birthday/mariana";
import invitation1 from "@/app/data/christening/emilia";
import invitation2 from "@/app/data/graduation/valeria";
import invitation3 from "@/app/data/firstcommunion/lucia";

export const basicSamples = [
  {
    slug: "cumple-durazno",
    category: "Cumpleaños",
    title: "Cumpleaños · Mariana",
    tipo: invitation0.tipo,
    image: invitation0.media.coverImage,
  },
  {
    slug: "bautizo-cielo",
    category: "Bautizo",
    title: "Bautizo · Emilia",
    tipo: invitation1.tipo,
    image: invitation1.media.coverImage,
  },
  {
    slug: "graduacion-laurel",
    category: "Graduación",
    title: "Graduación · Valeria",
    tipo: invitation2.tipo,
    image: invitation2.media.coverImage,
  },
  {
    slug: "comunion-espiga",
    category: "Primera Comunión",
    title: "Primera Comunión · Lucía",
    tipo: invitation3.tipo,
    image: invitation3.media.coverImage,
  },
] as const;

export const basicEvents: Record<string, EventData> = {
  "cumple-durazno": invitation0,
  "bautizo-cielo": invitation1,
  "graduacion-laurel": invitation2,
  "comunion-espiga": invitation3,
};
