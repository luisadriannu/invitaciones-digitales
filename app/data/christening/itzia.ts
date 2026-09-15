import type { EventData } from "@/app/types/EventData";

const itzia: EventData = {
  tipo: "bautizo",
  plan: "premium",
  seo: {
    title: "🎀 Bautizo y Presentación de Itzia Sarai",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo el bautizo y presentación de nuestra pequeña.",
    image: "/pictures/christening/itzia/itzia-1.jpeg",
  },
  event: {
    name: "Itzia Sarai Palacios Mondragon",
    date: "10 Octubre 2026",
    ceremonyHour: "9:00 AM",
    partyHour: "6:00 PM",
    dressCode: "Sin código de vestimenta",
    dressCodeNote: "Sin código de vestimenta",
    specialMusic: "Mi Cenicienta — Voz de Mando",
  },
  media: {
    coverImage: "/pictures/christening/itzia/itzia-4.jpg",
    gallery: [
      "/pictures/christening/itzia/itzia-1.jpeg",
      "/pictures/christening/itzia/itzia-2.jpeg",
    ],
    // music: "/music/mi-cenicienta.mp3",
  },
  location: {
    mapUrl: "",
    church: "Catedral",
    reception: "Salón Kinta Karen",
  },
  contact: {
    phone: "529516535688",
  },
  family: {
    parents: {
      father: "Christopher Martín Palacios Mejía",
      mother: "Itzel Saray Mondragon Narciso",
    },
    godparents: {
      man: "Alejandro Cruz Carbajal",
      woman: "Gypzy Zuleika Mancera Pérez",
    },
  },
  design: {
    variant: "itzia",
    colors: {
      primary: "#c9a0dc",
      secondary: "#e8c4e0",
    },
  },
};

export default itzia;
