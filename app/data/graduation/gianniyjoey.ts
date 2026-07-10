import type { EventData } from "@/app/types/EventData";

const gianniyjoey: EventData = {
  tipo: "graduacion",
  suscription: "classic",
  seo: {
    title: "Mi graduación Gianni Romero y Joey Romero 🎓",
    description:
      "Te invitamos a celebrar nuestra graduación, estamos muy felices de poder compartir este momento tan especial contigo. 🎓",
    image: "/pictures/graduation/gianniyjoey/gianniyjoey-2.jpeg",
  },
  event: {
    name: "Gianni y Joey",
    date: "23 Julio 2026",
    partyHour: "5:00 PM",
    dressCode: "Formal",
    phrase:
      "Hoy se cierra un capítulo, pero comienza una historia llena de éxitos y sueños cumplidos",
  },
  media: {
    coverImage: "/pictures/graduation/gianniyjoey/gianniyjoey-2.jpeg",
    gallery: [
      "/pictures/graduation/gianniyjoey/gianniyjoey-1.jpeg",
      "/pictures/graduation/gianniyjoey/gianniyjoey-2.jpeg",
      "/pictures/graduation/gianniyjoey/gianniyjoey-3.jpeg",
    ],
  },
  location: {
    // mapUrl:
    //   "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3574.0327090076566!2d-100.67777897886874!3d18.367539582670194!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332c4dd4dbc2f1%3A0xa5a50a368e9b3e74!2sExample!5e0!3m2!1ses-419!2smx!4v1780598323315!5m2!1ses-419!2smx",
    event: "Domicilio conocido",
  },
  contact: {
    phone: "527671160792",
  },
  design: {
    variant: "base",
    colors: {
      primary: "#1a3a5c",
      secondary: "#f0f4f8",
    },
  },
};

export default gianniyjoey;
