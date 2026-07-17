import type { EventData } from "@/app/types/EventData";

const itzia: EventData = {
  tipo: "bautizo",
  suscription: "premiun",
  seo: {
    title: "🎀 Bautizo de Itzia Sarai",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/christening/itzia/itzia-1.jpeg",
  },
  event: {
    name: "Itzia Sarai Palacios Mondragon",
    date: "17 Octubre 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/christening/itzia/itzia-4.jpg",
    gallery: [
      "/pictures/christening/itzia/itzia-1.jpeg",
      "/pictures/christening/itzia/itzia-2.jpeg",
    ],
    // music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "",
    church: "Nombre de la Iglesia",
    reception: "Salón de Eventos",
  },
  contact: {
    phone: "529516535688",
  },
  family: {
    parents: {
      mother: "Madre",
      father: "Padre",
    },
    godparents: {
      man: "Padrino",
      woman: "Madrina",
    },
  },
  design: {
    variant: "personalized",
    colors: {
      primary: "#c9a0dc",
      secondary: "#e8c4e0",
    },
  },
};

export default itzia;
