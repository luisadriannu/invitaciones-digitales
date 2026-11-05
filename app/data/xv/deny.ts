import type { EventData } from "@/app/types/EventData";

const deny: EventData = {
  tipo: "xv",
  plan: "premium",
  design: { variant: "watercolor" },
  seo: {
    title: "Deny · Mis XV años",
    description:
      "Hay sueños que florecen y momentos que se vuelven inolvidables. Acompáñame a celebrar mis XV años este 13 de febrero de 2027.",
    image: "/pictures/xv/deny/guirnalda-hd.webp",
  },
  event: {
    name: "Denisha Aleli Pineda Valle",
    age: 15,
    date: "13 Febrero 2027",
    timeZone: "America/Mexico_City",
    ceremonyHour: "12:00 pm",
    partyHour: "2:00 pm",
    phrase:
      "Hay sueños que florecen con el tiempo y momentos que se guardan para siempre en el corazón. Hoy comienza una nueva etapa en mi vida, y quiero vivirla rodeada del amor de quienes han sido parte de mi historia. Será una alegría compartir contigo mis quince años.",
    dressCode: "Sin código de vestimenta",
    dressCodeNote:
      "El rosa palo y sus tonalidades están reservados para la quinceañera. Con cariño, te pedimos evitar estos colores en tu vestuario.",
    giftMessage:
      "Tu presencia es mi regalo más especial. Si deseas tener un detalle conmigo, recibiré con mucho cariño un obsequio o tu participación en la lluvia de sobres.",
    itinerary: [
      {
        hour: "12:00 pm",
        title: "Ceremonia religiosa",
        description:
          "Damos gracias por esta nueva etapa en la Parroquia de San Marcos Evangelista.",
      },
      {
        hour: "2:00 – 4:00 pm",
        title: "Bienvenida y comida",
        description:
          "Nos reunimos en el Salón Frida para compartir la mesa y disfrutar juntos.",
      },
      {
        hour: "5:00 pm",
        title: "Protocolo de XV años",
        description:
          "El momento de celebrar mis quince años y compartir la alegría de este día.",
      },
    ],
  },
  family: {
    parents: {
      mother: "Stephanie Valle Castillo",
      father: "José Juan Pineda Alvarado",
    },
    godparents: {
      woman: "María de Jesús Castellanos",
      man: "Alberto Espinosa Ponce",
    },
  },
  location: {
    church: "Parroquia de San Marcos Evangelista, Tula",
    churchMapUrl:
      "https://www.google.com/maps/search/?api=1&query=Parroquia+de+San+Marcos+Evangelista+Tula",
    reception: "Salón Frida",
    receptionMapUrl:
      "https://www.google.com/maps/search/?api=1&query=20.042517151198115,-99.35386122921858",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d468.5236477659112!2d-99.35386122921858!3d20.042517151198115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d22def6ef626cf%3A0x9fb5a152cec6b654!2zU2Fsw7NuIGRlIEV2ZW50b3Mg4oCcIEZSSURBIOKAnA!5e0!3m2!1ses!2smx!4v1793890036280!5m2!1ses!2smx",
  },
  contact: { phone: "527737396070" },
  media: {
    coverImage: "/pictures/xv/deny/guirnalda-hd.webp",
    gallery: [],
    music: "/music/xv-deny.mp3",
  },
};
export default deny;
