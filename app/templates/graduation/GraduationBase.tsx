"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { MapPin, Award, Utensils, Crown, Gem, Clock } from "lucide-react";

interface Props {
  data: EventData;
}

const COLORS = {
  primary: "#D4AF37",
  primaryAlpha: "rgba(214,175,54,0.4)",
  accent: "#E5BA73",
  bgMain: "#1a3a5c",
  bgSection: "#0f2a4a",
  text: "#F4F5F6",
} as const;

const SPARKLES = Object.freeze(
  Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: 5 + ((i * 7.3) % 90),
    delay: (i * 0.4) % 5,
    duration: 5 + (i % 5),
    size: i % 3 === 0 ? 6 : i % 3 === 1 ? 10 : 4,
    opacity: 0.2 + (i % 3) * 0.1,
    isRound: i % 2 === 0,
    colorIdx: i % 3,
  })),
);

const sparkleColor = (idx: number) =>
  idx === 0
    ? "linear-gradient(135deg, #BF953F, #FCF6BA)"
    : idx === 1
      ? "#FFF"
      : "#E5BA73";

const sparkleGlow = (idx: number) => (idx === 0 ? "0 0 8px #FCF6BA" : "none");

const ROYAL_PATTERN_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="38" fill="none" stroke="#D4AF37" stroke-width="1"/>
  <path d="M40 68 L40 52 L47 58 L52 46 L60 56 L68 46 L73 58 L80 52 L80 68 Z" fill="#D4AF37"/>
</svg>
`);
const ROYAL_PATTERN_BG = `url("data:image/svg+xml,${ROYAL_PATTERN_SVG})`;

const RoyalPattern = memo(function RoyalPattern({
  opacity = 0.05,
}: {
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: ROYAL_PATTERN_BG,
        backgroundSize: "120px 120px",
        backgroundRepeat: "repeat",
        opacity,
      }}
    />
  );
});

const CrownBadge = memo(function CrownBadge() {
  return (
    <div className="crown-badge">
      <Crown size={22} strokeWidth={1.75} />
    </div>
  );
});

const Sparkles = memo(function Sparkles() {
  return (
    <>
      {SPARKLES.map((s) => (
        <div
          key={s.id}
          className="grad-sparkle"
          style={{
            left: `${s.x}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: s.opacity,
            borderRadius: s.isRound ? "50%" : "2px",
            background: sparkleColor(s.colorIdx),
            boxShadow: sparkleGlow(s.colorIdx),
          }}
        />
      ))}
    </>
  );
});

export default function GraduationBase({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const portraitImage = data.media.gallery[1] ?? data.media.coverImage;

  const confirmAttendance = useCallback(() => {
    const message = encodeURIComponent(
      `Hola, confirmo mi asistencia a la graduación de ${data.event.name}`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  }, [data.event.name, data.contact.phone]);

  const handleCloseModal = useCallback(() => setOpenModal(false), []);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        className="relative overflow-hidden bg-[#1a3a5c] text-[#F4F5F6]"
      >
        <RoyalPattern />
        <Sparkles />

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative h-screen academic-bg flex flex-col items-center justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={data.media.gallery[1]}
              alt={data.event.name}
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#1a3a5c]/40 via-[#1a3a5c]/20 to-[#1a3a5c]" />
          </div>

          <div className="relative z-10 text-center px-8 pb-20 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2 }}
              className="jost text-[#D4AF37] text-xs uppercase mb-6 tracking-[0.35em] font-medium"
            >
              Mi Graduación
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-15 h-px bg-[rgba(214,175,54,0.4)]" />
              <Crown className="text-[#D4AF37]/80" size={20} />
              <div className="w-15 h-px bg-[rgba(214,175,54,0.4)]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-light italic leading-tight mb-6"
            >
              <span className="name-shimmer font-semibold block not-italic mb-2">
                {data.event.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="jost text-white/80 text-sm tracking-widest uppercase font-light"
            >
              {data.event.date}
            </motion.p>

            {data.event.partyHour && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="jost text-[#D4AF37] text-sm tracking-widest uppercase font-light mt-2"
              >
                {data.event.partyHour}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-20"
            >
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#D4AF37]/50 text-sm"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ PORTRAIT + FRASE ════════════════ */}
        <section className="relative z-10 py-24 px-6 academic-bg">
          <div className="academic-divider mb-16">
            <Crown size={18} strokeWidth={1.75} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="portrait-ring"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-full"
              style={{
                border: "2px solid #D4AF37",
                boxShadow: "0 0 0 6px rgba(212,175,55,0.15)",
              }}
            />
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#1a3a5c] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              <Image
                src={portraitImage}
                alt={data.event.name}
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
              <CrownBadge />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="verse max-w-xl mx-auto mt-14"
          >
            <p className="text-[1.35rem] italic font-light leading-relaxed text-[#E5BA73]">
              {data.event.phrase}
            </p>
          </motion.div>

          <div className="academic-divider mt-16">
            <Gem size={16} strokeWidth={1.75} />
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className="py-20 px-6 bg-[#0f2a4a]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="jost text-center text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-3 font-medium">
              Falta poco para el gran logro
            </p>
            <h2 className="text-center text-3xl md:text-4xl font-light italic mb-12 text-white">
              Cuenta Regresiva
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ════════════════ FAMILIA ════════════════ */}
        {data.family && (
          <section className="py-24 px-6 academic-bg">
            <div className="max-w-2xl mx-auto grid gap-6 md:grid-cols-2">
              {data.family?.parents && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="family-card"
                >
                  <p className="jost text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-5 font-medium">
                    Mis Padres
                  </p>
                  <div className="family-separator" />
                  <p className="family-name">{data.family.parents.mother}</p>
                  <div className="family-separator" />
                  <p className="family-name">{data.family.parents.father}</p>
                </motion.div>
              )}
              {data.family?.godparents && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                  className="family-card"
                >
                  <p className="jost text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-5 font-medium">
                    Mis Padrinos / Mentores
                  </p>
                  <div className="family-separator" />
                  <p className="family-name">{data.family.godparents.woman}</p>
                  <div className="family-separator" />
                  <p className="family-name">{data.family.godparents.man}</p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* ════════════════ DETALLES DEL EVENTO ════════════════ */}
        <section className="py-14 px-6 bg-[#0f2a4a]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="jost text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-2">
              Ubicaciones oficiales
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic text-white">
              Detalles del evento
            </h2>
          </motion.div>

          <div className="max-w-xl mx-auto flex flex-col gap-4">
            {data.event.partyHour && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="location-card"
              >
                <div className="icon-wrap">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="jost text-[#D4AF37] text-xs uppercase tracking-widest mb-0.5 font-medium">
                    Hora
                  </p>
                  <p className="jost text-white font-light">
                    {data.event.partyHour}
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="location-card"
            >
              <div className="icon-wrap">
                <Award size={20} />
              </div>
              <div>
                <p className="jost text-[#D4AF37] text-xs uppercase tracking-widest mb-0.5 font-medium">
                  Lugar
                </p>
                <p className="jost text-white font-light">
                  {data.location.event}
                </p>
              </div>
            </motion.div>

            {data.location.reception && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="location-card"
              >
                <div className="icon-wrap">
                  <Utensils size={20} />
                </div>
                <div>
                  <p className="jost text-[#D4AF37] text-xs uppercase tracking-widest mb-0.5 font-medium">
                    Recepción / Gala
                  </p>
                  <p className="jost text-white font-light">
                    {data.location.reception}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {data.location.mapUrl && (
            <div className="text-center mt-10">
              <p className="text-3xl md:text-4xl font-light italic mb-6 text-white">
                Ubicación
              </p>
              {data.suscription === "premiun" ? (
                <iframe
                  src={data.location.mapUrl}
                  height="250"
                  className="w-full rounded-2xl border border-white/10"
                  loading="lazy"
                />
              ) : (
                <a
                  href={data.location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn jost"
                >
                  <MapPin size={15} />
                  Ver mapa de accesos
                </a>
              )}
            </div>
          )}
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-7 px-6 academic-bg">
          <div className="academic-divider mb-14">
            <Gem size={16} strokeWidth={1.75} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="jost text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-2">
              El Camino Recorrido
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic">
              Galería de Fotos
            </h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p className="jost text-center text-xs tracking-[0.2em] uppercase mt-3">
            Desliza para ver la sesión fotográfica
          </p>
        </section>

        {/* ════════════════ NO FALTES ════════════════ */}
        <section className="py-16 px-6 bg-[#0f2a4a] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl md:text-3xl font-light italic text-white mb-2">
              No faltes
            </p>
            <p className="jost text-[#D4AF37] text-sm tracking-widest uppercase font-medium">
              habrá payasos
            </p>
          </motion.div>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-22 px-6 text-center bg-[#0f2a4a]">
          <div className="academic-divider mb-14">
            <Crown size={18} strokeWidth={1.75} />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <p className="jost text-[#D4AF37] tracking-[0.2em] text-xs uppercase mb-3 font-medium">
              Pases Limitados
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic mb-10 text-white">
              Confirma tu Pase de Gala
            </h2>
            <button className="grad-rsvp-btn jost" onClick={handleOpenModal}>
              Confirmar Asistencia
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-10 text-center academic-bg border-t border-white/5">
          <p className="jost text-[#E5BA73]/70 text-xs tracking-widest uppercase">
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(26,58,92,0.8)] backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.88, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 30 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="gold-card max-w-sm w-full"
              >
                <div className="crown-badge mx-auto mb-4">
                  <Crown size={24} strokeWidth={1.75} />
                </div>
                <h3 className="text-2xl font-light italic mb-2 text-white">
                  Confirmar Asistencia
                </h3>
                <p className="jost text-white/70 text-sm mb-8">
                  Serás redirigido a WhatsApp para validar tus accesos a la
                  ceremonia y recepción.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleCloseModal}
                    className="jost flex-1 py-3 rounded-2xl text-[#E5BA73] border border-[rgba(214,175,54,0.3)] hover:bg-white/5 transition text-sm"
                  >
                    Regresar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      handleCloseModal();
                    }}
                    className="jost flex-1 py-3 rounded-2xl text-[#1a3a5c] text-sm font-semibold transition bg-linear-to-br from-[#B38728] via-[#FBF5B7] to-[#AA771C] shadow-[0_4px_20px_rgba(214,175,54,0.3)]"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style jsx>{`
        .crown-badge {
          width: 44px;
          height: 44px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1a3a5c;
          color: #d4af37;
          border: 2px solid #d4af37;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.15);
        }
      `}</style>
    </>
  );
}
