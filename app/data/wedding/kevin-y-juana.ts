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
    itinerary: [
      {
        hour: "5:00 PM",
        title: "Ceremonia Religiosa",
        description: "Catedral San Juan Bautista",
      },
      {
        hour: "6:30 PM",
        title: "Recepción",
        description: "Bienvenida a invitados",
      },
      {
        hour: "7:30 PM",
        title: "Cena",
        description: "Servicio de alimentos",
      },
      {
        hour: "9:00 PM",
        title: "Primer Baile",
      },
      {
        hour: "10:00 PM",
        title: "Fiesta",
        description: "¡A celebrar toda la noche!",
      },
    ],
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
