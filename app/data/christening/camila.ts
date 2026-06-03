import type { EventData } from "@/app/types/EventData";

const camila: EventData = {
  tipo: "bautizo",
  suscription: "classic",
  seo: {
    title: "🎀 Bautizo de Camila",
    description:
      "Mis papás y yo estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/christening/camila/picture1.jpeg",
  },
  event: {
    name: "Camila Vicenta Rivas De Jesús",
    date: "07 Junio 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/christening/camila/picture1.jpeg",
    gallery: [
      "/pictures/christening/camila/picture1.jpeg",
      "/pictures/christening/camila/picture2.jpeg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "https://maps.app.goo.gl/KnuqwoAN5kMtcyqu5",
    church: "Catedral San Juan Bautista",
    reception: "Salón Quinta Karen",
  },
  contact: {
    phone: "527671160973",
  },
  family: {
    parents: {
      mother: "C.P Erika De Jesús Carlos",
      father: "Doc. Vicente Junior Rivas Negrete",
    },
    godparents: {
      man: "Lic. Juan Rivera Mendoza",
      woman: "Mtra. Yaritza Betancourt Higuera",
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
