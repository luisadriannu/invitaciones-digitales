"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, CalendarDays, ChevronDown } from "lucide-react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sirena-display",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sirena-body",
});

const P = {
  abyss: "#0D1B2A",
  current: "#14304A",
  pearl: "#F4EFE6",
  seafoam: "#7FB5AE",
  coral: "#D97B5D",
  gold: "#C6A15B",
  pop: "#E8A87C",
  deep: "#1B2D45",
};

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

const BUBBLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: 2 + ((i * 4.1) % 96),
  delay: (i * 0.6) % 12,
  duration: 10 + (i % 5) * 3,
  size: 3 + (i % 6) * 3,
  color: i % 3 === 0 ? P.coral : i % 3 === 1 ? P.seafoam : P.gold,
  opacity: 0.4 + (i % 3) * 0.2,
}));

function SeaBubbles() {
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
            borderColor: b.color,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  label,
  title,
  labelColor = P.coral,
  titleColor = P.pearl,
}: {
  label: string;
  title: string;
  labelColor?: string;
  titleColor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className="text-center mb-14"
    >
      <span
        className="text-xs uppercase tracking-[0.3em]"
        style={{ color: labelColor }}
      >
        {label}
      </span>
      <h2
        className="text-4xl md:text-5xl mt-3"
        style={{
          fontFamily: "var(--font-sirena-display)",
          color: titleColor,
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
    </motion.div>
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
      icon: <CalendarDays size={18} strokeWidth={1.5} />,
      label: "Fecha",
      value: data.event.date,
    },
    {
      icon: <Clock size={18} strokeWidth={1.5} />,
      label: "Hora",
      value: data.event.partyHour,
    },
    {
      icon: <MapPin size={18} strokeWidth={1.5} />,
      label: "Lugar",
      value: data.location.reception,
    },
  ];

  return (
    <div className={`${display.variable} ${body.variable}`}>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main style={{ fontFamily: "var(--font-sirena-body)" }}>
        {/* ═══ HERO ═══ */}
        <section
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaBubbles />

          <div className="absolute inset-0">
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
                background: `linear-gradient(to bottom,
                  ${P.abyss}88 0%,
                  ${P.abyss}22 35%,
                  ${P.abyss}44 65%,
                  ${P.abyss}F0 100%)`,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 min-h-screen">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs uppercase tracking-[0.4em] mb-6"
              style={{ color: "#fff" }}
            >
              Una celebración bajo el mar
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-5xl md:text-7xl leading-[1.05] max-w-2xl"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 700,
              }}
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8"
              >
                <div
                  className="flex items-center gap-3 px-6 py-3 rounded-full"
                  style={{
                    background: `${P.pearl}15`,
                    backdropFilter: "blur(8px)",
                    border: `1px solid ${P.gold}44`,
                  }}
                >
                  <span
                    className="text-3xl"
                    style={{
                      fontFamily: "var(--font-sirena-display)",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    {data.event.age}
                  </span>
                  <span
                    className="text-sm tracking-[0.25em] uppercase"
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
              transition={{ delay: 0.9 }}
              className="mt-8"
            >
              <p
                className="text-base tracking-[0.2em]"
                style={{ color: P.pearl, opacity: 0.8 }}
              >
                {data.event.date}
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
              style={{ color: P.coral }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-70">
                Descubre más
              </span>
              <ChevronDown size={20} />
            </motion.div>
          </div>
        </section>

        {/* ═══ COUNTDOWN ═══ */}
        <section
          className="relative py-28 px-6 text-center overflow-hidden"
          style={{ background: P.deep }}
        >
          <SeaBubbles />

          <SectionTitle
            label="Cuenta regresiva"
            title="La marea sube en"
            labelColor={P.coral}
            titleColor={P.pearl}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-md mx-auto"
            style={{
              background: `${P.pearl}10`,
              backdropFilter: "blur(12px)",
              border: `1px solid ${P.coral}33`,
              borderRadius: 24,
              padding: "2.5rem 2rem",
              color: "#fff",
            }}
          >
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ═══ INFO ═══ */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaBubbles />

          <SectionTitle
            label="Detalles"
            title="Cuándo y dónde"
            labelColor={P.seafoam}
            titleColor={P.pearl}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-lg mx-auto grid gap-5"
          >
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5 p-5 rounded-2xl"
                style={{
                  background: `${P.pearl}08`,
                  border: `1px solid ${P.gold}22`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${P.coral}22`, color: P.coral }}
                >
                  {item.icon}
                </div>
                <div className="text-left">
                  <p
                    className="text-[10px] uppercase tracking-[0.3em] mb-0.5"
                    style={{ color: P.gold }}
                  >
                    {item.label}
                  </p>
                  <p className="text-lg" style={{ color: P.pearl }}>
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}

            {data.location.mapUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-4"
              >
                <a
                  href={data.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] py-3 px-8 rounded-full transition-all hover:opacity-80"
                  style={{
                    color: P.pearl,
                    background: `${P.seafoam}22`,
                    border: `1px solid ${P.seafoam}55`,
                  }}
                >
                  <MapPin size={14} />
                  Ver ubicación
                </a>
              </motion.div>
            )}
          </motion.div>
        </section>

        {/* ═══ GALERÍA ═══ */}
        <section
          className="relative py-28 px-6 overflow-hidden"
          style={{ background: P.deep }}
        >
          <SeaBubbles />

          <SectionTitle
            label="Postales"
            title="Del fondo del mar"
            labelColor={P.coral}
            titleColor={P.pearl}
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <Gallery images={data.media.gallery} />
          </div>
        </section>

        {/* ═══ RSVP ═══ */}
        <section
          className="relative py-32 px-6 text-center overflow-hidden"
          style={{ background: P.abyss }}
        >
          <SeaBubbles />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <ShellMark
              className="mx-auto mb-8"
              style={{ width: 32, height: 32, color: P.coral }}
            />
            <span
              className="text-xs uppercase tracking-[0.35em]"
              style={{ color: P.seafoam }}
            >
              Nos encantaría verte ahí
            </span>
            <h2
              className="text-4xl md:text-5xl mt-3 mb-10"
              style={{
                fontFamily: "var(--font-sirena-display)",
                color: P.pearl,
                fontWeight: 600,
              }}
            >
              Confirma tu lugar
            </h2>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowModal(true)}
              className="px-12 py-4 text-sm uppercase tracking-[0.25em] font-medium rounded-full transition-all"
              style={{ background: P.coral, color: P.abyss }}
            >
              Confirmar asistencia
            </motion.button>
          </motion.div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer
          className="py-12 flex flex-col items-center gap-3"
          style={{ background: P.abyss, borderTop: `1px solid ${P.gold}22` }}
        >
          <ShellMark style={{ width: 22, height: 22, color: P.gold }} />
          <span
            className="text-base tracking-[0.1em]"
            style={{ fontFamily: "var(--font-sirena-display)", color: P.pearl }}
          >
            {data.event.name}
          </span>
          <span
            className="text-xs tracking-[0.2em]"
            style={{ color: P.pearl, opacity: 0.5 }}
          >
            {data.event.date}
          </span>
        </footer>

        {/* ═══ MODAL ═══ */}
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
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm p-10 text-center rounded-3xl"
                style={{ background: P.deep, border: `1px solid ${P.gold}33` }}
              >
                <ShellMark
                  className="mx-auto mb-5"
                  style={{ width: 28, height: 28, color: P.coral }}
                />
                <h3
                  className="text-3xl mb-3"
                  style={{
                    fontFamily: "var(--font-sirena-display)",
                    color: P.pearl,
                    fontWeight: 600,
                  }}
                >
                  Bajo el mar
                </h3>
                <p
                  className="text-sm mb-8"
                  style={{ color: P.pearl, opacity: 0.7 }}
                >
                  Te llevaremos a WhatsApp para confirmar tu lugar en la fiesta
                  de <span style={{ color: P.coral }}>{data.event.name}</span>.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3.5 text-xs uppercase tracking-[0.2em] rounded-xl transition-opacity hover:opacity-70"
                    style={{ border: `1px solid ${P.pearl}33`, color: P.pearl }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className="flex-1 py-3.5 text-xs uppercase tracking-[0.2em] rounded-xl font-medium transition-opacity hover:opacity-80"
                    style={{ background: P.coral, color: P.abyss }}
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
        .sirena-bubble {
          position: absolute;
          bottom: -24px;
          border-radius: 9999px;
          border: 1.5px solid;
          background: transparent;
          opacity: 0;
          animation-name: sirenaBubbleRise;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes sirenaBubbleRise {
          0% {
            transform: translateY(0) translateX(0) scale(0.6);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
            transform: translateY(-40px) translateX(6px) scale(1);
          }
          85% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-800px) translateX(-12px) scale(0.8);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sirena-bubble {
            animation: none;
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}

interface Props {
  data: EventData;
}
