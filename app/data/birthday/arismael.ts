import type { EventData } from "@/app/types/EventData";

const portrait = "/pictures/birthday/arismael/retrato.png";
const arismael: EventData = {
  tipo: "cumple",
  plan: "premium",
  design: { variant: "spidey" },
  seo: {
    title: "ARISMAEL · Mis 3 años",
    description: "¡Celebra conmigo el 26 de diciembre en El Mezquite!",
    image: portrait,
    imageWidth: 540,
    imageHeight: 717,
  },
  event: {
    name: "ARISMAEL", age: 3, date: "26 Diciembre 2026", partyHour: "5:00 PM",
    timeZone: "America/Mexico_City", dressCode: "",
    giftMessage: "El mejor regalo es tu compañía, pero si llega como lluvia de sobres… ¡también se celebra!",
    phrase: "Cumplir 3 es mi nueva aventura. ¿Te lanzas a celebrarla conmigo?",
    itinerary: ["Apertura", "Brincolín", "Show de payasos", "Piñatas", "Pastel", "Aguinaldos"].map((title, index) => ({
      title, hour: index === 0 ? "17:00" : "", description: "",
    })),
  },
  media: {
    coverImage: portrait,
    gallery: [1, 2, 3, 4, 5].map(number => `/pictures/birthday/arismael/spidey-${number}.webp`),
    music: "/arismael-spidey.mp3",
  },
  location: { place: "Salón de eventos «El Mezquite»", reception: "Ciudad Altamirano, Guerrero", mapUrl: "https://maps.app.goo.gl/NS3sAeTcP7BWJsZG9" },
  contact: { phone: "527671121139" },
};
export default arismael;
