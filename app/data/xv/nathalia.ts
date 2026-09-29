import type { EventData } from "@/app/types/EventData";

const nathalia: EventData = {
  tipo: "xv",
  plan: "premium",
  seo: {
    title: "Los XV de Nathalia · Hacienda los potreros",
    description:
      "Acompáñame a celebrar mis XV años este 17 de octubre de 2026.",
    image: "/pictures/xv/nathalia/nathalia-1.jpeg",
  },
  event: {
    name: "Nathalia",
    age: 15,
    date: "17 Octubre 2026",
    ceremonyHour: "6:00 p. m.",
    partyHour: "9:00 p. m. a 1:30 a. m. del día siguiente",
    dressCode: "No cachuchas",
    phrase:
      "La vida es un camino lleno de luces y mis XV serán una de las estrellas más brillantes. ¡Ven a festejarlo conmigo!",
  },
  media: {
    coverImage: "/pictures/xv/nathalia/nathalia-2.jpeg",
    gallery: [
      "/pictures/xv/nathalia/nathalia-1.jpeg",
      "/pictures/xv/nathalia/nathalia-2.jpeg",
      "/pictures/xv/nathalia/nathalia-3.jpeg",
      "/pictures/xv/nathalia/nathalia-4.jpeg",
    ],
  },
  location: {
    church: "Iglesia de Nuestra Señora de Fátima",
    churchMapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0237004043865!2d-106.09463889999999!3d28.5990658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea5cee8c6afbcb%3A0xaa1f014deb4e485a!2sIglesia%20Nuestra%20Se%C3%B1ora%20de%20F%C3%A1tima!5e0!3m2!1ses-419!2smx!4v1790692305835!5m2!1ses-419!2smx",
    reception: "Hacienda los potreros",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.6760605446448!2d-106.160454!3d28.549454999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea676e4d1b2591%3A0xd4d37c9f34ae7e1a!2sHacienda%20Los%20Potreros!5e0!3m2!1sen!2smx!4v1790691900077!5m2!1sen!2smx",
  },
  family: {
    parents: {
      mother: "Estrellita Castillo Estrada",
      father: "Alfredo Juárez Morales",
    },
  },
  contact: { phone: "19708067400" },
  design: { variant: "western" },
};

export default nathalia;
