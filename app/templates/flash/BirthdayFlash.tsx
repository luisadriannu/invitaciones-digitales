import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import FlashDetails from "./FlashDetails";
import styles from "./Flash.module.css";

export default function BirthdayFlash({ data }: { data: EventData }) {
  return (
    <main className={`${styles.page} ${styles.birthday}`}>
      <article className={styles.card}>
        <header className={styles.heading}>
          <Sparkles size={25} aria-hidden="true" />
          <p className={styles.eyebrow}>Un día para celebrar</p>
          <h1>
            Te invito a mi
            <br />
            <em>cumpleaños</em>
          </h1>
        </header>
        <div className={styles.photo}>
          <Image
            src={data.media.coverImage}
            alt={`Foto de ${data.event.name}`}
            fill
            preload
            sizes="(max-width: 560px) 85vw, 440px"
          />
        </div>
        <div className={styles.identity}>
          <h2>{data.event.name}</h2>
          {data.event.age !== undefined && (
            <p className={styles.age}>
              ¡Cumplo <strong>{data.event.age}</strong>{" "}
              {data.event.age === 1 ? "año" : "años"}!
            </p>
          )}
        </div>
        <FlashDetails data={data} />
        <footer className={styles.footer}>
          ¡Te espero para celebrar juntos!
        </footer>
      </article>
    </main>
  );
}
