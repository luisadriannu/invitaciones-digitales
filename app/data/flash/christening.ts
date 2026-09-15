import type { EventData } from "@/app/types/EventData";

const christening: EventData = {
  tipo: "bautizo",
  suscription: "classic",
  design: { variant: "flash" },
  seo: { title: "Bautizo de Camila · Flash", description: "Te invito a mi bautizo. Camila Rivera Vega.", image: "/pictures/christening/camila/camila-4.jpg" },
  event: { name: "Camila Rivera Vega", date: "07 Diciembre 2026", ceremonyHour: "11:00 AM", partyHour: "", dressCode: "" },
  media: { coverImage: "/pictures/christening/camila/camila-4.jpg", gallery: [] },
  location: { church: "Catedral San Juan Bautista" },
  contact: { phone: "" },
};

export default christening;
