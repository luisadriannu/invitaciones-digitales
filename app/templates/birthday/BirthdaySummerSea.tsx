"use client";

import Image from "next/image";
import { Satisfy } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CalendarDays,
  Clock3,
  Gift,
  MapPin,
  Music2,
  Pause,
  Sparkles,
  SunMedium,
} from "lucide-react";
import CountDown from "@/app/components/CountDown";
import type { EventData } from "@/app/types/EventData";
import styles from "./BirthdaySummerSea.module.css";

const nameScript = Satisfy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function BirthdaySummerSea({ data }: { data: EventData }) {
  const reducedMotion = useReducedMotion();
  const audioRef = useRef<HTMLAudioElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pageRef = useRef<HTMLElement>(null);
  const [showIntro, setShowIntro] = useState(Boolean(data.media.music));
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (showIntro || reducedMotion || !page) return;

    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animations.push(
            entry.target.animate(
              [
                { opacity: 0, transform: "translateY(28px) scale(.985)" },
                { opacity: 1, transform: "translateY(0) scale(1)" },
              ],
              {
                duration: 800,
                easing: "cubic-bezier(.2,.8,.2,1)",
                fill: "none",
              },
            ),
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.13 },
    );

    page
      .querySelectorAll("section, article, footer")
      .forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [showIntro, reducedMotion]);

  const playMusic = () => {
    setMusicError(false);
    void audioRef.current?.play().catch(() => setMusicError(true));
  };

  const openInvitation = () => {
    playMusic();
    setShowIntro(false);
    requestAnimationFrame(() =>
      headingRef.current?.focus({ preventScroll: true }),
    );
  };

  return (
    <>
      {data.media.music && (
        <>
          <audio
            ref={audioRef}
            src={data.media.music}
            loop
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => {
              setPlaying(false);
              setMusicError(true);
            }}
          />
          {!showIntro && (
            <button
              type="button"
              className={styles.musicToggle}
              data-playing={playing}
              aria-label={playing ? "Pausar música" : "Reproducir música"}
              title={playing ? "Pausar música" : "Reproducir música"}
              onClick={() =>
                playing ? audioRef.current?.pause() : playMusic()
              }
            >
              {playing ? (
                <Pause size={19} aria-hidden="true" />
              ) : (
                <Music2 size={19} aria-hidden="true" />
              )}
            </button>
          )}
          {musicError && (
            <p className={styles.musicError} role="status">
              No se pudo iniciar la música. Toca el botón musical para
              intentarlo de nuevo.
            </p>
          )}
        </>
      )}
      <AnimatePresence>
        {showIntro && (
          <motion.section
            key="summer-opening"
            className={styles.opening}
            aria-labelledby="opening-title"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.025 }}
            transition={{ duration: reducedMotion ? 0 : 0.6 }}
          >
            <Image
              className={styles.openingFrame}
              src={data.media.coverImage}
              alt=""
              fill
              preload
              sizes="(max-width: 600px) 100vw, 600px"
            />
            <div className={styles.openingContent}>
              <p className={styles.openingEyebrow}>ESTÁS INVITADA</p>
              <span className={styles.openingAge}>
                MIS {data.event.age} AÑOS
              </span>
              <h2 id="opening-title" className={nameScript.className}>
                {data.event.name}
              </h2>
              <p>Hay una celebración muy especial esperándote.</p>
              <button type="button" onClick={openInvitation}>
                Abrir invitación <span aria-hidden="true">↓</span>
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <main
        ref={pageRef}
        className={styles.page}
        inert={showIntro}
        style={showIntro ? { height: "100svh", overflow: "hidden" } : undefined}
      >
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
            <h1
              id="summer-title"
              ref={headingRef}
              tabIndex={-1}
              className={nameScript.className}
            >
              {data.event.name}
            </h1>
            <p className={styles.heroPhrase}>
              Una tarde tropical para brindar, bailar y disfrutar.
            </p>
            <button
              type="button"
              className={styles.discover}
              onClick={() =>
                document
                  .getElementById("detalles")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Ver invitación <span aria-hidden="true">↓</span>
            </button>
          </div>
        </section>

        <section id="detalles" className={styles.details}>
          <span className={styles.shellMark} aria-hidden="true">
            ✺
          </span>
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

          {data.location.mapUrl && (
            <div className={styles.mapBlock}>
              <p className={styles.eyebrow}>AQUÍ NOS VEMOS</p>
              <h3>{data.location.reception}</h3>
              <div className={styles.mapFrame}>
                <iframe
                  src={data.location.mapUrl}
                  title={`Mapa de ${data.location.reception}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          )}
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
          <h2>
            Sol, agua
            <br />
            <em>y mucho baile</em>
          </h2>
          <p>{data.event.dressCodeNote}</p>
          <div className={styles.waveRule} aria-hidden="true">
            ✦ ✺ ✦
          </div>
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
    </>
  );
}
