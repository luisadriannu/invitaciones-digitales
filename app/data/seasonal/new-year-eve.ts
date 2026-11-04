import type { EventData } from "@/app/types/EventData";

const newYearEve: EventData = {
  tipo: "evento",
  plan: "basic",
  seo: {
    title: "Celebración de Año Nuevo",
    description: "Despidamos el año entre brindis, música y nuevos deseos por cumplir.",
    image: "/pictures/seasonal/december-2026/new-year-eve.webp",
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Año Nuevo",
    date: "31 Diciembre 2026",
    partyHour: "9:00 PM",
    phrase: "Brindemos por lo vivido, por lo aprendido y por todos los sueños que están por comenzar.",
    dressCode: "Cóctel elegante",
    dressCodeNote: "Negro, dorado y plateado serán los colores de la noche.",
  },
  media: {
    coverImage: "/pictures/seasonal/december-2026/new-year-eve.webp",
    gallery: [],
  },
  location: { place: "Terraza Mirador" },
  contact: { phone: "" },
  design: {
    variant: "basic",
    effect: "confetti",
    colors: { primary: "#b78a35", secondary: "#f0d795", background: "#0e1420" },
  },
};

export default newYearEve;
