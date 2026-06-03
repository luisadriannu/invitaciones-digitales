"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import type { CSSProperties } from "react";

import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";

import type { EventData } from "@/app/types/EventData";

interface Props {
  data: EventData;
}

/* ── Balloons ── */
const BALLOONS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  color: ["#FF8FAB", "#FFB347", "#B5EAD7", "#C7CEEA", "#FFDAC1", "#FF9AA2"][
    i % 6
  ],
  x: 5 + ((i * 9.5) % 90),
  size: 28 + (i % 3) * 10,
  delay: (i * 0.8) % 5,
  duration: 8 + (i % 4) * 2,
  sway: i % 2 === 0 ? 1 : -1,
}));

/* ── Stars ── */
const STARS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i * 5.1) % 98,
  y: (i * 4.7) % 85,
  size: 6 + (i % 3) * 5,
  delay: (i * 0.3) % 3,
  color: ["#FFD700", "#FF8FAB", "#B5EAD7", "#C7CEEA"][i % 4],
}));

export default function BirthdayCandy({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola 🎉 Confirmo mi asistencia al cumpleaños de ${data.event.name}`,
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
        style={{ fontFamily: "'Nunito', sans-serif" }}
        className="relative overflow-hidden"
        id="birthday-candy"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Pacifico&display=swap');

          #birthday-candy {
            background-color: #FFF5F7;
            color: #3D2B4A;
          }

          .pacifico { font-family: 'Pacifico', cursive; }

          /* ── Wavy section top ── */
          .wave-top {
            position: relative;
          }
          .wave-top::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 0; right: 0;
            height: 60px;
            background: inherit;
            clip-path: ellipse(55% 100% at 50% 0%);
            z-index: 1;
          }

          /* ── Balloon float ── */
          @keyframes balloonFloat {
            0%   { transform: translateY(110vh) translateX(0) rotate(-3deg); opacity: 0; }
            5%   { opacity: 0.85; }
            48%  { transform: translateY(50vh) translateX(calc(var(--sway) * 18px)) rotate(3deg); }
            52%  { transform: translateY(50vh) translateX(calc(var(--sway) * -10px)) rotate(-2deg); }
            95%  { opacity: 0.7; }
            100% { transform: translateY(-10vh) translateX(0) rotate(2deg); opacity: 0; }
          }
          .balloon {
            position: fixed;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
            animation: balloonFloat ease-in-out infinite;
          }
          .balloon-body {
            border-radius: 50% 50% 50% 50% / 55% 55% 45% 45%;
            position: relative;
          }
          .balloon-body::after {
            content: '';
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 1px;
            height: 14px;
            background: rgba(0,0,0,0.15);
          }
          .balloon-shine {
            position: absolute;
            top: 18%;
            left: 20%;
            width: 28%;
            height: 22%;
            border-radius: 50%;
            background: rgba(255,255,255,0.45);
          }

          /* ── Star twinkle ── */
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
            50%       { opacity: 1;   transform: scale(1.2) rotate(20deg); }
          }
          .star {
            position: absolute;
            pointer-events: none;
            animation: twinkle ease-in-out infinite;
          }

          /* ── Candy stripe sections ── */
          .candy-section {
            background-color: #FFF5F7;
            position: relative;
          }
          .mint-section {
            background-color: #EDFAF4;
            position: relative;
          }
          .peach-section {
            background-color: #FFF0E8;
            position: relative;
          }
          .lavender-section {
            background-color: #F3EEFF;
            position: relative;
          }

          /* ── Wavy divider SVG approach ── */
          .wavy-divider {
            width: 100%;
            line-height: 0;
            overflow: hidden;
          }

          /* ── Name title ── */
          .birthday-name {
            font-family: 'Pacifico', cursive;
            background: linear-gradient(135deg, #FF6B9D 0%, #FF8C42 50%, #FFCE54 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            filter: drop-shadow(0 3px 0 rgba(255,107,157,0.2));
          }

          /* ── Info card ── */
          .candy-card {
            background: white;
            border-radius: 24px;
            padding: 1.4rem 1.75rem;
            display: flex;
            align-items: center;
            gap: 1.1rem;
            box-shadow: 0 4px 0 rgba(0,0,0,0.06), 0 8px 30px rgba(255,107,157,0.08);
            border: 2px solid rgba(255,143,171,0.12);
            transition: transform 0.25s, box-shadow 0.25s;
          }
          .candy-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 0 rgba(0,0,0,0.05), 0 16px 40px rgba(255,107,157,0.15);
          }
          .candy-card .c-icon {
            width: 48px; height: 48px;
            border-radius: 16px;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            font-size: 1.4rem;
          }

          /* ── Age badge ── */
          .age-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: linear-gradient(135deg, #FFB347, #FFCE54);
            color: white;
            font-weight: 900;
            font-size: 1.25rem;
            padding: 0.5rem 1.5rem;
            border-radius: 999px;
            box-shadow: 0 4px 0 rgba(255,140,0,0.25), 0 8px 20px rgba(255,179,71,0.3);
            letter-spacing: 0.02em;
          }

          /* ── RSVP button ── */
          .rsvp-candy {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1.1rem 3rem;
            border-radius: 999px;
            background: linear-gradient(135deg, #FF6B9D, #FF8C42);
            color: white;
            font-size: 1.05rem;
            font-weight: 800;
            letter-spacing: 0.02em;
            border: none;
            cursor: pointer;
            box-shadow: 0 5px 0 rgba(220,60,100,0.35), 0 10px 30px rgba(255,107,157,0.35);
            transition: transform 0.15s, box-shadow 0.15s;
            font-family: 'Nunito', sans-serif;
          }
          .rsvp-candy:hover { transform: translateY(-2px); box-shadow: 0 8px 0 rgba(220,60,100,0.3), 0 16px 40px rgba(255,107,157,0.4); }
          .rsvp-candy:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(220,60,100,0.35); }

          /* ── Map button ── */
          .map-candy {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.85rem 2rem;
            border-radius: 999px;
            border: 2px solid rgba(255,107,157,0.3);
            color: #FF6B9D;
            font-size: 0.9rem;
            font-weight: 700;
            text-decoration: none;
            background: white;
            transition: background 0.25s, border-color 0.25s;
            box-shadow: 0 3px 0 rgba(255,107,157,0.15);
          }
          .map-candy:hover { background: #FFF0F5; border-color: rgba(255,107,157,0.6); }

          /* ── Dot pattern bg ── */
          .dot-pattern {
            background-image: radial-gradient(circle, rgba(255,107,157,0.1) 1.5px, transparent 1.5px);
            background-size: 22px 22px;
          }

          /* ── Section heading ── */
          .section-tag {
            display: inline-block;
            background: linear-gradient(135deg, rgba(255,107,157,0.15), rgba(255,140,66,0.15));
            border: 1.5px solid rgba(255,107,157,0.2);
            border-radius: 999px;
            padding: 0.3rem 1rem;
            font-size: 0.72rem;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #FF6B9D;
            margin-bottom: 0.75rem;
          }

          /* ── Squiggle underline ── */
          .squiggle {
            display: inline-block;
            position: relative;
          }
          .squiggle::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0; right: 0;
            height: 5px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 8'%3E%3Cpath d='M0 4 Q5 0 10 4 Q15 8 20 4 Q25 0 30 4 Q35 8 40 4' fill='none' stroke='%23FF8FAB' stroke-width='2'/%3E%3C/svg%3E") repeat-x center;
            background-size: 40px 8px;
          }
        `}</style>

        {/* ── Stars layer ── */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {STARS.map((s) => (
            <div
              key={s.id}
              className="star"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${2 + (s.id % 3)}s`,
                color: s.color,
                fontSize: s.size,
                lineHeight: 1,
              }}
            >
              ★
            </div>
          ))}
        </div>

        {/* ── Balloons ── */}
        {BALLOONS.map((b) => (
          <div
            key={b.id}
            className="balloon"
            style={
              {
                left: `${b.x}%`,
                width: b.size,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`,
                "--sway": b.sway,
              } as CSSProperties
            }
          >
            <div
              className="balloon-body"
              style={{
                width: b.size,
                height: b.size * 1.15,
                background: b.color,
              }}
            >
              <div className="balloon-shine" />
            </div>
          </div>
        ))}

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative min-h-screen candy-section dot-pattern flex flex-col items-center justify-center overflow-hidden">
          {/* Cover image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={data.media.coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-white/20 via-[#FFF5F7]/60 to-[#FFF5F7]" />
          </div>

          <div className="relative z-10 text-center px-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
              className="text-6xl mb-5"
            >
              🎂
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="section-tag"
            >
              ¡Estás invitado!
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="birthday-name mt-3 leading-tight"
              style={{ fontSize: "clamp(2.8rem, 11vw, 6rem)" }}
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.85, type: "spring", bounce: 0.55 }}
                className="mt-5 mb-4"
              >
                <span className="age-badge">🎈 {data.event.age} años 🎈</span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-[#9B7AA0]/70 text-base mt-3 font-medium"
            >
              {data.event.date}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-14 flex flex-col items-center gap-1"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="text-2xl"
              >
                🎀
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Wavy divider ── */}
        <div className="wavy-divider" style={{ background: "#EDFAF4" }}>
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            style={{ display: "block", height: 40 }}
          >
            <path
              d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,0 L0,0 Z"
              fill="#FFF5F7"
            />
          </svg>
        </div>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className="mint-section py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span
              className="section-tag"
              style={{
                color: "#34C985",
                borderColor: "rgba(52,201,133,0.25)",
                background: "rgba(52,201,133,0.1)",
              }}
            >
              Cuenta regresiva
            </span>
            <h2 className="pacifico text-3xl md:text-4xl mt-2 mb-10 text-[#2D6A4F]">
              ¡La fiesta empieza en…!
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ── Wavy divider ── */}
        <div className="wavy-divider" style={{ background: "#FFF0E8" }}>
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            style={{ display: "block", height: 40 }}
          >
            <path
              d="M0,10 C360,40 720,0 1080,30 C1260,45 1380,10 1440,20 L1440,0 L0,0 Z"
              fill="#EDFAF4"
            />
          </svg>
        </div>

        {/* ════════════════ INFO ════════════════ */}
        <section className="peach-section py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="section-tag"
              style={{
                color: "#FF7043",
                borderColor: "rgba(255,112,67,0.25)",
                background: "rgba(255,112,67,0.08)",
              }}
            >
              Detalles del evento
            </span>
            <h2 className="pacifico text-3xl md:text-4xl mt-2 text-[#6B2D0E]">
              ¿Cuándo y dónde? 🗓️
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto flex flex-col gap-4">
            {[
              {
                icon: "📅",
                bg: "#FFF0E8",
                label: "Fecha",
                value: data.event.date,
              },
              {
                icon: "⏰",
                bg: "#FFF5E0",
                label: "Hora",
                value: data.event.ceremonyHour,
              },
              {
                icon: "📍",
                bg: "#F0FFF4",
                label: "Lugar",
                value: data.location.reception,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="candy-card"
              >
                <div className="c-icon" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs font-700 uppercase tracking-widest text-[#9B7AA0]/60 mb-0.5"
                    style={{ fontWeight: 700 }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-700 text-[#3D2B4A] text-base"
                    style={{ fontWeight: 700 }}
                  >
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
              className="map-candy"
            >
              <MapPin size={15} />
              Ver ubicación
            </a>
          </div>
        </section>

        {/* ── Wavy divider ── */}
        <div className="wavy-divider" style={{ background: "#F3EEFF" }}>
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            style={{ display: "block", height: 40 }}
          >
            <path
              d="M0,25 C300,5 600,40 900,15 C1100,0 1300,35 1440,15 L1440,0 L0,0 Z"
              fill="#FFF0E8"
            />
          </svg>
        </div>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="lavender-section py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className="section-tag"
              style={{
                color: "#8B5CF6",
                borderColor: "rgba(139,92,246,0.25)",
                background: "rgba(139,92,246,0.08)",
              }}
            >
              Momentos especiales
            </span>
            <h2 className="pacifico text-3xl md:text-4xl mt-2 text-[#4C1D95]">
              Galería 📸
            </h2>
          </motion.div>
          <Gallery images={data.media.gallery} />
          <p className="text-center text-xs font-bold tracking-widest uppercase text-[#9B7AA0]/40 mt-6">
            Desliza para ver más
          </p>
        </section>

        {/* ── Wavy divider ── */}
        <div className="wavy-divider" style={{ background: "#FFF5F7" }}>
          <svg
            viewBox="0 0 1440 40"
            preserveAspectRatio="none"
            style={{ display: "block", height: 40 }}
          >
            <path
              d="M0,15 C480,40 960,0 1440,25 L1440,0 L0,0 Z"
              fill="#F3EEFF"
            />
          </svg>
        </div>

        {/* ════════════════ RSVP ════════════════ */}
        <section className="candy-section dot-pattern py-28 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <div className="text-5xl mb-5">🎊</div>
            <span className="section-tag">¿Nos acompañas?</span>
            <h2 className="pacifico text-3xl md:text-4xl mt-3 mb-8 text-[#3D2B4A]">
              ¡Confirma tu lugar!
            </h2>
            <button className="rsvp-candy" onClick={() => setShowModal(true)}>
              🎈 Confirmar asistencia
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-8 text-center candy-section border-t-2 border-dashed border-[rgba(255,107,157,0.2)]">
          <p className="text-sm font-bold text-[#9B7AA0]/50">
            Hecho con 🩷 para {data.event.name}
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
                background: "rgba(61,43,74,0.6)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.8, y: 40, rotate: -2 }}
                animate={{ scale: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.8, y: 40 }}
                transition={{ type: "spring", bounce: 0.45 }}
                style={{
                  background: "white",
                  borderRadius: "32px",
                  padding: "2.5rem",
                  maxWidth: "380px",
                  width: "100%",
                  boxShadow:
                    "0 8px 0 rgba(255,107,157,0.25), 0 20px 60px rgba(61,43,74,0.2)",
                  border: "2px solid rgba(255,143,171,0.2)",
                }}
              >
                <div className="text-center mb-5">
                  <div className="text-5xl mb-3">🥳</div>
                  <h3 className="pacifico text-2xl text-[#3D2B4A] mb-2">
                    ¡Qué emoción!
                  </h3>
                  <p className="text-[#9B7AA0]/70 text-sm font-medium">
                    Te redirigiremos a WhatsApp para confirmar tu lugar en la
                    fiesta.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 py-3 rounded-2xl text-[#9B7AA0] font-bold border-2 border-[rgba(155,122,160,0.2)] hover:border-[rgba(155,122,160,0.4)] transition text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setShowModal(false);
                    }}
                    className="flex-1 py-3 rounded-2xl text-white font-bold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #FF6B9D, #FF8C42)",
                      boxShadow: "0 4px 0 rgba(220,60,100,0.3)",
                    }}
                  >
                    ¡Voy! 🎈
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
