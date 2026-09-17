import type { EventData } from "@/app/types/EventData";

// Muestra: datos ficticios y fotografías reutilizadas del catálogo.
// Agrega el WhatsApp del anfitrión en contact.phone para activar el envío.
const invitation: EventData = {
  tipo: "bautizo",
  plan: "basic",
  seo: {
    title: "Bautizo · Cielo azul · Emilia",
    description:
      "Un pequeño corazón, una gran bendición. Acompáñanos en el bautizo de nuestra hija.",
    image: "/pictures/christening/emilia/bautizo-emilia-4.jpg",
  },
  event: {
    name: "Emilia",
    date: "22 Mayo 2027",
    ceremonyHour: "12:00 PM",
    partyHour: "2:00 PM",
    dressCode: "Formal",
    phrase:
      "Un pequeño corazón, una gran bendición. Acompáñanos en el bautizo de nuestra hija.",
  },
  media: {
    coverImage: "/pictures/christening/emilia/bautizo-emilia-1.jpg",
    gallery: [
      "/pictures/christening/emilia/bautizo-emilia-1.jpg",
      "/pictures/christening/emilia/bautizo-emilia-2.jpg",
      "/pictures/christening/emilia/bautizo-emilia-3.jpg",
    ],
  },
  location: {
    church: "Parroquia de Santa María",
    reception: "Salón Quinta Karen",
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
  },
  contact: {
    phone: "",
  },
  family: {
    parents: {
      mother: "Andrea Martínez",
      father: "Daniel Ríos",
    },
    godparents: {
      woman: "Sofía Herrera",
      man: "Miguel Torres",
    },
  },
  design: {
    variant: "basic",
    colors: {
      primary: "#426780",
      background: "#edf4f8",
    },
  },
};

export default invitation;
