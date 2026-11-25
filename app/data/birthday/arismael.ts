import type { EventData } from "@/app/types/EventData";

const artwork = "/arismael-spidey-pose.webp";
const arismael: EventData = {
  tipo: "cumple",
  plan: "premium",
  design: { variant: "spidey" },
  seo: { title: "ARISMAEL · Mis 3 años", description: "¡Celebra conmigo el 26 de diciembre en El Mezquite!", image: artwork },
  event: {
    name: "ARISMAEL", age: 3, date: "26 Diciembre 2026", partyHour: "5:00 PM",
    timeZone: "America/Mexico_City", dressCode: "", giftMessage: "Regalos en efectivo",
    phrase: "Cumplir 3 es mi nueva aventura. ¿Te lanzas a celebrarla conmigo?",
    itinerary: ["Apertura", "Brincolín", "Show de payasos", "Piñatas", "Pastel", "Aguinaldos"].map((title, index) => ({
      title, hour: index === 0 ? "17:00" : "", description: "",
    })),
  },
  media: { coverImage: artwork, gallery: [] },
  location: { place: "Salón de eventos «El Mezquite»", reception: "Ciudad Altamirano, Guerrero", mapUrl: "https://maps.app.goo.gl/NS3sAeTcP7BWJsZG9" },
  contact: { phone: "527671121139" },
};
export default arismael;
