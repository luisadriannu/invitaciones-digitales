import jose from "@/app/data/birthday/jose";
import karina from "@/app/data/graduation/karina";
import camila from "@/app/data/christening/camila";
import type { EventData } from "@/app/types/EventData";

export interface FlashEvent {
  theme: "cumple" | "graduacion" | "bautizo";
  design?: 'ticket' | 'pop';
  designLabel?: string;
  title: string;
  eyebrow: string;
  name: string;
  age?: number;
  photo: string;
  date: string;
  time: string;
  venue: string;
  mapUrl: string;
  phone: string;
  message: string;
}

function fromEvent(source: EventData) {
  const venue = source.location.reception ?? source.location.church ?? source.location.place ?? "";
  return {
    name: source.event.name,
    age: source.event.age,
    photo: source.media.coverImage,
    date: source.event.date,
    time: source.event.partyHour,
    venue,
    mapUrl: source.location.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue)}`,
    phone: source.contact.phone.replace(/\D/g, ""),
  };
}

// Datos independientes de presentación: personaliza aquí cada muestra Flash.
// La edad se omite cuando el evento original no la proporciona.
export const flashEvents: Record<string, FlashEvent> = {
  cumple: {
    ...fromEvent(jose),
    age: 5, // Edad de ejemplo autorizada para esta muestra.
    theme: "cumple",
    title: "Mi cumpleaños",
    eyebrow: "UN DÍA PARA HACER RECUERDOS",
    message: "Una vuelta más al sol. ¡Ven a celebrar conmigo!",
  },
  graduacion: {
    ...fromEvent(karina),
    theme: "graduacion",
    title: "Mi graduación",
    eyebrow: "LO SOÑÉ. LO LOGRÉ. LO CELEBRAMOS.",
    message: "El final de una etapa, el comienzo de mil sueños.",
  },
  bautizo: {
    ...fromEvent(camila),
    theme: "bautizo",
    title: "Mi bautizo",
    eyebrow: "UN PEQUEÑO MILAGRO, UN GRAN AMOR",
    message: "Mis papás y yo te esperamos con mucho amor.",
  },
};

flashEvents["cumple-ticket"] = {
  ...flashEvents.cumple,
  design: "ticket",
  designLabel: "Boleto de fiesta",
  eyebrow: "ADMISIÓN ESPECIAL · UNA GRAN CELEBRACIÓN",
  message: "Este boleto es para ti. ¡La fiesta empieza contigo!",
};
flashEvents["cumple-pop"] = {
  ...flashEvents.cumple,
  design: "pop",
  designLabel: "Fiesta Pop",
  eyebrow: "PASTEL, RISAS Y MUCHÍSIMA DIVERSIÓN",
  message: "¡Hoy se vale jugar, bailar y pedir otro pedazo de pastel!",
};
export function getFlashEvent(theme: string) {
  return Object.prototype.hasOwnProperty.call(flashEvents, theme) ? flashEvents[theme] : undefined;
}
