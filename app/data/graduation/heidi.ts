import type { EventData } from "@/app/types/EventData";

const heidi: EventData = {
  tipo: "graduacion",
  suscription: "premiun",
  seo: {
    title: "Graduación de Heidi Yamileth 🎓",
    description:
      "Te invito a mi graduación, estoy muy contenta de poder compartir este momento tan especial contigo. 🎓",
    image: "/pictures/graduation/heidi/heidi-1.jpeg",
  },
  event: {
    name: "Heidi Yamileth",
    date: "30 Agosto 2026",
    partyHour: "2:30 PM",
    dressCode: "Formal",
    phrase:
      "Gracias a Jehová y a mis padres eh culminado una etapa más en mi vida te invito a que celebremos 🎉",
  },
  media: {
    coverImage: "/pictures/graduation/heidi/heidi-1.jpeg",
    gallery: [
      "/pictures/graduation/heidi/heidi-1.jpeg",
      "/pictures/graduation/heidi/heidi-2.jpeg",
      "/pictures/graduation/heidi/heidi-3.jpeg",
      "/pictures/graduation/heidi/heidi-4.jpeg",
      "/pictures/graduation/heidi/heidi-5.jpeg",
      "/pictures/graduation/heidi/heidi-6.jpeg",
      "/pictures/graduation/heidi/heidi-7.jpeg",
    ],
    music: "/music/love-me-like-you-do-saxophone.mp3",
  },
  location: {
    reception: "Quinta Maya",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10711.34793583233!2d-100.69602657745352!3d18.345761507285264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332dc455373601%3A0xff220e710b3b4582!2sQuinta%20Maya!5e0!3m2!1ses-419!2smx!4v1784664958977!5m2!1ses-419!2smx",
  },
  contact: {
    phone: "527671201651",
  },
  design: {
    variant: "elegant",
    colors: {
      primary: "#9b6b7a",
      secondary: "#fdf5f0",
      accent: "#6b2d3e",
    },
  },
};

export default heidi;
