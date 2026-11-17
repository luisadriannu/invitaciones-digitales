"use client";

import Image from "next/image";
import Gallery from "@/app/components/Gallery";
import { useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, CalendarDays, Clock3, Heart, MapPin, MessageCircle, Music2, Pause, Trophy } from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import { getEventDate } from "@/app/lib/eventTime";
import { useCountdown } from "@/app/hooks/useCountdown";
import styles from "./BirthdayFootball.module.css";
import musicStyles from "@/app/components/MusicButton.module.css";

// Deterministic positions keep server and client rendering identical.
function CelebrationParticles({ burst = false }: { burst?: boolean }) {
  return <div className={burst ? styles.burst : styles.particles} aria-hidden="true">
    {Array.from({ length: burst ? 24 : 28 }, (_, index) => (
      <span key={index} className={index % 4 === 0 ? styles.spark : styles.confettiPiece} style={{
        "--x": `${(index * 37 + 3) % 100}%`,
        "--delay": `${burst ? index * 0.025 : -index * 0.83}s`,
        "--duration": `${8 + index % 6}s`,
        "--drift": `${(index % 2 ? 1 : -1) * (18 + index % 5 * 8)}px`,
        "--turn": `${(index % 2 ? 1 : -1) * (180 + index * 17)}deg`,
        "--size": `${4 + index % 4}px`,
      } as CSSProperties}>{index % 4 === 0 ? "✦" : ""}</span>
    ))}
  </div>;
}

export default function BirthdayFootball({ data }: { data: EventData }) {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotion();
  const countdown = useCountdown(getEventDate(data.event));
  const finished = countdown.isReady && !countdown.days && !countdown.hours && !countdown.minutes && !countdown.seconds;
  const reveal = { initial: { opacity: 1, y: 0 }, whileInView: { y: reduced ? [0, 0] : [18, 0] }, viewport: { once: true, amount: 0.15 }, transition: { duration: reduced ? 0 : 0.65 } };
  const map = data.location.receptionMapUrl || data.location.mapUrl;
  const confirmation = `https://wa.me/${data.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`¡Hola, Isabel y Gonzalo! Quiero confirmar mi asistencia al cumpleaños de ${data.event.name}.`)}`;

  return (
    <>
    <main className={styles.page}>
      {data.media.music && <audio ref={audioRef} src={data.media.music} preload="none" loop hidden onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />}
      {!opened ? (
        <section className={styles.opening} aria-label="Abre tu invitación">
          <div className={styles.stadiumLights} aria-hidden="true"><i /><i /></div>
          <div className={styles.pennants} aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</div>
          <p className={styles.eyebrow}>UN GRAN DÍA PARA UN PEQUEÑO CAMPEÓN</p>
          <div className={styles.pass}>
            <span className={styles.eyebrow}>TU ENTRADA AL MEJOR EQUIPO</span>
            <Trophy size={42} strokeWidth={1.2} aria-hidden="true" />
            <h1>{data.event.name}</h1>
            <p>ESTÁ POR CUMPLIR <strong>{data.event.age}</strong> AÑOS</p>
            <div className={styles.perforation} />
            <span>21 NOV 2026 <b>·</b> 5:30 P. M.</span>
            <button className={styles.button} onClick={() => {
              void audioRef.current?.play().catch(() => {});
              setOpened(true);
              requestAnimationFrame(() => titleRef.current?.focus());
            }}>Abrir mi invitación <ArrowUpRight size={18} /></button>
            <small>Tenemos un lugar especial para ti.</small>
          </div>
          <span className={styles.openingFooter}>FAMILIA · FÚTBOL · MUCHÍSIMO AMOR</span>
        </section>
      ) : (
        <>
          <section className={styles.hero}>
            <CelebrationParticles burst />
            <div className={styles.stadiumLights} aria-hidden="true"><i /><i /></div>
            <div className={styles.topline}><span>CLUB CRISTOFER</span><span>★ TEMPORADA 02</span></div>
            <p className={styles.eyebrow}>¡ESTÁS CONVOCADO A MI CUMPLEAÑOS!</p>
            <h1 ref={titleRef} tabIndex={-1}>{data.event.name}</h1>
            <p className={styles.heroSubtitle}>Pequeño campeón. <em>Enorme alegría.</em></p>
            <Image className={styles.art} src={data.media.coverImage} alt="Camiseta blanca y verde de Cristofer con el número 2 y un balón de fútbol" width={600} height={520} preload />
            <div className={styles.ageTag}>MI FICHAJE MÁS FELIZ <strong>{data.event.age} AÑOS</strong></div>
            <a href="#bienvenida" className={styles.heroLink}>El partido más bonito comienza aquí <ArrowDown size={18} /></a>
          </section>
          <div className={styles.ribbon}>★ DOS AÑOS DE PURO AMOR ★ ¡VAMOS, CRISTOFER! ★</div>
          <motion.section {...reveal} id="bienvenida" className={styles.section}>
            <div className={styles.clubSeal} aria-hidden="true"><span>★ ★ ★</span><Trophy size={25} strokeWidth={1.4} /><strong>CFC</strong><small>PEQUEÑO CAMPEÓN</small></div>
            <span className={styles.eyebrow}>LA MEJOR AFICIÓN ES LA FAMILIA</span>
            <h2>Mi equipo favorito<br /><em>eres tú.</em></h2>
            <p className={styles.copy}>{data.event.phrase}</p>
            {data.family?.parents && (
              <div className={styles.familyDedication}>
                <Heart size={20} aria-hidden="true" />
                <p>Con todo el amor de mis papás</p>
                <strong>{data.family.parents.mother}</strong>
                <span className={styles.familyDivider}>y</span>
                <strong>{data.family.parents.father}</strong>
              </div>
            )}
          </motion.section>
          {data.media.gallery.length > 0 && <motion.section {...reveal} className={styles.section} aria-labelledby="recuerdos-title">
            <p className={styles.eyebrow}>MI ÁLBUM DE CAMPEÓN</p>
            <h2 id="recuerdos-title">Pequeños momentos.<br /><em>Grandes recuerdos.</em></h2>
            <p className={styles.galleryHint}>Desliza o arrastra para recorrer mis fotos →</p>
            <div className={styles.galleryFrame}><Gallery images={data.media.gallery} autoplayDelay={6000} /></div>
          </motion.section>}
          <motion.section {...reveal} className={styles.scoreSection}>
            <span className={styles.eyebrow}>CUENTA REGRESIVA PARA EL GRAN DÍA</span>
            <h2>¡Que comience la emoción!</h2>
            {!countdown.isReady ? <p role="status">Preparando el marcador…</p> : finished ? <p className={styles.started}>¡La celebración ya comenzó!</p> : <div className={styles.score}>{[[countdown.days, "Días"], [countdown.hours, "Horas"], [countdown.minutes, "Minutos"], [countdown.seconds, "Segundos"]].map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>}
            <span className={styles.scoreNote}>CRISTOFER FC <b>★</b> TEMPORADA 02</span>
          </motion.section>
          <motion.section {...reveal} className={styles.section}>
            <p className={styles.eyebrow}>GUARDA LA FECHA</p>
            <h2>Nos vemos<br /><em>en la fiesta.</em></h2>
            <div className={styles.ticket}>
              <div className={styles.ticketHeader}><span>ENTRADA ESPECIAL</span><Trophy size={20} aria-hidden="true" /></div>
              <div className={styles.date}><span>SÁBADO</span><strong>21</strong><span>NOVIEMBRE · 2026</span></div>
              <div className={styles.detail}><Clock3 size={22} aria-hidden="true" /><div><small>EL SILBATAZO INICIAL</small><strong>5:30 p. m.</strong></div></div>
              <div className={styles.detail}><MapPin size={22} aria-hidden="true" /><div><small>NUESTRO PUNTO DE ENCUENTRO</small><p>{data.location.place}</p></div></div>
              {data.location.mapUrl && <iframe title="Ubicación de la fiesta de Cristofer" src={data.location.mapUrl} width="100%" height="240" loading="lazy" style={{ border: 0, marginBottom: 20 }} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
              {map && <a className={styles.button} href={map} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={18} /></a>}
              <div className={styles.ticketBottom}><CalendarDays size={17} aria-hidden="true" /><span>UN DÍA PARA CELEBRAR JUNTOS</span></div>
            </div>
          </motion.section>
          <motion.section {...reveal} className={`${styles.section} ${styles.rsvp}`}>
            <div className={styles.pitchLines} aria-hidden="true"><i /></div>
            <span className={styles.stars} aria-hidden="true">★ ★ ★</span>
            <p className={styles.eyebrow}>TÚ HACES GRANDE MI EQUIPO</p>
            <h2>¿Cuento<br /><em>contigo?</em></h2>
            <p className={styles.copy}>¡Te esperamos con mucho cariño para celebrar los dos añitos de Cristofer! El mejor gol del día será compartirlo contigo.</p>
            <a className={styles.button} href={confirmation} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Confirmar asistencia</a>
            <p className={styles.whatsappNote}>Por WhatsApp · Isabel y Gonzalo</p>
          </motion.section>
          <footer className={styles.footer}><Trophy size={24} aria-hidden="true" /><strong>{data.event.name} · {data.event.age} años</strong><span>LOS MEJORES GOLES SE CELEBRAN EN FAMILIA</span></footer>
        </>
      )}
    </main>
      {opened && data.media.music && (
        <button type="button" className={musicStyles.button}
          style={{ "--music-color": "#175c3b", "--music-background": "#fffdf3" } as CSSProperties}
          aria-label={playing ? "Pausar música" : "Reproducir música"}
          onClick={() => {
            const audio = audioRef.current;
            if (!audio) return;
            if (audio.paused) void audio.play().catch(() => {});
            else audio.pause();
          }}>
          {playing ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" /> : <Music2 size={19} strokeWidth={1.5} aria-hidden="true" />}
        </button>
      )}
      <CelebrationParticles />
    </>
  );
}
