import type { EventData } from "@/app/types/EventData";

// Datos ficticios de muestra; fotografías ilustrativas.

const kevinyjuanalight: EventData = {
  tipo: "boda",
  suscription: "premiun",
  seo: {
    title: "Boda de Clara y Diego",
    description: "Una nueva historia comienza. Acompaña a Clara y Diego a celebrar su boda.",
    image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
  },
  event: {
    name: "Clara Montes y Diego Salazar",
    date: "15 Mayo 2027",
    ceremonyHour: "5:00 PM",
    partyHour: "6:30 PM",
    dressCode: "Formal",
    itinerary: [
      {
        hour: "5:00 PM",
        title: "Ceremonia Religiosa",
        description: "Capilla Los Olivos",
      },
      {
        hour: "6:30 PM",
        title: "Recepción",
        description: "Bienvenida a invitados",
      },
      {
        hour: "7:30 PM",
        title: "Cena",
        description: "Servicio de alimentos",
      },
      {
        hour: "9:00 PM",
        title: "Primer Baile",
      },
      {
        hour: "10:00 PM",
        title: "Fiesta",
        description: "¡A celebrar toda la noche!",
      },
    ],
  },
  media: {
    coverImage: "/pictures/wedding/kevin-y-juana/kevin-y-juana-8.jpg",
    gallery: [
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-4.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-5.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-6.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-7.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-8.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl: "",
    church: "Capilla Los Olivos",
    reception: "Hacienda Las Bugambilias · Cuernavaca",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "Mariana Montes Herrera",
      father: "Alberto Salazar Luna",
    },
    godparents: {
      man: "Gabriel Ortega",
      woman: "Isabel Fuentes",
    },
  },
  design: {
    variant: "light",
    colors: {
      primary: "#b8860b",
      secondary: "#fdf9f4",
      accent: "#b85c7a",
      background: "#f6eee2",
    },
  },
};

export default kevinyjuanalight;
