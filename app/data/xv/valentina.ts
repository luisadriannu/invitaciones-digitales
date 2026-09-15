import type { EventData } from "@/app/types/EventData";

// Horarios y lugares de ejemplo para diferenciar esta muestra.

const camila: EventData = {
  tipo: "xv",
  plan: "premium",
  seo: {
    title: "🎀 XV de Valentina",
    description:
      "Quince años de sueños y una noche para brillar. ¡Celebra conmigo!",
    image: "/pictures/xv/valentina/xv-1.jpeg",
  },
  event: {
    name: "Maria Valentina",
    date: "16 Agosto 2027",
    ceremonyHour: "5:00 PM",
    partyHour: "7:00 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/xv/valentina/xv-1.jpeg",
    gallery: [
      "/pictures/xv/valentina/xv-1.jpeg",
      "/pictures/xv/valentina/xv-2.jpeg",
      "/pictures/xv/valentina/xv-3.jpeg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "",
    church: "Capilla del Rosario",
    reception: "Salón Cielo de Cristal · Morelia",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "Mtra. Maria Mercedes Juarez",
      father: "Doc. Adrian Velvet Mendoza",
    },
    godparents: {
      man: "Lic. Juan Aurelio Pérez",
      woman: "Mtra. Antonia Lucide Rena",
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
