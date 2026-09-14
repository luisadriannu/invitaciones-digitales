import type { EventData } from "@/app/types/EventData";

const mateo: EventData = {
  tipo: "cumple",
  suscription: "premiun",
  seo: {
    title: "🦖 Cumpleaños de Mateo Torres",
    description:
      "¡Prepárate para la aventura! Te invito a celebrar mi cumpleaños con temática de dinosaurios tipo Jurassic Park.",
    image: "/pictures/birthday/mateo/mateo-cover.jpg",
  },
  event: {
    name: "Mateo Torres",
    date: "22 Noviembre 2026",
    ceremonyHour: "5:00 PM",
    partyHour: "5:00 PM",
    dressCode: "Verde olivo, naranja y amarillo",
    dressCodeNote:
      "Te sugerimos vestir con los colores de la temática: verde olivo, naranja y amarillo.",
    specialMusic: "Música de Jurassic Park",
    itinerary: [
      {
        hour: "5:00 PM",
        title: "Llegada",
        description: "¡Bienvenidos a la jungla! Llegada y bienvenida.",
      },
      {
        hour: "6:00 PM",
        title: "Juegos y actividades",
        description: "Diversión y aventuras jurásicas.",
      },
      {
        hour: "7:00 PM",
        title: "Pastel",
        description: "Momento de celebrar y soplar las velas.",
      },
      {
        hour: "8:00 PM",
        title: "Cena",
        description: "Compartimos algo delicioso.",
      },
      {
        hour: "9:00 PM",
        title: "Fiesta y baile",
        description: "¡A bailar con la música de toda la noche!",
      },
    ],
  },
  media: {
    coverImage: "/pictures/birthday/mateo/mateo-cover.jpg",
    gallery: [
      "/pictures/birthday/mateo/mateo-1.jpg",
      "/pictures/birthday/mateo/mateo-2.png",
      "/pictures/birthday/mateo/mateo-3.jpg",
    ],
  },
  location: {
    mapUrl: "",
    reception: "Salón Event Family · Cabo San Lucas",
    place: "Cabo San Lucas",
  },
  contact: {
    phone: "522206283499",
  },
  design: {
    variant: "dinosaur",
    colors: {
      primary: "#6b8e23",
      secondary: "#cd5c2b",
      accent: "#d4a017",
      background: "#0b1a12",
    },
  },
};

export default mateo;
