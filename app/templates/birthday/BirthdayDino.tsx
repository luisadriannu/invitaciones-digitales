"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  MapPin,
  Clock,
  CalendarDays,
  Shirt,
  Footprints,
  Radio,
} from "lucide-react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import s from "./BirthdayDino.module.css";

interface Props {
  data: EventData;
}

const C = {
  canopy: "#0f1c0d",
  canopy2: "#0b150a",
  panel: "#152a13",
  amber: "#d99a2b",
  amberSoft: "#d99a2b99",
  hazard: "#f0c419",
  ink: "#171308",
  bone: "#ece0c4",
  boneDim: "#ece0c499",
  fern: "#4c6b46",
  rust: "#a13a1f",
};

const DISPLAY_FONT = "'Rockwell', 'Roboto Slab', 'Georgia', serif";
const LABEL_FONT = "'Courier New', 'IBM Plex Mono', monospace";

function JungleFrond({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 120 190"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M64 184C60 142 51 78 58 10" stroke="#9ba76a" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <g key={index} transform={`translate(0 ${index * 25})`}>
          <path
            d="M57 43C32 40 17 24 12 5C38 11 53 22 57 43Z"
            fill={index % 2 ? "#496b36" : "#678844"}
          />
          <path
            d="M57 50C81 43 99 26 105 7C78 15 60 28 57 50Z"
            fill={index % 2 ? "#365c31" : "#527941"}
          />
          <path
            d="M57 43L23 16M57 50L93 20"
            stroke="#bbbf7855"
            strokeWidth="1"
          />
        </g>
      ))}
      <path d="M58 28C45 14 47 3 57 0C67 10 66 19 58 28Z" fill="#829853" />
    </svg>
  );
}

function RaptorClaw({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      aria-hidden="true"
      style={style}
    >
      <path
        d="M4 34 Q10 20 8 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 36 Q19 20 15 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M28 34 Q26 20 24 8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AmberDrop({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 20 26"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      style={style}
    >
      <path d="M10 0C10 0 18 12.5 18 18a8 8 0 1 1-16 0C2 12.5 10 0 10 0Z" />
      <ellipse
        cx="7.2"
        cy="16.5"
        rx="1.6"
        ry="2.6"
        fill="#fff"
        opacity="0.25"
      />
    </svg>
  );
}

function TRex({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      style={style}
    >
      <ellipse cx="110" cy="80" rx="55" ry="32" />
      <path d="M80 60 Q70 30 85 10 Q95 0 105 8 Q115 16 108 35 Q100 55 90 65Z" />
      <path d="M85 10 Q95-2 118 4 Q138 10 140 22 Q142 34 125 36 Q108 38 100 28 Q88 20 85 10Z" />
      <path
        d="M100 28 Q115 32 135 28 Q138 36 120 40 Q105 42 98 34Z"
        opacity="0.9"
      />
      <circle cx="118" cy="16" r="4" fill={C.canopy} />
      <path
        d="M108 36 L112 42 L116 36 L120 43 L124 36 L128 41 L132 36"
        fill="none"
        stroke={C.canopy}
        strokeWidth="1.5"
      />
      <path d="M165 72 Q185 65 198 55 Q200 52 196 50 Q188 58 172 64 Q158 68 155 75Z" />
      <path d="M95 68 Q88 75 82 80 Q78 84 80 86 Q84 82 90 78 Q96 74 98 70Z" />
      <path d="M100 108 Q98 115 95 120 L100 120 L104 112Z" />
      <path d="M125 110 Q124 117 122 120 L127 120 L130 112Z" />
    </svg>
  );
}

const DRIPS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 3 + ((i * 7.1) % 94),
  delay: (i * 0.9) % 9,
  duration: 9 + (i % 5) * 2.5,
  size: 8 + (i % 4) * 5,
  opacity: 0.18 + (i % 4) * 0.08,
}));

export default function BirthdayDino({ data }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [showIntro, setShowIntro] = useState(Boolean(data.media.music));
  const reduceMotion = useReducedMotion();

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `🦖 Confirmo mi ingreso a la expedición de cumpleaños de ${data.event.name}`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  const details = [
    {
      icon: <CalendarDays size={19} />,
      label: "Fecha",
      value: data.event.date,
    },
    { icon: <Clock size={19} />, label: "Hora", value: data.event.partyHour },
    {
      icon: <MapPin size={19} />,
      label: "Lugar",
      value: data.location.reception ?? data.location.place ?? "",
    },
  ];

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="dino-opening"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
            className="fixed inset-0 z-[100] overflow-y-auto"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${C.panel}, ${C.canopy2})`,
              color: C.bone,
            }}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto flex min-h-[100svh] max-w-md flex-col items-center justify-center px-8 py-8 text-center"
            >
              <p
                className="mb-5 text-xs uppercase tracking-[0.22em]"
                style={{ fontFamily: LABEL_FONT, color: C.hazard }}
              >
                Tu próxima aventura comienza aquí
              </p>
              <div className={s.junglePortrait}>
                <div className={s.portraitFrame}>
                  <Image
                    src={data.media.portraitImage ?? data.media.coverImage}
                    alt={`Cumpleaños de ${data.event.name}`}
                    width={1600}
                    height={1067}
                    preload
                    sizes="(max-width: 448px) calc(100vw - 88px), 360px"
                    className={s.portraitPhoto}
                  />
                </div>
                <JungleFrond className={s.leavesLeft} />
                <JungleFrond className={s.leavesRight} />
                <div className={s.portraitSeal} aria-hidden="true">
                  <Footprints size={19} strokeWidth={1.5} />
                </div>
              </div>
              <h2
                className="text-3xl font-bold leading-tight sm:text-4xl"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {data.event.name}
              </h2>
              <p className="mt-3 text-sm" style={{ color: C.boneDim }}>
                Te espera una celebración de tamaño jurásico
              </p>
              <button
                type="button"
                onClick={() => setShowIntro(false)}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f0c419]"
                style={{ background: C.amber, color: C.ink, fontFamily: LABEL_FONT }}
              >
                <Footprints size={18} aria-hidden="true" />
                Abrir invitación
              </button>
              <p className="mt-3 text-xs" style={{ color: C.boneDim }}>
                Toca para entrar y escuchar la música
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {data.media.music && (
        <MusicButton
          src={data.media.music}
          autoPlay
          color={C.amber}
          backgroundColor={C.canopy}
        />
      )}

      <main
        inert={showIntro}
        className={`relative ${showIntro ? "h-[100svh] overflow-hidden" : "min-h-screen"}`}
        style={
          {
            background: C.canopy,
            color: C.bone,
            "--park-canopy2": C.canopy2,
            "--park-panel": C.panel,
            "--park-amber": C.amber,
            "--park-amber-18": `${C.amber}18`,
            "--park-amber-30": `${C.amber}30`,
            "--park-amber-40": `${C.amber}40`,
            "--park-hazard": C.hazard,
            "--park-hazard-55": `${C.hazard}55`,
            "--park-ink": C.ink,
            "--park-bone": C.bone,
            "--park-bone-60": `${C.bone}60`,
            "--park-rust": C.rust,
          } as React.CSSProperties
        }
      >
        {/* ── Amber rain ── */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {DRIPS.map((d) => (
            <AmberDrop
              key={d.id}
              className={s.amberDrip}
              style={{
                position: "absolute",
                left: `${d.x}%`,
                top: "-40px",
                width: d.size,
                color: C.amber,
                opacity: d.opacity,
                animationDelay: `${d.delay}s`,
                animationDuration: `${d.duration}s`,
              }}
            />
          ))}
        </div>

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-end pb-10 overflow-hidden">
          <div className={s.hazardStrip} style={{ top: 0 }} />

          <Image
            src="/pictures/birthday/vicente/fondo-dinosaurio.png"
            alt={data.event.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(15,28,13,0.65) 0%, rgba(15,28,13,0.25) 42%, ${C.canopy} 94%)`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6 pt-10">
            <motion.span
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className={s.parkTag}
            >
              PERMISO DE INGRESO · SECTOR CAMPAMENTO
            </motion.span>

            <motion.div
              initial={{ scale: 0, rotate: -14 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="my-5"
            >
              <Image
                src="/pictures/birthday/vicente/Jurassic_Park.svg"
                alt="Jurassic Park"
                width={208}
                height={0}
                className="w-52 h-auto"
                style={{ color: C.amber }}
              />
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-center mt-3"
                style={{
                  fontFamily: DISPLAY_FONT,
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  color: C.hazard,
                  letterSpacing: "0.04em",
                  textShadow: `0 0 18px ${C.amber}50`,
                }}
              >
                Sebastian Three-rex
              </motion.p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="tracking-[0.25em] text-xs mb-3"
              style={{ fontFamily: LABEL_FONT, color: C.hazard }}
            >
              EXPEDICIÓN AUTORIZADA
            </motion.p>

            {data.media.portraitImage && (
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={s.junglePortrait}
              >
                <div className={s.portraitFrame}>
                  <Image
                    src={data.media.portraitImage}
                    alt={`Foto de ${data.event.name}`}
                    width={1600}
                    height={1067}
                    preload
                    sizes="(max-width: 496px) calc(100vw - 80px), 416px"
                    className={s.portraitPhoto}
                  />
                </div>
                <JungleFrond className={s.leavesLeft} />
                <JungleFrond className={s.leavesRight} />
                <div className={s.portraitSeal} aria-hidden="true">
                  <Footprints size={19} strokeWidth={1.5} />
                </div>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8 }}
              className="text-5xl sm:text-6xl font-extrabold leading-[1.05]"
              style={{
                fontFamily: DISPLAY_FONT,
                color: C.bone,
                letterSpacing: "0.01em",
              }}
            >
              {data.event.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 my-4"
            >
              <div
                className="h-px w-14"
                style={{ background: `${C.amber}70` }}
              />
              <RaptorClaw className="w-7 h-7" style={{ color: C.amber }} />
              <div
                className="h-px w-14"
                style={{ background: `${C.amber}70` }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7 }}
              className="text-center"
            >
              <p
                style={{
                  color: C.boneDim,
                  fontFamily: LABEL_FONT,
                  fontSize: "0.85rem",
                }}
              >
                {data.event.date}
              </p>
              <p
                className="mt-1"
                style={{
                  color: C.amber,
                  fontFamily: LABEL_FONT,
                  fontSize: "0.95rem",
                }}
              >
                {data.event.partyHour}
              </p>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            className="relative z-10 flex flex-col items-center gap-1 mt-7"
          >
            <span
              style={{
                fontFamily: LABEL_FONT,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: C.boneDim,
              }}
            >
              CONTINUAR AL CAMPAMENTO
            </span>
            <span style={{ color: C.amber }}>↓</span>
          </motion.div>

          <div className={s.hazardStrip} style={{ bottom: 0 }} />
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section
          className="relative py-12 sm:py-16 px-6"
          style={{ background: C.canopy2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-center"
          >
            <span className={s.parkTag}>MONITOR DE CONTENCIÓN</span>
            <h2 className={`${s.sectionTitle} mt-3 mb-6`}>
              Tiempo para la apertura de puertas
            </h2>
            <div
              className="max-w-md mx-auto rounded-sm p-1"
              style={{
                background: `${C.amber}25`,
                border: `1px solid ${C.amber}40`,
              }}
            >
              <div className="rounded-sm p-6" style={{ background: C.panel }}>
                <CountDown data={data} />
              </div>
            </div>
          </motion.div>
        </section>

        {data.family?.presentationGodparents?.length ? (
          <section
            className="px-6 py-12 text-center"
            style={{ background: C.canopy2 }}
          >
            <div className="max-w-md mx-auto">
              <span className={s.parkTag}>CON MUCHO CARIÑO</span>
              <h2 className={`${s.sectionTitle} mt-4 mb-8`}>
                Mis padrinos de presentación
              </h2>
              <div className={s.badgeFrame}>
                {data.family.presentationGodparents.map((name, index) => (
                  <div key={name}>
                    {index > 0 && (
                      <p className="my-3" style={{ color: C.amber }}>
                        &amp;
                      </p>
                    )}
                    <p
                      className="text-xl leading-relaxed"
                      style={{ fontFamily: DISPLAY_FONT }}
                    >
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ════════════════ ITINERARIO ════════════════ */}
        <section
          className="relative py-12 sm:py-16 px-6"
          style={{ background: C.canopy }}
        >
          <div className="text-center mb-7">
            <span className={s.parkTag}>BITÁCORA DE EXPEDICIÓN</span>
            <h2 className={`${s.sectionTitle} mt-3`}>Itinerario del día</h2>
          </div>

          {data.event.itinerary?.length ? (
            <div className="max-w-md mx-auto flex flex-col gap-4">
              {data.event.itinerary.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={s.fieldCard}
                >
                  <div className="flex items-center gap-4">
                    <div className={s.fieldIcon}>
                      <Footprints size={19} />
                    </div>
                    <div>
                      <p className={s.fieldLabel}>{item.hour}</p>
                      <p
                        style={{
                          color: C.bone,
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          fontFamily: DISPLAY_FONT,
                        }}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                  {item.description && (
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: C.boneDim }}
                    >
                      {item.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : null}

          <div className="max-w-md mx-auto flex flex-col gap-4 mt-7">
            {details.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={s.fieldCard}
              >
                <div className="flex items-center gap-4">
                  <div className={s.fieldIcon}>{item.icon}</div>
                  <div>
                    <p className={s.fieldLabel}>{item.label}</p>
                    <p style={{ color: C.bone, fontSize: "0.95rem" }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {data.location.mapUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md mx-auto text-center mt-6"
            >
              <h2 className={`${s.sectionTitle} mt-3`}>UBICACIÓN</h2>
              {data.location.mapUrl.startsWith(
                "https://www.google.com/maps/embed?",
              ) && (
                <div
                  className="overflow-hidden rounded-xl border p-1 mb-4"
                  style={{ borderColor: C.amberSoft, background: C.panel }}
                >
                  <iframe
                    src={data.location.mapUrl}
                    title={`Ubicación: ${data.location.reception ?? data.location.place ?? "Lugar del evento"}`}
                    className="block w-full h-64 sm:h-72 rounded-lg border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </motion.div>
          )}
        </section>

        {data.event.favorites && (
          <section
            className="px-6 py-12 sm:py-16"
            style={{ background: C.canopy2 }}
          >
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <span className={s.parkTag}>CONOCE AL PEQUEÑO EXPLORADOR</span>
                <h2 className={`${s.sectionTitle} mt-4`}>
                  {data.event.favorites.title}
                </h2>
              </div>
              <div className="flex flex-col gap-5">
                <div className={s.fieldCard}>
                  <h3 className={`${s.fieldLabel} mb-4`}>JUGAR CON</h3>
                  <ul className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
                    {data.event.favorites.toys.map((toy) => (
                      <li key={toy} className="text-base leading-relaxed">
                        {toy}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.fieldCard}>
                  <h3 className={`${s.fieldLabel} mb-4`}>
                    SUS AVENTURAS FAVORITAS
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {data.event.favorites.activities.map((activity) => (
                      <li key={activity} className="text-base leading-relaxed">
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.fieldCard}>
                  <div className="flex items-center gap-4">
                    <div className={s.fieldIcon}>
                      <Shirt size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className={s.fieldLabel}>TALLA DE ROPA</h3>
                      <p className="text-2xl font-bold">
                        {data.event.favorites.clothingSize}
                      </p>
                    </div>
                  </div>
                  {data.event.favorites.clothingNote && (
                    <p className="mt-4 text-sm leading-relaxed">
                      {data.event.favorites.clothingNote}
                    </p>
                  )}
                </div>
                <div className={s.fieldCard}>
                  <div className="flex items-center gap-4">
                    <div className={s.fieldIcon}>
                      <Footprints size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className={s.fieldLabel}>CALZADO</h3>
                      <p className="text-2xl font-bold">
                        #{data.event.favorites.shoeSize}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">
                    Sus huellas por el mundo son del #
                    {data.event.favorites.shoeSize}.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ════════════════ EQUIPO DE CAMPO ════════════════ */}
        <section
          className="relative py-12 sm:py-16 px-6"
          style={{ background: C.canopy2 }}
        >
          <div className="max-w-md mx-auto flex flex-col gap-6">
            {(data.event.dressCode || data.event.dressCodeNote) && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={s.badgeFrame}
              >
                <div className={`${s.fieldIcon} mx-auto mb-4`}>
                  <Shirt size={20} />
                </div>
                <p className={`${s.fieldLabel} text-center mb-2`}>
                  ¿Qué me pongo?
                </p>
                <p
                  className="text-center leading-relaxed"
                  style={{ color: C.bone }}
                >
                  Nos estamos inclinando por un estilo Safari, cazador de
                  Dinosaurios, pero lo más importante es que vengas listo para
                  pasarla bien.
                </p>
              </motion.div>
            )}

            {data.event.specialMusic && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={s.badgeFrame}
              >
                <div className={`${s.fieldIcon} mx-auto mb-4`}>
                  <Radio size={20} />
                </div>
                <p className={`${s.fieldLabel} text-center mb-2`}>
                  Frecuencia del campamento
                </p>
                <p
                  className="text-center leading-relaxed"
                  style={{ color: C.boneDim }}
                >
                  {data.event.specialMusic}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section
          className="relative py-12 sm:py-16 px-6"
          style={{ background: C.canopy }}
        >
          <div className="text-center mb-7">
            <span className={s.parkTag}>ARCHIVO DE CAMPO</span>
            <h2 className={`${s.sectionTitle} mt-3`}>Registro fotográfico</h2>
          </div>

          <Gallery images={data.media.gallery} />

          <p
            className="text-center mt-6"
            style={{
              fontFamily: LABEL_FONT,
              fontSize: "0.75rem",
              color: C.boneDim,
              letterSpacing: "0.15em",
            }}
          >
            → DESLIZA PARA VER MÁS ←
          </p>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section
          className="relative py-16 sm:py-20 px-6 text-center overflow-hidden"
          style={{ background: C.canopy2 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative"
          >
            <span className={s.parkTag}>CONFIRMACIÓN REQUERIDA</span>
            <h2 className={`${s.sectionTitle} mt-3 mb-4`}>
              ¡Confirma tu ingreso!
            </h2>
            <p
              style={{
                fontFamily: LABEL_FONT,
                fontSize: "0.8rem",
                color: C.boneDim,
                letterSpacing: "0.1em",
              }}
            >
              ACCESO · {data.event.name.toUpperCase()}
            </p>

            <button
              className={`${s.parkTicket} mt-8`}
              onClick={() => setShowModal(true)}
            >
              <span className={`${s.parkTicketNotch} ${s.left}`} />
              <span className={`${s.parkTicketNotch} ${s.right}`} />
              <span className={s.parkTicketBtn}>Confirmar asistencia</span>
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer
          className="flex flex-col items-center gap-2 py-8 px-6 text-center"
          style={{ background: C.canopy }}
        >
          <Image
            src="/pictures/birthday/vicente/Jurassic_Park.svg"
            alt="Jurassic Park"
            width={208}
            height={0}
            className="w-23 h-auto"
            style={{ color: C.amber }}
          />
          <p
            style={{
              fontFamily: DISPLAY_FONT,
              fontWeight: 800,
              fontSize: "1.1rem",
              color: C.hazard,
              letterSpacing: "0.04em",
              textShadow: `0 0 14px ${C.amber}40`,
            }}
          >
            Sebastian Three-rex
          </p>
          <p
            style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, color: C.bone }}
          >
            {data.event.name}
          </p>
          <p
            style={{
              fontFamily: LABEL_FONT,
              fontSize: "0.8rem",
              color: C.boneDim,
            }}
          >
            {data.event.date} · {data.event.partyHour}
          </p>
          <p
            style={{
              fontFamily: LABEL_FONT,
              fontSize: "0.7rem",
              color: `${C.amber}80`,
              letterSpacing: "0.15em",
            }}
          >
            SOBREVIVE. CELEBRA. RUGE. 🦖
          </p>
        </footer>

        {/* ════════════════ MODAL ════════════════ */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{
                background: "rgba(9,16,8,0.72)",
                backdropFilter: "blur(6px)",
              }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ type: "spring", bounce: 0.32 }}
                onClick={(e) => e.stopPropagation()}
                className={`${s.fieldCard} max-w-sm w-full p-8 text-center`}
                style={{ background: C.panel }}
              >
                <TRex
                  className="w-14 h-7 mx-auto mb-4"
                  style={{ color: C.amber }}
                />
                <h3
                  style={{
                    fontFamily: DISPLAY_FONT,
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: C.bone,
                  }}
                  className="mb-2"
                >
                  ACCESO CONFIRMADO
                </h3>
                <p style={{ color: C.boneDim, fontSize: "0.9rem" }}>
                  Te redirigiremos a WhatsApp para confirmar tu lugar en la
                  fiesta de{" "}
                  <span style={{ color: C.amber, fontWeight: 700 }}>
                    {data.event.name}
                  </span>
                  .
                </p>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-sm text-sm font-bold hover:bg-white/5 transition"
                    style={{
                      color: C.boneDim,
                      border: `1px solid ${C.boneDim}40`,
                      fontFamily: LABEL_FONT,
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className={`${s.parkTicket} flex-1 !p-1.5`}
                  >
                    <span className={`${s.parkTicketNotch} ${s.left}`} />
                    <span className={`${s.parkTicketNotch} ${s.right}`} />
                    <span className={`${s.parkTicketBtn} !py-2.5`}>
                      ¡Confirmar!
                    </span>
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
