import type { EventData } from "@/app/types/EventData";

// Muestra pública Premium: datos ficticios y sin fotografías personales.
const santiagoFutbol: EventData = {
  tipo: "cumple",
  plan: "premium",
  seo: {
    title: "Santiago cumple 3 · Fiesta de fútbol",
    description: "Una muestra de invitación Premium para una celebración infantil con temática de fútbol.",
    image: "/pictures/birthday/santiago-futbol/football.svg",
    imageWidth: 600,
    imageHeight: 520,
  },
  event: {
    name: "Santiago",
    age: 3,
    date: "18 Septiembre 2027",
    partyHour: "4:00 PM",
    timeZone: "America/Mexico_City",
    phrase: "¡Tres años de sonrisas, aventuras y grandes goles! Estoy listo para celebrar con mi equipo favorito: mi familia y tú. Ven a jugar, reír y compartir esta tarde conmigo.",
    dressCode: "",
  },
  media: {
    coverImage: "/pictures/birthday/santiago-futbol/football.svg",
    gallery: [],
  },
  location: {
    place: "Jardín Los Girasoles · Salón principal",
    receptionMapUrl: "https://www.google.com/maps?q=19.432608,-99.133209&z=15",
    mapUrl: "https://www.google.com/maps?q=19.432608,-99.133209&z=15&output=embed",
  },
  contact: { phone: "520000000000" },
  family: {
    parents: { mother: "Daniela Ruiz", father: "Mauricio León" },
  },
  design: {
    variant: "football",
    colors: {
      primary: "#175c3b",
      secondary: "#fffdf3",
      accent: "#d4ec87",
      background: "#f6f5eb",
    },
  },
};

export default santiagoFutbol;
