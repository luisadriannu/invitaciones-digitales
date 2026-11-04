import type { EventData } from "@/app/types/EventData";

// Invitación de muestra: datos ficticios y fotografías reutilizadas de Lucía.
const isabella: EventData = {
  tipo: "primeracomunion",
  plan: "premium",
  seo: {
    title: "Primera Comunión de Isabella",
    description:
      "Con alegría en mi corazón recibiré a Jesús por primera vez. Acompáñame a celebrar este día tan especial.",
    image: "/pictures/firstcommunion/isabella/isabella-1.jpg",
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Isabella Martínez",
    date: "18 Abril 2027",
    ceremonyHour: "12:00 PM",
    partyHour: "2:00 PM",
    phrase:
      "Con alegría en mi corazón recibiré a Jesús por primera vez. Quiero compartir contigo este hermoso encuentro de fe y amor.",
    dressCode: "Formal",
    dressCodeNote:
      "Agradecemos evitar el color blanco, reservado para Isabella.",
  },
  media: {
    coverImage: "/pictures/firstcommunion/isabella/isabella-1.jpg",
    gallery: [
      "/pictures/firstcommunion/isabella/isabella-1.jpg",
      "/pictures/firstcommunion/isabella/isabella-2.jpg",
      "/pictures/firstcommunion/isabella/isabella-3.jpg",
      "/pictures/firstcommunion/isabella/isabella-4.jpg",
      "/pictures/firstcommunion/isabella/isabella-5.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    church: "Diócesis de Ciudad Altamirano",
    reception: "Jardín Los Olivos",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4503.147319954574!2d-100.67044735819925!3d18.36185766010446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332daac2bfd091%3A0x3e6aa83b763e2e73!2sDi%C3%B3cesis%20de%20Ciudad%20Altamirano!5e0!3m2!1ses-419!2smx!4v1789490549262!5m2!1ses-419!2smx",
  },
  contact: {
    phone: "5223123232",
    confirmationDeadline: "10 de abril de 2027",
  },
  family: {
    parents: {
      mother: "Mariana López Hernández",
      father: "Alejandro Martínez Rivera",
    },
    godparents: {
      woman: "Gabriela Hernández Soto",
      man: "Fernando Martínez Ruiz",
    },
  },
  design: {
    variant: "base",
    colors: {
      primary: "#68765B",
      secondary: "#F1EAD9",
      accent: "#9A793E",
      background: "#FAF8F0",
    },
  },
};

export default isabella;
