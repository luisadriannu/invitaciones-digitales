import type { EventData } from "@/app/types/EventData";

const erikDavid: EventData = {
  tipo: "bautizo",
  plan: "basic",
  seo: {
    title: "Bautizo de Erik David",
    description:
      "Tenemos el honor de invitarle al bautizo de nuestro amado hijo, Erik David Patiño Jaimes.",
    image: "/pictures/christening/erik-david/bautizo-cielo.webp",
    imageWidth: 1024,
    imageHeight: 1536,
  },
  event: {
    timeZone: "America/Mexico_City",
    name: "Erik David Patiño Jaimes",
    date: "26 Diciembre 2026",
    partyHour: "4:00 PM",
    dressCode: "",
    phrase:
      "Tenemos el honor de invitarle al bautizo de nuestro amado hijo. ¡Acompáñanos en este día tan especial!",
  },
  media: {
    coverImage: "/pictures/christening/erik-david/erik-04.webp",
    framedCover: true,
    gallery: [
      "/pictures/christening/erik-david/erik-01.webp",
      "/pictures/christening/erik-david/erik-02.webp",
      "/pictures/christening/erik-david/erik-03.webp",
      "/pictures/christening/erik-david/erik-04.webp",
    ],
  },
  location: {
    place: "Rancho de la Sra. Rosy, Coyuca de Catalán",
    mapUrl:
      "https://www.google.com/maps/place/18%C2%B020'30.9%22N+100%C2%B042'39.2%22W/@18.3419209,-100.7134514,17z/data=!3m1!4b1!4m4!3m3!8m2!3d18.3419209!4d-100.7108765?hl=es&entry=ttu&g_ep=EgoyMDI2MTExNi4wIKXMDSoASAFQAw%3D%3D",
  },
  contact: {
    phone: "527676718576",
  },
  family: {
    parents: {
      mother: "Eva Jaimes",
      father: "Manuel Patiño",
    },
    godparents: {
      woman: "Reyna",
      man: "Julio",
    },
  },
  design: {
    variant: "basic",
    colors: {
      primary: "#5b8faa",
      secondary: "#ffffff",
      accent: "#c6a55b",
      background: "#eaf6fb",
    },
  },
};

export default erikDavid;
