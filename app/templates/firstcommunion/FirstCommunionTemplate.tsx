"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import LocationMaps from "@/app/components/LocationMaps";
import type { EventData } from "@/app/types/EventData";
import type { Variants } from "motion/react";
import {
  Church,
  Cross,
  Sparkles,
  Calendar,
  X,
  Heart,
  Flower2,
} from "lucide-react";

interface Props {
  data: EventData;
}

const PARTICLES = [
  { id: 0, left: 12, size: 8, delay: 0, duration: 10 },
  { id: 1, left: 25, size: 10, delay: 1, duration: 12 },
  { id: 2, left: 38, size: 7, delay: 2, duration: 9 },
  { id: 3, left: 52, size: 12, delay: 1.5, duration: 14 },
  { id: 4, left: 70, size: 8, delay: 3, duration: 11 },
  { id: 5, left: 85, size: 10, delay: 0.5, duration: 13 },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export default function FirstCommunionTemplate({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const coverImage = data.media.coverImage;

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `¡Hola! Confirmo con gusto mi asistencia a la Primera Comunión de ${data.event.name} ✨`,
    );
    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main className="min-h-screen bg-[#FAF9F6] text-[#3D3A36] font-sans antialiased selection:bg-[#EAE4D9]">
        {/* --- HERO SECTION (Efecto Inmersivo) --- */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 z-20 pointer-events-none">
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.left}%`,
                  bottom: "-20px",
                  width: p.size,
                  height: p.size,
                  background: "#fff",
                  boxShadow: "0 0 20px rgba(255,255,255,.9)",
                }}
                animate={{
                  y: [0, -1000],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Capas superpuestas para un degradado fotográfico fino */}
          <div className="absolute inset-0 bg-linear-to-t from-[#FAF9F6] via-black/30 to-black/20" />

          {/* Caja flotante de cristal (Vellum Paper Effect) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 text-center px-8 py-14 max-w-xl mx-auto text-white"
          >
            <span className="block uppercase tracking-[0.6em] text-[10px] md:text-xs font-light text-[#EFECE6] mb-4">
              Mi Primera Comunión
            </span>

            <h1 className="text-5xl md:text-7xl font-serif font-light tracking-wide mb-6 text-white drop-shadow-md">
              {data.event.name}
            </h1>

            <div className="w-12 h-px bg-[#D4AF37] mx-auto mb-6" />

            <p className="font-serif italic text-lg md:text-xl text-[#FAF9F6]/90 font-light">
              {data.event.date}
            </p>
          </motion.div>

          {/* Indicador sutil para bajar */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block"
          >
            <div className="w-px h-12 bg-[#3D3A36]/40 mx-auto" />
          </motion.div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative pt-10 flex items-center justify-center"
        >
          <div className="w-20 h-px bg-[#D4AF37]/40" />

          <div className="mx-6 relative">
            <div
              className="
                w-16
                h-16
                flex
                items-center
                justify-center
              "
            >
              <span className="text-[#D4AF37] text-2xl">✞</span>
            </div>
          </div>

          <div className="w-20 h-px bg-[#D4AF37]/40" />
        </motion.div>

        {/* --- FRASE ESPIRITUAL (Revelado al hacer Scroll simulado/suave) --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="pb-22 px-6 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-[#2B2927] font-light leading-relaxed mb-8">
            “Hoy recibo a Jesús en mi corazón por primera vez, dejando que su
            luz guíe mi camino.”
          </h2>

          <p className="text-sm md:text-base text-[#706A63] font-light max-w-lg mx-auto leading-relaxed tracking-wide">
            Me llenará de profunda alegría que me acompañes a celebrar este
            hermoso encuentro de fe y amor.
          </p>
        </motion.section>

        {/* --- CUENTA REGRESIVA --- */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-16 bg-white"
        >
          <div className="max-w-2xl mx-auto px-6 text-center">
            {/* Línea decorativa superior */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 max-w-20 bg-[#D4AF37]/40" />
              <span className="text-[9px] uppercase tracking-[0.6em] text-[#A89A82]">
                Cuenta Regresiva
              </span>
              <div className="h-px flex-1 max-w-20 bg-[#D4AF37]/40" />
            </div>

            {/* Encabezado */}
            <h2 className="font-serif text-4xl md:text-5xl text-[#2B2927] font-light italic leading-snug mb-2">
              El tiempo se acerca
            </h2>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#C4A96A] mb-10">
              faltan solo
            </p>

            <CountDown data={data} />

            {/* Detalle inferior */}
            <div className="mt-10 w-12 h-px bg-[#D4AF37]/30 mx-auto" />
          </div>
        </motion.section>

        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="w-20 h-px bg-[#D4AF37]/40" />

              <div className="mx-6 relative">
                <div
                  className="
                    w-16
                    h-16
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-[#D4AF37] text-2xl">✞</span>
                </div>
              </div>

              <div className="w-20 h-px bg-[#D4AF37]/40" />
            </motion.div>

            <p className="font-serif text-3xl italic leading-relaxed text-[#4A433D]">
              &quot;Yo soy el pan de vida; el que viene a mí nunca tendrá
              hambre.&quot;
            </p>

            <span className="block mt-8 uppercase tracking-[0.3em] text-xs text-[#A2947D]">
              Juan 6:35
            </span>
          </div>
        </section>

        {/* --- FAMILIARES --- */}
        <section className="py-24 px-6 bg-white overflow-hidden">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-lg mx-auto text-center"
          >
            {/* Label */}
            <motion.span
              variants={fadeInUp}
              className="text-[9px] uppercase tracking-[0.7em] block mb-16 flex items-center justify-center gap-4 "
            >
              <div className="h-px flex-1 max-w-20 bg-[#D4AF37]/40" />
              <span className="text-[9px] uppercase tracking-[0.6em] text-[#A89A82]">
                Familia
              </span>
              <div className="h-px flex-1 max-w-20 bg-[#D4AF37]/40" />
            </motion.span>

            {/* Padres */}
            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#A89A82] mb-8">
                Con la bendición de mis padres
              </p>
              <p className="font-serif text-3xl md:text-4xl font-light italic leading-relaxed">
                {data.family?.parents?.mother}
              </p>
              <p className="text-[#D4AF37]/50 text-xs tracking-[0.4em] uppercase my-4">
                y
              </p>
              <p className="font-serif text-3xl md:text-4xl font-light italic leading-relaxed">
                {data.family?.parents?.father}
              </p>
            </motion.div>

            {/* Separador ornamental */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 my-12"
            >
              <div className="h-px w-12 bg-[#D4AF37]/25" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
              <div className="h-px w-4 bg-[#D4AF37]/25" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60" />
              <div className="h-px w-4 bg-[#D4AF37]/25" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF37]/40" />
              <div className="h-px w-12 bg-[#D4AF37]/25" />
            </motion.div>

            {/* Padrinos */}
            <motion.div variants={fadeInUp} className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.5em] text-[#A89A82] mb-8">
                Guiado por mis padrinos
              </p>
              <p className="font-serif text-3xl md:text-4xl font-light italic leading-relaxed">
                {data.family?.godparents?.woman}
              </p>
              <p className="text-[#D4AF37]/50 text-xs tracking-[0.4em] uppercase my-4">
                y
              </p>
              <p className="font-serif text-3xl md:text-4xl  font-light italic leading-relaxed">
                {data.family?.godparents?.man}
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* --- UBICACIONES (Diseño Limpio y Minimalista) --- */}
        <section className="py-28 px-6 ">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center font-serif text-3xl md:text-4xl font-light text-[#2B2927] mb-20 tracking-wide"
            >
              Ceremonia & Recepción
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-16 mb-20">
              {/* Bloque Iglesia */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-right md:pr-10 md:border-r border-[#ECE7DD]"
              >
                <Church
                  className="mx-auto md:mr-0 mb-4 text-[#D4AF37] stroke-1"
                  size={28}
                />
                <h3 className="font-serif text-2xl font-light text-[#2B2927] mb-3">
                  Santa Misa
                </h3>
                <p className="text-[#706A63] font-light text-sm leading-relaxed max-w-xs mx-auto md:mr-0">
                  {data.location.church}
                </p>
              </motion.div>

              {/* Bloque Recepción */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center md:text-left md:pl-10"
              >
                <Sparkles
                  className="mx-auto md:ml-0 mb-4 text-[#D4AF37] stroke-1"
                  size={28}
                />
                <h3 className="font-serif text-2xl font-light text-[#2B2927] mb-3">
                  Recepción
                </h3>
                <p className="text-[#706A63] font-light text-sm leading-relaxed max-w-xs mx-auto md:ml-0">
                  {data.location.reception}
                </p>
              </motion.div>
            </div>

            {/* Contenedor del Mapa Animado suavemente */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="overflow-hidden"
            >
              <LocationMaps data={data} />
            </motion.div>
          </div>
        </section>

        {/* --- GALERÍA --- */}
        <section className="py-16 bg-[#FAF9F6] relative overflow-hidden">
          <Flower2
            size={120}
            className="absolute left-10 top-20 text-[#D4AF37]/5"
          />

          <Flower2
            size={120}
            className="absolute right-10 bottom-20 text-[#D4AF37]/5"
          />

          <div className="max-w-5xl mx-auto px-6">
            <span className="block text-center text-[10px] uppercase tracking-[0.5em] text-[#918A81] mb-6">
              Galería
            </span>

            <h2 className="text-center font-serif text-5xl mb-16 text-[#2B2927]">
              Momentos Especiales
            </h2>

            <Gallery images={data.media.gallery} />
          </div>
        </section>

        <section className="relative py-30 px-6 text-center bg-white overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative pt-10 pb-6 flex items-center justify-center"
            >
              <div className="w-20 h-px bg-[#D4AF37]/40" />

              <div className="mx-6 relative">
                <div
                  className="
                    w-16
                    h-16
                    flex
                    items-center
                    justify-center
                  "
                >
                  <span className="text-[#D4AF37] text-2xl">✞</span>
                </div>
              </div>

              <div className="w-20 h-px bg-[#D4AF37]/40" />
            </motion.div>

            <h2 className="font-serif text-5xl md:text-6xl text-[#2B2927] mb-8">
              Gracias por acompañarme
            </h2>

            <p className="text-[#706A63] max-w-xl mx-auto mb-16 leading-relaxed">
              Tu presencia hará aún más especial este día tan importante para mí
              y mi familia.
            </p>

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setOpenModal(true)}
              className="
                inline-flex
                items-center
                gap-3
                px-14
                py-5
                bg-[#D4AF37]
                text-white
                tracking-[0.25em]
                uppercase
                text-[11px]
                font-semibold
                shadow-xl
              "
            >
              <Calendar size={13} />
              Confirmar Asistencia
            </motion.button>
          </motion.div>
        </section>

        {/* --- MODAL ESTILIZADO CON ANIMACIONES DE SALIDA --- */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-6 z-50"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="bg-[#FAF9F6] p-12 max-w-md w-full text-center relative border border-[#E6E1D5] shadow-2xl rounded-xl"
              >
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-5 right-5 text-[#918A81] hover:text-[#2B2927] transition-colors p-1"
                >
                  <X size={18} />
                </button>

                <div className="text-center mb-6">
                  <span className="text-[#D4AF37] text-3xl">✞</span>
                </div>

                <h3 className="font-serif text-2xl text-[#2B2927] mb-3 font-light">
                  Confirmar Asistencia
                </h3>
                <p className="text-xs text-[#706A63] font-light leading-relaxed mb-10 max-w-xs mx-auto">
                  Para una mejor organización, agradeceríamos que nos confirmes
                  tu asistencia a través de WhatsApp.
                </p>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    confirmAttendance();
                    setOpenModal(false);
                  }}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#C49F2D] text-white tracking-[0.2em] uppercase text-[10px] font-bold transition-colors shadow-md"
                >
                  Enviar Mensaje
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
