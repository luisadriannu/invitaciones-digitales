import type { EventData } from "@/app/types/EventData";

const carlosYYazmin: EventData = {
  tipo: "boda",
  plan: "premium",
  seo: {
    title: "Boda civil de Carlos & Yazmin",
    description:
      "Carlos y Yazmin unirán sus vidas el 30 de enero de 2027. Acompáñalos a celebrar su historia de amor.",
    image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-3.jpg",
  },
  event: {
    name: "Carlos Cesar Villa Venegas & Yazmin Perez Brito",
    date: "30 Enero 2027",
    startsAt: "7:00 PM",
    ceremonyHour: "7:00 PM",
    partyHour: "7:00 PM",
    phrase:
      "Con la bendición de Dios y el amor de nuestras familias, uniremos nuestras vidas para siempre. Queremos que seas parte de nuestra historia de amor. Te esperamos.",
    dressCode: "",
    itinerary: [
      { hour: "7:00 PM – 8:00 PM", title: "Boda civil" },
      { hour: "8:00 PM – 8:30 PM", title: "Cóctel de bienvenida" },
      { hour: "8:30 PM – 9:30 PM", title: "Protocolo" },
      { hour: "9:30 PM – 10:30 PM", title: "Cena" },
      { hour: "10:30 PM", title: "Partida del pastel" },
      { hour: "10:40 PM", title: "Fiesta" },
      {
        hour: "1:00 AM",
        title: "Fin de la celebración",
        description: "Gracias por su presencia",
      },
    ],
  },
  media: {
    coverImage: "/pictures/wedding/kevin-y-juana/kevin-y-juana-3.jpg",
    gallery: [
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-2.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-4.jpg",
    ],
  },
  location: {
    event: "Boda civil y recepción",
    reception: "Salón El Centro · Ajuchitlán del Progreso",
  },
  contact: {
    phone: "",
  },
  family: {
    groomParents: {
      father: "Carlos Cesar Villa Pineda",
      mother: "Adela Venegas Mendoza",
    },
    brideParents: {
      father: "J. Trinidad Perez Vergara",
      mother: "Magnolia Brito Gómez",
    },
  },
  design: {
    variant: "oliveVintage",
    colors: {
      primary: "#596146",
      secondary: "#E8DDC7",
      accent: "#B08D46",
      background: "#F4EDDF",
    },
  },
};

export default carlosYYazmin;
