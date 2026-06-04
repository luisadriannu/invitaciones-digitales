import type { EventData } from "@/app/types/EventData";

const camila: EventData = {
  tipo: "xv",
  suscription: "premiun",
  seo: {
    title: "🎀 XV de Valentina",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/xv/valentina/xv-1.jpeg",
  },
  event: {
    name: "Maria Valentina",
    date: "16 Agosto 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
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
