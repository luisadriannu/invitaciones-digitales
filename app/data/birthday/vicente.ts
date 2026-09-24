import type { EventData } from "@/app/types/EventData";

const vicente: EventData = {
  tipo: "cumple",
  plan: "premium",
  seo: {
    title: "🦖 Cumpleaños de Vicente Sebastian",
    description:
      "¡Prepárate para la aventura! Te invito a celebrar mi cumpleaños con temática de dinosaurios tipo Jurassic Park.",
    image: "/pictures/birthday/vicente/seo-vicente-v2.jpg",
    imageWidth: 1200,
    imageHeight: 800,
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
    favorites: {
      title: "¡A Sebastián le encanta!",
      toys: [
        "Dinosaurios",
        "Superhéroes",
        "PAW Patrol",
        "Carritos y excavadoras",
      ],
      activities: ["Leer", "Cantar y bailar", "Ir a la playa"],
      clothingSize: "5–6",
      clothingNote: "¡Es un dino bebé gigante!",
      shoeSize: "16",
    },
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
        title: "Piñata y mañanitas",
        description: "Hora de romper la piñata y cantar las mañanitas.",
      },
      {
        hour: "8:00 PM",
        title: "Cena",
        description: "¡Hora de cenar!",
      },
      {
        hour: "9:00 PM",
        title: "Fiesta y baile",
        description: "¡A mover los pies y bailar toda la noche!",
      },
    ],
  },
  media: {
    coverImage: "/pictures/birthday/vicente/vicente-1.jpeg",
    portraitImage: "/pictures/birthday/vicente/vicente-1.jpeg",
    gallery: [
      "/pictures/birthday/vicente/vicente-1.jpeg",
      "/pictures/birthday/vicente/vicente-2.jpeg",
      "/pictures/birthday/vicente/vicente-3.jpeg",
      "/pictures/birthday/vicente/vicente-4.jpeg",
      "/pictures/birthday/vicente/vicente-5.jpeg",
      "/pictures/birthday/vicente/vicente-6.jpeg",
      "/pictures/birthday/vicente/vicente-7.jpeg",
      "/pictures/birthday/vicente/vicente-8.jpeg",
    ],
    music: "/music/jurassic-park-music.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1092.7158007609737!2d-109.94117007940102!3d22.897018233162587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDUzJzUwLjYiTiAxMDnCsDU2JzI1LjgiVw!5e0!3m2!1ses-419!2smx!4v1790260998356!5m2!1ses-419!2smx",
    reception: "Salón Event Family · Cabo San Lucas",
    place: "Cabo San Lucas",
  },
  contact: {
    phone: "522223052024",
  },
  family: {
    presentationGodparents: ["Angelica Lara Lara", "Javier Velasco Gapi"],
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
