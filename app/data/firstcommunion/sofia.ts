import type { EventData } from "@/app/types/EventData";

const sofia: EventData = {
  tipo: "primeracomunion",
  suscription: "premiun",
  seo: {
    title: "Mi primera comunion",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/firstcommunion/sofia/sofia-1.jpg",
  },
  event: {
    name: "Sofia Rodriguez",
    date: "21 Diciembre 2026",
    ceremonyHour: "6:00 PM",
    partyHour: "2:30 PM",
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
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3574.111720940047!2d-100.67111340952003!3d18.363724293530588!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332daac2bfd091%3A0x3e6aa83b763e2e73!2sDi%C3%B3cesis%20de%20Ciudad%20Altamirano!5e0!3m2!1ses-419!2smx!4v1780602433128!5m2!1ses-419!2smx",
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

export default sofia;
