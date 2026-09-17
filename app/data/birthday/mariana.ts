import type { EventData } from "@/app/types/EventData";

// Muestra: datos ficticios y fotografías reutilizadas del catálogo.
// Agrega el WhatsApp del anfitrión en contact.phone para activar el envío.
const invitation: EventData = {
  tipo: "cumple",
  plan: "basic",
  seo: {
    title: "Cumpleaños · Confeti durazno · Mariana",
    description:
      "Los mejores recuerdos empiezan con las personas que queremos. ¡Celebremos juntos!",
    image: "/pictures/birthday/mariana/mariana-1.jpg",
  },
  event: {
    name: "Mariana",
    age: 9,
    date: "15 Mayo 2027",
    partyHour: "4:00 PM",
    dressCode: "Casual",
    phrase:
      "Los mejores recuerdos empiezan con las personas que queremos. ¡Celebremos juntos!",
  },
  media: {
    coverImage: "/pictures/birthday/mariana/mariana-1.jpg",
    gallery: [
      "/pictures/birthday/mariana/mariana-1.jpg",
      "/pictures/birthday/mariana/mariana-2.jpg",
      "/pictures/birthday/mariana/mariana-3.jpg",
    ],
  },
  location: {
    reception: "Salón Quinta Karen",
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
  },
  contact: {
    phone: "",
  },
  design: {
    variant: "basic",
    colors: {
      primary: "#a44b36",
      background: "#fff2e6",
    },
  },
};

export default invitation;
