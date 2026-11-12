import type { EventData } from "@/app/types/EventData";

// Muestra premium con datos ficticios. Las fotografías se reutilizan para no
// duplicar archivos; pueden sustituirse después sin cambiar la plantilla.
const renataSofia: EventData = {
  tipo: "bautizo",
  plan: "premium",
  seo: {
    title: "Bautizo de Renata Sofía · Cielo de lavanda",
    description:
      "Con la bendición de Dios, acompáñanos a celebrar el bautizo de Renata Sofía.",
    image: "/pictures/christening/renata/bautizo-1.jpg",
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Renata Sofía",
    date: "20 Junio 2027",
    ceremonyHour: "12:00 PM",
    partyHour: "2:00 PM",
    dressCode: "Formal en tonos claros",
    phrase:
      "Hoy recibo la luz de Dios en mi corazón y quiero compartir esta bendición contigo.",
    giftMessage: "Tu presencia es nuestro mejor regalo.",
    itinerary: [
      {
        hour: "12:00 PM",
        title: "La ceremonia",
        description: "Recibiremos juntos la bendición del bautismo.",
      },
      {
        hour: "1:30 PM",
        title: "La bienvenida",
        description: "Nos reuniremos para compartir y celebrar.",
      },
      {
        hour: "2:00 PM",
        title: "La comida",
        description: "Un momento especial preparado con mucho cariño.",
      },
      {
        hour: "4:00 PM",
        title: "Dulces recuerdos",
        description: "Pastel, fotografías y sorpresas para todos.",
      },
    ],
  },
  media: {
    coverImage: "/pictures/christening/renata/bautizo-1.jpg",
    gallery: [
      "/pictures/christening/renata/bautizo-1.jpg",
      "/pictures/christening/renata/bautizo-2.jpg",
      "/pictures/christening/renata/bautizo-3.jpg",
      "/pictures/christening/renata/bautizo-4.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    church: "Parroquia de Nuestra Señora de la Luz",
    reception: "Jardín Los Olivos",
    mapUrl:
      "https://www.google.com/maps?q=Parroquia+de+Nuestra+Se%C3%B1ora+de+la+Luz+Mexico&output=embed",
  },
  contact: {
    phone: "522206283499",
    confirmationDeadline: "10 Junio 2027",
  },
  family: {
    parents: {
      mother: "Mariana Torres",
      father: "Alejandro Flores",
    },
    godparents: {
      woman: "Daniela Herrera",
      man: "Sebastián Ruiz",
    },
  },
  design: {
    variant: "celestial",
    colors: {
      primary: "#6f8fa7",
      secondary: "#e8f1f5",
      accent: "#9690bf",
      background: "#f9fbfc",
    },
  },
};

export default renataSofia;
