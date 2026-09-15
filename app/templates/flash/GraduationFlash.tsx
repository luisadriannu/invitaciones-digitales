import Image from "next/image";
import { GraduationCap } from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import FlashDetails from "./FlashDetails";
import styles from "./Flash.module.css";

export default function GraduationFlash({ data }: { data: EventData }) {
  return (
    <main className={`${styles.page} ${styles.graduation}`}>
      <article className={styles.card}>
        <header className={styles.heading}><GraduationCap size={32} aria-hidden="true" /><p className={styles.eyebrow}>Un logro, un nuevo comienzo</p><h1>Te invito a mi<br /><em>graduación</em></h1></header>
        <div className={styles.photo}><Image src={data.media.coverImage} alt={`Foto de graduación de ${data.event.name}`} fill preload sizes="(max-width: 560px) 85vw, 440px" /></div>
        <div className={styles.identity}><h2>{data.event.name}</h2></div>
        <FlashDetails data={data} />
        <footer className={styles.footer}>Celebremos este momento juntos.</footer>
      </article>
    </main>
  );
}
