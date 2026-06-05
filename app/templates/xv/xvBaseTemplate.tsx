"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { Sparkles, Star, Heart } from "lucide-react";
import LocationMaps from "@/app/components/LocationMaps";

interface Props {
  data: EventData;
}

const glassCard =
  "bg-white/70 backdrop-blur-xl border border-[rgba(200,149,106,0.25)] shadow-[0_15px_35px_rgba(200,149,106,0.12)] rounded-[30px]";

const ornamentDots = (
  <div className="flex items-center justify-center gap-2">
    <div className="h-px w-8 bg-[#C8956A]/30" />
    <div className="w-1 h-1 rounded-full bg-[#C8956A]/50" />
    <div className="w-1.5 h-1.5 rounded-full bg-[#C8956A]/70" />
    <div className="w-1 h-1 rounded-full bg-[#C8956A]/50" />
    <div className="h-px w-8 bg-[#C8956A]/30" />
  </div>
);

const cornersBorder = (
  <>
    <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#C8956A]/15 rounded-tl-3xl" />
    <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#C8956A]/15 rounded-tr-3xl" />
    <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#C8956A]/15 rounded-bl-3xl" />
    <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#C8956A]/15 rounded-br-3xl" />
  </>
);

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(i * 5.1) % 100}%`,
  top: `${(i * 7.3) % 100}%`,
  delay: (i * 0.25) % 5,
  duration: 3 + (i % 4),
  size: 2 + (i % 4),
}));

export default function QuinceaneraInvitation({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `¡Hola! Confirmo con mucha alegría mi asistencia a los XV años de ${data.event.name} ✨`,
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
        className="relative min-h-screen overflow-hidden bg-[#F8F4EC] text-[#5C4A4A]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Brillos */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {SPARKLES.map((s) => (
            <div
              key={s.id}
              className="xv-sparkle"
              style={{
                left: s.left,
                top: s.top,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={data.media.coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 via-70% to-[#FDFAF4]" />
          </div>

          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="montserrat tracking-[0.5em] text-xs uppercase text-white bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-4">
                Mis XV Años
              </span>
              <h1 className="gold-text text-7xl md:text-9xl font-bold mb-6 italic">
                {data.event.name}
              </h1>
              <div className="h-px w-24 bg-[#C8956A] mx-auto mb-6" />
              <p className="montserrat text-lg tracking-widest text-white/80">
                {data.event.date}
              </p>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 text-[#C8956A] opacity-50"
          >
            <Sparkles size={30} />
          </motion.div>
        </section>

        {/* ════════════════ INVITACIÓN ════════════════ */}
        <section className="relative z-10 py-24 px-6 celestial-bg">
          <div
            className={`max-w-3xl mx-auto p-10 md:p-20 text-center relative overflow-hidden ${glassCard}`}
          >
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#C8956A]/30 rounded-tl-[30px]" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#C8956A]/30 rounded-br-[30px]" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Heart
                className="mx-auto mb-8 text-[#C8956A] opacity-60"
                fill="currentColor"
                size={24}
              />
              <p className="text-2xl md:text-3xl leading-relaxed italic font-light">
                Hay momentos en la vida que son irrepetibles, pero tener a las
                personas que más quiero a mi lado los hace inolvidables.
              </p>
              <p className="montserrat mt-10 text-sm tracking-widest uppercase text-[#C8956A]">
                Te invito a celebrar conmigo
              </p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ CUENTA REGRESIVA ════════════════ */}
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span
              className="font-serif font-light leading-none text-[#C9A96E]/4"
              style={{ fontSize: "clamp(12rem, 40vw, 28rem)" }}
            >
              XV
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative max-w-lg mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px flex-1 max-w-12.5 bg-[#C9A96E]/30" />
              <span className="text-[9px] uppercase tracking-[0.65em] text-[#C9A96E]/60">
                Cuenta Regresiva
              </span>
              <div className="h-px flex-1 max-w-12.5 bg-[#C9A96E]/30" />
            </div>

            <h2 className="font-serif text-5xl md:text-6xl font-light italic leading-tight mb-2">
              Solo faltan
            </h2>
            <CountDown data={data} />
            <p className="font-serif text-3xl md:text-4xl font-light italic text-[#C9A96E] mb-12">
              para mis XV
            </p>

            <div className="flex items-center justify-center gap-2 mt-14 mb-10">
              {ornamentDots}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-base md:text-lg font-light italic leading-relaxed px-4"
            >
              &quot;Cada segundo que pasa nos acerca
              <br />a este momento tan especial&quot;
            </motion.p>

            <div className="mt-10 w-10 h-px bg-[#C9A96E]/25 mx-auto" />
          </motion.div>
        </section>

        {/* ════════════════ FAMILIA ════════════════ */}
        <section className="relative py-28 px-6 bg-[#FDF6F0] overflow-hidden">
          {cornersBorder}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative max-w-sm mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-12.5 bg-[#C8956A]/40" />
              <span className="text-[9px] uppercase tracking-[0.65em] text-[#C8956A]/70">
                Familia
              </span>
              <div className="h-px flex-1 max-w-12.5 bg-[#C8956A]/40" />
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-[#2B1F1F] font-light italic mb-16">
              Quienes me acompañan
            </h2>

            {data.family?.parents && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-10"
              >
                <span className="text-[9px] uppercase tracking-[0.55em] text-[#C8956A] block mb-7">
                  Con la bendición de mis padres
                </span>
                <p className="font-serif text-2xl md:text-3xl text-[#2B1F1F] font-light italic leading-relaxed">
                  {data.family.parents.mother}
                </p>
                <div className="w-5 h-px bg-[#C8956A]/40 mx-auto my-4" />
                <p className="font-serif text-2xl md:text-3xl text-[#2B1F1F] font-light italic leading-relaxed">
                  {data.family.parents.father}
                </p>
              </motion.div>
            )}

            <div className="flex items-center justify-center gap-2 mb-10">
              {ornamentDots}
            </div>

            {data.family?.godparents && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mb-14"
              >
                <span className="text-[9px] uppercase tracking-[0.55em] text-[#C8956A] block mb-7">
                  Padrinos
                </span>
                <p className="font-serif text-2xl md:text-3xl text-[#2B1F1F] font-light italic leading-relaxed">
                  {data.family.godparents.woman}
                </p>
                <div className="w-5 h-px bg-[#C8956A]/40 mx-auto my-4" />
                <p className="font-serif text-2xl md:text-3xl text-[#2B1F1F] font-light italic leading-relaxed">
                  {data.family.godparents.man}
                </p>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-base font-light italic text-[#C8956A]/70 leading-relaxed px-4 mb-10"
            >
              &quot;Su amor y guía han hecho posible
              <br />
              este momento tan especial&quot;
            </motion.p>

            <div className="w-10 h-px bg-[#C8956A]/30 mx-auto" />
          </motion.div>
        </section>

        {/* ════════════════ DETALLES DEL EVENTO ════════════════ */}
        <section className="relative py-28 px-6 bg-white overflow-hidden">
          {cornersBorder}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative max-w-sm mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-12.5 bg-[#C8956A]/40" />
              <span className="text-[9px] uppercase tracking-[0.65em] text-[#C8956A]/70">
                El Gran Día
              </span>
              <div className="h-px flex-1 max-w-12.5 bg-[#C8956A]/40" />
            </div>

            <h2 className="font-serif text-5xl md:text-6xl text-[#2B1F1F] font-light italic mb-16">
              ¿Dónde & Cuándo?
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-10"
            >
              <span className="text-[9px] uppercase tracking-[0.55em] text-[#C8956A] block mb-4">
                Ceremonia Religiosa
              </span>
              <p className="font-serif text-2xl md:text-3xl text-[#2B1F1F] font-light italic leading-relaxed">
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
                  <span className="text-[9px] uppercase tracking-[0.55em] text-[#C8956A] block mb-4">
                    Recepción
                  </span>
                  <p className="font-serif text-2xl md:text-3xl text-[#2B1F1F] font-light italic leading-relaxed">
                    {data.location.reception}
                  </p>
                </motion.div>
              </>
            )}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-serif text-base font-light italic text-[#C8956A]/70 leading-relaxed px-4 mb-10"
            >
              &quot;Nos llena de alegría compartir
              <br />
              este día tan especial contigo&quot;
            </motion.p>

            <div className="w-10 h-px bg-[#C8956A]/30 mx-auto mb-14" />
            <LocationMaps data={data} />
          </motion.div>
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-24 px-6 bg-[#FFF9F9]">
          <div className="text-center mb-16">
            <span className="montserrat text-[#C8956A] text-xs uppercase tracking-[0.5em]">
              Book de Fotos
            </span>
            <h2 className="gold-text text-5xl italic mt-4">Mis Recuerdos</h2>
          </div>
          <Gallery images={data.media.gallery} />
          <p className="montserrat text-center text-xs tracking-[0.2em] uppercase text-[#B8A080] mt-6">
            Desliza para ver más
          </p>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-14 px-6 text-center celestial-bg relative">
          <Star
            className="mx-auto mb-8 text-[#C8956A] opacity-40 animate-pulse"
            size={40}
          />
          <h2 className="text-4xl md:text-6xl italic mb-8">
            ¿Me acompañarás a brillar?
          </h2>
          <p className="montserrat text-[#5C4A4A]/60 mb-12 tracking-widest uppercase text-sm">
            Favor de confirmar antes del evento
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="group relative px-16 py-5 overflow-hidden rounded-full bg-transparent border border-[#C8956A] text-[#C8956A] transition-all"
          >
            <div className="absolute inset-0 bg-[#C8956A] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 montserrat tracking-[0.2em] uppercase font-semibold group-hover:text-white">
              Confirmar Asistencia
            </span>
          </button>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-12 text-center border-t border-white/5">
          <p className="montserrat text-[10px] tracking-[0.8em] uppercase text-[#C8956A]">
            {data.event.name} — 2024
          </p>
        </footer>

        {/* ════════════════ MODAL RSVP ════════════════ */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className={`max-w-md w-full p-12 text-center ${glassCard}`}
              >
                <h3 className="gold-text text-3xl italic mb-6">
                  Confirmar mi lugar
                </h3>
                <p className="montserrat text-sm mb-10 leading-relaxed">
                  Haz clic en el botón para enviarme un WhatsApp y confirmar tu
                  asistencia a mi fiesta.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setOpenModal(false);
                    }}
                    className="w-full py-4 rounded-full bg-[#C8956A] text-white montserrat font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Enviar WhatsApp ✨
                  </button>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="w-full py-4 montserrat text-xs uppercase tracking-widest"
                  >
                    Cerrar
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
