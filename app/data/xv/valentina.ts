import type { EventData } from "@/app/types/EventData";

// Horarios y lugares de ejemplo para diferenciar esta muestra.

const camila: EventData = {
  tipo: "xv",
  plan: "premium",
  seo: {
    title: "🎀 XV de Valentina",
    description:
      "Quince años de sueños y una noche para brillar. ¡Celebra conmigo!",
    image: "/pictures/xv/valentina/xv-1.jpeg",
  },
  event: {
    name: "Maria Valentina",
    date: "16 Agosto 2027",
    ceremonyHour: "5:00 PM",
    partyHour: "7:00 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/xv/valentina/xv-1.jpeg",
    gallery: [
      "/pictures/xv/valentina/xv-1.jpeg",
      "/pictures/xv/valentina/xv-2.jpeg",
      "/pictures/xv/valentina/xv-3.jpeg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4503.147319954574!2d-100.67044735819925!3d18.36185766010446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332daac2bfd091%3A0x3e6aa83b763e2e73!2sDi%C3%B3cesis%20de%20Ciudad%20Altamirano!5e0!3m2!1ses-419!2smx!4v1789490549262!5m2!1ses-419!2smx",
    church: "Diócesis de Ciudad Altamirano",
    reception: "Quinta Andrea - Ciudad Altamirano",
  },
  contact: {
    phone: "5223123232",
  },
  family: {
    parents: {
      mother: "Mtra. María Mercedes Juárez",
      father: "Dr. Adrian Hilario Mendoza",
    },
    godparents: {
      man: "Lic. Juan Aurelio Pérez",
      woman: "Mtra. Antonia Reyes Morales",
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

export default camila;
