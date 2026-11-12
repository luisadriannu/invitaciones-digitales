import type { EventData } from "@/app/types/EventData";

const alexaMarbella: EventData = {
  tipo: "xv",
  plan: "premium",
  seo: {
    title: "Alexa Marbella · Mis XV años",
    description:
      "Con la bendición de Dios y el amor de mi familia, acompáñame a celebrar mis XV años.",
    image: "/pictures/xv/alexa-marbella/princess-golden-frame.jpeg",
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Alexa Marbella Luviano",
    age: 15,
    date: "18 Diciembre 2026",
    ceremonyHour: "6:00 PM",
    partyHour: "7:00 PM",
    phrase:
      "Con la bendición de Dios y en compañía de mis padres, me siento muy feliz de llegar a esta etapa de mi vida. Ahora empieza un camino que conduce a un mundo de sueños e ilusiones que, con mucha fe, humildad y esperanza, deseo cumplir.",
    dressCode: "Formal",
    dressCodeNote: "Evitar el color verde, reservado para la quinceañera.",
    giftMessage:
      "Tu presencia es mi mejor regalo, pero si deseas hacerme un obsequio, agradezco tu apoyo en efectivo.",
    itinerary: [
      {
        hour: "6:00 PM",
        title: "Ceremonia religiosa",
        description: "Parroquia San Pedro y San Pablo.",
      },
      {
        hour: "7:00 PM",
        title: "Recepción",
        description: "Vals, cena y fiesta en Salón Contreras.",
      },
    ],
  },
  media: {
    coverImage: "/pictures/xv/alexa-marbella/princess-silhouette.jpeg",
    portraitImage: "/pictures/xv/alexa-marbella/princess-tiana.jpeg",
    gallery: [
      "/pictures/xv/alexa-marbella/princess-forest-frog.jpeg",
      "/pictures/xv/alexa-marbella/princess-butterflies.jpeg",
      "/pictures/xv/alexa-marbella/princess-botanical.jpeg",
      "/pictures/xv/alexa-marbella/princess-golden-frame.jpeg",
      "/pictures/xv/alexa-marbella/princess-sparkle.jpeg",
      "/pictures/xv/alexa-marbella/princess-silhouette.jpeg",
      "/pictures/xv/alexa-marbella/princess-tiana.jpeg",
      "/pictures/xv/alexa-marbella/enchanted-frog.jpeg",
    ],
    music: "/music/mi-belle-evangeline.mp3",
  },
  location: {
    church: "Parroquia San Pedro y San Pablo",
    event: "Riva Palacio, Michoacán",
    churchMapUrl:
      "https://www.google.com/maps?q=Parroquia+San+Pedro+y+San+Pablo+Riva+Palacio+Michoacan&output=embed",
    reception: "Salón Contreras",
    place: "Ciudad Altamirano, Guerrero",
    receptionMapUrl:
      "https://www.google.com/maps?q=Salon+Contreras+Ciudad+Altamirano+Guerrero&output=embed",
    mapUrl:
      "https://www.google.com/maps?q=Salon+Contreras+Ciudad+Altamirano+Guerrero&output=embed",
  },
  contact: {
    phone: "527671106184",
  },
  family: {
    parents: {
      mother: "Nalleli Jiménez Luviano",
      father: "Ariel Said Luviano Aguirre",
    },
    godparents: {
      man: "Luis David Campuzano",
      woman: "Itzayani Hernández Toledo",
    },
  },
  design: {
    variant: "enchantedPrincess",
    backgroundImage:
      "/pictures/xv/alexa-marbella/princess-golden-frame.jpeg",
    colors: {
      primary: "#315f3b",
      secondary: "#dce8b8",
      accent: "#d8b75f",
      background: "#fbf8ea",
    },
  },
};

export default alexaMarbella;
