import type { EventData } from "@/app/types/EventData";

const nataliaDaliz: EventData = {
  tipo: "cumple",
  plan: "basic",
  seo: {
    title: "Mis 20 años · Natalia Dalíz",
    description:
      "Acompáñame a celebrar mis 20 años en una tarde de verano, agua y baile.",
    image: "/pictures/birthday/natalia-daliz/tropical-disco-frame.png",
    imageWidth: 940,
    imageHeight: 1672,
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Natalia Dalíz",
    age: 20,
    date: "1 Noviembre 2026",
    partyHour: "1:00 PM",
    dressCode: "Traje de baño",
    dressCodeNote: "Lleva tu traje de baño y ganas de bailar.",
    phrase: "Lleva tu traje de baño y ganas de bailar.",
  },
  media: {
    coverImage: "/pictures/birthday/natalia-daliz/tropical-disco-frame.png",
    gallery: [],
    music: "/music/be-with-you.mp3",
  },
  location: {
    reception: "Jardín Las Flores",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d796.1154683919838!2d-100.67000113873648!3d18.347981628572548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332dcf8360cbf1%3A0xf285ffb66d988d2d!2sJard%C3%ADn%20Fiesta%20Real!5e0!3m2!1ses-419!2smx!4v1792171833713!5m2!1ses-419!2smx",
  },
  contact: {
    phone: "",
  },
  design: {
    variant: "summerSea",
    colors: {
      primary: "#e62d70",
      secondary: "#ffbf83",
      accent: "#ff7a2f",
      background: "#fff8f1",
    },
  },
};

export default nataliaDaliz;
