import type { EventData } from "@/app/types/EventData";

const birthday: EventData = {
  tipo: "cumple",
  suscription: "classic",
  design: { variant: "flash" },
  seo: { title: "Cumpleaños de Victoria · Flash", description: "Te invito a mi cumpleaños. ¡Victoria cumple 9 años!", image: "/pictures/birthday/victoria/victoria-4.jpg" },
  event: { name: "Victoria", age: 9, date: "20 Septiembre 2026", partyHour: "2:30 PM", dressCode: "" },
  media: { coverImage: "/pictures/birthday/victoria/victoria-4.jpg", gallery: [] },
  location: { reception: "Salón Quinta Karen" },
  contact: { phone: "" },
};

export default birthday;
