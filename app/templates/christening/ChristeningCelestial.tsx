"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Church,
  Clock3,
  Cross,
  Gift,
  MapPin,
  MessageCircleHeart,
  Shirt,
  Sparkles,
  UsersRound,
} from "lucide-react";
import CountDown from "@/app/components/CountDown";
import Gallery from "@/app/components/Gallery";
import LocationMaps from "@/app/components/LocationMaps";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import styles from "./ChristeningCelestial.module.css";

interface Props {
  data: EventData;
}

const LIGHTS = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: 3 + ((index * 17) % 94),
  top: 4 + ((index * 29) % 92),
  delay: (index % 8) * 0.35,
  size: 3 + (index % 3) * 2,
}));

function SacredMark() {
  return (
    <div className={styles.sacredMark} aria-hidden="true">
      <span />
      <Cross size={19} strokeWidth={1.2} />
      <span />
    </div>
  );
}

export default function ChristeningCelestial({ data }: Props) {
  const [showOpening, setShowOpening] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const reduceMotion = useReducedMotion();
  const openingImage = data.media.coverImage || data.media.gallery[0];
  const heroImage = data.media.gallery[0] || data.media.coverImage;
  const detailImage = data.media.gallery[1] || heroImage;
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reduceMotion ? 0 : 0.75 },
  } as const;

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola, confirmo mi asistencia al bautizo de ${data.event.name}.`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
    setShowConfirmation(false);
  };

  return (
    <>
      <AnimatePresence>
        {showOpening && (
          <motion.section
            className={styles.opening}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
            transition={{ duration: reduceMotion ? 0 : 0.65 }}
            aria-label="Portada de la invitación"
          >
            <div className={styles.sky} aria-hidden="true" />
            {LIGHTS.map((light) => (
              <span
                key={light.id}
                className={styles.light}
                style={{
                  left: `${light.left}%`,
                  top: `${light.top}%`,
                  width: light.size,
                  height: light.size,
                  animationDelay: `${light.delay}s`,
                }}
                aria-hidden="true"
              />
            ))}
            <motion.div
              className={styles.openingCard}
              initial={
                reduceMotion ? false : { opacity: 0, y: 24, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.openingMark} aria-hidden="true">
                <Sparkles size={17} />
                <span />
                <Cross size={20} strokeWidth={1.25} />
                <span />
                <Sparkles size={17} />
              </div>
              <p className={styles.openingEyebrow}>Una bendición nos reúne</p>
              <h1>{data.event.name}</h1>
              <p className={styles.openingSubtitle}>Mi bautizo</p>
              <div className={styles.openingPortrait}>
                <Image
                  src={openingImage}
                  alt={data.event.name}
                  fill
                  priority
                  sizes="(max-width: 640px) 68vw, 320px"
                  className="object-cover object-center"
                />
              </div>
              <p className={styles.openingDate}>{data.event.date}</p>
              <button type="button" onClick={() => setShowOpening(false)}>
                Abrir invitación <span aria-hidden="true">✦</span>
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {data.media.music && (
        <MusicButton
          src={data.media.music}
          autoPlay
          color="#7771a3"
          backgroundColor="#fffdf8"
        />
      )}

      <main
        inert={showOpening}
        className={`${styles.invitation} ${showOpening ? styles.hiddenInvitation : ""}`}
      >
        <div className={styles.ambient} aria-hidden="true">
          {LIGHTS.map((light) => (
            <i
              key={light.id}
              style={{
                left: `${light.left}%`,
                animationDelay: `${light.delay}s`,
              }}
            />
          ))}
        </div>

        <section className={styles.hero}>
          <div className={styles.heroOrb} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className={styles.heroSeal}
            >
              <Cross size={23} strokeWidth={1.15} />
            </motion.div>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              className={styles.kicker}
            >
              Con la gracia de Dios
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.85 }}
            >
              {data.event.name}
            </motion.h1>
            <p className={styles.heroDate}>{data.event.date}</p>
          </div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className={styles.heroPortrait}
          >
            <Image
              src={heroImage}
              alt={data.event.name}
              fill
              priority
              sizes="(max-width: 767px) 78vw, 520px"
              className="object-cover"
            />
          </motion.div>
          <p className={styles.scrollCue}>
            Desliza para descubrir <span>↓</span>
          </p>
        </section>

        <section className={styles.blessing}>
          <motion.div {...reveal} className={styles.blessingCard}>
            <SacredMark />
            <p>{data.event.phrase}</p>
            <span className={styles.script}>Una luz nueva comienza</span>
          </motion.div>
          <motion.div {...reveal} className={styles.roundPortrait}>
            <Image
              src={detailImage}
              alt={`Un recuerdo de ${data.event.name}`}
              fill
              sizes="270px"
              className="object-cover"
            />
          </motion.div>
        </section>

        <section className={styles.countdownSection}>
          <motion.div {...reveal} className={styles.sectionHeading}>
            <p>La fecha se acerca</p>
            <h2>Contamos los momentos</h2>
          </motion.div>
          <motion.div {...reveal} className={styles.countdownCard}>
            <CountDown data={data} />
            <span>{data.event.date}</span>
          </motion.div>
        </section>

        <section className={styles.familySection}>
          <motion.div {...reveal} className={styles.sectionHeading}>
            <p>El amor que me acompaña</p>
            <h2>Mi familia</h2>
          </motion.div>
          <div className={styles.familyGrid}>
            {data.family?.parents && (
              <motion.article {...reveal} className={styles.familyCard}>
                <UsersRound size={27} strokeWidth={1.2} />
                <span>Mis papás</span>
                <h3>{data.family.parents.mother}</h3>
                <b>&</b>
                <h3>{data.family.parents.father}</h3>
              </motion.article>
            )}
            {data.family?.godparents && (
              <motion.article {...reveal} className={styles.familyCard}>
                <Cross size={27} strokeWidth={1.2} />
                <span>Mis padrinos</span>
                <h3>{data.family.godparents.woman}</h3>
                <b>&</b>
                <h3>{data.family.godparents.man}</h3>
              </motion.article>
            )}
          </div>
        </section>

        <section className={styles.detailsSection}>
          <motion.div {...reveal} className={styles.sectionHeading}>
            <p>Dónde nos encontraremos</p>
            <h2>El gran día</h2>
          </motion.div>
          <div className={styles.timeline}>
            <motion.article {...reveal}>
              <div className={styles.timelineIcon}>
                <Church size={24} strokeWidth={1.25} />
              </div>
              <div>
                <span>Ceremonia · {data.event.ceremonyHour}</span>
                <h3>{data.location.church}</h3>
              </div>
            </motion.article>
            <motion.article {...reveal}>
              <div className={styles.timelineIcon}>
                <MapPin size={24} strokeWidth={1.25} />
              </div>
              <div>
                <span>Recepción · {data.event.partyHour}</span>
                <h3>{data.location.reception}</h3>
              </div>
            </motion.article>
          </div>
          <motion.div {...reveal} className={styles.mapWrap}>
            <LocationMaps data={data} />
          </motion.div>
        </section>

        <section className={styles.gallerySection}>
          <motion.div {...reveal} className={styles.sectionHeading}>
            <p>Pequeños instantes</p>
            <h2>Recuerdos de amor</h2>
          </motion.div>
          <motion.div {...reveal} className={styles.galleryFrame}>
            <Gallery images={data.media.gallery} />
          </motion.div>
        </section>

        {data.event.itinerary && (
          <section className={styles.itinerarySection}>
            <motion.div {...reveal} className={styles.sectionHeading}>
              <p>Cada momento fue pensado con amor</p>
              <h2>Así viviremos este día</h2>
            </motion.div>
            <ol className={styles.itinerary}>
              {data.event.itinerary.map((item) => (
                <motion.li key={item.title} {...reveal}>
                  <time>{item.hour}</time>
                  <span aria-hidden="true">
                    <Clock3 size={18} strokeWidth={1.2} />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
        )}

        <section className={styles.dressSection}>
          <motion.div {...reveal} className={styles.dressCard}>
            <Shirt size={28} strokeWidth={1.1} />
            <p>Código de vestimenta</p>
            <h2>{data.event.dressCode}</h2>
            <div aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <span>Colores suaves y elegantes para celebrar juntos.</span>
          </motion.div>
        </section>

        {data.event.giftMessage && (
          <section className={styles.giftSection}>
            <motion.div {...reveal} className={styles.giftCard}>
              <Gift size={29} strokeWidth={1.15} />
              <p>El regalo más bonito</p>
              <h2>{data.event.giftMessage}</h2>
            </motion.div>
          </section>
        )}

        <section className={styles.rsvpSection}>
          <motion.div {...reveal}>
            <SacredMark />
            <p>Será hermoso compartirlo contigo</p>
            <h2>¿Nos acompañas?</h2>
            <button type="button" onClick={() => setShowConfirmation(true)}>
              <MessageCircleHeart size={18} /> Confirmar asistencia
            </button>
          </motion.div>
        </section>

        <footer className={styles.footer}>
          Con cariño · {data.event.name}
        </footer>

        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className={styles.modalBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              role="presentation"
              onClick={() => setShowConfirmation(false)}
            >
              <motion.div
                className={styles.modal}
                initial={
                  reduceMotion ? false : { opacity: 0, y: 24, scale: 0.95 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="celestial-confirm-title"
                onClick={(event) => event.stopPropagation()}
              >
                <Cross size={26} strokeWidth={1.15} />
                <h2 id="celestial-confirm-title">Confirmar asistencia</h2>
                <p>
                  Te llevaremos a WhatsApp para confirmar tu lugar en esta
                  celebración.
                </p>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancelar
                  </button>
                  <button type="button" onClick={confirmAttendance}>
                    Continuar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
