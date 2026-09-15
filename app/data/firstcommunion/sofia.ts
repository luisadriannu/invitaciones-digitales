import type { EventData } from "@/app/types/EventData";

// Horarios y lugares de ejemplo para diferenciar esta muestra.

const sofia: EventData = {
  tipo: "primeracomunion",
  plan: "premium",
  seo: {
    title: "Mi primera comunion",
    description:
      "Con mucha ilusión recibiré mi primera comunión. Acompáñame en este día de fe y alegría.",
    image: "/pictures/firstcommunion/sofia/sofia-1.jpg",
  },
  event: {
    name: "Sofia Rodriguez",
    date: "21 Diciembre 2026",
    ceremonyHour: "12:00 PM",
    partyHour: "1:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/firstcommunion/sofia/sofia-1.jpg",
    gallery: [
      "/pictures/firstcommunion/sofia/sofia-1.jpg",
      "/pictures/firstcommunion/sofia/sofia-2.jpg",
      "/pictures/firstcommunion/sofia/sofia-3.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "",
    church: "Parroquia de Santa Clara",
    reception: "Jardín Los Naranjos · Oaxaca",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "Rebeca Alvarado Vela",
      father: "Luis Rodriguez Urieta",
    },
    godparents: {
      man: "Alan Gonzalez Gomez",
      woman: "Ana Mendoza Mendoza",
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

export default sofia;
