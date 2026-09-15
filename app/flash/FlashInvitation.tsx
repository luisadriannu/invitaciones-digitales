import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, MessageCircle } from "lucide-react";
import { getFlashEvent } from "./data";
import styles from "./flash.module.css";

export async function generateFlashMetadata(theme: string): Promise<Metadata> {
  const event = getFlashEvent(theme);
  if (!event) return { title: "Invitación no encontrada" };
  const title = `${event.title} · ${event.name}`;
  return {
    title,
    description: `${event.date} · ${event.time}. ${event.message}`,
    openGraph: { title, images: [event.photo] },
  };
}

export default function FlashInvitation({ theme }: { theme: string }) {
  const event = getFlashEvent(theme);
  if (!event) notFound();
  const [day, month, year] = event.date.split(" ");
  const celebration = {
    cumple: "cumpleaños",
    graduacion: "graduación",
    bautizo: "bautizo",
  }[event.theme];
  const article = event.theme === "graduacion" ? "a la" : "al";
  const confirmation = encodeURIComponent(
    `Hola, quiero confirmar mi asistencia ${article} ${celebration} de ${event.name}, el ${event.date} a las ${event.time}.`,
  );

  return (
    <main className={`${styles.page} ${styles[event.theme]} ${event.design ? styles[event.design] : ""}`}>
      <article
        className={styles.card}
        aria-label={`Invitación ${article} ${celebration} de ${event.name}`}
      >
        <header className={styles.header}>
          <span>ESTÁS INVITADO</span>
        </header>

        <div className={styles.portrait}>
          <span className={styles.ornament} aria-hidden="true">
            {theme === "bautizo" ? "✧" : "✳"}
          </span>
          <div className={styles.photoFrame}>
            <Image
              src={event.photo}
              alt={`Fotografía de ${event.name}`}
              fill
              sizes="(max-width: 600px) 220px, 300px"
              priority
              className={styles.photo}
            />
          </div>
          <span className={styles.photoLabel}>
            {theme === "graduacion"
              ? `GENERACIÓN ${year}`
              : theme === "bautizo"
                ? "CON AMOR Y FE"
                : "LET’S CELEBRATE"}
          </span>
          {event.age !== undefined && (
            <span className={styles.age}>
              <strong>{event.age}</strong>
              {event.age === 1 ? "AÑO" : "AÑOS"}
            </span>
          )}
        </div>

        <div className={styles.heading}>
          <p className={styles.eyebrow}>{event.eyebrow}</p>
          <p className={styles.title}>{event.title}</p>
          <h1>{event.name}</h1>
          <p className={styles.message}>{event.message}</p>
        </div>

        <div className={styles.details}>
          <div className={styles.date}>
            <strong>{day}</strong>
            <span>
              {month}
              <small>{year}</small>
            </span>
            <i aria-hidden="true" />
            <span>
              {event.time}
              <small>TE ESPERAMOS</small>
            </span>
          </div>
          <p className={styles.venue}>
            <MapPin size={14} aria-hidden="true" />
            {event.venue}
          </p>
        </div>

        <div className={styles.actions}>
          <a href={event.mapUrl} target="_blank" rel="noopener noreferrer">
            <MapPin size={16} />
            Ubicación
            <ArrowUpRight size={13} />
          </a>
          <a
            className={styles.confirm}
            href={`https://wa.me/${event.phone}?text=${confirmation}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            Confirmar
          </a>
        </div>
        <footer className={styles.footer}>
          {event.design === "ticket" ? "PASE PERSONAL · EDICIÓN CUMPLEAÑOS" : "UN MOMENTO PARA COMPARTIR"} <span>✧</span> FLASH
        </footer>
      </article>
    </main>
  );
}
