export interface FlashEvent {
  theme: "cumple" | "graduacion" | "bautizo";
  design?: "ticket" | "pop";
  designLabel?: string;
  title: string;
  eyebrow: string;
  name: string;
  age?: number;
  photo: string;
  date: string;
  time: string;
  venue: string;
  mapUrl: string;
  phone: string;
  message: string;
}

// Datos ficticios e independientes para cada diseño. Las fotos son ilustrativas.
// Agregar un mapa y un contacto reales antes de compartir una invitación final.
export const flashEvents: Record<string, FlashEvent> = {
  cumple: {
    theme: "cumple",
    title: "Mi cumpleaños",
    eyebrow: "UN DÍA PARA HACER RECUERDOS",
    name: "Emiliano Robles",
    age: 6,
    photo: "/pictures/birthday/jose/jose-1.jpg",
    date: "09 Enero 2027",
    time: "4:30 PM",
    venue: "Jardín Arcoíris · Puebla",
    mapUrl: "",
    phone: "",
    message: "Seis años de aventuras y una tarde para jugar sin parar. ¡Te espero!",
  },
  graduacion: {
    theme: "graduacion",
    title: "Mi graduación",
    eyebrow: "LO SOÑÉ. LO LOGRÉ. LO CELEBRAMOS.",
    name: "Renata del Valle",
    photo: "/pictures/graduation/karina/graduation-1.jpg",
    date: "19 Junio 2027",
    time: "7:00 PM",
    venue: "Terraza Horizonte · Querétaro",
    mapUrl: "",
    phone: "",
    message: "Cierro una etapa llena de aprendizajes. Brindemos por todo lo que viene.",
  },
  bautizo: {
    theme: "bautizo",
    title: "Mi bautizo",
    eyebrow: "UN PEQUEÑO MILAGRO, UN GRAN AMOR",
    name: "Luciana Méndez",
    photo: "/pictures/christening/camila/camila-4.jpg",
    date: "14 Febrero 2027",
    time: "12:00 PM",
    venue: "Capilla de la Luz · Mérida",
    mapUrl: "",
    phone: "",
    message: "Hoy comienza mi camino de fe. Mis papás y yo queremos compartirlo contigo.",
  },
  "cumple-ticket": {
    theme: "cumple",
    design: "ticket",
    designLabel: "Boleto de fiesta",
    title: "Mi cumpleaños",
    eyebrow: "ADMISIÓN ESPECIAL · UNA GRAN CELEBRACIÓN",
    name: "Nicolás Serrano",
    age: 8,
    photo: "/pictures/birthday/mateo/mateo-1.jpg",
    date: "13 Marzo 2027",
    time: "5:00 PM",
    venue: "Club Aventura · Monterrey",
    mapUrl: "",
    phone: "",
    message: "Tu pase incluye juegos, pastel y muchas sorpresas. ¡No faltes a mis ocho años!",
  },
  "cumple-pop": {
    theme: "cumple",
    design: "pop",
    designLabel: "Fiesta Pop",
    title: "Mi cumpleaños",
    eyebrow: "PASTEL, RISAS Y MUCHÍSIMA DIVERSIÓN",
    name: "Abril Castañeda",
    age: 10,
    photo: "/pictures/birthday/victoria/victoria-4.jpg",
    date: "24 Abril 2027",
    time: "3:00 PM",
    venue: "Estudio Confeti · Guadalajara",
    mapUrl: "",
    phone: "",
    message: "Diez años merecen una gran fiesta. Ven a cantar, bailar y brillar conmigo.",
  },
};

export function getFlashEvent(theme: string) {
  return Object.prototype.hasOwnProperty.call(flashEvents, theme) ? flashEvents[theme] : undefined;
}
