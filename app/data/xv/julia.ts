import type { EventData } from "@/app/types/EventData";

const julia: EventData = {
  tipo: "xv",
  plan: "premium",
  seo: {
    title: "Los XV de Julia · Jardín de rosas",
    description:
      "Una nueva etapa florece. Acompáñame a celebrar mis quince años.",
    image: "/pictures/xv/julia/xv-julia.jpg",
  },
  event: {
    name: "Julia Hernández Pérez",
    date: "21 Agosto 2027",
    startsAt: "2027-08-21T18:00:00-06:00",
    ceremonyHour: "5:00 PM",
    partyHour: "6:00 PM",
    phrase:
      "Hay sueños que florecen con el tiempo y momentos que se guardan para siempre. Quiero vivir este contigo.",
    dressCode: "Formal",
    dressCodeNote:
      "El rosa está reservado para la quinceañera. Gracias por ser parte de mi sueño.",
    itinerary: [
      {
        hour: "5:00 PM",
        title: "La bendición",
        description: "Ceremonia religiosa",
      },
      {
        hour: "6:00 PM",
        title: "El encuentro",
        description: "Bienvenida y recepción",
      },
      {
        hour: "7:00 PM",
        title: "Mi primer vals",
        description: "Un baile para recordar",
      },
      {
        hour: "8:00 PM",
        title: "A celebrar",
        description: "Cena, música y muchos recuerdos",
      },
    ],
  },
  media: {
    coverImage: "/pictures/xv/julia/xv-julia.jpg",
    gallery: [
      "/pictures/xv/julia/xv-julia.jpg",
      "/pictures/xv/julia/xv-julia-2.jpg",
      "/pictures/xv/julia/xv-julia-3.jpg",
    ],
    music: "/music/mi-princesita.mp3",
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d939.0480246824469!2d-101.19504263050254!3d19.7044440095109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e701e9760bb%3A0xf130f1f84bf9cd10!2sJard%C3%ADn%20de%20Las%20Rosas!5e0!3m2!1ses-419!2smx!4v1789484962217!5m2!1ses-419!2smx",
    church: "Capilla de Santa María",
    reception: "Jardín Las Rosas · Morelia",
  },
  contact: { phone: "5223123232" },
  family: {
    parents: { mother: "Mariana Hernández", father: "Alejandro Mendoza" },
    godparents: { woman: "Lucía Hernández", man: "Daniel Flores" },
  },
  design: {
    variant: "roseGarden",
    colors: { primary: "#98576c", secondary: "#f5e3e7", background: "#fffcf8" },
  },
};

export default julia;
