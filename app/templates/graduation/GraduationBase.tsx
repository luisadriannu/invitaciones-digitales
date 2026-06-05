"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { MapPin, GraduationCap, Award, Utensils } from "lucide-react";

interface Props {
  data: EventData;
}

const SPARKLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 5 + ((i * 7.3) % 90),
  delay: (i * 0.4) % 5,
  duration: 5 + (i % 5),
  size: i % 3 === 0 ? 6 : i % 3 === 1 ? 10 : 4,
  opacity: 0.2 + (i % 3) * 0.1,
  isRound: i % 2 === 0,
  colorIdx: i % 3,
}));

const sparkleColor = (idx: number) =>
  idx === 0
    ? "linear-gradient(135deg, #BF953F, #FCF6BA)"
    : idx === 1
      ? "#FFF"
      : "#E5BA73";

const sparkleGlow = (idx: number) => (idx === 0 ? "0 0 8px #FCF6BA" : "none");

export default function GraduationBase({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const portraitImage = data.media.gallery[0] ?? data.media.coverImage;

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola, confirmo mi asistencia a la graduación de ${data.event.name}`,
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
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        className="relative overflow-hidden bg-[#0B132B] text-[#F4F5F6]"
      >
        {/* Sparkles / Confetti */}
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

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative h-screen academic-bg flex flex-col items-center justify-end overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={data.media.coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#0B132B]/40 via-[#0B132B]/20 to-[#0B132B]" />
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
              <GraduationCap className="text-[#D4AF37]/80" size={20} />
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
            <span>🎓</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="portrait-ring"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#1C2541] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
              <Image
                src={portraitImage}
                alt={data.event.name}
                fill
                className="object-cover"
              />
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
              El final de una gran etapa es solo el comienzo de una nueva
              aventura. Hoy celebro el fruto del esfuerzo constante y me
              encantaría compartir este momento tan significativo contigo.
            </p>
          </motion.div>

          <div className="academic-divider mt-16">
            <span>✦</span>
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className="py-20 px-6 bg-[#1C2541]">
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
        <section className="py-14 px-6 bg-[#1C2541]">
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
                  Acto Académico
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
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-7 px-6 academic-bg">
          <div className="academic-divider mb-14">
            <span>✦</span>
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

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-22 px-6 text-center bg-[#1C2541]">
          <div className="academic-divider mb-14">
            <span>🎓</span>
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
            <button
              className="grad-rsvp-btn jost"
              onClick={() => setOpenModal(true)}
            >
              Confirmar Asistencia
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-10 text-center academic-bg border-t border-white/5">
          <p className="jost text-[#E5BA73]/70 text-xs tracking-widest uppercase">
            Clase de Graduación — {data.event.name}
          </p>
        </footer>

        {/* ════════════════ MODAL ════════════════ */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(11,19,43,0.8)] backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.88, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 30 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="gold-card max-w-sm w-full"
              >
                <div className="text-4xl mb-4">🥂</div>
                <h3 className="text-2xl font-light italic mb-2 text-white">
                  Confirmar Asistencia
                </h3>
                <p className="jost text-white/70 text-sm mb-8">
                  Serás redirigido a WhatsApp para validar tus accesos a la
                  ceremonia y recepción.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="jost flex-1 py-3 rounded-2xl text-[#E5BA73] border border-[rgba(214,175,54,0.3)] hover:bg-white/5 transition text-sm"
                  >
                    Regresar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setOpenModal(false);
                    }}
                    className="jost flex-1 py-3 rounded-2xl text-[#0B132B] text-sm font-semibold transition bg-linear-to-br from-[#B38728] via-[#FBF5B7] to-[#AA771C] shadow-[0_4px_20px_rgba(214,175,54,0.3)]"
                  >
                    Confirmar 🥂
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
