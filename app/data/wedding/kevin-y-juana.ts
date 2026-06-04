import type { EventData } from "@/app/types/EventData";

const kevinyjuana: EventData = {
  tipo: "boda",
  suscription: "premiun",
  seo: {
    title: "Boda de Kevin y Juana",
    description: "Estaremos muy felices de compartir contigo este hermoso día.",
    image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
  },
  event: {
    name: "Kevin Mariano y Juana Reynoso",
    date: "07 Junio 2026",
    ceremonyHour: "11:00 AM",
    partyHour: "2:30 PM",
    dressCode: "Formal",
    itinerary: [
      {
        hour: "5:00 PM",
        title: "Ceremonia Religiosa",
        description: "Catedral San Juan Bautista",
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
    coverImage: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
    gallery: [
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-2.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-3.jpg",
      "/pictures/wedding/kevin-y-juana/kevin-y-juana-4.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18013.74004616533!2d-100.67711961370904!3d18.35082625678385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332dc455373601%3A0xff220e710b3b4582!2sQuinta%20Maya!5e0!3m2!1ses-419!2smx!4v1780610112793!5m2!1ses-419!2smx",
    church: "Catedral San Juan Bautista",
    reception: "Salón Quinta Karen",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "Dra. Federica Reynoso Tapia",
      father: "Dr. Carlos Beltran Gomez",
    },
    godparents: {
      man: "Lic. Edgar Madero Peña",
      woman: "Lic. Mercedes Maria Gonzalez Gelba",
    },
  },
  design: {
    variant: "base",
    colors: {
      primary: "#d4af37",
      secondary: "#f8f4e8",
    },
  },
};

export default kevinyjuana;
