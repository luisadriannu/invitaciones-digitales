"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Church,
  Crown,
  Gift,
  Heart,
  Mail,
  MapPin,
  PartyPopper,
  Sparkles,
} from "lucide-react";
import { getEventDate } from "@/app/lib/eventTime";
import { useCountdown } from "@/app/hooks/useCountdown";
import Gallery from "@/app/components/Gallery";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import styles from "./XvEnchantedPrincess.module.css";

const FIREFLIES = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: 2 + ((index * 19) % 96),
  top: 3 + ((index * 31) % 92),
  delay: (index % 9) * 0.6,
  duration: 5 + (index % 5),
  size: 3 + (index % 3) * 2,
}));

function Ornament() {
  return (
    <div className={styles.ornament} aria-hidden="true">
      <span />
      <Sparkles size={15} />
      <i />
      <Sparkles size={15} />
      <span />
    </div>
  );
}

function ForestDecor({ tone = "soft" }: { tone?: "soft" | "deep" | "pond" }) {
  return (
    <div
      className={`${styles.sectionDecor} ${styles[`decor${tone}`]}`}
      aria-hidden="true"
    >
      {tone !== "deep" && (
        <>
          <span className={styles.sectionBranchLeft}>
            {Array.from({ length: 6 }, (_, index) => (
              <i key={index} />
            ))}
          </span>
          <span className={styles.sectionBranchRight}>
            {Array.from({ length: 6 }, (_, index) => (
              <i key={index} />
            ))}
          </span>
        </>
      )}
      {tone === "deep" && (
        <span className={styles.treeGrove}>
          {Array.from({ length: 6 }, (_, index) => (
            <b key={index} />
          ))}
        </span>
      )}
      <span className={styles.sectionGlow} />
    </div>
  );
}

export default function XvEnchantedPrincess({ data }: { data: EventData }) {
  const [showOpening, setShowOpening] = useState(true);
  const reduceMotion = useReducedMotion();
  const countdown = useCountdown(getEventDate(data.event));
  const shortName = data.event.name.split(" ").slice(0, 2).join(" ");
  const openingImage =
    data.design?.backgroundImage ??
    data.media.gallery[0] ??
    data.media.coverImage;
  const openingBackdrop = data.media.gallery[0] ?? data.media.coverImage;
  const princessImage = data.media.portraitImage ?? data.media.gallery[1];
  const confirmationMessage = encodeURIComponent(
    `Hola, confirmo mi asistencia a los XV años de ${shortName}.`,
  );
  const confirmationUrl = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${confirmationMessage}`;
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.14 },
    transition: { duration: reduceMotion ? 0 : 0.8 },
  } as const;

  return (
    <>
      <AnimatePresence>
        {showOpening && (
          <motion.section
            className={styles.opening}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
            transition={{ duration: reduceMotion ? 0 : 0.7 }}
            aria-label="Portada de la invitación"
          >
            <Image
              src={openingBackdrop}
              alt=""
              fill
              priority
              className={styles.openingBackdrop}
              sizes="100vw"
              aria-hidden="true"
            />
            <div className={styles.openingShade} />
            <div className={styles.fireflies} aria-hidden="true">
              {FIREFLIES.map((fly) => (
                <i
                  key={fly.id}
                  style={{
                    left: `${fly.left}%`,
                    top: `${fly.top}%`,
                    width: fly.size,
                    height: fly.size,
                    animationDelay: `${fly.delay}s`,
                    animationDuration: `${fly.duration}s`,
                  }}
                />
              ))}
            </div>
            <div className={styles.openingFoliage} aria-hidden="true">
              <Image
                src="/pictures/xv/alexa-marbella/enchanted-hanging-foliage.webp"
                alt=""
                fill
                className={styles.openingBotanicalOverlay}
                sizes="100vw"
              />
              <Sparkles className={styles.sparkleTop} />
            </div>
            <motion.div
              className={styles.openingArtwork}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85 }}
            >
              <Image
                src={openingImage}
                alt="Princesa en un marco encantado"
                fill
                priority
                className={styles.openingImage}
                sizes="(max-width: 600px) 88vw, 440px"
              />
            </motion.div>
            <motion.div
              className={styles.openingCard}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              <Crown size={30} strokeWidth={1.15} aria-hidden="true" />
              <p>Un sueño está por comenzar</p>
              <h1>{shortName}</h1>
              <span>Mis XV años</span>
              <button type="button" onClick={() => setShowOpening(false)}>
                Abrir invitación <Sparkles size={15} />
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {data.media.music && (
        <MusicButton
          src={data.media.music}
          autoPlay
          color="#315f3b"
          backgroundColor="#fff8d7"
        />
      )}

      <main
        inert={showOpening}
        className={`${styles.invitation} ${showOpening ? styles.locked : ""}`}
      >
        <div className={styles.ambient} aria-hidden="true">
          {FIREFLIES.map((fly) => (
            <i
              key={fly.id}
              style={{
                left: `${fly.left}%`,
                animationDelay: `${fly.delay}s`,
                animationDuration: `${fly.duration + 5}s`,
              }}
            />
          ))}
        </div>

        <header className={styles.hero}>
          <Image
            src={data.media.coverImage}
            alt={`Princesa encantada para los XV años de ${shortName}`}
            fill
            priority
            className={styles.heroImage}
            sizes="100vw"
          />
          <div className={styles.heroShade} />
          <motion.div
            className={styles.heroContent}
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Crown size={30} strokeWidth={1} />
            <p>La magia de mis quince</p>
            <h1>{shortName}</h1>
            <div className={styles.xvSeal}>
              <strong>XV</strong>
              <span>años</span>
            </div>
            <time>{data.event.date}</time>
          </motion.div>
          <a href="#historia" className={styles.scrollCue}>
            Descubre mi invitación <span>↓</span>
          </a>
        </header>

        <section id="historia" className={styles.letter}>
          <ForestDecor tone="soft" />
          <motion.div {...reveal} className={styles.letterInner}>
            <Ornament />
            <p className={styles.eyebrow}>Con la bendición de Dios</p>
            <h2>
              Un nuevo capítulo
              <br />
              <em>florece en mi historia</em>
            </h2>
            <p className={styles.prose}>{data.event.phrase}</p>
          </motion.div>
        </section>

        <section className={styles.countdownSection}>
          <ForestDecor tone="deep" />
          <motion.div {...reveal}>
            <p className={styles.eyebrow}>Cada vez falta menos</p>
            <h2>La noche encantada se acerca</h2>
            <div className={styles.numbers} aria-label="Cuenta regresiva">
              {(
                [
                  [countdown.days, "Días"],
                  [countdown.hours, "Horas"],
                  [countdown.minutes, "Minutos"],
                  [countdown.seconds, "Segundos"],
                ] as const
              ).map(([value, label]) => (
                <div key={label}>
                  <strong>{String(value).padStart(2, "0")}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <time>{data.event.date}</time>
          </motion.div>
        </section>

        <section className={styles.princessSection}>
          <motion.div {...reveal} className={styles.princessPortrait}>
            <Image
              src={princessImage}
              alt="Princesa en un jardín encantado"
              fill
              sizes="(max-width: 700px) 86vw, 520px"
              className="object-cover"
            />
            <span aria-hidden="true">✦</span>
          </motion.div>
          <motion.div {...reveal} className={styles.princessCopy}>
            <p className={styles.eyebrow}>Una celebración de princesa</p>
            <h2>
              Elegancia, sueños
              <br />
              <em>y un poquito de magia</em>
            </h2>
          </motion.div>
        </section>

        <section className={styles.gallerySection}>
          <ForestDecor tone="pond" />
          <motion.div {...reveal} className={styles.heading}>
            <p className={styles.eyebrow}>
              Un recorrido por mi mundo encantado
            </p>
            <h2>Galería</h2>
          </motion.div>
          <motion.div {...reveal} className={styles.galleryFrame}>
            <Gallery images={data.media.gallery} />
          </motion.div>
          <p className={styles.galleryHint}>
            Desliza para descubrir cada ilustración
          </p>
        </section>

        <section className={styles.familySection}>
          <motion.div {...reveal} className={styles.heading}>
            <p className={styles.eyebrow}>Quienes caminan a mi lado</p>
            <h2>Mi familia</h2>
          </motion.div>
          <div className={styles.familyGrid}>
            {data.family?.parents && (
              <motion.article {...reveal}>
                <Heart size={24} strokeWidth={1.1} />
                <span>Mis padres</span>
                <h3>{data.family.parents.mother}</h3>
                <b>&</b>
                <h3>{data.family.parents.father}</h3>
              </motion.article>
            )}
            {data.family?.godparents && (
              <motion.article {...reveal}>
                <Sparkles size={24} strokeWidth={1.1} />
                <span>Mis padrinos</span>
                <h3>{data.family.godparents.woman}</h3>
                <b>&</b>
                <h3>{data.family.godparents.man}</h3>
              </motion.article>
            )}
          </div>
        </section>

        <section className={styles.venuesSection}>
          <ForestDecor tone="pond" />
          <motion.div {...reveal} className={styles.heading}>
            <p className={styles.eyebrow}>Los lugares de esta historia</p>
            <h2>Nos vemos para celebrar</h2>
          </motion.div>
          <div className={styles.venueGrid}>
            <motion.article {...reveal}>
              <Church size={28} strokeWidth={1.1} />
              <span>Ceremonia religiosa · {data.event.ceremonyHour}</span>
              <h3>{data.location.church}</h3>
              <p>{data.location.event}</p>
              {data.location.churchMapUrl && (
                <iframe
                  src={data.location.churchMapUrl}
                  title={`Mapa de ${data.location.church}`}
                  loading="lazy"
                />
              )}
            </motion.article>
            <motion.article {...reveal}>
              <MapPin size={28} strokeWidth={1.1} />
              <span>Recepción · {data.event.partyHour}</span>
              <h3>{data.location.reception}</h3>
              <p>{data.location.place}</p>
              {data.location.receptionMapUrl && (
                <iframe
                  src={data.location.receptionMapUrl}
                  title={`Mapa de ${data.location.reception}`}
                  loading="lazy"
                />
              )}
            </motion.article>
          </div>
        </section>

        <section className={styles.itinerarySection}>
          <motion.div {...reveal} className={styles.heading}>
            <p className={styles.eyebrow}>Así viviremos la magia</p>
            <h2>Itinerario</h2>
          </motion.div>
          <ol className={styles.itinerary}>
            {data.event.itinerary?.map((item, index) => (
              <motion.li key={item.title} {...reveal}>
                <time>{item.hour}</time>
                <div className={styles.itineraryIcon}>
                  {index === 0 ? (
                    <Church size={20} />
                  ) : (
                    <PartyPopper size={20} />
                  )}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className={styles.dressSection}>
          <motion.div {...reveal} className={styles.dressCard}>
            <Crown size={28} strokeWidth={1.1} />
            <p className={styles.eyebrow}>Código de vestimenta</p>
            <h2>{data.event.dressCode}</h2>
            <div className={styles.avoidColor}>
              <i />
              <span>Evitar el color verde</span>
            </div>
            <p>{data.event.dressCodeNote}</p>
          </motion.div>
        </section>

        <section className={styles.giftSection}>
          <motion.div {...reveal} className={styles.giftCard}>
            <div className={styles.envelopes} aria-hidden="true">
              <Mail />
              <Mail />
              <Mail />
            </div>
            <Gift size={28} strokeWidth={1.1} />
            <p className={styles.eyebrow}>Lluvia de sobres</p>
            <h2>Tu presencia es mi mejor regalo</h2>
            <p>{data.event.giftMessage}</p>
          </motion.div>
        </section>

        <section className={styles.rsvpSection}>
          <ForestDecor tone="deep" />
          <motion.div {...reveal}>
            <Ornament />
            <p className={styles.eyebrow}>Hay un lugar reservado para ti</p>
            <h2>
              ¿Me acompañas
              <br />a vivir este sueño?
            </h2>
            <a href={confirmationUrl} target="_blank" rel="noopener noreferrer">
              Confirmar asistencia <Sparkles size={17} />
            </a>
            <small>WhatsApp · 767 110 6184</small>
            <span className={styles.signature}>{shortName}</span>
          </motion.div>
        </section>

        <footer className={styles.footer}>
          <Crown size={18} />
          <span>
            {shortName} · Mis XV años · {data.event.date}
          </span>
        </footer>
      </main>
    </>
  );
}
