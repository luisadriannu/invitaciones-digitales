import type { EventData } from "@/app/types/EventData";

const vicente: EventData = {
  tipo: "cumple",
  plan: "premium",
  seo: {
    title: "🦖 Cumpleaños de Vicente Sebastian",
    description:
      "¡Prepárate para la aventura! Te invito a celebrar mi cumpleaños con temática de dinosaurios tipo Jurassic Park.",
    image: "/pictures/birthday/vicente/vicente-1.jpg",
  },
  event: {
    name: "Vicente Sebastian Martinez Rivas",
    date: "3 Octubre 2026",
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
    coverImage: "/pictures/birthday/vicente/vicente-1.jpg",
    gallery: [
      "/pictures/birthday/vicente/vicente-1.jpg",
      "/pictures/birthday/vicente/vicente-2.jpg",
      "/pictures/birthday/vicente/vicente-3.jpg",
      "/pictures/birthday/vicente/vicente-4.jpg",
      "/pictures/birthday/vicente/vicente-5.jpg",
      "/pictures/birthday/vicente/vicente-6.jpg",
      "/pictures/birthday/vicente/vicente-7.jpg",
      "/pictures/birthday/vicente/vicente-8.jpg",
    ],
  },
  location: {
    mapUrl: "",
    reception: "Salón Event Family · Cabo San Lucas",
    place: "Cabo San Lucas",
  },
  contact: {
    phone: "522223052024",
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

export default vicente;
