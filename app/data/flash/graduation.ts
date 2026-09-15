import type { EventData } from "@/app/types/EventData";

// Datos ficticios de muestra; fotografías ilustrativas.

const graduation: EventData = {
  tipo: "graduacion",
  plan: "basic",
  design: { variant: "flash" },
  seo: { title: "Graduación de Valeria · Flash", description: "Te invito a mi graduación. Valeria Mendoza, Instituto del Lago.", image: "/pictures/graduation/karina/graduation-1.jpg" },
  event: { name: "Valeria Mendoza", date: "10 Julio 2027", partyHour: "6:00 PM", dressCode: "" },
  media: { coverImage: "/pictures/graduation/karina/graduation-1.jpg", gallery: [] },
  location: { event: "Instituto del Lago", reception: "Salón Aurora · León" },
  contact: { phone: "" },
};

export default graduation;
