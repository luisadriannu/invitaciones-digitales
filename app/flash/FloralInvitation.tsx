import Image from "next/image";
import { MapPin, MessageCircle, Utensils, Clock3 } from "lucide-react";
import type { FlashEvent } from "./data";
import styles from "./bella-pineda/bella.module.css";

export default function FloralInvitation({ event }: { event: FlashEvent }) {
  const [day, month, year] = event.date.split(" ");
  const message = encodeURIComponent(
    `¡Hola! Quiero confirmar mi asistencia al cumpleaños ${event.age} de ${event.name} el ${event.date} a las ${event.time}. Mi nombre es: `,
  );

  return (
    <main className={styles.page}>
      <article
        className={styles.card}
        aria-label={`Invitación al cumpleaños ${event.age} de ${event.name}`}
      >
        <div className={styles.flowersTop} aria-hidden="true" />
        <div className={styles.flowersBottom} aria-hidden="true" />
        <div className={styles.content}>
          <p className={styles.eyebrow}>{event.eyebrow}</p>
          <p className={styles.age}>
            {event.age}<span>años</span>
          </p>
          <div className={styles.photoFrame}>
            <Image
              src={event.photo}
              alt={`Fotografía de ${event.name}`}
              fill
              sizes="(max-width: 460px) 70vw, 250px"
              priority
            />
          </div>
          <div className={styles.divider} aria-hidden="true">
            ✧
          </div>
          <h1>{event.name}</h1>
          <p className={styles.message}>
            {event.message}
          </p>
          <div className={styles.date}>
            <span>{month}</span>
            <strong>{day}</strong>
            <span>{year}</span>
          </div>
          <div className={styles.schedule}>
            <p>
              <Clock3 size={17} aria-hidden="true" />
              <span>
                Celebración<strong>{event.time}</strong>
              </span>
            </p>
            <p>
              <Utensils size={17} aria-hidden="true" />
              <span>
                Cena<strong>{event.dinnerTime}</strong>
              </span>
            </p>
          </div>
          <p className={styles.venue}>
            <MapPin size={18} aria-hidden="true" />
            {event.venue}
          </p>
          {event.phone ? <div className={styles.actions}>
            <a
              href={`https://wa.me/${event.phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.confirm}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Confirmar asistencia
            </a>
          </div> : <p className={styles.footer}>Invitación de muestra · Confirmación disponible al personalizarla.</p>}
          <p className={styles.footer}>Tu compañía será mi mejor regalo.</p>
        </div>
      </article>
    </main>
  );
}
