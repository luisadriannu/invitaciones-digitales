import type { EventData } from "@/app/types/EventData";

const miguelYAracely: EventData = {
  tipo: "boda",
  plan: "premium",
  seo: {
    title: "Boda de Miguel y Aracely",
    description:
      "Nos casamos. Acompaña a Miguel y Aracely a celebrar el día más importante de sus vidas.",
    image: "/pictures/wedding/miguel-y-aracely/preview-whatsapp.jpg",
    imageWidth: 896,
    imageHeight: 1200,
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Miguel y Aracely",
    date: "28 Noviembre 2026",
    ceremonyHour: "7:30 PM",
    partyHour: "6:00 PM",
    dressCode: "Formal",
    giftMessage:
      "Contar con ustedes en nuestra boda es el mejor regalo. Pero si desean pueden hacernos un obsequio en efectivo.\n\n¡Lluvia de sobres! Habrá un buzón en recepción.",
    itinerary: [
      {
        hour: "6:00 PM",
        title: "Cóctel de Bienvenida",
      },
      {
        hour: "7:30 PM",
        title: "Ceremonia Civil",
        description:
          " Nos gustaría contar con tu presencia en la ceremonia civil a las 7:30 p. m.",
      },
      {
        hour: "8:00 PM",
        title: "Protocolo",
      },
      {
        hour: "9:00 PM",
        title: "Cena",
      },
    ],
  },
  media: {
    coverImage:
      "/pictures/wedding/miguel-y-aracely/boda-miguel-y-aracely-3.png",
    gallery: [
      "/pictures/wedding/miguel-y-aracely/boda-miguel-y-aracely-1.png",
      "/pictures/wedding/miguel-y-aracely/boda-miguel-y-aracely-2.png",
      "/pictures/wedding/miguel-y-aracely/boda-miguel-y-aracely-3.png",
      "/pictures/wedding/miguel-y-aracely/boda-miguel-y-aracely-4.png",
    ],
    music: "/music/joan-sebastian-me-gustas.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.842253020715!2d-100.6605371!3d18.354479699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332de1a6791fdf%3A0x3aba27aa891614a2!2sEl%20Mezquite!5e0!3m2!1ses-419!2smx!4v1792074893155!5m2!1ses-419!2smx",
    reception: "Salón El Mezquite",
  },
  contact: {
    phone: "527671100573",
  },
  family: {
    toastGodparents: [
      "ING. Brenda Nellely Carachure Lino",
      "ING.Byron Raul Sebastian Santana",
    ],
    groomParents: {
      father: "Raymundo Hernández Hernández",
      mother: "Margarita Aurelio Servando",
    },
    brideParents: {
      father: "Edmundo Santana Olea ✞",
      mother: "Ma. Guadalupe Benítez Pérez",
    },
  },
  design: {
    variant: "azure",
    colors: {
      primary: "#0096C7",
      secondary: "#CAF0F8",
      accent: "#0077B6",
      background: "#E0F7FA",
    },
  },
};

export default miguelYAracely;
