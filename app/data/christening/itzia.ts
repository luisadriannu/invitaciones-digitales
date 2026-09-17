import type { EventData } from "@/app/types/EventData";

const itzia: EventData = {
  tipo: "bautizo",
  plan: "premium",
  seo: {
    title: "🎀 Bautizo y Presentación de Itzia Sarai",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo el bautizo y presentación de nuestra pequeña.",
    image: "/pictures/christening/itzia/seo-itzia-v2.jpg",
    imageWidth: 800,
    imageHeight: 1200,
  },
  event: {
    name: "Itzia Sarai Palacios Mondragon",
    date: "10 Octubre 2026",
    ceremonyHour: "9:00 AM",
    partyHour: "5:00 PM",
    dressCode: "Sin código de vestimenta",
    dressCodeNote: "Sin código de vestimenta",
    specialMusic: "Mi Cenicienta — Voz de Mando",
  },
  media: {
    coverImage: "/pictures/christening/itzia/itzia-10.jpg",
    gallery: [
      "/pictures/christening/itzia/itzia-3.jpg",
      "/pictures/christening/itzia/itzia-4.jpg",
      "/pictures/christening/itzia/itzia-5.jpg",
      "/pictures/christening/itzia/itzia-6.jpg",
      "/pictures/christening/itzia/itzia-7.jpg",
      "/pictures/christening/itzia/itzia-8.jpg",
      "/pictures/christening/itzia/itzia-9.jpg",
      "/pictures/christening/itzia/itzia-10.jpg",
    ],
    music: "/music/eres-mi-cenicienta-voz-de-mando.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7573.152490781959!2d-100.6706350955756!3d18.366606863440325!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332c4dd4dbc2f1%3A0xa5a50a368e9b3e74!2s%22QUINTA%20KAREN%22!5e0!3m2!1ses-419!2smx!4v1789578358355!5m2!1ses-419!2smx",
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
