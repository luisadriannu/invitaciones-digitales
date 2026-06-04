import type { EventData } from "@/app/types/EventData";

const alan: EventData = {
  tipo: "graduacion",
  suscription: "premiun",
  seo: {
    title: "Graduación de Karina🎓",
    description:
      "Te invito a mi graduación, estoy muy contento de poder compartir este momento contigo. 😄",
    image: "/pictures/graduation/karina/graduation-1.jpg",
  },
  event: {
    name: "Karina Garcia",
    date: "06 Julio 2026",
    partyHour: "3:30 PM",
    dressCode: "Formal",
  },
  media: {
    coverImage: "/pictures/graduation/karina/graduation-1.jpg",
    gallery: [
      "/pictures/graduation/karina/graduation-1.jpg",
      "/pictures/graduation/karina/graduation-2.jpg",
      "/pictures/graduation/karina/graduation-3.jpg",
    ],
  },
  location: {
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3574.0327090076566!2d-100.67777897886874!3d18.367539582670194!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332c4dd4dbc2f1%3A0xa5a50a368e9b3e74!2s%22QUINTA%20KAREN%22!5e0!3m2!1ses-419!2smx!4v1780598323315!5m2!1ses-419!2smx",

    reception: "Salón Quinta Karen",
  },
  contact: {
    phone: "5223123232",
  },
  design: {
    variant: "base",
    colors: {
      primary: "#d4af37",
      secondary: "#f8f4e8",
    },
  },
};

export default alan;
