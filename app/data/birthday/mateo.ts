import type { EventData } from "@/app/types/EventData";

// Datos de muestra. Agregar el contacto y la ubicación reales antes de compartir.
const mateo: EventData = {
  tipo: "cumple",
  plan: "premium",
  seo: {
    title: "Mateo cumple 5 · Expedición jurásica",
    description:
      "¡Un cumpleaños de tamaño jurásico! Ven a jugar, explorar y celebrar los 5 años de Mateo.",
    image: "/pictures/birthday/mateo/jurassic-expedition.png",
  },
  event: {
    name: "Mateo",
    age: 5,
    date: "14 Diciembre 2026",
    startsAt: "2026-11-14T16:00:00-06:00",
    partyHour: "4:00 PM",
    phrase:
      "El parque abre sus puertas por una razón especial: mis 5 años. Únete a una expedición entre dinosaurios, desafíos y momentos inolvidables.",
    dressCode:
      "Verde militar, arena o negro. Trae tenis y ropa cómoda para recorrer el parque.",
    itinerary: [
      {
        hour: "4:00 PM",
        title: "Apertura de puertas",
        description: "Registro de exploradores y entrega de pases.",
      },
      {
        hour: "4:30 PM",
        title: "Misión en territorio jurásico",
        description: "Sigue las pistas y encuentra los secretos de la reserva.",
      },
      {
        hour: "5:30 PM",
        title: "Abastecimiento en la base",
        description: "Comida deliciosa para recargar nuestra energía.",
      },
      {
        hour: "6:30 PM",
        title: "Celebración en el sector 05",
        description: "Pastel, piñata y un gran rugido de cumpleaños.",
      },
    ],
  },
  media: {
    coverImage: "/pictures/birthday/mateo/jurassic-expedition.png",
    gallery: [],
  },
  location: {
    reception: "Balneario Barysal",
    place: "La Estacion, 40662 Cdad. Altamirano, Gro.",
  },
  contact: { phone: "" },
  family: { parents: { mother: "Lucía", father: "Andrés" } },
  design: {
    variant: "dinoParty",
    colors: {
      primary: "#cfa24e",
      secondary: "#0b110e",
      accent: "#a78c59",
      background: "#0b110e",
    },
  },
};

export default mateo;
