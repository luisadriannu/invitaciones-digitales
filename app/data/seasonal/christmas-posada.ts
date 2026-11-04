import type { EventData } from "@/app/types/EventData";

const christmasPosada: EventData = {
  tipo: "evento",
  plan: "basic",
  seo: {
    title: "Posada Navideña · Noche de alegría",
    description: "Luces, ponche y una noche para celebrar juntos nuestra tradicional posada.",
    image: "/pictures/seasonal/december-2026/christmas-posada.webp",
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Posada Navideña",
    date: "12 Diciembre 2026",
    partyHour: "6:00 PM",
    phrase: "Entre luces, ponche y villancicos, queremos compartir contigo una noche llena de alegría.",
    dressCode: "Casual navideño",
    dressCodeNote: "Abrígate bien y agrega un detalle rojo, verde o dorado.",
  },
  media: {
    coverImage: "/pictures/seasonal/december-2026/christmas-posada.webp",
    gallery: [],
  },
  location: { place: "Patio de los Faroles" },
  contact: { phone: "" },
  design: {
    variant: "basic",
    colors: { primary: "#8b3028", secondary: "#d59b48", background: "#fff2d9" },
  },
};

export default christmasPosada;
