import type { EventData } from "@/app/types/EventData";

const christmasDinner: EventData = {
  tipo: "evento",
  plan: "basic",
  seo: {
    title: "Cena de Navidad · Familia Robles",
    description: "Una noche para reunirnos, agradecer y celebrar la magia de la Navidad.",
    image: "/pictures/seasonal/december-2026/christmas-dinner.webp",
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Cena de Navidad",
    date: "19 Diciembre 2026",
    partyHour: "7:00 PM",
    phrase: "La mejor parte de la Navidad es compartirla con las personas que hacen especial nuestro hogar.",
    dressCode: "Elegante festivo",
    dressCodeNote: "Puedes llevar detalles en tonos vino, verde bosque o dorado.",
  },
  media: {
    coverImage: "/pictures/seasonal/december-2026/christmas-dinner.webp",
    gallery: [],
  },
  location: { place: "Salón Gran Reserva" },
  contact: { phone: "" },
  design: {
    variant: "basic",
    effect: "snow",
    colors: { primary: "#6f1725", secondary: "#c9a75f", background: "#fbf3e7" },
  },
};

export default christmasDinner;
