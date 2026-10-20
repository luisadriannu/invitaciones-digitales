import type { EventData } from "@/app/types/EventData";

const nataliaDaliz: EventData = {
  tipo: "cumple",
  plan: "basic",
  seo: {
    title: "Mis 20 años · Natalia Dalíz",
    description:
      "Acompáñame a celebrar mis 20 años en una tarde de verano, agua y baile.",
    image: "/pictures/birthday/natalia-daliz/tropical-disco-frame.webp",
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
    coverImage: "/pictures/birthday/natalia-daliz/tropical-disco-frame.webp",
    gallery: [],
    music: "/music/be-with-you.mp3",
  },
  location: {
    reception: "Jardín Las Flores",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d613.8884953229225!2d-100.6694279271988!3d18.348105118383913!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2smx!4v1792173587920!5m2!1ses-419!2smx",
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
