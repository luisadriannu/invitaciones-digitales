import type { EventData } from "@/app/types/EventData";

const invitation: EventData = {
  tipo: "primeracomunion",
  plan: "basic",
  design: { variant: "basicDual" },
  seo: {
    title: "Sofía y Adán · Dos motivos para celebrar",
    description:
      "Primera Comunión de Sofía Dariel y cumpleaños de Adán Uriel. 21 de noviembre de 2026. ¡Te esperamos!",
    image: "/pictures/duo/sofia-y-adan-4.webp",
  },
  event: {
    name: "Sofía Dariel López Mateos",
    date: "21 Noviembre 2026",
    timeZone: "America/Mexico_City",
    ceremonyHour: "12:00 pm",
    partyHour: "4:00 pm",
    dressCode: "Sin código de vestimenta",
    dressCodeNote: "Ser puntual y divertirse",
  },
  companionBirthday: {
    name: "Adán Uriel",
    age: 6,
    phrase: "¡Alerta de rugidos! Un gran dinosaurio cumple 6 años.",
    image: "/pictures/duo/aventura-jurasica.webp",
  },
  family: {
    parents: {
      mother: "Perla Nayeli Mateos Escobedo",
      father: "Ernesto López Vélez",
    },
    godparents: {
      woman: "Eva Virginia López Vélez",
      man: "José Oscar Renteria Ávila",
    },
  },
  location: {
    church: "Parroquia de Santa Cecilia",
    churchMapUrl: "https://maps.app.goo.gl/BZxMxCPAFLhQEosL6?g_st=ac",
    reception: "Terraza Bambu",
    receptionMapUrl: "https://maps.app.goo.gl/VHsrRhKDkbnTvFtS8?g_st=aw",
  },
  contact: {
    phone: "523310274002",
    confirmationDeadline: "15 de noviembre de 2026",
  },
  media: {
    coverImage: "/pictures/duo/sofia-y-adan-1.webp",
    gallery: Array.from(
      { length: 8 },
      (_, index) => `/pictures/duo/sofia-y-adan-${index + 1}.webp`,
    ),
  },
};

export default invitation;
