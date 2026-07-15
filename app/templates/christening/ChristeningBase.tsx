"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import LocationMaps from "@/app/components/LocationMaps";

interface Props {
  data: EventData;
}

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 6.8) % 93),
  delay: (i * 0.5) % 6,
  duration: 6 + (i % 4),
  size: 8 + (i % 3) * 4,
  opacity: 0.15 + (i % 4) * 0.07,
}));

const ornamentDots = (
  <div className="flex items-center justify-center gap-2">
    <div className="h-px w-8 bg-[#D4AF37]/30" />
    <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/70" />
    <div className="w-1 h-1 rounded-full bg-[#D4AF37]/50" />
    <div className="h-px w-8 bg-[#D4AF37]/30" />
  </div>
);

export default function ChristeningBase({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const portraitImage = data.media.gallery[0] ?? data.media.coverImage;

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola, confirmo mi asistencia al bautizo de ${data.event.name}`,
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
        className="relative overflow-hidden bg-[#FDFAF4] text-[#3B2F2F]"
      >
        {/* Petals */}
        {PETALS.map((p) => (
          <div
            key={p.id}
            className="chr-petal"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative h-screen paper-bg flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={data.media.gallery[0]}
              alt={data.event.name}
              fill
              priority
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-[#FDFAF4]" />
          </div>

          <div className="relative z-10 text-center px-8 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2 }}
              className="jost text-white/80 text-xs uppercase mb-6 tracking-[0.35em]"
            >
              Mi Bautizo
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-15 h-px bg-white/40" />
              <span className="text-white/60 text-lg">✦</span>
              <div className="w-15 h-px bg-white/40" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="text-white text-6xl md:text-8xl font-light italic leading-none mb-6"
            >
              {data.event.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="jost text-white/70 text-sm tracking-widest"
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
                className="text-white/25 text-sm"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ PORTRAIT + VERSE ════════════════ */}
        <section className="relative z-10 py-24 px-6 paper-bg">
          <div className="cross-divider mb-16">
            <span>✝</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="chr-portrait-ring"
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#E8D5BA] shadow-[0_8px_40px_rgba(180,150,100,0.25)]">
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
            className="chr-verse max-w-xl mx-auto mt-14"
          >
            <p className="text-[1.35rem] italic font-light leading-relaxed text-[#5C4A30]">
              Con la bendición de Dios y el amor de nuestra familia, queremos
              compartir contigo este día tan especial.
            </p>
          </motion.div>

          <div className="cross-divider mt-16">
            <span>✦</span>
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className="relative py-28 px-6 bg-[#EDE8DF] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-serif text-[20rem] font-light text-[#D4AF37]/6 leading-none">
              &infin;
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative max-w-xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 max-w-12.5 bg-[#C4A96A]/40" />
              <span className="text-[9px] uppercase tracking-[0.65em] text-[#A89A82]">
                Cuenta Regresiva
              </span>
              <div className="h-px flex-1 max-w-12.5 bg-[#C4A96A]/40" />
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-[#2B2927] font-light italic leading-tight mb-2">
              Falta poco
            </h2>
            <h3 className="font-serif text-5xl md:text-6xl text-[#C4A96A] font-light italic leading-tight mb-12">
              para el gran día
            </h3>

            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ════════════════ FAMILIA ════════════════ */}
        <section className="py-28 px-6 bg-[#FDFAF5]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-sm mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-14">
              <div className="h-px flex-1 max-w-12.5 bg-[#C4A96A]/40" />
              <span className="text-[9px] uppercase tracking-[0.65em] text-[#A89A82]">
                Familia
              </span>
              <div className="h-px flex-1 max-w-12.5 bg-[#C4A96A]/40" />
            </div>

            {data.family?.parents && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-12"
              >
                <span className="text-[9px] uppercase tracking-[0.55em] text-[#C4A96A] block mb-7">
                  Mis Papás
                </span>
                <p className="font-serif text-2xl md:text-3xl text-[#2B2927] font-light italic leading-relaxed">
                  {data.family.parents.mother}
                </p>
                <div className="w-5 h-px bg-[#D4AF37]/40 mx-auto my-4" />
                <p className="font-serif text-2xl md:text-3xl text-[#2B2927] font-light italic leading-relaxed">
                  {data.family.parents.father}
                </p>
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-2 mb-12">
              {ornamentDots}
            </div>

            {data.family?.godparents && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
              >
                <span className="text-[9px] uppercase tracking-[0.55em] text-[#C4A96A] block mb-7">
                  Mis Padrinos
                </span>
                <p className="font-serif text-2xl md:text-3xl text-[#2B2927] font-light italic leading-relaxed">
                  {data.family.godparents.woman}
                </p>
                <div className="w-5 h-px bg-[#D4AF37]/40 mx-auto my-4" />
                <p className="font-serif text-2xl md:text-3xl text-[#2B2927] font-light italic leading-relaxed">
                  {data.family.godparents.man}
                </p>
              </motion.div>
            )}

            <div className="mt-14 w-10 h-px bg-[#D4AF37]/30 mx-auto" />
          </motion.div>
        </section>

        {/* ════════════════ DETALLES DEL EVENTO ════════════════ */}
        <section className="py-28 px-6 bg-[#EDE8DF]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-sm mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-12.5 bg-[#C4A96A]/40" />
              <span className="text-[9px] uppercase tracking-[0.65em] text-[#A89A82]">
                El Gran Día
              </span>
              <div className="h-px flex-1 max-w-12.5 bg-[#C4A96A]/40" />
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-[#2B2927] font-light italic mb-16">
              Detalles del evento
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-10"
            >
              <span className="text-[9px] uppercase tracking-[0.55em] text-[#C4A96A] block mb-4">
                Ceremonia
              </span>
              <p className="font-serif text-2xl md:text-3xl text-[#2B2927] font-light italic leading-relaxed">
                {data.location.church}
              </p>
            </motion.div>

            {data.location.reception && (
              <>
                <div className="flex items-center justify-center gap-2 mb-10">
                  {ornamentDots}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="mb-14"
                >
                  <span className="text-[9px] uppercase tracking-[0.55em] text-[#C4A96A] block mb-4">
                    Recepción
                  </span>
                  <p className="font-serif text-2xl md:text-3xl text-[#2B2927] font-light italic leading-relaxed">
                    {data.location.reception}
                  </p>
                </motion.div>
              </>
            )}

            <div className="w-10 h-px bg-[#D4AF37]/30 mx-auto mb-14" />
            <LocationMaps data={data} />
          </motion.div>
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-24 px-6 paper-bg">
          <div className="cross-divider mb-14">
            <span>✦</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="jost text-[#9B7A4A] tracking-[0.2em] text-xs uppercase mb-2">
              Recuerdos
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic">Galería</h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p className="jost text-center text-xs tracking-[0.2em] uppercase text-[#B8A080] mt-6">
            Desliza para ver más
          </p>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-28 px-6 text-center bg-[#F7F0E6]">
          <div className="cross-divider mb-14">
            <span>✝</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <p className="jost text-[#9B7A4A] tracking-[0.2em] text-xs uppercase mb-3">
              ¿Nos acompañas?
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic mb-10 text-[#3B2F2F]">
              Confirma tu asistencia
            </h2>
            <button
              className="chr-rsvp-btn jost"
              onClick={() => setOpenModal(true)}
            >
              Confirmar
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-10 text-center paper-bg border-t border-[rgba(180,150,100,0.15)]">
          <p className="jost text-[#B8A080] text-xs tracking-widest uppercase">
            Con amor — {data.event.name}
          </p>
        </footer>

        {/* ════════════════ MODAL ════════════════ */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[rgba(30,20,10,0.65)] backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.88, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 30 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="chr-gold-card max-w-sm w-full"
              >
                <div className="text-4xl mb-4">🕊️</div>
                <h3 className="text-2xl font-light italic mb-2 text-[#3B2F2F]">
                  Confirmar asistencia
                </h3>
                <p className="jost text-[#7A6040] text-sm mb-8">
                  Te redirigiremos a WhatsApp para confirmar tu lugar en la
                  celebración.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="jost flex-1 py-3 rounded-2xl text-[#9B7A4A] border border-[rgba(155,122,74,0.3)] hover:bg-[rgba(155,122,74,0.06)] transition text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setOpenModal(false);
                    }}
                    className="jost flex-1 py-3 rounded-2xl text-[#FDFAF4] text-sm font-medium bg-linear-to-br from-[#9B7A4A] to-[#C4975A] shadow-[0_4px_20px_rgba(155,122,74,0.35)] transition"
                  >
                    Confirmar 🕊️
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
