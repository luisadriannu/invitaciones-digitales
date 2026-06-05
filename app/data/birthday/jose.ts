import type { EventData } from "@/app/types/EventData";

const jose: EventData = {
  tipo: "cumple",
  suscription: "classic",
  seo: {
    title: "Cumpleaños de José",
    description: "Te invito a celebrar este día tan especial conmigo.😁",
    image: "/pictures/birthday/jose/jose-1.jpg",
  },
  event: {
    name: "José Juarez Rodriguez",
    date: "20 Septiembre 2026",
    // ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
    dressCode: "Casual",
  },
  media: {
    coverImage: "/pictures/birthday/jose/jose-1.jpg",
    gallery: [
      "/pictures/birthday/jose/jose-1.jpg",
      "/pictures/birthday/jose/jose-2.jpg",
      "/pictures/birthday/jose/jose-3.jpg",
    ],
  },
  location: {
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
    // church: "Catedral San Juan Bautista",
    reception: "Salón Quinta Karen",
  },
  contact: {
    phone: "5266337283",
  },

  design: {
    variant: "base",
    colors: {
      primary: "#d4af37",
      secondary: "#f8f4e8",
    },
  },
};

export default jose;
