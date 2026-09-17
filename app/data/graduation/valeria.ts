import type { EventData } from "@/app/types/EventData";

// Muestra: datos ficticios y fotografías reutilizadas del catálogo.
// Agrega el WhatsApp del anfitrión en contact.phone para activar el envío.
const invitation: EventData = {
  tipo: "graduacion",
  plan: "basic",
  seo: {
    title: "Graduación · Laurel · Valeria",
    description:
      "Cada esfuerzo me trajo hasta aquí. Hoy quiero celebrar este nuevo comienzo contigo.",
    image: "/pictures/graduation/valeria/valeria-1.jpg",
  },
  event: {
    name: "Valeria",
    date: "19 Junio 2027",
    partyHour: "7:00 PM",
    dressCode: "Formal",
    phrase:
      "Cada esfuerzo me trajo hasta aquí. Hoy quiero celebrar este nuevo comienzo contigo.",
  },
  media: {
    coverImage: "/pictures/graduation/valeria/valeria-1.jpg",
    gallery: [
      "/pictures/graduation/valeria/valeria-1.jpg",
      "/pictures/graduation/valeria/valeria-2.jpg",
      "/pictures/graduation/valeria/valeria-3.jpg",
    ],
  },
  location: {
    event: "Generación 2024–2027",
    reception: "Salón Quinta Karen",
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
  },
  contact: {
    phone: "",
  },
  design: {
    variant: "basic",
    colors: {
      primary: "#315c4c",
      background: "#edf1e9",
    },
  },
};

export default invitation;
