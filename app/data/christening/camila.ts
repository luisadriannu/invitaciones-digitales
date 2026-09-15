import type { EventData } from "@/app/types/EventData";

// Horarios y lugares de ejemplo para diferenciar esta muestra.

const camila: EventData = {
  tipo: "bautizo",
  suscription: "premiun",
  seo: {
    title: "🎀 Bautizo de Camila",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/christening/camila/camila-1.jpg",
  },
  event: {
    name: "Camila Rivera Vega",
    date: "07 Diciembre 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "1:00 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/christening/camila/camila-4.jpg",
    gallery: [
      "/pictures/christening/camila/camila-1.jpg",
      "/pictures/christening/camila/camila-2.jpg",
      "/pictures/christening/camila/camila-3.jpg",
      "/pictures/christening/camila/camila-4.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "",
    church: "Parroquia de los Ángeles",
    reception: "Jardín Las Camelias · Puebla",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "C.P Maria Vicenta",
      father: "Doc. Felipe De Jesús",
    },
    godparents: {
      man: "Lic. Juan Alberto Peréz",
      woman: "Mtra. Mariana Vega",
    },
  },
  design: {
    variant: "base",
    colors: {
      primary: "#d4af37",
      secondary: "#f8f4e8",
    },
  },
};

export default camila;
