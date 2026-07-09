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
    partyHour: "5:00 PM",
    dressCode: "Casual",
    age: 2,
  },
  media: {
    coverImage: "/pictures/birthday/juanDiego/dinosaurios.jpeg",
    gallery: [
      "/pictures/birthday/juanDiego/dinosaurios.jpeg",
      "/pictures/birthday/juanDiego/juan-diego-1.jpeg",
      "/pictures/birthday/juanDiego/juan-diego-2.jpeg",
      "/pictures/birthday/juanDiego/juan-diego-3.jpeg",
    ],
  },
  location: {
    // mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
    reception: "Domicilio conocido",
    place: "Ciudad Altamirano gro.",
  },
  contact: {
    phone: "527671160792",
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
