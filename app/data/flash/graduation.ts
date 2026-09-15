import type { EventData } from "@/app/types/EventData";

const graduation: EventData = {
  tipo: "graduacion",
  suscription: "classic",
  design: { variant: "flash" },
  seo: { title: "Graduación de Karina · Flash", description: "Te invito a mi graduación. Karina García, CBTA No. 18.", image: "/pictures/graduation/karina/graduation-1.jpg" },
  event: { name: "Karina García", date: "17 Julio 2027", partyHour: "3:30 PM", dressCode: "" },
  media: { coverImage: "/pictures/graduation/karina/graduation-1.jpg", gallery: [] },
  location: { event: "CBTA No. 18", reception: "Salón Quinta Karen" },
  contact: { phone: "" },
};

export default graduation;
