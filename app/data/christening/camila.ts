import type { EventData } from "@/app/types/EventData";

const camila: EventData = {
  tipo: "bautizo",
  suscription: "premiun",
  seo: {
    title: "🎀 Bautizo de Camila",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/christening/camila/camila-1.jpg",
  },
  event: {
    name: "Camila Rivera Vega",
    date: "07 Diciembre 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/christening/camila/camila-4.jpg",
    gallery: [
      "/pictures/christening/camila/camila-1.jpg",
      "/pictures/christening/camila/camila-2.jpg",
      "/pictures/christening/camila/camila-3.jpg",
      "/pictures/christening/camila/camila-4.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3472.6923662318954!2d-100.67883969509384!3d18.347381216724678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332da6fe403ecb%3A0x8755ab0e6aaa4441!2s%22Quinta%20Andrea%22%20Jardin%20de%20eventos%20sociales!5e0!3m2!1ses-419!2smx!4v1780586835113!5m2!1ses-419!2smx",
    church: "Catedral San Juan Bautista",
    reception: "Salón Quinta Karen",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "C.P Maria Vicenta",
      father: "Doc. Felipe De Jesús",
    },
    godparents: {
      man: "Lic. Juan Alberto Peréz",
      woman: "Mtra. Mariana Vega",
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
