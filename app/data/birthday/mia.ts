import type { EventData } from "@/app/types/EventData";

// Invitación de muestra: sustituir lugar y contacto antes de compartirla.
const mia: EventData = {
  tipo: "cumple",
  plan: "premium",
  seo: {
    title: "Mía cumple 8 · Guerreras Pop",
    description:
      "¡La misión es celebrar! Acompaña a Mía en un cumpleaños lleno de música, amistad y magia.",
    image: "/pictures/birthday/mia/guerreras-pop-hd.png",
  },
  event: {
    name: "Mía",
    age: 8,
    date: "24 Enero 2027",
    partyHour: "4:00 PM",
    phrase:
      "El verdadero superpoder es brillar juntas. ¡Ven a cantar, bailar y celebrar conmigo!",
    dressCode: "Lila, rosa o plateado. ¡Trae tu look de estrella favorito!",
    itinerary: [
      {
        hour: "4:00 PM",
        title: "Bienvenida al escenario",
        description: "Recibe tu pase de estrella y conoce al equipo.",
      },
      {
        hour: "4:30 PM",
        title: "Misión: brillar juntas",
        description: "Juegos, baile y una sesión de karaoke pop.",
      },
      {
        hour: "6:00 PM",
        title: "Un deseo con mucho poder",
        description: "Pastel, piñata y las mañanitas para Mía.",
      },
      {
        hour: "7:00 PM",
        title: "El gran final",
        description: "Fotos del equipo y una sorpresa para llevar.",
      },
    ],
  },
  media: {
    coverImage: "/pictures/birthday/mia/guerreras-pop-hd.png",
    gallery: [],
  },
  location: {
    reception: "Parque Acuatico Blue Water",
    place: "Carretera Coyuca-Ajuchitlan, Gro.",
  },
  contact: { phone: "" },
  family: { parents: { mother: "Daniela", father: "Alejandro" } },
  design: {
    variant: "pop",
    colors: {
      primary: "#d8b4fe",
      secondary: "#f472b6",
      accent: "#d9f99d",
      background: "#140b29",
    },
  },
};

export default mia;
