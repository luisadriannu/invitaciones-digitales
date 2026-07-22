"use client";

import { useState, useCallback, memo, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import {
  MapPin,
  Award,
  Utensils,
  Clock,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface Props {
  data: EventData;
}

const PALETTE = {
  ink: "#1c1712",
  inkSoft: "rgba(28,23,18,0.7)",
  parchment: "#f3e9d8",
  parchmentDim: "#e8dcc6",
  gold: "#b8905a",
  goldBright: "#d4ab74",
  burgundy: "#5c1f2e",
  rose: "#d8b8a8",
} as const;

const FLOATERS = Object.freeze(
  Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: 4 + ((i * 7.1) % 92),
    delay: (i * 0.7) % 9,
    duration: 10 + (i % 5),
    size: i % 3 === 0 ? 3 : 2,
  })),
);

const FloatingParticles = memo(function FloatingParticles() {
  return (
    <>
      {FLOATERS.map((p) => (
        <div
          key={p.id}
          className="grad-particle"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: PALETTE.gold,
          }}
        />
      ))}
    </>
  );
});

/** Ornamental rule with a small emblem in the middle — reads as a wax-seal
 * flourish rather than a generic divider. */
const FallingParticles = memo(function FallingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.round(2 + ((i * 3.37) % 96)),
        delay: (i * 0.55) % 12,
        duration: 7 + (i % 8),
        size: i % 4 === 0 ? 6 : i % 3 === 0 ? 4 : 3,
        opacity: 0.12 + (i % 5) * 0.04,
        drift: ((i * 2.1) % 40) - 20,
        isGlow: i % 6 === 0,
      })),
    [],
  );

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="eleg-falling"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
            background: p.isGlow
              ? `radial-gradient(circle, ${PALETTE.goldBright}, transparent)`
              : PALETTE.gold,
            borderRadius: p.isGlow ? "50%" : "1px",
            boxShadow: p.isGlow ? `0 0 8px ${PALETTE.gold}` : "none",
            transform: `rotate(${p.drift}deg)`,
          }}
        />
      ))}
    </>
  );
});

const SealDivider = memo(function SealDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div
        className="h-px flex-1 max-w-[90px]"
        style={{
          background: `linear-gradient(to right, transparent, ${PALETTE.gold})`,
        }}
      />
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{
          border: `1px solid ${PALETTE.gold}`,
          color: PALETTE.gold,
        }}
      >
        <Sparkles size={13} strokeWidth={1.5} />
      </div>
      <div
        className="h-px flex-1 max-w-[90px]"
        style={{
          background: `linear-gradient(to left, transparent, ${PALETTE.gold})`,
        }}
      />
    </div>
  );
});

const Eyebrow = memo(function Eyebrow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      className="text-[11px] tracking-[0.35em] uppercase font-medium mb-3 text-center"
      style={{ color: PALETTE.gold }}
    >
      {children}
    </p>
  );
});

export default function GraduationElegant({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPasses, setSelectedPasses] = useState(1);
  const [showSplash, setShowSplash] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const portraitImage = data.media.gallery[1] ?? data.media.coverImage;

  const handleOpenDoors = useCallback(() => {
    setDoorsOpen(true);
    timerRef.current = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

  const confirmAttendance = useCallback(() => {
    const passText =
      selectedPasses === 1
        ? "Necesito 1 pase"
        : `Necesito ${selectedPasses} pases`;
    const message = encodeURIComponent(
      `Hola, confirmo mi asistencia a la graduación de ${data.event.name}. ${passText}.`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  }, [data.event.name, data.contact.phone, selectedPasses]);

  const handleCloseModal = useCallback(() => setOpenModal(false), []);
  const handleOpenModal = useCallback(() => setOpenModal(true), []);

  return (
    <>
      {/* ════════════════ DOORS SPLASH ════════════════ */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="doors"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: PALETTE.ink }}
          >
            {/* Left door */}
            <motion.div
              animate={doorsOpen ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-end overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${PALETTE.ink}, ${PALETTE.burgundy}40)`,
                borderRight: `1px solid ${PALETTE.gold}30`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 80% 50%, ${PALETTE.gold}08, transparent 60%)`,
                }}
              />
              <div
                className="absolute right-0 top-0 h-full w-px"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${PALETTE.gold}40, transparent)`,
                }}
              />
            </motion.div>

            {/* Right door */}
            <motion.div
              animate={doorsOpen ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-start overflow-hidden"
              style={{
                background: `linear-gradient(-135deg, ${PALETTE.ink}, ${PALETTE.burgundy}40)`,
                borderLeft: `1px solid ${PALETTE.gold}30`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, ${PALETTE.gold}08, transparent 60%)`,
                }}
              />
              <div
                className="absolute left-0 top-0 h-full w-px"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${PALETTE.gold}40, transparent)`,
                }}
              />
            </motion.div>

            {/* Center content — click to open */}
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                doorsOpen
                  ? { opacity: 0, scale: 0.9 }
                  : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.4 }}
              onClick={handleOpenDoors}
              className="relative z-10 flex flex-col items-center gap-6 cursor-pointer bg-transparent border-none outline-none"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  border: `1.5px solid ${PALETTE.gold}`,
                  background: `${PALETTE.burgundy}50`,
                  color: PALETTE.goldBright,
                  boxShadow: `0 0 30px ${PALETTE.gold}20, 0 0 60px ${PALETTE.burgundy}30`,
                }}
              >
                <GraduationCap size={34} strokeWidth={1.3} />
              </motion.div>

              <div className="text-center">
                <p
                  className="text-sm tracking-[0.25em] uppercase font-medium mb-2"
                  style={{ color: PALETTE.gold }}
                >
                  Has sido invitado a
                </p>
                <p
                  className="eleg-font-display text-2xl md:text-3xl italic font-light"
                  style={{ color: PALETTE.parchment }}
                >
                  {data.event.name}
                </p>
              </div>

              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex flex-col items-center gap-1 mt-2"
              >
                <p
                  className="text-[10px] tracking-[0.3em] uppercase font-medium"
                  style={{ color: PALETTE.rose }}
                >
                  Presiona para abrir la invitación
                </p>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    border: `1px solid ${PALETTE.gold}50`,
                    color: PALETTE.gold,
                  }}
                >
                  <ChevronRight size={18} strokeWidth={1.5} />
                </div>
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {data.media.music && <MusicButton src={data.media.music} autoPlay />}

      <main
        style={{
          fontFamily: "'Jost', sans-serif",
          background: PALETTE.ink,
          color: PALETTE.parchment,
        }}
        className="relative overflow-hidden"
      >
        <FloatingParticles />
        <FallingParticles />

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative h-screen flex flex-col items-center justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={data.media.gallery[1] ?? data.media.coverImage}
              alt={data.event.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Vignette only at the edges + bottom — the photo stays the star */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, ${PALETTE.ink}00 0%, ${PALETTE.ink}00 45%, ${PALETTE.ink}cc 88%, ${PALETTE.ink} 100%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                boxShadow: `inset 0 0 140px 40px ${PALETTE.ink}`,
                opacity: 0.55,
              }}
            />
          </div>

          {/* Ornamental frame — reinforces the "certificate window" motif */}
          <div
            className="absolute inset-4 md:inset-8 pointer-events-none z-10"
            style={{ border: `1px solid ${PALETTE.gold}55` }}
          />

          <div className="relative z-10 text-center px-8 pb-24 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="tracking-[0.4em] uppercase mb-5 text-[11px] font-medium"
              style={{ color: PALETTE.rose }}
            >
              Ceremonia de Graduación
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 1, ease: "easeOut" }}
              className="eleg-font-display text-5xl md:text-7xl leading-tight mb-7"
              style={{ color: PALETTE.parchment }}
            >
              <span className="italic font-light block">{data.event.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="w-16 h-px mb-6"
              style={{ background: PALETTE.gold }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-sm tracking-[0.2em] uppercase font-light"
              style={{ color: PALETTE.parchmentDim }}
            >
              {data.event.date}
            </motion.p>

            {data.event.partyHour && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-sm tracking-[0.15em] uppercase font-light mt-2"
                style={{ color: PALETTE.goldBright }}
              >
                {data.event.partyHour}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm opacity-40"
                style={{ color: PALETTE.gold }}
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ RETRATO + FRASE ════════════════ */}
        <section className="relative z-10 py-24 px-6">
          <SealDivider />

          {/* Medallion portrait — a diploma seal, not a generic circle crop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-8 relative"
            style={{ width: 208, height: 208 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                border: `2px solid ${PALETTE.gold}`,
                boxShadow: `0 0 0 6px ${PALETTE.ink}, 0 0 0 7px ${PALETTE.gold}55`,
              }}
            />
            <div className="absolute inset-[10px] rounded-full overflow-hidden">
              <Image
                src={portraitImage}
                alt={data.event.name}
                fill
                sizes="208px"
                className="object-cover"
              />
            </div>
            {/* small laurel-like ticks around the ring for the "medal" read */}
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 w-[2px] h-[6px] rounded-full"
                style={{
                  background: PALETTE.gold,
                  opacity: 0.5,
                  transform: `rotate(${i * 15}deg) translate(-50%, -113px)`,
                }}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-xl mx-auto mt-12 text-center"
          >
            <p
              className="eleg-font-display text-[1.3rem] italic font-light leading-relaxed"
              style={{ color: PALETTE.rose }}
            >
              &ldquo;{data.event.phrase}&rdquo;
            </p>
          </motion.div>

          <div className="mt-16">
            <SealDivider />
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section
          className="py-20 px-6"
          style={{ background: `${PALETTE.parchment}0d` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Eyebrow>Falta poco para el gran logro</Eyebrow>
            <h2
              className="eleg-font-display text-center text-3xl md:text-4xl font-light italic mb-12"
              style={{ color: PALETTE.parchment }}
            >
              Cuenta Regresiva
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ════════════════ DETALLES DEL EVENTO ════════════════ */}
        <section className="py-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Eyebrow>Detalles</Eyebrow>
            <h2
              className="eleg-font-display text-center text-3xl md:text-4xl font-light italic"
              style={{ color: PALETTE.parchment }}
            >
              Información del Evento
            </h2>
          </motion.div>

          <div className="max-w-xl mx-auto flex flex-col gap-4">
            {[
              {
                show: !!data.event.partyHour,
                icon: Clock,
                label: "Hora",
                value: data.event.partyHour,
              },
              {
                show: !!data.location.event,
                icon: Award,
                label: "Lugar",
                value: data.location.event,
              },
              {
                show: !!data.location.reception,
                icon: Utensils,
                label: "Recepción",
                value: data.location.reception,
              },
            ]
              .filter((row) => row.show)
              .map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-4 p-5 rounded-lg"
                  style={{
                    background: `${PALETTE.parchment}08`,
                    border: `1px solid ${PALETTE.gold}30`,
                  }}
                >
                  <div className="eleg-gold-circle">
                    <row.icon size={17} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-widest mb-0.5 font-medium"
                      style={{ color: PALETTE.gold }}
                    >
                      {row.label}
                    </p>
                    <p
                      className="font-light"
                      style={{ color: PALETTE.parchment }}
                    >
                      {row.value}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {data.location.mapUrl && (
            <div className="text-center mt-12">
              <h3
                className="eleg-font-display text-3xl md:text-4xl font-light italic mb-6"
                style={{ color: PALETTE.parchment }}
              >
                Ubicación
              </h3>
              {data.suscription === "premiun" ? (
                <iframe
                  src={data.location.mapUrl}
                  height="250"
                  className="w-full rounded-lg"
                  style={{ border: `1px solid ${PALETTE.gold}40` }}
                  loading="lazy"
                />
              ) : (
                <a
                  href={data.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm tracking-wide transition hover:opacity-80"
                  style={{
                    border: `1px solid ${PALETTE.gold}`,
                    color: PALETTE.goldBright,
                  }}
                >
                  <MapPin size={15} />
                  Ver mapa de accesos
                </a>
              )}
            </div>
          )}
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-16 px-6">
          <SealDivider />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 mt-10"
          >
            <Eyebrow>Momentos Especiales</Eyebrow>
            <h2
              className="eleg-font-display text-center text-3xl md:text-4xl font-light italic"
              style={{ color: PALETTE.parchment }}
            >
              Galería de Fotos
            </h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p
            className="text-center text-[11px] tracking-[0.2em] uppercase mt-4"
            style={{ color: PALETTE.gold }}
          >
            Desliza para ver la sesión fotográfica
          </p>
        </section>

        {/* ════════════════ NO FALTES ════════════════ */}
        <section
          className="py-20 px-6 text-center"
          style={{ background: `${PALETTE.parchment}0d` }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="eleg-font-display text-2xl md:text-3xl font-light italic mb-3"
              style={{ color: PALETTE.parchment }}
            >
              No faltes
            </p>
            <p
              className="text-sm tracking-widest uppercase font-medium"
              style={{ color: PALETTE.gold }}
            >
              Te esperamos con mucho cariño
            </p>
          </motion.div>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-24 px-6 text-center">
          <SealDivider />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="mt-14"
          >
            <Eyebrow>Confirma tu Asistencia</Eyebrow>
            <br />
            {/* Wax-seal button — the deliberate signature moment */}
            <button
              onClick={handleOpenModal}
              className="relative w-40 h-40 rounded-full mx-auto flex flex-col items-center justify-center gap-1 transition hover:scale-[1.03]"
              style={{
                background: `radial-gradient(circle at 35% 30%, ${PALETTE.burgundy}, ${PALETTE.ink})`,
                border: `1px solid ${PALETTE.gold}`,
                boxShadow: `0 0 0 6px ${PALETTE.ink}, 0 0 0 7px ${PALETTE.gold}66, 0 10px 30px rgba(0,0,0,0.5)`,
              }}
            >
              <GraduationCap
                size={22}
                strokeWidth={1.4}
                style={{ color: PALETTE.goldBright }}
              />
              <span
                className="text-[11px] tracking-[0.2em] uppercase font-medium"
                style={{ color: PALETTE.parchment }}
              >
                Confirmar asistencia
              </span>
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer
          className="py-10 text-center"
          style={{ borderTop: `1px solid ${PALETTE.gold}30` }}
        >
          <p className="eleg-footer-text">
            Fiesta de graduación — {data.event.name}
          </p>
        </footer>

        {/* ════════════════ MODAL ════════════════ */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="eleg-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.88, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 30 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="max-w-sm w-full rounded-2xl p-8 text-center"
                style={{
                  background: PALETTE.ink,
                  border: `1px solid ${PALETTE.gold}55`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{
                    border: `1px solid ${PALETTE.gold}`,
                    background: `${PALETTE.burgundy}40`,
                    color: PALETTE.goldBright,
                  }}
                >
                  <GraduationCap size={22} strokeWidth={1.4} />
                </div>
                <h3
                  className="eleg-font-display text-2xl font-light italic mb-2"
                  style={{ color: PALETTE.parchment }}
                >
                  Confirmar Asistencia
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: `${PALETTE.parchment}99` }}
                >
                  Selecciona cuántos pases necesitas para la ceremonia.
                </p>

                <div className="mb-8">
                  <label
                    className="block text-[10px] uppercase tracking-widest mb-2 font-medium"
                    style={{ color: PALETTE.gold }}
                  >
                    Número de pases
                  </label>
                  <select
                    value={selectedPasses}
                    onChange={(e) => setSelectedPasses(Number(e.target.value))}
                    className="eleg-select"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option
                        key={n}
                        value={n}
                        style={{
                          background: PALETTE.ink,
                          color: PALETTE.parchment,
                        }}
                      >
                        {n} {n === 1 ? "pase" : "pases"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="flex-1 py-3 rounded-full text-sm transition"
                    style={{
                      color: PALETTE.rose,
                      border: `1px solid ${PALETTE.gold}40`,
                      background: "transparent",
                    }}
                  >
                    Regresar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      handleCloseModal();
                    }}
                    className="flex-1 py-3 rounded-full text-sm font-medium transition hover:opacity-90"
                    style={{
                      background: `linear-gradient(135deg, ${PALETTE.goldBright}, ${PALETTE.gold})`,
                      color: PALETTE.ink,
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
    </>
  );
}
