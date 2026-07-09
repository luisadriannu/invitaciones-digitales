import type { EventData } from "@/app/types/EventData";

const jose: EventData = {
  tipo: "cumple",
  suscription: "classic",
  seo: {
    title: "Cumpleaños de Juan Diego",
    description: "¡Ven a celebrar conmigo en un mundo de dinosaurios! 🦕",
    image: "/pictures/birthday/juanDiego/dinosaurios.jpeg",
  },
  event: {
    name: "Juan Diego",
    date: "18 Julio 2026",
    partyHour: "2:30 PM",
    dressCode: "Casual",
  },
  media: {
    coverImage: "/pictures/birthday/juanDiego/dinosaurios.jpeg",
    gallery: ["/pictures/birthday/juanDiego/dinosaurios.jpeg"],
  },
  location: {
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
    reception: "Salón Quinta Karen",
  },
  contact: {
    phone: "5266337283",
  },

  design: {
    variant: "dinosaur",
    colors: {
      primary: "#4CAF50",
      secondary: "#E8F5E9",
    },
  },
};

export default jose;
