"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Clock, CalendarDays } from "lucide-react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";

/* ═══════════════════════════════════════════
   PALETA — "Bitácora de expedición"
   ═══════════════════════════════════════════ */
const T = {
  ink: "#16261C",
  inkDeep: "#0D160F",
  parchment: "#EDE3C8",
  amber: "#D98E34",
  amberLight: "#F2B85C",
  rust: "#B25139",
  fern: "#6B9071",
};

/* ── Huella de tres dedos ── */
const Footprint = React.memo(function Footprint({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <ellipse cx="12" cy="16.2" rx="5" ry="4" />
        <ellipse
          cx="6.6"
          cy="8.4"
          rx="2"
          ry="3.2"
          transform="rotate(-20 6.6 8.4)"
        />
        <ellipse cx="12" cy="6.2" rx="2" ry="3.6" />
        <ellipse
          cx="17.4"
          cy="8.4"
          rx="2"
          ry="3.2"
          transform="rotate(20 17.4 8.4)"
        />
      </g>
    </svg>
  );
});

/* ── Hoja de helecho ── */
const Leaf = React.memo(function Leaf({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 34"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1 C19 6 22 14 18 24 C15.5 30 12 33 12 33 C12 33 8.5 30 6 24 C2 14 5 6 12 1 Z"
        fill="currentColor"
      />
      <path
        d="M12 3 L12 31 M12 12 L7.5 9 M12 16 L16.5 13.5 M12 21 L8 19"
        stroke="rgba(13,22,15,0.35)"
        strokeWidth="0.6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
});

/* ── Racimo de helechos ── */
const FernCluster = React.memo(function FernCluster({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <path d="M60 140 C58 100 56 70 40 40 C48 55 56 75 60 95 C64 75 72 55 80 40 C64 70 62 100 60 140 Z" />
        <path
          d="M60 140 C58 105 50 80 22 58 C38 66 52 80 58 98 C56 78 50 60 34 40 C50 54 58 72 60 92 Z"
          opacity="0.75"
        />
        <path
          d="M60 140 C62 105 70 80 98 58 C82 66 68 80 62 98 C64 78 70 60 86 40 C70 54 62 72 60 92 Z"
          opacity="0.75"
        />
      </g>
    </svg>
  );
});

/* ── Lluvia de hojas ── */
const FALLING_LEAVES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: (i * 6.3) % 100,
  delay: (i * 1.7) % 14,
  duration: 13 + (i % 5) * 3,
  size: 14 + (i % 4) * 6,
  drift: 30 + (i % 3) * 20,
  spin: 180 + (i % 3) * 90,
  tone: [T.fern, T.amber, T.rust][i % 3],
  flip: i % 2 === 0 ? 1 : -1,
}));

function FallingLeaves() {
  return (
    <div className="leaf-rain" aria-hidden="true">
      {FALLING_LEAVES.map((leaf) => (
        <Leaf
          key={leaf.id}
          className="falling-leaf"
          style={
            {
              left: `${leaf.left}%`,
              width: leaf.size,
              height: leaf.size * 1.4,
              color: leaf.tone,
              opacity: 0.5,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              "--drift": `${leaf.drift * leaf.flip}px`,
              "--spin": `${leaf.spin * leaf.flip}deg`,
            } as unknown as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ── Divisor: línea punteada + huella ── */
function TrailDivider({ tone = T.amber }: { tone?: string }) {
  return (
    <div className="trail-divider" aria-hidden="true">
      <span
        className="trail-line"
        style={{
          background: `repeating-linear-gradient(to right, ${tone}55 0 6px, transparent 6px 14px)`,
        }}
      />
      <Footprint className="trail-footprint" style={{ color: tone }} />
      <span
        className="trail-line"
        style={{
          background: `repeating-linear-gradient(to right, ${tone}55 0 6px, transparent 6px 14px)`,
        }}
      />
    </div>
  );
}

/* ── Tarjeta de espécimen ── */
function SpecimenCard({
  index,
  icon,
  label,
  value,
}: {
  index: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="specimen-card"
    >
      <span className="specimen-pin" />
      <span className="specimen-index">{index}</span>
      <div className="flex items-center gap-4">
        <div className="specimen-icon">{icon}</div>
        <div>
          <p className="bday-jakarta specimen-label">{label}</p>
          <p className="bday-jakarta specimen-value">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Datos estáticos ── */
const INFO_ITEMS = [
  { index: "01", label: "Fecha", key: "date" as const },
  { index: "02", label: "Hora", key: "partyHour" as const },
  { index: "03", label: "Lugar", key: "reception" as const },
  { index: "04", label: "Direccion", key: "place" as const },
] as const;

const INFO_ICONS = {
  date: <CalendarDays size={18} />,
  partyHour: <Clock size={18} />,
  reception: <MapPin size={18} />,
  place: <MapPin size={18} />,
} as const;

export default function BirthdayDinosaur({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  const confirmAttendance = useCallback(() => {
    const message = encodeURIComponent(
      `Hola! Confirmo mi asistencia al cumpanios de ${data.event.name}`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  }, [data.event.name, data.contact.phone]);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  const handleConfirm = useCallback(() => {
    confirmAttendance();
    setShowModal(false);
  }, [confirmAttendance]);

  const eventValues = useMemo(
    () => ({
      date: data.event.date,
      partyHour: data.event.partyHour,
      reception: data.location.reception ?? "",
      place: data.location.place ?? "",
    }),
    [data.event.date, data.event.partyHour, data.location.reception, data.location.place],
  );

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main id="dino-main" style={{ background: T.ink }}>
        <FallingLeaves />

        {/* ════════════════ HERO ════════════════ */}
        <section
          className="relative min-h-screen flex flex-col overflow-hidden"
          style={{ background: T.inkDeep }}
        >
          <FernCluster
            className="fern-corner fern-corner-left"
            style={{ color: T.fern }}
          />
          <FernCluster
            className="fern-corner fern-corner-right"
            style={{ color: T.fern }}
          />

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
                background: `linear-gradient(to bottom, ${T.inkDeep}66 0%, ${T.inkDeep}10 45%, ${T.inkDeep} 100%)`,
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 pb-16 -mt-8">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="specimen-tag"
            >
              Ejemplar N.° 001 — estás invitado
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bday-fraunces dino-hero-name mt-6 mb-5"
            >
              {data.event.name}
            </motion.h1>

            {data.event.age && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.65, type: "spring", bounce: 0.5 }}
                className="dino-seal mb-5"
              >
                <span className="bday-fraunces italic dino-seal-age">
                  {data.event.age}
                </span>
                <span className="bday-jakarta dino-seal-label">años</span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="bday-jakarta dino-date-text"
            >
              {data.event.date}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="relative w-full flex justify-center mt-10"
              style={{ maxWidth: 340 }}
            >
              <Image
                src="/pictures/birthday/juanDiego/dinosaurio-2.png"
                alt="Dinosaurio"
                width={340}
                height={220}
                className="dino-hero-image"
                priority
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
              className="dino-scroll-hint mt-4"
            >
              <Footprint style={{ width: 12, height: 12 }} />
              <span className="bday-jakarta dino-scroll-text">
                desliza para explorar
              </span>
            </motion.div>
          </div>
        </section>

        <TrailDivider tone={T.amber} />

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className="relative py-20 px-6">
          <div
            className="dino-glow"
            style={{ background: T.amber, top: -60, left: "20%" }}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative text-center"
          >
            <span className="specimen-tag dino-section-tag">
              Cuenta regresiva
            </span>
            <h2 className="bday-fraunces italic dino-section-title mb-10">
              La expedición comienza en
            </h2>
            <div className="dino-field-frame max-w-md mx-auto">
              <CountDown data={data} />
            </div>
          </motion.div>
        </section>

        <TrailDivider tone={T.fern} />

        {/* ════════════════ INFO ════════════════ */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="specimen-tag dino-section-tag">Coordenadas</span>
            <h2 className="bday-fraunces italic dino-section-title">
              ¿Dónde y cuándo?
            </h2>
          </motion.div>

          <div className="max-w-md mx-auto flex flex-col gap-4">
            {INFO_ITEMS.map((item) => (
              <SpecimenCard
                key={item.key}
                index={item.index}
                icon={INFO_ICONS[item.key]}
                label={item.label}
                value={eventValues[item.key]}
              />
            ))}
          </div>

          {data.location.mapUrl && (
            <div className="text-center mt-10">
              <a
                href={data.location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="dino-pill-link"
              >
                <MapPin size={14} />
                Ver ruta en el mapa
              </a>
            </div>
          )}
        </section>

        <TrailDivider tone={T.rust} />

        {/* ════════════════ GALERIA ════════════════ */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="specimen-tag dino-section-tag">Hallazgos</span>
            <h2 className="bday-fraunces italic dino-section-title">
              Galería de fotos
            </h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p className="bday-jakarta dino-hint-text text-center mt-6">
            desliza para ver más
          </p>
        </section>

        <TrailDivider tone={T.amber} />

        {/* ════════════════ RSVP ════════════════ */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div
            className="dino-glow"
            style={{ background: T.rust, bottom: -80, right: "15%" }}
          />
          <FernCluster
            className="fern-corner fern-corner-left"
            style={{ color: T.fern, opacity: 0.1 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.35 }}
            className="relative max-w-sm mx-auto"
          >
            <span className="specimen-tag dino-section-tag">Confirmación</span>
            <h2 className="bday-fraunces italic dino-section-title mb-10">
              Guarda tu lugar en la manada
            </h2>

            <div className="dino-ticket">
              <span className="dino-ticket-notch dino-ticket-notch-left" />
              <span className="dino-ticket-notch dino-ticket-notch-right" />
              <button className="dino-ticket-btn" onClick={openModal}>
                Confirmar asistencia
              </button>
            </div>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="dino-footer">
          <div className="dino-seal-outline">
            <Footprint style={{ width: 20, height: 20, color: T.amber }} />
          </div>
          <span className="bday-fraunces italic dino-footer-name">
            {data.event.name}
          </span>
          <span className="bday-jakarta dino-footer-date">
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
              className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-6 backdrop-blur-[6px]"
              style={{ background: `${T.inkDeep}90` }}
              onClick={closeModal}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.32 }}
                onClick={(e) => e.stopPropagation()}
                className="dino-field-frame w-full max-w-sm p-10 text-center"
              >
                <div className="dino-seal-outline mx-auto mb-4">
                  <Footprint
                    style={{ width: 20, height: 20, color: T.amber }}
                  />
                </div>
                <h3 className="bday-fraunces italic dino-modal-title mb-2">
                  ¡Genial!
                </h3>
                <p className="bday-jakarta dino-modal-text mb-8">
                  Te llevaremos a WhatsApp para confirmar tu lugar en la fiesta
                  de{" "}
                  <strong className="dino-modal-name">{data.event.name}</strong>
                  .
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="bday-jakarta flex-1 py-3 rounded-full text-sm font-bold transition dino-cancel-btn text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="dino-ticket-btn flex-1"
                    style={{ padding: "0.75rem 0", color: "#fff" }}
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

interface Props {
  data: EventData;
}
