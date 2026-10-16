"use client";

import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  Gift,
  MapPin,
  Sparkles,
  SunMedium,
} from "lucide-react";
import CountDown from "@/app/components/CountDown";
import type { EventData } from "@/app/types/EventData";
import styles from "./BirthdaySummerSea.module.css";

export default function BirthdaySummerSea({ data }: { data: EventData }) {
  return (
    <main className={styles.page}>
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span key={index}>{index % 4 === 0 ? "✦" : ""}</span>
        ))}
      </div>
      <section className={styles.hero} aria-labelledby="summer-title">
        <Image
          className={styles.frame}
          src={data.media.coverImage}
          alt=""
          fill
          preload
          sizes="(max-width: 600px) 100vw, 600px"
        />
        <div className={styles.paperGrain} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
            ESTÁS INVITADA A CELEBRAR
          </p>
          <div className={styles.ageMark}>
            <span>MIS</span>
            <strong>{data.event.age}</strong>
            <span>AÑOS</span>
          </div>
          <h1 id="summer-title">{data.event.name}</h1>
          <p className={styles.heroPhrase}>Una tarde tropical para brindar, bailar y disfrutar.</p>
          <a className={styles.discover} href="#detalles">
            Ver invitación <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section id="detalles" className={styles.details}>
        <span className={styles.shellMark} aria-hidden="true">✺</span>
        <p className={styles.eyebrow}>RESERVA LA FECHA</p>
        <h2>Una fiesta bajo el sol</h2>
        <p className={styles.intro}>
          Quiero compartir contigo un día lleno de sol, música y momentos
          inolvidables.
        </p>

        <div className={styles.detailGrid}>
          <article>
            <CalendarDays aria-hidden="true" />
            <span>FECHA</span>
            <strong>1 de noviembre</strong>
          </article>
          <article>
            <Clock3 aria-hidden="true" />
            <span>HORA</span>
            <strong>{data.event.partyHour}</strong>
          </article>
          <article>
            <MapPin aria-hidden="true" />
            <span>LUGAR</span>
            <strong>{data.location.reception}</strong>
          </article>
        </div>
      </section>

      <section className={styles.countdownSection}>
        <SunMedium aria-hidden="true" />
        <p className={styles.eyebrow}>LA CUENTA REGRESIVA COMENZÓ</p>
        <h2>Falta muy poco</h2>
        <div className={styles.countdown}>
          <CountDown data={data} />
        </div>
      </section>

      <section className={styles.dress}>
        <div className={styles.discoDot} aria-hidden="true" />
        <Sparkles aria-hidden="true" />
        <p className={styles.eyebrow}>PREPÁRATE PARA DISFRUTAR</p>
        <h2>Sol, agua<br /><em>y mucho baile</em></h2>
        <p>{data.event.dressCodeNote}</p>
        <div className={styles.waveRule} aria-hidden="true">✦ ✺ ✦</div>
      </section>

      <section className={styles.gifts} aria-labelledby="gift-title">
        <div className={styles.giftIcon} aria-hidden="true">
          <Gift />
        </div>
        <p className={styles.eyebrow}>MESA DE REGALOS</p>
        <h2 id="gift-title">Regalos en efectivo</h2>
        <p>
          Tu presencia es lo más importante. Si deseas tener un detalle
          conmigo, habrá un espacio especial para recibirlo.
        </p>
        <span className={styles.giftNote}>Con cariño, Natalia</span>
      </section>

      <footer className={styles.footer}>
        <span>01 · 11 · 2026</span>
        <strong>Natalia Dalíz</strong>
        <small>Jardín Las Flores · 1:00 PM</small>
      </footer>
    </main>
  );
}
