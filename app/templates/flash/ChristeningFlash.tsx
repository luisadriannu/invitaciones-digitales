import Image from "next/image";
import type { EventData } from "@/app/types/EventData";
import FlashDetails from "./FlashDetails";
import styles from "./Flash.module.css";

export default function ChristeningFlash({ data }: { data: EventData }) {
  return (
    <main className={`${styles.page} ${styles.christening}`}>
      <article className={styles.card}>
        <header className={styles.heading}><span className={styles.cross} aria-hidden="true" /><p className={styles.eyebrow}>Con amor y gratitud</p><h1>Te invito a mi<br /><em>bautizo</em></h1></header>
        <div className={styles.photo}><Image src={data.media.coverImage} alt={`Foto del bautizo de ${data.event.name}`} fill preload sizes="(max-width: 560px) 85vw, 440px" /></div>
        <div className={styles.identity}><h2>{data.event.name}</h2></div>
        <FlashDetails data={data} />
        <footer className={styles.footer}>Tu presencia hará este día más especial.</footer>
      </article>
    </main>
  );
}
