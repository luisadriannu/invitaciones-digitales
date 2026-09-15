import type { EventData } from "@/app/types/EventData";

// Horarios y lugares de ejemplo para diferenciar esta muestra.

const victoria: EventData = {
  tipo: "cumple",
  plan: "basic",
  seo: {
    title: "Cumpleaños de Victoria",
    description: "Te invito a celebrar este día tan especial conmigo.😁",
    image: "/pictures/birthday/victoria/victoria-4.jpg",
  },
  event: {
    name: "Victoria",
    date: "28 Noviembre 2026",
    // ceremonyHour: "11:00 AM",
    partyHour: "4:30 PM",
    dressCode: "Casual",
  },
  media: {
    coverImage: "/pictures/birthday/victoria/victoria-4.jpg",
    gallery: [
      "/pictures/birthday/victoria/victoria-1.jpg",
      "/pictures/birthday/victoria/victoria-2.jpg",
      "/pictures/birthday/victoria/victoria-3.jpg",
      "/pictures/birthday/victoria/victoria-4.jpg",
    ],
  },
  location: {
    mapUrl: "",
    // church: "Catedral San Juan Bautista",
    reception: "Terraza Dulce Jardín · Pachuca",
  },
  contact: {
    phone: "5266337283",
  },

  design: {
    variant: "pastel",
    colors: {
      primary: "#ff7e79",
      secondary: "#fff9f0",
      accent: "#7fd4c1",
      background: "#fff9f0",
    },
  },
};

export default victoria;
