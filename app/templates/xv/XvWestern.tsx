"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Church, MapPin, MessageCircle, Star } from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import s from "./XvWestern.module.css";

function Horseshoe() {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden="true"
    >
      <path d="M22 14 9 49C-3 88 25 103 50 103s53-15 41-54L78 14 63 20l12 34c7 24-7 32-25 32S18 78 25 54l12-34Z" />
      <path d="m21 32 6 2m-11 15 6 2m-5 17 6-1m8 20 4-5m15 12v-6m19-1-4-5m18-14-6-1m7-18-6 2m1-19-6 2" />
      <path
        d="m50 25 4 9 10 1-8 7 2 10-8-5-8 5 2-10-8-7 10-1Z"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function WesternOrnament({ boots = false }: { boots?: boolean }) {
  return (
    <div className={s.westernOrnament} aria-hidden="true">
      <span>✦</span>
      <svg
        viewBox="0 0 140 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        {boots ? (
          <>
            <path
              d="M46 9h42l-6 47c5 9 17 12 26 18 8 6 6 15-5 16H39V75l9-22Z"
              fill="currentColor"
              fillOpacity=".08"
            />
            <path d="M46 18h40M40 82h70M51 9l15 13L81 9M58 32l9 9 9-9M67 41l-2 19M40 90v5h18v-5" />
          </>
        ) : (
          <>
            <path
              d="M35 63c6-17 5-42 18-46 8-3 10 9 17 9s9-12 17-9c13 4 12 29 18 46"
              fill="currentColor"
              fillOpacity=".08"
            />
            <path d="M39 51q31 14 62 0M35 63C12 50 1 58 13 71c18 19 96 19 114 0 12-13 1-21-22-8-21 12-49 12-70 0Z" />
            <path d="m70 53 5 6-5 6-5-6Z" />
          </>
        )}
      </svg>
      <span>✦</span>
    </div>
  );
}

function Portrait({
  src,
  name,
  priority = false,
  objectPosition = "center",
}: {
  src: string;
  name: string;
  priority?: boolean;
  objectPosition?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={s.photo}>
      {failed ? (
        <div
          className={s.placeholder}
          role="img"
          aria-label={`Adorno de los XV de ${name}`}
        >
          <Horseshoe />
          <span>XV</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={`Retrato de ${name}`}
          fill
          preload={priority}
          sizes="(max-width: 640px) 85vw, 440px"
          className="object-cover"
          style={{ objectPosition }}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function mapsLinkFor(url: string | undefined, place: string | undefined) {
  if (!url) return null;
  return url.includes("/maps/embed")
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place ?? "")}`
    : url;
}

function MapButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={s.mapButton}
    >
      <MapPin size={15} aria-hidden="true" /> Ver ubicación
    </a>
  );
}

export default function XvWestern({ data }: { data: EventData }) {
  const reduced = useReducedMotion();
  const reveal = {
    initial: reduced ? (false as const) : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.7 },
  };
  const whatsapp = `https://wa.me/${data.contact.phone}?text=${encodeURIComponent(`¡Hola! Quiero confirmar mi asistencia a los XV de ${data.event.name}.`)}`;
  const churchMap = mapsLinkFor(
    data.location.churchMapUrl,
    data.location.church,
  );
  const receptionMap = mapsLinkFor(
    data.location.receptionMapUrl ?? data.location.mapUrl,
    data.location.reception,
  );

  return (
    <main className={s.page}>
      <header className={s.hero}>
        <Image
          src={data.media.coverImage}
          alt={`Foto de portada de ${data.event.name}`}
          fill
          preload
          sizes="(max-width: 760px) 100vw, 760px"
          className={s.coverPhoto}
        />
        <div className={s.coverShade} aria-hidden="true" />
        <div className={s.starField} aria-hidden="true">
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
          <span>✦</span>
          <span>✧</span>
        </div>
        <svg
          className={s.ropeCorner}
          viewBox="0 0 130 180"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M25-10c75 15 105 70 65 92S12 49 43 29s81 45 50 87-71 35-57 73"
            stroke="currentColor"
            strokeWidth="5"
          />
          <path
            d="M25-10c75 15 105 70 65 92S12 49 43 29s81 45 50 87-71 35-57 73"
            stroke="#51352c"
            strokeWidth="2"
            strokeDasharray="2 5"
          />
        </svg>
        <div className={s.cornerStars} aria-hidden="true">
          ✦
        </div>
        <motion.div {...reveal} className={s.coverContent}>
          <p className={s.eyebrow}>Una noche bajo las estrellas</p>
          <div className={s.emblem}>
            <Horseshoe />
          </div>
          <p className={s.ribbon}>MIS QUINCE AÑOS</p>
          <motion.h1
            initial={
              reduced ? false : { opacity: 0, y: 18, filter: "blur(5px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {data.event.name}
          </motion.h1>
          <p className={s.date}>{data.event.date}</p>
        </motion.div>
        <p className={s.scroll}>
          Un día para recordar <span aria-hidden="true">↓</span>
        </p>
      </header>

      <motion.section {...reveal} className={s.section}>
        <WesternOrnament />
        <div className={s.divider} aria-hidden="true">
          <Star size={18} />
        </div>
        <p className={s.quote}>{data.event.phrase}</p>
        <p className={s.signature}>Con cariño, {data.event.name}</p>
      </motion.section>

      {data.family?.parents && (
        <motion.section {...reveal} className={`${s.section} ${s.family}`}>
          <div className={s.stitchedCorners} aria-hidden="true" />
          <p className={s.eyebrow}>Con el amor de</p>
          <h2>Mis padres</h2>
          <p className={s.parent}>{data.family.parents.mother}</p>
          <span className={s.ampersand}>&</span>
          <p className={s.parent}>{data.family.parents.father}</p>
        </motion.section>
      )}

      <motion.section {...reveal} className={s.section}>
        <p className={s.eyebrow}>Nos vemos el</p>
        <h2>{data.event.date}</h2>
        <motion.div {...reveal} className={s.venue}>
          <Church size={28} strokeWidth={1.2} aria-hidden="true" />
          <h3>Celebración religiosa</h3>
          <p>{data.location.church}</p>
          {data.event.ceremonyHour && (
            <p className={s.hour}>{data.event.ceremonyHour}</p>
          )}
          {churchMap && <MapButton href={churchMap} />}
        </motion.div>
        <motion.div {...reveal} className={s.venue}>
          <MapPin size={28} strokeWidth={1.2} aria-hidden="true" />
          <h3>La celebración continúa</h3>
          <p>{data.location.reception}</p>
          {data.event.partyHour && (
            <p className={s.hour}>{data.event.partyHour}</p>
          )}
          {receptionMap && <MapButton href={receptionMap} />}
        </motion.div>
      </motion.section>

      <motion.section {...reveal} className={`${s.section} ${s.dress}`}>
        <Image
          src="/pictures/elements/western/bota.png"
          alt="Bota"
          width={360}
          height={360}
          className={s.dressBoot}
        />
        <p className={s.eyebrow}>Código de vestimenta</p>
        <h2>{data.event.dressCode}</h2>
      </motion.section>

      <section className={s.section}>
        <motion.div {...reveal}>
          <p className={s.eyebrow}>Mi historia en instantes</p>
          <h2>Un poquito de mí</h2>
        </motion.div>
        <div className={s.gallery}>
          {data.media.gallery
            .filter((src, position, all) => all.indexOf(src) === position)
            .map((src, index) => (
              <motion.figure
                {...reveal}
                whileHover={reduced ? undefined : { y: -5, scale: 1.015 }}
                key={`${index}-${src}`}
              >
                <span className={s.photoPin} aria-hidden="true">
                  ✦
                </span>
                <Portrait
                  src={src}
                  name={data.event.name}
                  objectPosition={
                    src === "/pictures/xv/nathalia/nathalia-1.jpeg"
                      ? "right center"
                      : "center"
                  }
                />
                <figcaption aria-hidden="true">
                  ✦ &nbsp; {String(index + 1).padStart(2, "0")} &nbsp; ✦
                </figcaption>
              </motion.figure>
            ))}
        </div>
      </section>

      <motion.section {...reveal} className={`${s.section} ${s.rsvp}`}>
        <WesternOrnament />
        <div className={s.emblem}>
          <Horseshoe />
        </div>
        <p className={s.eyebrow}>Tu compañía lo hará especial</p>
        <h2>¿Celebramos juntos?</h2>
        <p>Confirma tu asistencia y acompáñame en esta nueva aventura.</p>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={s.button}
        >
          <MessageCircle size={18} aria-hidden="true" /> Confirmar asistencia
        </a>
      </motion.section>
      <footer className={s.footer}>
        <span aria-hidden="true">✦</span>
        <p>{data.event.name} · Mis XV</p>
        <p>{data.event.date}</p>
      </footer>
    </main>
  );
}
