import type { EventData } from "@/app/types/EventData";

// Muestra: datos ficticios y fotografías reutilizadas del catálogo.
// Agrega el WhatsApp del anfitrión en contact.phone para activar el envío.
const invitation: EventData = {
  tipo: "primeracomunion",
  plan: "basic",
  seo: {
    title: "Primera Comunión · Espiga · Lucía",
    description:
      "Con alegría en mi corazón, recibiré a Jesús por primera vez. Me encantará compartir este día contigo.",
    image: "/pictures/firstcommunion/lucia/lucia-1.jpg",
  },
  event: {
    name: "Lucía",
    date: "29 Mayo 2027",
    ceremonyHour: "11:00 AM",
    partyHour: "1:30 PM",
    dressCode: "Formal",
    phrase:
      "Con alegría en mi corazón, recibiré a Jesús por primera vez. Me encantará compartir este día contigo.",
  },
  media: {
    coverImage: "/pictures/firstcommunion/lucia/lucia-1.jpg",
    gallery: [
      "/pictures/firstcommunion/lucia/lucia-1.jpg",
      "/pictures/firstcommunion/lucia/lucia-2.jpg",
      "/pictures/firstcommunion/lucia/lucia-3.jpg",
      "/pictures/firstcommunion/lucia/lucia-4.jpg",
    ],
  },
  location: {
    church: "Parroquia de San José",
    reception: "Salón Quinta Karen",
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
  },
  contact: {
    phone: "",
  },
  family: {
    parents: {
      mother: "Elena Mendoza",
      father: "Javier Ramírez",
    },
    godparents: {
      woman: "Isabel Moreno",
      man: "Carlos Vega",
    },
  },
  design: {
    variant: "basic",
    colors: {
      primary: "#826534",
      background: "#faf5e9",
    },
  },
};

export default invitation;
