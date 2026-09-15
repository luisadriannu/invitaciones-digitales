"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";

/* ─────────────────────────────────────────
   🎨 TEMÁTICA PASTEL CLARO
───────────────────────────────────────── */
const THEME = {
  bg: "#FFF9F0",
  ink: "#3D3A45",
  muted: "#8A8595",
  accent1: "#FF7E79", // coral
  accent2: "#7FD4C1", // menta
  accent3: "#FFC96B", // sol
  accent4: "#B8A7E8", // lavanda
  emoji: "🎂",
  rsvpEmoji: "🎈",
};

interface Props {
  data: EventData;
}

/* ── Confetti pastel ── */
const CONFETTI = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 5.4) % 93),
  delay: (i * 0.35) % 6,
  duration: 6 + (i % 5),
  size: 5 + (i % 4) * 3,
  opacity: 0.3 + (i % 3) * 0.15,
  round: i % 3 === 0,
  colors: [THEME.accent1, THEME.accent2, THEME.accent3, THEME.accent4],
}));

/* ── Soft glow blob ── */
function Blob({ color, className }: { color: string; className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ background: color }}
    />
  );
}

/* ── Wave SVG ── */
function Wave({ fill, bg }: { fill: string; bg: string }) {
  return (
    <div style={{ background: bg, lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        style={{ display: "block", height: 56, width: "100%" }}
      >
        <path
          d="M0,28 C240,56 480,0 720,32 C960,60 1200,8 1440,28 L1440,0 L0,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ── Chip de sección ── */
function Chip({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border inline-block mb-4"
      style={{ color, borderColor: `${color}55`, background: `${color}14` }}
    >
      {children}
    </span>
  );
}

export default function BirthdayPastel({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `¡Hola! 🎉 Confirmo mi asistencia al cumpleaños de ${data.event.name}`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  const infoItems = [
    {
      icon: <CalendarDays size={20} />,
      label: "Fecha",
      value: data.event.date,
    },
    { icon: <Clock size={20} />, label: "Hora", value: data.event.partyHour },
    {
      icon: <MapPin size={20} />,
      label: "Lugar",
      value: data.location.reception,
    },
  ];

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main id="bp-main">
        {/* ── Confetti pastel ── */}
        {CONFETTI.map((c) => (
          <div
            key={c.id}
            className="bday-confetti"
            style={{
              left: `${c.x}%`,
              width: c.size,
              height: c.size,
              borderRadius: c.round ? "50%" : "2px",
              background: c.colors[c.id % c.colors.length],
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
              opacity: c.opacity,
            }}
          />
        ))}

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative min-h-screen flex flex-col">
          {/* Cover image — top 55% */}
          <div className="relative w-full" style={{ height: "55svh" }}>
            <Image
              src={data.media.coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#FFF9F0]/30 via-transparent to-[#FFF9F0]" />
          </div>

          {/* Blobs pastel de fondo */}
          <Blob color={`${THEME.accent2}35`} className="w-72 h-72 -top-10 -left-16" />
          <Blob color={`${THEME.accent3}35`} className="w-64 h-64 top-40 -right-20" />

          {/* Hero content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 pb-20 -mt-10">
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="text-6xl mb-5"
            >
              {THEME.emoji}
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border bg-white/70"
              style={{ color: THEME.accent1, borderColor: `${THEME.accent1}50` }}
            >
              Estás invitado
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="bp-name mb-5"
              style={{ fontSize: "clamp(3rem, 13vw, 7rem)" }}
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", bounce: 0.55 }}
                className="inline-flex items-baseline gap-1 px-6 py-2 rounded-full bg-white mb-5"
                style={{
                  boxShadow: "0 10px 30px rgba(255,126,121,0.18)",
                  border: `1px solid ${THEME.accent1}30`,
                }}
              >
                <span
                  className="bday-fraunces italic text-4xl font-bold leading-none"
                  style={{ color: THEME.accent1 }}
                >
                  {data.event.age}
                </span>
                <span className="bday-jakarta text-xs font-extrabold uppercase tracking-widest" style={{ color: THEME.muted }}>
                  años
                </span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bday-jakarta text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: THEME.muted }}
            >
              {data.event.date}
            </motion.p>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
              className="mt-12 bday-jakarta text-xs font-bold uppercase tracking-widest"
              style={{ color: `${THEME.accent1}80` }}
            >
              ↓ desliza
            </motion.div>
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <Wave fill="#FFF9F0" bg="#FFE9DC" />

        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{ background: "#FFE9DC" }}
        >
          <Blob color={`${THEME.accent2}40`} className="w-72 h-72 -top-20 -left-16" />
          <Blob color={`${THEME.accent3}40`} className="w-72 h-72 -bottom-20 -right-16" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-center"
          >
            <Chip color={THEME.accent1}>Cuenta regresiva</Chip>
            <h2
              className="bday-fraunces italic text-4xl md:text-5xl font-light mb-12"
              style={{ color: THEME.ink }}
            >
              La fiesta empieza en…
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        <Wave fill="#FFE9DC" bg="#FFF9F0" />

        {/* ════════════════ INFO ════════════════ */}
        <section className="relative py-20 px-6" style={{ background: THEME.bg, color: THEME.ink }}>
          <Blob color={`${THEME.accent4}30`} className="w-80 h-80 top-10 -left-24" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 relative"
          >
            <Chip color={THEME.accent2}>Detalles</Chip>
            <h2 className="bday-fraunces italic text-4xl md:text-5xl font-light">
              ¿Cuándo y dónde?
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto flex flex-col gap-4 relative">
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bp-card flex items-center gap-4 p-5"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${[THEME.accent1, THEME.accent2, THEME.accent3][i]}20`,
                    color: [THEME.accent1, THEME.accent2, THEME.accent3][i],
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="bday-jakarta text-[10px] font-extrabold uppercase tracking-widest mb-0.5"
                    style={{ color: THEME.muted }}
                  >
                    {item.label}
                  </p>
                  <p className="bday-jakarta text-base font-bold" style={{ color: THEME.ink }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {data.location.mapUrl && <div className="text-center mt-8 relative">
            <a
              href={data.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bday-jakarta inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border transition-all hover:-translate-y-0.5"
              style={{
                color: THEME.accent2,
                borderColor: `${THEME.accent2}70`,
                background: `${THEME.accent2}12`,
              }}
            >
              <MapPin size={14} />
              Ver en el mapa
            </a>
          </div>}
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <Wave fill="#FFF9F0" bg="#FFF0E5" />

        <section className="relative py-20 px-6 overflow-hidden" style={{ background: "#FFF0E5" }}>
          <Blob color={`${THEME.accent3}35`} className="w-72 h-72 -bottom-20 -left-16" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 relative"
          >
            <Chip color={THEME.accent1}>Momentos</Chip>
            <h2 className="bday-fraunces italic text-4xl md:text-5xl font-light" style={{ color: THEME.ink }}>
              Galería 📸
            </h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p
            className="bday-jakarta text-center text-[10px] font-bold tracking-widest uppercase mt-6"
            style={{ color: `${THEME.muted}90` }}
          >
            Desliza para ver más
          </p>
        </section>

        <Wave fill="#FFF0E5" bg="#FFF9F0" />

        {/* ════════════════ RSVP ════════════════ */}
        <section
          className="py-28 px-6 text-center relative overflow-hidden"
          style={{ background: THEME.bg }}
        >
          <Blob color={`${THEME.accent1}28`} className="w-[28rem] h-[28rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.35 }}
            className="relative"
          >
            <div className="text-5xl mb-5">{THEME.rsvpEmoji}</div>
            <Chip color={THEME.accent3}>¿Nos acompañas?</Chip>
            <h2
              className="bday-fraunces italic text-4xl md:text-5xl font-light mt-2 mb-10"
              style={{ color: THEME.ink }}
            >
              ¡Confirma tu lugar!
            </h2>
            <button
              className="bp-rsvp-btn"
              onClick={() => setShowModal(true)}
            >
              Confirmar asistencia
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer
          className="py-8 px-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            background: "#FFF3E8",
            borderTop: `1px solid ${THEME.accent3}40`,
          }}
        >
          <span
            className="bday-fraunces italic"
            style={{
              fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
              color: THEME.accent1,
            }}
          >
            {data.event.name}
          </span>
          <div className="flex items-center gap-3">
            <span
              className="bday-jakarta text-xs font-bold tracking-widest uppercase"
              style={{ color: THEME.muted }}
            >
              {data.event.date}
            </span>
            <span className="text-2xl">{THEME.emoji}</span>
          </div>
        </footer>

        {/* ════════════════ MODAL ════════════════ */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-6 bg-[#3D3A45]/40 backdrop-blur-[6px]"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.32 }}
                onClick={(e) => e.stopPropagation()}
                className="bp-card w-full max-w-sm p-10 text-center"
                style={{
                  background: "linear-gradient(145deg, #FFFFFF, #FFF3E8)",
                  boxShadow: "0 30px 60px rgba(61,58,69,0.2)",
                }}
              >
                <div className="text-5xl mb-4">🥳</div>
                <h3
                  className="bday-fraunces italic text-2xl mb-2"
                  style={{ color: THEME.ink }}
                >
                  ¡Qué emoción!
                </h3>
                <p
                  className="bday-jakarta text-sm mb-8 leading-relaxed"
                  style={{ color: THEME.muted }}
                >
                  Te redirigiremos a WhatsApp para confirmar tu lugar en la
                  fiesta de{" "}
                  <strong style={{ color: THEME.ink }}>{data.event.name}</strong>.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bday-jakarta flex-1 py-3 rounded-full text-sm font-bold border transition"
                    style={{
                      borderColor: `${THEME.muted}40`,
                      color: THEME.muted,
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className="bp-rsvp-btn flex-1 py-3 text-sm"
                    style={{ padding: "0.75rem 0" }}
                  >
                    Confirmar 🎉
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
