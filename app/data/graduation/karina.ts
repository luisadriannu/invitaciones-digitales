import type { EventData } from "@/app/types/EventData";

// Horarios y lugares de ejemplo para diferenciar esta muestra.

const alan: EventData = {
  tipo: "graduacion",
  suscription: "premiun",
  seo: {
    title: "Graduación de Karina🎓",
    description:
      "Después de tantos retos y aprendizajes, llegó el momento de celebrar mi graduación contigo. 🎓",
    image: "/pictures/graduation/karina/graduation-1.jpg",
  },
  event: {
    name: "Karina Garcia",
    date: "17 Agosto 2027",
    partyHour: "3:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/graduation/karina/graduation-1.jpg",
    gallery: [
      "/pictures/graduation/karina/graduation-1.jpg",
      "/pictures/graduation/karina/graduation-2.jpg",
      "/pictures/graduation/karina/graduation-3.jpg",
    ],
  },
  location: {
    mapUrl: "",
    event: "CBTA No. 18",
    reception: "Terraza Mirador del Sol · Acapulco",
  },
  contact: {
    phone: "5223123232",
  },
  design: {
    variant: "base",
    colors: {
      primary: "#d4af37",
      secondary: "#f8f4e8",
    },
  },
};

export default alan;
