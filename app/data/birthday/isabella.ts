import type { EventData } from "@/app/types/EventData";

const isabella: EventData = {
  tipo: "cumple",
  suscription: "classic",
  seo: {
    title: "Cumpleaños de Isabella",
    description: "¡Acompáñame a celebrar mis 3 años bajo el mar! 🧜‍♀️",
    image: "/pictures/birthday/isabella/isabella-1.jpg",
  },
  event: {
    name: "Isabella",
    age: 3,
    date: "22 Agosto 2026",
    partyHour: "4:30 PM",
    dressCode: "Casual",
  },
  media: {
    coverImage: "/pictures/birthday/isabella/la-sirenita-4.jpg",
    gallery: [
      "/pictures/birthday/isabella/la-sirenita.jpeg",
      "/pictures/birthday/isabella/la-sirenita-2.jpg",
      "/pictures/birthday/isabella/la-sirenita-3.jpeg",
      "/pictures/birthday/isabella/la-sirenita-4.jpg",
    ],
    music: "/music/la-sirenita.mp3",
  },
  location: {
    reception: "Quinta Karen",
  },
  contact: {
    phone: "5266337283",
  },

  design: {
    variant: "sirena",
    colors: {
      primary: "#00B4D8",
      secondary: "#FF6B6B",
      accent: "#FFD60A",
      background: "#0A1628",
    },
  },
};

export default isabella;
