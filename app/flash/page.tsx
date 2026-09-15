import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InvitationCardAction from "@/app/components/InvitationCardAction";
import { flashEvents } from "./data";
import styles from "./flash.module.css";

export const metadata: Metadata = {
  title: "Flash · Un instante, una celebración",
  description: "Invitaciones de una sola vista para tus grandes momentos.",
};

export default function FlashGallery() {
  return (
    <main className={styles.gallery}>
      <div className={styles.galleryContent}>
        <p className={styles.eyebrow}>LA COLECCIÓN FLASH</p>
        <h1>
          Un instante.
          <br />
          <em>Una celebración.</em>
        </h1>
        <p>Toda la emoción y lo esencial, en una sola vista.</p>
        <nav
          aria-label="Diseños de invitaciones Flash"
          className={styles.previews}
        >
          {Object.entries(flashEvents).map(([key, event]) => (
            <Link
              href={`/flash/${key}`}
              key={key}
              prefetch={false}
              aria-label={`Ver invitación: ${event.designLabel ?? event.title} de ${event.name}`}
              className={`${styles.preview} ${styles[event.theme]} ${event.design ? styles[event.design] : ""} group`}
            >
              <div className={styles.previewPhoto}>
                <Image src={event.photo} alt={event.name} fill sizes="180px" />
                <InvitationCardAction />
              </div>
              <span>{event.designLabel ?? event.title}</span>
              <strong>{event.name.split(" ")[0]}</strong>
            </Link>
          ))}
        </nav>
        <p className={styles.note}>
          Diseños de muestra con nombres, fechas y lugares de ejemplo.
        </p>
        <Link href="/" className={styles.back}>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
