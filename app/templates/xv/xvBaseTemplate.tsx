"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { MapPin, Church, Music, Sparkles, Star, Heart } from "lucide-react";
import LocationMaps from "@/app/components/LocationMaps";

interface Props {
  data: EventData;
}

/* ── Floating Sparkles (Efecto de Brillos) ── */
const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: 3 + Math.random() * 4,
  size: 2 + Math.random() * 4,
}));

export default function QuinceaneraInvitation({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const coverImage = data.media.coverImage;
  const portraitImage = data.media.gallery[0] ?? coverImage;

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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;600&display=swap');

          .montserrat { font-family: 'Montserrat', sans-serif; }

          /* Fondo con gradiente profundo y brillo */
        .celestial-bg {
            background: radial-gradient(circle at 50% 50%, #FFF9F9 0%, #FDFAF5 100%);
          }
          /* Animación de destellos */
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          .sparkle {
            position: absolute;
             background: #D4AF37;
              box-shadow: 0 0 12px #D4AF37;
            border-radius: 50%;
            filter: blur(1px);
            box-shadow: 0 0 10px white;
            animation: twinkle ease-in-out infinite;
          }

          /* Glassmorphism Card */
         .glass-card {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(200, 149, 106, 0.25);
            box-shadow: 0 15px 35px rgba(200, 149, 106, 0.12);
            border-radius: 30px;
          }

          /* Texto con brillo oro rosa */
         .gold-text {
            background: linear-gradient(
              to right,
              #B8860B 0%,
              #F4E1A1 50%,
              #B8860B 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shine 4s linear infinite;
          }

          @keyframes shine {
            to { background-position: 200% center; }
          }

          .border-ornament {
            border: 1px solid #B784A7;
            padding: 10px;
            position: relative;
          }
        `}</style>

        {/* Capa de Brillos */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {SPARKLES.map((s) => (
            <div
              key={s.id}
              className="sparkle"
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
        <section className="relative h-[110vh] flex flex-col items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src={coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-[#FDFAF4]" />
          </div>

          <div className="relative z-10 text-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span
                className="
                montserrat
                tracking-[0.5em]
                text-xs
                uppercase
                text-white
                bg-black/10
                backdrop-blur-sm
                px-4
                py-2
                rounded-full
                inline-block
                mb-4
              "
              >
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
          <div className="max-w-3xl mx-auto glass-card p-10 md:p-20 text-center relative overflow-hidden">
            {/* Adorno de esquina */}
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
        <section className="py-20 px-6 bg-[#F3E9E9]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-4xl mb-12 italic gold-text">
              Solo faltan...
            </h2>
            <CountDown data={data} />
          </div>
        </section>

        {/* ════════════════ PADRES Y PADRINOS ════════════════ */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
              className="glass-card p-12 text-center"
            >
              <h3 className="montserrat text-[#C8956A] text-xs uppercase tracking-[0.3em] mb-8">
                Con la bendición de mis padres
              </h3>
              <p className="text-2xl mb-2">{data.family?.parents?.mother}</p>
              <span>Y</span>
              <p className="text-2xl">{data.family?.parents?.father}</p>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 30 }}
              className="glass-card p-12 text-center border-t border-[#C8956A]/20"
            >
              <h3 className="montserrat text-[#C8956A] text-xs uppercase tracking-[0.3em] mb-8">
                PADRINOS
              </h3>
              <p className="text-2xl mb-2">{data.family?.godparents?.woman}</p>
              <span>Y</span>
              <p className="text-2xl">{data.family?.godparents?.man}</p>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ DETALLES DEL EVENTO ════════════════ */}
        <section className="py-10 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl italic mb-16 gold-text">
              ¿Dónde & Cuándo?
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center p-8 glass-card">
                <div className="w-16 h-16 rounded-full bg-[#C8956A]/10 flex items-center justify-center mb-6">
                  <Church className="text-[#C8956A]" />
                </div>
                <h4 className="montserrat uppercase tracking-widest text-[#C8956A] text-sm mb-4">
                  Ceremonia Religiosa
                </h4>
                <p className="text-xl italic mb-6">{data.location.church}</p>
              </div>

              <div className="flex flex-col items-center p-8 glass-card">
                <div className="w-16 h-16 rounded-full bg-[#C8956A]/10 flex items-center justify-center mb-6">
                  <Music className="text-[#C8956A]" />
                </div>
                <h4 className="montserrat uppercase tracking-widest text-[#C8956A] text-sm mb-4">
                  Recepción
                </h4>
                <p className="text-xl italic mb-6">{data.location.reception}</p>
              </div>
            </div>

            <LocationMaps data={data} />
          </div>
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-24 px-6 bg-[#FFF9F9]">
          <div className="text-center mb-16">
            <span className="montserrat text-[#C8956A] text-xs uppercase tracking-[0.5em]">
              Book de Fotos
            </span>
            <h2 className="text-5xl italic mt-4 gold-text">Mis Recuerdos</h2>
          </div>
          <Gallery images={data.media.gallery} />
          <p className="jost text-center text-xs tracking-[0.2em] uppercase text-[#B8A080] mt-6">
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
          <p className="montserrat text-white/60 mb-12 tracking-widest uppercase text-sm">
            Favor de confirmar antes del evento
          </p>

          <button
            onClick={() => setOpenModal(true)}
            className="
              group
              relative
              px-16
              py-5
              overflow-hidden
              rounded-full
              bg-transparent
              border
              border-[#C8956A]
              text-[#C8956A]
              transition-all
            "
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#0F0A12]/90 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass-card max-w-md w-full p-12 text-center border-[#C8956A]/30"
              >
                <h3 className="text-3xl italic mb-6 gold-text">
                  Confirmar mi lugar
                </h3>
                <p className="montserrat text-white/70 text-sm mb-10 leading-relaxed">
                  Haz clic en el botón para enviarme un WhatsApp y confirmar tu
                  asistencia a mi fiesta.
                </p>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setOpenModal(false);
                    }}
                    className="w-full py-4 rounded-full bg-[#C8956A] text-[#0F0A12] montserrat font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Enviar WhatsApp ✨
                  </button>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="w-full py-4 text-white/40 montserrat text-xs uppercase tracking-widest hover:text-white"
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
