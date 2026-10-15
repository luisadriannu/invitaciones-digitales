"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Gallery from "@/app/components/Gallery";
import {
  Music2,
  Pause,
  ArrowDown,
  ArrowUpRight,
  Wine,
  HeartHandshake,
  Sparkles,
  Utensils,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import CountDown from "@/app/components/CountDown";
import styles from "./WeddingAzure.module.css";

function BotanicalSprig({ className }: { className: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Image
        src="/pictures/wedding/miguel-y-aracely/blue-floral.png"
        alt=""
        width={1376}
        height={1152}
        sizes="(max-width: 700px) 48vw, 280px"
      />
    </div>
  );
}

function WeddingRings() {
  return (
    <svg
      className={styles.rings}
      viewBox="0 0 200 130"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="100" cy="112" rx="65" ry="6" fill="#b69a62" opacity=".1" />
      <circle cx="78" cy="75" r="34" stroke="#b99a5d" strokeWidth="7" />
      <circle cx="78" cy="75" r="34" stroke="#f4e3b3" strokeWidth="2" />
      <circle cx="122" cy="75" r="34" stroke="#b99a5d" strokeWidth="7" />
      <circle cx="122" cy="75" r="34" stroke="#f4e3b3" strokeWidth="2" />
      <path d="M44 75a34 34 0 0 1 34-34" stroke="#b99a5d" strokeWidth="7" />
      <path d="M44 75a34 34 0 0 1 34-34" stroke="#f4e3b3" strokeWidth="2" />
      <path
        d="m109 34 6-10h14l6 10-13 13-13-13Z"
        fill="#f6fcff"
        stroke="#b99a5d"
        strokeWidth="1.5"
      />
      <path
        d="m109 34 26 0m-20-10 7 23 7-23"
        stroke="#b99a5d"
        strokeWidth=".8"
      />
      <path
        d="M162 27v12m-6-6h12M36 43v8m-4-4h8"
        stroke="#b99a5d"
        strokeLinecap="round"
      />
    </svg>
  );
}
const icons = [Wine, HeartHandshake, Sparkles, Utensils];

export default function WeddingAzure({ data }: { data: EventData }) {
  const reducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLElement>(null);
  const [notice, setNotice] = useState(false);
  const [showIntro, setShowIntro] = useState(Boolean(data.media.music));
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (showIntro || reducedMotion || !pageRef.current) return;
    const animations: Animation[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          animations.push(
            entry.target.animate(
              [
                { opacity: 0, transform: "translateY(20px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 850,
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "none",
              },
            ),
          );
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    pageRef.current
      .querySelectorAll(
        "section h2, section > p, article, li, figure, [data-reveal]",
      )
      .forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [showIntro, reducedMotion]);

  const playMusic = () => {
    setMusicError(false);
    const audio = audioRef.current;
    if (audio) void audio.play().catch(() => setMusicError(true));
  };
  const openInvitation = () => {
    // Start playback within the click gesture, including on mobile browsers.
    playMusic();
    setShowIntro(false);
    requestAnimationFrame(() =>
      headingRef.current?.focus({ preventScroll: true }),
    );
  };
  const names = data.event.name.split(" y ");
  const phone = data.contact.phone.replace(/\D/g, "");
  const placeholder = !phone || /^52?0+$/.test(phone);
  const message = encodeURIComponent(
    `Hola, me gustaría confirmar mi asistencia a la boda de ${data.event.name}, el ${data.event.date}.`,
  );
  return (
    <>
      {data.media.music && (
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
      )}
      <AnimatePresence>
        {showIntro && (
          <motion.section
            key="opening"
            className={styles.opening}
            aria-labelledby="opening-title"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -24 }}
            transition={{ duration: reducedMotion ? 0 : 0.65 }}
          >
            <div className={styles.openingDecoration} aria-hidden="true">
              <BotanicalSprig className={styles.openingFlowers} />
            </div>
            <div className={styles.openingCard}>
              <p className={styles.eyebrow}>UNA HISTORIA DE AMOR</p>
              <WeddingRings />
              <h2 id="opening-title">{data.event.name}</h2>
              <p>Tenemos algo muy especial para compartir contigo.</p>
              <button
                type="button"
                className={styles.button}
                onClick={openInvitation}
              >
                Abrir invitación <ArrowUpRight size={17} />
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      {!showIntro && data.media.music && (
        <>
          <button
            type="button"
            className={styles.musicToggle}
            aria-label={playing ? "Pausar música" : "Reproducir música"}
            onClick={() => (playing ? audioRef.current?.pause() : playMusic())}
          >
            {playing ? (
              <Pause size={19} aria-hidden="true" />
            ) : (
              <Music2 size={19} aria-hidden="true" />
            )}
          </button>
          {musicError && (
            <p role="status" className={styles.musicError}>
              No se pudo iniciar la música. Puedes reintentar con el botón
              musical.
            </p>
          )}
        </>
      )}
      <main
        ref={pageRef}
        data-open={!showIntro}
        className={styles.page}
        inert={showIntro}
        style={showIntro ? { height: "100svh", overflow: "hidden" } : undefined}
      >
        <div className={styles.particles} aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <span
              key={index}
              className={styles.particle}
              style={{
                left: `${(index * 37 + 7) % 100}%`,
                width: index % 3 === 0 ? 6 : 3,
                height: index % 3 === 0 ? 9 : 3,
                animationDuration: `${22 + (index % 7) * 3}s`,
                animationDelay: `-${index * 3.7}s`,
              }}
            />
          ))}
        </div>
        <section className={styles.hero}>
          <BotanicalSprig className={styles.botanicalLeft} />
          <BotanicalSprig className={styles.botanicalRight} />
          <header className={styles.topline}>
            <span>M & A</span>
            <span>NUESTRA BODA · 2026</span>
          </header>
          <div className={styles.heroFrame}>
            <span className={styles.eyebrow}>JUNTOS, PARA SIEMPRE</span>
            <WeddingRings />
            <h1 ref={headingRef} tabIndex={-1}>
              {names[0]}
              <em>&</em>
              {names[1]}
            </h1>
            <p className={styles.heroText}>
              Hay historias que se escriben con el corazón.
              <br />
              La nuestra comienza un nuevo capítulo.
            </p>
            <div className={styles.date}>
              <span>NOVIEMBRE</span>
              <strong>28</strong>
              <span>2026</span>
            </div>
            <p className={styles.place}>{data.location.reception}</p>
          </div>
          <a href="#celebracion" className={styles.discover}>
            DESCUBRE NUESTRO DÍA <ArrowDown size={16} />
          </a>
        </section>

        <section id="celebracion" className={styles.intro}>
          <p className={styles.eyebrow}>CON TODO NUESTRO AMOR</p>
          <h2>
            El mejor lugar es
            <br />
            <em>a tu lado.</em>
          </h2>
          <p>
            Queremos compartir la alegría de nuestra unión con las personas que
            forman parte de nuestra historia. Será un honor celebrar contigo.
          </p>
          <div className={styles.divider}>✧</div>
          <p className={styles.eyebrow}>CADA VEZ MÁS CERCA DEL SÍ</p>
          <CountDown data={data} />
        </section>

        {data.media.gallery[0] && (
          <figure className={styles.storyPhoto}>
            <Image
              src={data.media.gallery[0]}
              alt="Un recuerdo especial en pareja"
              fill
              sizes="(max-width: 700px) 100vw, 700px"
              className={styles.photo}
            />
            <figcaption>
              Una vida entera <em>a tu lado.</em>
            </figcaption>
          </figure>
        )}

        <section className={styles.family}>
          <BotanicalSprig className={styles.botanicalRight} />
          <p className={styles.eyebrow}>NUESTRAS RAÍCES</p>
          <h2>
            Con el amor
            <br />
            de <em>nuestros padres</em>
          </h2>
          <div className={styles.parents}>
            <article>
              <span>PADRES DEL NOVIO</span>
              <p>{data.family?.groomParents?.father}</p>
              <i>&</i>
              <p>{data.family?.groomParents?.mother}</p>
            </article>
            <div className={styles.familyHeart}>
              <Heart size={20} strokeWidth={1} />
            </div>
            <article>
              <span>PADRES DE LA NOVIA</span>
              <p>{data.family?.brideParents?.father}</p>
              <i>&</i>
              <p>{data.family?.brideParents?.mother}</p>
              <small>Siempre presente en nuestros corazones.</small>
            </article>
          </div>
        </section>

        {Boolean(data.family?.toastGodparents?.length) && (
          <section
            className={styles.toastSponsors}
            aria-labelledby="toast-sponsors-title"
          >
            <Wine size={30} strokeWidth={1.2} aria-hidden="true" />
            <p className={styles.eyebrow}>POR LOS MOMENTOS QUE NOS UNEN</p>
            <h2 id="toast-sponsors-title">
              Padrinos de <em>Brindis</em>
            </h2>
            <div className={styles.sponsorNames} data-reveal>
              {data.family?.toastGodparents?.map((name, index) => (
                <div key={name}>
                  {index > 0 && <span aria-hidden="true">&</span>}
                  <p>{name}</p>
                </div>
              ))}
            </div>
            <div className={styles.divider} aria-hidden="true">
              ✧
            </div>
          </section>
        )}

        <section className={styles.program}>
          <p className={styles.eyebrow}>SÁBADO · 28 DE NOVIEMBRE</p>
          <h2>
            Un día para
            <br />
            <em>recordar siempre.</em>
          </h2>

          <ol>
            {data.event.itinerary?.map((item, index) => {
              const Icon = icons[index] ?? Heart;
              return (
                <li key={item.title}>
                  <span className={styles.stepIcon}>
                    <Icon size={23} strokeWidth={1.2} />
                  </span>
                  <div>
                    <time>{item.hour}</time>
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <span className={styles.stepNumber}>0{index + 1}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className={styles.venue}>
          <p className={styles.eyebrow}>AQUÍ CELEBRAREMOS</p>
          <MapPin size={30} strokeWidth={1} className={styles.pin} />
          <h2>{data.location.reception}</h2>
          <p>
            Un lugar, nuestras personas favoritas
            <br />y un recuerdo para toda la vida.
          </p>
          {data.location.mapUrl && (
            <iframe
              src={data.location.mapUrl}
              title="Ubicación de Salón El Mezquite"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
          <a
            className={styles.outlineButton}
            href="https://www.google.com/maps/search/?api=1&query=18.3544797%2C-100.6605371"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar <ArrowUpRight size={17} />
          </a>
        </section>

        {data.media.gallery.length > 0 && (
          <section
            className={styles.gallery}
            aria-labelledby="azure-gallery-title"
          >
            <p className={styles.eyebrow}>NUESTRA HISTORIA EN IMÁGENES</p>
            <h2 id="azure-gallery-title">
              Instantes que se vuelven
              <br />
              <em>eternos.</em>
            </h2>
            <div className={styles.galleryFrame} data-reveal>
              <Gallery images={data.media.gallery} />
            </div>
            <p className={styles.galleryHint}>Desliza para ver más recuerdos</p>
          </section>
        )}

        <section className={styles.gifts}>
          <div className={styles.giftGarland} aria-hidden="true">
            <Image
              src="/pictures/wedding/miguel-y-aracely/horizontal-floral.png"
              alt=""
              width={2172}
              height={724}
              sizes="(max-width: 700px) 90vw, 600px"
            />
          </div>
          <div className={styles.envelope} aria-hidden="true">
            <Mail size={52} strokeWidth={0.8} />
            <Heart size={17} />
          </div>
          <p className={styles.eyebrow}>MESA DE REGALOS</p>
          <h2>
            Tu presencia,
            <br />
            <em>nuestro mejor regalo.</em>
          </h2>
          <p>
            Contar con ustedes en nuestra boda es el mejor regalo. Pero si
            desean pueden hacernos un obsequio en efectivo.
          </p>
          <div className={styles.giftNote}>
            <span>¡Lluvia de sobres!</span>
            <p>Habrá un buzón en recepción.</p>
          </div>
        </section>

        <section className={styles.rsvp}>
          {/* <BotanicalSprig className={styles.botanicalRight} /> */}
          <p className={styles.eyebrow}>GUARDAMOS UN LUGAR PARA TI</p>
          <h2>¿Nos acompañas?</h2>
          <p>
            Nos encantará compartir este día contigo.
            <br />
            Confirma tu asistencia para celebrar juntos.
          </p>
          {placeholder ? (
            <>
              <button className={styles.button} onClick={() => setNotice(true)}>
                Confirmar asistencia <ArrowUpRight size={17} />
              </button>
              {notice && (
                <p role="status" className={styles.notice}>
                  El contacto para confirmar estará disponible próximamente.
                </p>
              )}
            </>
          ) : (
            <a
              className={styles.button}
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Confirmar asistencia <ArrowUpRight size={17} />
            </a>
          )}
          <div className={styles.signature}>
            Miguel <span>&</span> Aracely
          </div>
          <small>28 · 11 · 2026</small>
        </section>
        <footer className={styles.footer}>
          HECHO CON AMOR · PARA UN AMOR QUE PERDURA
        </footer>
      </main>
    </>
  );
}
