import type { EventData } from "@/app/types/EventData";

// Datos ficticios de muestra; fotografías ilustrativas.

const birthday: EventData = {
  tipo: "cumple",
  plan: "basic",
  design: { variant: "flash" },
  seo: { title: "Cumpleaños de Daniela · Flash", description: "Te invito a mi cumpleaños. ¡Daniela cumple 7 años!", image: "/pictures/birthday/victoria/victoria-4.jpg" },
  event: { name: "Daniela Ríos", age: 7, date: "08 Mayo 2027", partyHour: "4:00 PM", dressCode: "" },
  media: { coverImage: "/pictures/birthday/victoria/victoria-4.jpg", gallery: [] },
  location: { reception: "Jardín Mariposas · Toluca" },
  contact: { phone: "" },
};

export default birthday;
