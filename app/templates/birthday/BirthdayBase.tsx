"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin } from "lucide-react";

import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";

import type { EventData } from "@/app/types/EventData";

interface Props {
  data: EventData;
}

/* ─────────────────────────────────────────
   🎨 PERSONALIZACIÓN RÁPIDA
   Cambia estos valores para cada invitación
───────────────────────────────────────── */
const THEME = {
  primary: "#F4436C", // color principal (botones, countdown, wave)
  secondary: "#FFC947", // color secundario (badges, íconos)
  tertiary: "#4ECDC4", // color terciario (sección galería)
  bg: "#fffcf7b5", // fondo general
  card: "#FFFFFF", // fondo de tarjetas
  ink: "#1A1A2E", // color de texto
  emoji: "🎂", // emoji principal del hero
  rsvpEmoji: "🎊", // emoji del RSVP
  modalEmoji: "🥳", // emoji del modal
  confetti: "🎉", // emoji del scroll hint
};

/* ── Decorative floating dots ── */
const DOTS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: 3 + ((i * 4.3) % 94),
  y: 2 + ((i * 3.9) % 96),
  size: 5 + (i % 4) * 3,
  delay: (i * 0.3) % 5,
  duration: 4 + (i % 4),
  shape: i % 3,
}));

const DOT_COLORS = (primary: string, secondary: string, tertiary: string) => [
  primary,
  secondary,
  tertiary,
  "#A78BFA",
  "#FB923C",
];

export default function BirthdayBaseV2({ data }: Props) {
  const [showModal, setShowModal] = useState(false);
  const dotColors = DOT_COLORS(THEME.primary, THEME.secondary, THEME.tertiary);

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola ${THEME.confetti} Confirmo mi asistencia al cumpleaños de ${data.event.name}`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main
        id="bday-v2"
        style={{
          // @ts-expect-error custom css variables
          "--c1": THEME.primary,
          "--c2": THEME.secondary,
          "--c3": THEME.tertiary,
          "--bg": THEME.bg,
          "--card": THEME.card,
          "--ink": THEME.ink,
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400;1,9..144,700&display=swap');

          #bday-v2 {
            background: var(--bg);
            color: var(--ink);
            font-family: 'Plus Jakarta Sans', sans-serif;
            overflow: hidden;
            position: relative;
          }

          .frc { font-family: 'Fraunces', Georgia, serif; }

          /* ── Floating dots ── */
          @keyframes dotFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.5; }
            50%       { transform: translateY(-16px) rotate(180deg); opacity: 0.85; }
          }
          .dot-bg {
            position: fixed;
            pointer-events: none;
            z-index: 0;
            animation: dotFloat ease-in-out infinite;
          }

          /* ── Hero name ── */
          .hero-name {
            font-family: 'Fraunces', serif;
            font-style: italic;
            font-size: clamp(2.8rem, 12vw, 7rem);
            line-height: 1.0;
            letter-spacing: -0.02em;
            color: var(--ink);
          }

          /* ── Age pill ── */
          .age-pill {
            display: inline-flex;
            align-items: baseline;
            gap: 0.25rem;
            background: var(--c2);
            color: var(--ink);
            border-radius: 999px;
            padding: 0.4rem 1.25rem;
            font-weight: 800;
            border: 2px solid var(--ink);
            box-shadow: 3px 3px 0 var(--ink);
          }
          .age-num { font-family: 'Fraunces', serif; font-size: 2rem; line-height: 1; font-style: italic; }
          .age-lbl { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.6; }

          /* ── Section label ── */
          .s-label {
            display: inline-block;
            font-size: 0.67rem;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            padding: 0.28rem 0.9rem;
            border-radius: 999px;
            border: 2px solid currentColor;
          }

          /* ── Wave ── */
          .wave { line-height: 0; overflow: hidden; width: 100%; }

          /* ── Info cards ── */
          .i-card {
            background: var(--card);
            border: 2px solid var(--ink);
            border-radius: 20px;
            padding: 1.25rem 1.5rem;
            display: flex;
            align-items: center;
            gap: 1.1rem;
            box-shadow: 4px 4px 0 var(--ink);
            transition: transform 0.15s, box-shadow 0.15s;
          }
          .i-card:hover { transform: translate(-2px,-2px); box-shadow: 6px 6px 0 var(--ink); }
          .i-icon {
            width: 46px; height: 46px;
            border-radius: 14px;
            background: var(--c2);
            display: flex; align-items: center; justify-content: center;
            font-size: 1.25rem;
            flex-shrink: 0;
            border: 1.5px solid var(--ink);
          }

          /* ── RSVP btn ── */
          .rsvp-v2 {
            display: inline-block;
            padding: 1.1rem 3rem;
            border-radius: 999px;
            background: var(--c1);
            color: white;
            font-size: 1rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            border: 2.5px solid var(--ink);
            cursor: pointer;
            box-shadow: 5px 5px 0 var(--ink);
            transition: transform 0.15s, box-shadow 0.15s;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .rsvp-v2:hover  { transform: translate(-2px,-2px); box-shadow: 7px 7px 0 var(--ink); }
          .rsvp-v2:active { transform: translate(2px,2px);  box-shadow: 2px 2px 0 var(--ink); }

          /* ── Map btn ── */
          .map-v2 {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.75rem;
            border-radius: 999px;
            border: 2px solid var(--ink);
            background: var(--card);
            color: var(--ink);
            font-size: 0.85rem;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 3px 3px 0 var(--ink);
            transition: transform 0.15s, box-shadow 0.15s;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }
          .map-v2:hover { transform: translate(-2px,-2px); box-shadow: 5px 5px 0 var(--ink); }

          /* ── Footer ── */
          .footer-v2 {
            background: var(--ink);
            color: var(--bg);
            padding: 1.75rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
          }
        `}</style>

        {/* ── Floating dots ── */}
        {DOTS.map((d) => (
          <div
            key={d.id}
            className="dot-bg"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              background: dotColors[d.id % dotColors.length],
              borderRadius: d.shape === 0 ? "50%" : d.shape === 1 ? "3px" : "0",
              transform: d.shape === 2 ? "rotate(45deg)" : undefined,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
              opacity: 0.4,
            }}
          />
        ))}

        {/* ════════ HERO ════════ */}
        <section
          className="relative min-h-screen flex flex-col"
          style={{ background: THEME.bg }}
        >
          {/* Top image */}
          <div className="relative w-full" style={{ height: "52svh" }}>
            <Image
              src={data.media.coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, rgba(0,0,0,0.08), ${THEME.bg})`,
              }}
            />
          </div>

          {/* Hero text */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 -mt-8">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.55 }}
              className="text-6xl mb-4"
            >
              {THEME.emoji}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="s-label mb-3"
              style={{ color: THEME.primary, borderColor: THEME.primary }}
            >
              Estás invitado
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="hero-name mb-5"
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", bounce: 0.5 }}
                className="age-pill mb-4"
              >
                <span className="age-num">{data.event.age}</span>
                <span className="age-lbl">años</span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm font-semibold opacity-35 tracking-widest uppercase"
            >
              {data.event.date}
            </motion.p>

            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 1.5 }}
              className="mt-10 text-sm font-bold opacity-25 tracking-widest uppercase"
            >
              ↓ desliza
            </motion.div>
          </div>
        </section>

        {/* Wave down */}
        <div className="wave" style={{ background: THEME.primary }}>
          <svg
            viewBox="0 0 1440 50"
            preserveAspectRatio="none"
            style={{ display: "block", height: 50 }}
          >
            <path
              d="M0,25 C360,50 720,0 1080,35 C1260,48 1380,12 1440,25 L1440,0 L0,0 Z"
              fill={THEME.bg}
            />
          </svg>
        </div>

        {/* ════════ COUNTDOWN ════════ */}
        <section className="py-20 px-6" style={{ background: THEME.primary }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span
              className="s-label mb-3 inline-block"
              style={{ color: "white", borderColor: "white" }}
            >
              Cuenta regresiva
            </span>
            <h2
              className="frc text-4xl md:text-5xl italic mt-2 mb-12"
              style={{ color: "white" }}
            >
              La fiesta empieza en…
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* Wave up */}
        <div className="wave" style={{ background: THEME.bg }}>
          <svg
            viewBox="0 0 1440 50"
            preserveAspectRatio="none"
            style={{ display: "block", height: 50 }}
          >
            <path
              d="M0,0 C360,50 720,0 1080,40 C1260,55 1380,10 1440,0 L1440,50 L0,50 Z"
              fill={THEME.primary}
            />
          </svg>
        </div>

        {/* ════════ INFO ════════ */}
        <section className="py-16 px-6" style={{ background: THEME.bg }}>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="s-label"
              style={{ color: THEME.primary, borderColor: THEME.primary }}
            >
              Detalles
            </span>
            <h2 className="frc text-4xl md:text-5xl italic mt-2">
              ¿Cuándo y dónde?
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto flex flex-col gap-4">
            {[
              { icon: "📅", label: "Fecha", value: data.event.date },
              { icon: "⏰", label: "Hora", value: data.event.ceremonyHour },
              { icon: "📍", label: "Lugar", value: data.location.reception },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="i-card"
              >
                <div className="i-icon">{item.icon}</div>
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-0.5 opacity-40"
                    style={{ fontWeight: 800 }}
                  >
                    {item.label}
                  </p>
                  <p className="text-base" style={{ fontWeight: 700 }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href={data.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-v2"
            >
              <MapPin size={14} />
              Ver en el mapa
            </a>
          </div>
        </section>

        {/* Wave to gallery */}
        <div className="wave" style={{ background: THEME.tertiary }}>
          <svg
            viewBox="0 0 1440 50"
            preserveAspectRatio="none"
            style={{ display: "block", height: 50 }}
          >
            <path
              d="M0,20 C480,50 960,0 1440,30 L1440,0 L0,0 Z"
              fill={THEME.bg}
            />
          </svg>
        </div>

        {/* ════════ GALERÍA ════════ */}
        <section className="py-20 px-6" style={{ background: THEME.tertiary }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="s-label"
              style={{ color: "white", borderColor: "white" }}
            >
              Momentos
            </span>
            <h2
              className="frc text-4xl md:text-5xl italic mt-1"
              style={{ color: "white" }}
            >
              Galería 📸
            </h2>
          </motion.div>
          <Gallery images={data.media.gallery} />
          <p
            className="text-center text-xs font-bold tracking-widest uppercase mt-6"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Desliza para ver más
          </p>
        </section>

        {/* Wave to RSVP */}
        <div className="wave" style={{ background: THEME.bg }}>
          <svg
            viewBox="0 0 1440 50"
            preserveAspectRatio="none"
            style={{ display: "block", height: 50 }}
          >
            <path
              d="M0,0 C300,50 700,0 1100,40 C1280,52 1400,8 1440,0 L1440,50 L0,50 Z"
              fill={THEME.tertiary}
            />
          </svg>
        </div>

        {/* ════════ RSVP ════════ */}
        <section
          className="py-28 px-6 text-center"
          style={{ background: THEME.bg }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.38 }}
          >
            <div className="text-5xl mb-4">{THEME.rsvpEmoji}</div>
            <span
              className="s-label"
              style={{ color: THEME.primary, borderColor: THEME.primary }}
            >
              ¿Nos acompañas?
            </span>
            <h2 className="frc text-4xl md:text-5xl italic mt-3 mb-8">
              ¡Confirma tu lugar!
            </h2>
            <button className="rsvp-v2" onClick={() => setShowModal(true)}>
              Confirmar asistencia
            </button>
          </motion.div>
        </section>

        {/* ════════ FOOTER ════════ */}
        <footer className="footer-v2">
          <span
            className="frc italic"
            style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)" }}
          >
            {data.event.name}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase opacity-40">
              {data.event.date}
            </span>
            <span className="text-2xl">{THEME.emoji}</span>
          </div>
        </footer>

        {/* ════════ MODAL ════════ */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-6"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
              }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.32 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: THEME.card,
                  borderRadius: "28px",
                  padding: "2.5rem",
                  maxWidth: "400px",
                  width: "100%",
                  border: `2.5px solid ${THEME.ink}`,
                  boxShadow: `6px 6px 0 ${THEME.ink}`,
                }}
              >
                <div className="text-center mb-5">
                  <div className="text-5xl mb-3">{THEME.modalEmoji}</div>
                  <h3 className="frc text-2xl italic mb-2">¡Qué emoción!</h3>
                  <p className="text-sm font-medium opacity-50">
                    Te redirigiremos a WhatsApp para confirmar tu lugar en la
                    fiesta de <strong>{data.event.name}</strong>.
                  </p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-full text-sm font-bold"
                    style={{
                      border: `2px solid ${THEME.ink}`,
                      color: THEME.ink,
                      background: "transparent",
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className="flex-1 py-3 rounded-full text-sm font-bold text-white"
                    style={{
                      background: THEME.primary,
                      border: `2px solid ${THEME.ink}`,
                      boxShadow: `3px 3px 0 ${THEME.ink}`,
                    }}
                  >
                    ¡Confirmar! {THEME.confetti}
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
