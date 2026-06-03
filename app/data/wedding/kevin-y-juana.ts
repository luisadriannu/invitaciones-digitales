import type { EventData } from "@/app/types/EventData";

const kevinyjuana: EventData = {
  tipo: "boda",
  suscription: "classic",
  seo: {
    title: "Boda de Kevin y Juana",
    description: "Estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
  },
  event: {
    name: "Kevin Mariano y Juana Reynoso",
    date: "07 Junio 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
    gallery: [
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-2.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-3.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-4.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
    church: "Catedral San Juan Bautista",
    reception: "Salón Quinta Karen",
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

export default kevinyjuana;
