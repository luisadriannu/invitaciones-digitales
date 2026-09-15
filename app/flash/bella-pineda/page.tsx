import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, MessageCircle, Utensils, Clock3 } from "lucide-react";
import { bella } from "./data";
import styles from "./bella.module.css";

export const metadata: Metadata = {
  title: "Bella Pineda · Mis 60 años",
  description:
    "Celebremos los 60 años de Bella Pineda. 29 de diciembre de 2026, 7:30 p. m., Pista de Las Anonas. Cena a las 8:40 p. m.",
};

export default function BellaInvitation() {
  const message = encodeURIComponent(
    `¡Hola! Quiero confirmar mi asistencia al cumpleaños 60 de Bella Pineda el 29 de diciembre de 2026 a las 7:30 p. m. Mi nombre es: `,
  );

  return (
    <main className={styles.page}>
      <article
        className={styles.card}
        aria-label="Invitación al cumpleaños 60 de Bella Pineda"
      >
        <div className={styles.flowersTop} aria-hidden="true" />
        <div className={styles.flowersBottom} aria-hidden="true" />
        <div className={styles.content}>
          <p className={styles.eyebrow}>Una vida llena de momentos hermosos</p>
          <p className={styles.age}>
            60<span>años</span>
          </p>
          <div className={styles.photoFrame}>
            <Image
              src={bella.photo}
              alt={`Fotografía de ${bella.name}`}
              fill
              sizes="(max-width: 460px) 70vw, 250px"
              priority
            />
          </div>
          <div className={styles.divider} aria-hidden="true">
            ✧
          </div>
          <h1>{bella.name}</h1>
          <p className={styles.message}>
            Sesenta años de historias, amor y alegría.
            <br />
            Me encantaría celebrar este día contigo.
          </p>
          <div className={styles.date}>
            <span>Diciembre</span>
            <strong>29</strong>
            <span>2026</span>
          </div>
          <div className={styles.schedule}>
            <p>
              <Clock3 size={17} aria-hidden="true" />
              <span>
                Celebración<strong>7:30 p. m.</strong>
              </span>
            </p>
            <p>
              <Utensils size={17} aria-hidden="true" />
              <span>
                Cena<strong>8:40 p. m.</strong>
              </span>
            </p>
          </div>
          <p className={styles.venue}>
            <MapPin size={18} aria-hidden="true" />
            {bella.venue}
          </p>
          <div className={styles.actions}>
            <a
              href={`https://wa.me/${bella.phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.confirm}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Confirmar asistencia
            </a>
          </div>
          <p className={styles.footer}>Tu compañía será mi mejor regalo.</p>
        </div>
      </article>
    </main>
  );
}
