import type { EventData } from "@/app/types/EventData";

const cristofer: EventData = {
  tipo: "cumple",
  plan: "premium",
  seo: {
    title: "Cristofer cumple 2 · ¡Únete a mi equipo!",
    description: "Un pequeño campeón, dos años de alegría y un equipo muy especial: tú. Celebremos a Cristofer el 21 de noviembre a las 5:30 p. m.",
    image: "/pictures/birthday/cristofer/portada-whatsapp.jpg",
    imageWidth: 1200,
    imageHeight: 630,
  },
  event: {
    name: "Cristofer",
    age: 2,
    // Año asumido según la fecha de la solicitud; confirmar con la familia.
    date: "21 Noviembre 2026",
    partyHour: "5:30 PM",
    timeZone: "America/Mexico_City",
    phrase: "¡Dos años de sonrisas, pequeños pasos y grandes goles! Estoy listo para celebrar mi cumpleaños con mi equipo favorito: mi familia y tú. ¡Ven a jugar, reír y compartir este día conmigo!",
    dressCode: "",
    specialMusic: "En mi corazón estarás",
  },
  media: {
    music: "/music/cristofer-tarzan.mp3",
    coverImage: "/pictures/birthday/cristofer/football.svg",
    gallery: [
      "/pictures/birthday/cristofer/foto-01-v2.jpg",
      "/pictures/birthday/cristofer/foto-02-v2.jpg",
      "/pictures/birthday/cristofer/foto-03-v2.jpg",
      "/pictures/birthday/cristofer/foto-04-v2.jpg",
      "/pictures/birthday/cristofer/foto-05-v2.png",
      "/pictures/birthday/cristofer/foto-06-v2.png",
      "/pictures/birthday/cristofer/foto-07-v2.jpg",
      "/pictures/birthday/cristofer/foto-08-v2.png",
      "/pictures/birthday/cristofer/foto-09-v2.jpg",
    ],
  },
  location: {
    place: "Enfrente de nuestro domicilio conocido",
    receptionMapUrl: "https://maps.app.goo.gl/YLqA7mXnwsZk6t7P6",
    mapUrl: "https://www.google.com/maps?q=18.3171424,-100.2802754&z=17&output=embed",
  },
  contact: { phone: "527321125142" },
  family: { parents: { mother: "Isabel Vázquez", father: "Gonzalo Torres" } },
  design: {
    variant: "football",
    colors: { primary: "#175c3b", secondary: "#fffdf3", accent: "#d4ec87", background: "#f6f5eb" },
  },
};

export default cristofer;
