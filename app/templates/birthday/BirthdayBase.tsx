"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, CalendarDays, PartyPopper } from "lucide-react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";

/* ─────────────────────────────────────────
   🎨 PERSONALIZACIÓN — cambia estos valores
───────────────────────────────────────── */
const THEME = {
  accent1: "#FF6B9D", // rosa vibrante
  accent2: "#A78BFA", // púrpura
  accent3: "#FFE66D", // amarillo neón
  emoji: "🎂",
  rsvpEmoji: "🎊",
};

interface Props {
  data: EventData;
}

/* ── Confetti pieces ── */
const CONFETTI = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 5.4) % 93),
  delay: (i * 0.35) % 6,
  duration: 6 + (i % 5),
  size: 5 + (i % 4) * 3,
  opacity: 0.35 + (i % 3) * 0.15,
  round: i % 3 === 0,
  colors: ["#FF6B9D", "#A78BFA", "#FFE66D", "#4ECDC4", "#FF9F43"],
}));

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

export default function BirthdayBase({ data }: Props) {
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

      <main id="bday-main">
        {/* ── Confetti ── */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D1A]/30 via-transparent to-[#0D0D1A]" />
          </div>

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
              className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border border-white/20 bg-white/5"
              style={{ color: THEME.accent1 }}
            >
              Estás invitado
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="bday-name mb-5"
              style={{ fontSize: "clamp(3rem, 13vw, 7rem)" }}
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", bounce: 0.55 }}
                className="bday-age-badge mb-5"
              >
                <span className="bday-fraunces italic text-4xl font-bold text-white leading-none">
                  {data.event.age}
                </span>
                <span className="bday-jakarta text-xs font-extrabold uppercase tracking-widest text-white/50">
                  años
                </span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="bday-jakarta text-xs font-semibold uppercase tracking-[0.25em] text-white/35"
            >
              {data.event.date}
            </motion.p>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
              className="mt-12 bday-jakarta text-xs font-bold uppercase tracking-widest text-white/20"
            >
              ↓ desliza
            </motion.div>
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <Wave fill="#0D0D1A" bg="rgba(167,139,250,0.15)" />

        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,107,157,0.12) 0%, rgba(167,139,250,0.18) 100%)",
          }}
        >
          {/* Glow orbs */}
          <div
            className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${THEME.accent1}18` }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${THEME.accent2}18` }}
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-center"
          >
            <span
              className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border inline-block mb-4"
              style={{
                color: THEME.accent3,
                borderColor: `${THEME.accent3}50`,
              }}
            >
              Cuenta regresiva
            </span>
            <h2 className="bday-fraunces italic text-4xl md:text-5xl font-light text-white mb-12">
              La fiesta empieza en…
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        <Wave fill="rgba(167,139,250,0.15)" bg="#0D0D1A" />

        {/* ════════════════ INFO ════════════════ */}
        <section className="py-20 px-6 bg-[#0D0D1A]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border inline-block mb-4"
              style={{
                color: THEME.accent1,
                borderColor: `${THEME.accent1}50`,
              }}
            >
              Detalles
            </span>
            <h2 className="bday-fraunces italic text-4xl md:text-5xl font-light text-white">
              ¿Cuándo y dónde?
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto flex flex-col gap-4">
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bday-glass-card flex items-center gap-4 p-5"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${THEME.accent2}25`,
                    color: THEME.accent2,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="bday-jakarta text-[10px] font-extrabold uppercase tracking-widest mb-0.5 text-white/35">
                    {item.label}
                  </p>
                  <p className="bday-jakarta text-base font-700 text-white font-bold">
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
              className="bday-jakarta inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold border transition-all hover:-translate-y-0.5"
              style={{
                color: THEME.accent2,
                borderColor: `${THEME.accent2}50`,
                background: `${THEME.accent2}10`,
              }}
            >
              <MapPin size={14} />
              Ver en el mapa
            </a>
          </div>
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <Wave fill="#0D0D1A" bg="rgba(255,107,157,0.12)" />

        <section
          className="py-20 px-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,107,157,0.12) 0%, rgba(167,139,250,0.12) 100%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border inline-block mb-4"
              style={{
                color: THEME.accent3,
                borderColor: `${THEME.accent3}50`,
              }}
            >
              Momentos
            </span>
            <h2 className="bday-fraunces italic text-4xl md:text-5xl font-light text-white">
              Galería 📸
            </h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p className="bday-jakarta text-center text-[10px] font-bold tracking-widest uppercase text-white/25 mt-6">
            Desliza para ver más
          </p>
        </section>

        <Wave fill="rgba(167,139,250,0.12)" bg="#0D0D1A" />

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-28 px-6 text-center bg-[#0D0D1A] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
              style={{
                background: `radial-gradient(circle, ${THEME.accent2}, ${THEME.accent1})`,
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.35 }}
            className="relative"
          >
            <div className="text-5xl mb-5">{THEME.rsvpEmoji}</div>
            <span
              className="bday-jakarta text-[10px] font-extrabold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border inline-block mb-4"
              style={{
                color: THEME.accent1,
                borderColor: `${THEME.accent1}50`,
              }}
            >
              ¿Nos acompañas?
            </span>
            <h2 className="bday-fraunces italic text-4xl md:text-5xl font-light text-white mt-2 mb-10">
              ¡Confirma tu lugar!
            </h2>
            <button
              className="bday-rsvp-btn"
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
            background: "rgba(255,255,255,0.03)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
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
            <span className="bday-jakarta text-xs font-bold tracking-widest uppercase text-white/25">
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
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-[6px]"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.32 }}
                onClick={(e) => e.stopPropagation()}
                className="bday-glass-card w-full max-w-sm p-10 text-center"
                style={{ background: "rgba(20,15,35,0.95)" }}
              >
                <div className="text-5xl mb-4">🥳</div>
                <h3 className="bday-fraunces italic text-2xl text-white mb-2">
                  ¡Qué emoción!
                </h3>
                <p className="bday-jakarta text-sm text-white/50 mb-8 leading-relaxed">
                  Te redirigiremos a WhatsApp para confirmar tu lugar en la
                  fiesta de{" "}
                  <strong className="text-white/80">{data.event.name}</strong>.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bday-jakarta flex-1 py-3 rounded-full text-sm font-bold border border-white/15 text-white/50 hover:bg-white/5 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className="bday-rsvp-btn flex-1 py-3 !px-0 text-sm"
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
