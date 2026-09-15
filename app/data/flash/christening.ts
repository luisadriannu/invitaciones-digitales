import type { EventData } from "@/app/types/EventData";

// Datos ficticios de muestra; fotografías ilustrativas.

const christening: EventData = {
  tipo: "bautizo",
  plan: "basic",
  design: { variant: "flash" },
  seo: { title: "Bautizo de Elena · Flash", description: "Te invito a mi bautizo. Elena Paredes.", image: "/pictures/christening/camila/camila-4.jpg" },
  event: { name: "Elena Paredes", date: "06 Junio 2027", ceremonyHour: "12:30 PM", partyHour: "", dressCode: "" },
  media: { coverImage: "/pictures/christening/camila/camila-4.jpg", gallery: [] },
  location: { church: "Capilla Santa Esperanza · Morelia" },
  contact: { phone: "" },
};

export default christening;
