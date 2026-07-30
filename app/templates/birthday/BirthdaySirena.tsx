"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";

/* ────────────────────────────────────────────────────────────
   Concept: "Atlas de la Sirena" — una lámina de naturalista
   marino antiguo, no una fiesta de burbujas. Líneas doradas
   finas, camafeos grabados, tipografía editorial. Sin emojis.
   ──────────────────────────────────────────────────────────── */

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-sirena-display",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sirena-body",
});

const P = {
  abyss: "#0D1B2A",
  current: "#14304A",
  pearl: "#F4EFE6",
  seafoam: "#7FB5AE",
  coral: "#D97B5D",
  gold: "#C6A15B",
};

/* ── Ornamentación de línea (reemplaza emojis / formas sólidas) ── */

function TideRule({ color = P.gold }: { color?: string }) {
  return (
    <svg viewBox="0 0 400 16" className="w-40 h-4 mx-auto" aria-hidden="true">
      <path
        d="M0 8 C40 0, 60 16, 100 8 C140 0, 160 16, 200 8 C240 0, 260 16, 300 8 C340 0, 360 16, 400 8"
        fill="none"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TideHorizon({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className="sirena-tide-horizon"
      style={{ display: "block", width: "100%", height: 40 }}
      aria-hidden="true"
    >
      <path
        d="M0 20 C 180 5, 360 35, 540 20 C 720 5, 900 35, 1080 20 C 1260 5, 1440 35, 1440 20"
        fill="none"
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
}

function CameoFrame({ size = 132 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 132 160"
      width={size}
      height={size * (160 / 132)}
      aria-hidden="true"
    >
      <ellipse
        cx="66"
        cy="80"
        rx="58"
        ry="74"
        fill="none"
        stroke={P.gold}
        strokeWidth="1.25"
      />
      <ellipse
        cx="66"
        cy="80"
        rx="50"
        ry="65"
        fill="none"
        stroke={P.gold}
        strokeWidth="0.5"
        opacity="0.55"
      />
      {/* remolinos tipo cola de sirena, dibujo lineal */}
      <path
        d="M40 118 C 48 100, 44 84, 56 70 C 68 56, 66 40, 58 26"
        fill="none"
        stroke={P.gold}
        strokeWidth="0.75"
        opacity="0.5"
      />
      <path
        d="M92 118 C 84 100, 88 84, 76 70 C 64 56, 66 40, 74 26"
        fill="none"
        stroke={P.gold}
        strokeWidth="0.75"
        opacity="0.5"
      />
    </svg>
  );
}

function ShellMark({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M20 4 C27 10 32 18 33 27 C33 31 30 34 26 34 C23 34 21 31 20 26 C19 31 17 34 14 34 C10 34 7 31 7 27 C8 18 13 10 20 4 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M20 8 L20 26 M20 15 L14 12 M20 15 L26 12 M20 20 L15.5 18 M20 20 L24.5 18"
        stroke="currentColor"
        strokeWidth="0.6"
        fill="none"
      />
    </svg>
  );
}

const BUBBLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: 3 + ((i * 6.3) % 94),
  delay: (i * 0.85) % 11,
  duration: 11 + (i % 4) * 4,
  size: 4 + (i % 5) * 3,
}));

/** Burbujas ambientales — trazo fino, no relleno sólido, para que
 *  acompañen sin competir con el resto del sistema editorial. */
function SeaBubbles({ tone = P.seafoam }: { tone?: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {BUBBLES.map((b) => (
        <span
          key={b.id}
          className="sirena-bubble"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            borderColor: tone,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Resplandores sutiles tipo "rayos de luz" filtrándose bajo el agua. */
function SeaGlow() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="sirena-glow"
        style={{ top: "-8%", left: "6%", background: P.seafoam }}
      />
      <div
        className="sirena-glow"
        style={{ bottom: "-12%", right: "2%", background: P.gold }}
      />
    </div>
  );
}

export default function BirthdaySirena({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Confirmo mi asistencia al cumpleaños de ${data.event.name}`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  const infoItems = [
    {
      icon: <CalendarDays size={17} strokeWidth={1.3} />,
      label: "Fecha",
      value: data.event.date,
    },
    {
      icon: <Clock size={17} strokeWidth={1.3} />,
      label: "Hora",
      value: data.event.partyHour,
    },
    {
      icon: <MapPin size={17} strokeWidth={1.3} />,
      label: "Lugar",
      value: data.location.reception,
    },
  ];

  return (
    <div className={`${display.variable} ${body.variable}`}>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main id="sirena-main" style={{ fontFamily: "var(--font-sirena-body)" }}>
        {/* ════════════════ HERO ════════════════ */}
        <section
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaGlow />
          <SeaBubbles />

          <div className="relative w-full" style={{ height: "58svh" }}>
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
                background: `linear-gradient(to bottom, ${P.abyss}55 0%, transparent 45%, ${P.abyss} 100%)`,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 -mt-6">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-[11px] uppercase tracking-[0.35em] mb-5"
              style={{ color: P.seafoam }}
            >
              Una celebración bajo el mar
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-[3rem] md:text-[4.2rem] leading-[1.02]"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 600,
              }}
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="relative flex items-center justify-center mt-4"
              >
                <CameoFrame size={118} />
                <div className="absolute flex flex-col items-center">
                  <span
                    className="text-[2.2rem] leading-none"
                    style={{
                      fontFamily: "var(--font-sirena-display)",
                      color: P.gold,
                      fontWeight: 600,
                    }}
                  >
                    {data.event.age}
                  </span>
                  <span
                    className="text-[10px] uppercase tracking-[0.3em] mt-1"
                    style={{ color: P.pearl }}
                  >
                    años
                  </span>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="mt-6"
            >
              <TideRule />
              <p
                className="text-sm tracking-[0.15em] mt-3"
                style={{ color: P.pearl, opacity: 0.85 }}
              >
                {data.event.date}
              </p>
            </motion.div>

            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.6, repeat: Infinity }}
              className="mt-14 flex flex-col items-center gap-2"
              style={{ color: P.seafoam }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em]">
                Desciende
              </span>
              <span className="text-lg">⌄</span>
            </motion.div>
          </div>

          <TideHorizon color={P.gold} />
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section
          className="relative py-24 px-6 text-center overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaGlow />
          <SeaBubbles />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span
              className="text-[11px] uppercase tracking-[0.35em]"
              style={{ color: P.coral }}
            >
              Cuenta regresiva
            </span>
            <h2
              className="text-3xl md:text-4xl mt-3 mb-10"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 600,
              }}
            >
              La marea sube en
            </h2>
            <div
              className="max-w-md mx-auto p-8"
              style={{ border: `1px solid ${P.gold}55`, color: P.pearl }}
            >
              <CountDown data={data} />
            </div>
          </motion.div>
        </section>

        {/* ════════════════ INFO ════════════════ */}
        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaGlow />
          <SeaBubbles />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-center mb-14"
          >
            <span
              className="text-[11px] uppercase tracking-[0.35em]"
              style={{ color: P.seafoam }}
            >
              Detalles
            </span>
            <h2
              className="text-3xl md:text-4xl mt-3"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 600,
              }}
            >
              Cuándo y dónde
            </h2>
          </motion.div>

          {/* línea vertical: el orden aquí sí importa (fecha → hora → lugar) */}
          <div className="relative z-10 max-w-sm mx-auto pl-8">
            <div
              className="absolute left-[7px] top-1 bottom-1 w-px"
              style={{ background: `${P.gold}55` }}
            />
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative mb-9 last:mb-0"
              >
                <span
                  className="absolute -left-8 top-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                  style={{ background: P.abyss, border: `1px solid ${P.gold}` }}
                />
                <p
                  className="text-[10px] uppercase tracking-[0.3em] mb-1"
                  style={{ color: P.gold }}
                >
                  {item.label}
                </p>
                <p
                  className="text-lg flex items-center gap-2"
                  style={{ color: P.pearl }}
                >
                  <span style={{ color: P.seafoam }}>{item.icon}</span>
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>

          {data.location.mapUrl && (
            <div className="relative z-10 text-center mt-10">
              <a
                href={data.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.25em] pb-1"
                style={{ color: P.gold, borderBottom: `1px solid ${P.gold}55` }}
              >
                Ver ubicación
              </a>
            </div>
          )}
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaGlow />
          <SeaBubbles />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-center mb-12"
          >
            <span
              className="text-[11px] uppercase tracking-[0.35em]"
              style={{ color: P.coral }}
            >
              Postales
            </span>
            <h2
              className="text-3xl md:text-4xl mt-3"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 600,
              }}
            >
              Del fondo del mar
            </h2>
          </motion.div>

          <div className="relative z-10">
            <Gallery images={data.media.gallery} />
          </div>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section
          className="py-28 px-6 text-center relative overflow-hidden"
          style={{ background: P.current }}
        >
          <SeaGlow />
          <SeaBubbles tone={P.gold} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <ShellMark
              className="mx-auto mb-6"
              style={{ width: 30, height: 30, color: P.gold }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.35em]"
              style={{ color: P.seafoam }}
            >
              Nos encantaría verte ahí
            </span>
            <h2
              className="text-3xl md:text-4xl mt-3 mb-9"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 600,
              }}
            >
              Confirma tu lugar
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="px-10 py-3.5 text-sm uppercase tracking-[0.25em] transition-opacity hover:opacity-90"
              style={{ background: P.coral, color: P.abyss, fontWeight: 500 }}
            >
              Confirmar asistencia
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer
          className="py-10 flex flex-col items-center gap-2"
          style={{ background: P.abyss, color: P.pearl }}
        >
          <ShellMark style={{ width: 20, height: 20, color: P.gold }} />
          <span
            className="text-sm tracking-[0.1em]"
            style={{ fontFamily: "var(--font-sirena-display)" }}
          >
            {data.event.name}
          </span>
          <span className="text-[11px] tracking-[0.2em] opacity-60">
            {data.event.date}
          </span>
        </footer>

        {/* ════════════════ MODAL ════════════════ */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-6"
              style={{
                background: `${P.abyss}CC`,
                backdropFilter: "blur(6px)",
              }}
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm p-10 text-center"
                style={{ background: P.pearl }}
              >
                <ShellMark
                  className="mx-auto mb-5"
                  style={{ width: 26, height: 26, color: P.coral }}
                />
                <h3
                  className="text-2xl mb-4"
                  style={{
                    fontFamily: "var(--font-sirena-display)",
                    color: P.abyss,
                    fontWeight: 600,
                  }}
                >
                  Bajo el mar
                </h3>
                <p
                  className="text-sm mb-8"
                  style={{ color: P.abyss, opacity: 0.75 }}
                >
                  Te llevaremos a WhatsApp para confirmar tu lugar en la fiesta
                  de{" "}
                  <strong style={{ color: P.coral }}>{data.event.name}</strong>.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 text-xs uppercase tracking-[0.2em]"
                    style={{ border: `1px solid ${P.abyss}33`, color: P.abyss }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className="flex-1 py-3 text-xs uppercase tracking-[0.2em]"
                    style={{
                      background: P.coral,
                      color: P.abyss,
                      fontWeight: 500,
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        .sirena-tide-horizon path {
          animation: sirenaTideDrift 9s ease-in-out infinite;
        }
        @keyframes sirenaTideDrift {
          0%,
          100% {
            stroke-dashoffset: 0;
            opacity: 0.55;
          }
          50% {
            stroke-dashoffset: 20;
            opacity: 0.9;
          }
        }

        .sirena-bubble {
          position: absolute;
          bottom: -24px;
          border-radius: 9999px;
          border: 1px solid;
          background: transparent;
          opacity: 0;
          animation-name: sirenaBubbleRise;
          animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        @keyframes sirenaBubbleRise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          8% {
            opacity: 0.55;
          }
          92% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-720px) translateX(16px);
            opacity: 0;
          }
        }

        .sirena-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 9999px;
          filter: blur(90px);
          opacity: 0.14;
          animation: sirenaGlowDrift 14s ease-in-out infinite;
        }
        @keyframes sirenaGlowDrift {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -16px) scale(1.06);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sirena-tide-horizon path,
          .sirena-bubble,
          .sirena-glow {
            animation: none;
          }
          .sirena-bubble {
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
}

interface Props {
  data: EventData;
}
