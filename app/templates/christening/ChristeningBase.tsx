"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { MapPin, Church, Utensils } from "lucide-react";

interface Props {
  data: EventData;
}

/* ── Floating petals ── */
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 4 + ((i * 6.8) % 93),
  delay: (i * 0.5) % 6,
  duration: 6 + (i % 4),
  size: 8 + (i % 3) * 4,
  opacity: 0.15 + (i % 4) * 0.07,
}));

export default function ChristeningBase({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const coverImage = data.media.coverImage;
  const portraitImage = data.media.gallery[0] ?? coverImage;

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
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

          .jost { font-family: 'Jost', sans-serif; }

          /* Soft paper texture overlay */
          .paper-bg {
            background-color: #FDFAF4;
            background-image:
              radial-gradient(ellipse at 20% 10%, rgba(212,185,150,0.18) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 80%, rgba(180,160,130,0.12) 0%, transparent 50%);
          }

          /* Floating petals */
          @keyframes petalFall {
            0%   { transform: translateY(-60px) rotate(0deg) translateX(0);   opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 0.6; }
            100% { transform: translateY(110vh) rotate(540deg) translateX(40px); opacity: 0; }
          }
          .petal {
            position: fixed;
            top: 0;
            pointer-events: none;
            z-index: 0;
            animation: petalFall ease-in-out infinite;
          }

          /* Section divider cross */
          .cross-divider {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            margin: 0 auto;
          }
          .cross-divider::before,
          .cross-divider::after {
            content: '';
            display: block;
            width: 1px;
            height: 40px;
            background: linear-gradient(to bottom, transparent, rgba(180,150,100,0.4), transparent);
          }
          .cross-divider span {
            font-size: 1.3rem;
            color: rgba(180,150,100,0.6);
            line-height: 1;
            display: block;
            padding: 4px 0;
          }

          /* Gold border card */
          .gold-card {
            position: relative;
            background: rgba(255,252,244,0.9);
            border: 1px solid rgba(180,150,100,0.25);
            border-radius: 24px;
            padding: 2.5rem;
            text-align: center;
            box-shadow: 0 4px 40px rgba(180,150,100,0.1), 0 1px 0 rgba(255,255,255,0.9) inset;
          }
          .gold-card::before {
            content: '';
            position: absolute;
            inset: 6px;
            border: 1px solid rgba(180,150,100,0.12);
            border-radius: 18px;
            pointer-events: none;
          }

          /* Name shimmer */
          @keyframes goldShimmer {
            0%   { background-position: -300% center; }
            100% { background-position:  300% center; }
          }
          .name-shimmer {
            background: linear-gradient(90deg, #8B6F47 20%, #D4AF7A 50%, #8B6F47 80%);
            background-size: 300% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: goldShimmer 5s linear infinite;
          }

          /* Portrait ring */
          .portrait-ring {
            position: relative;
            width: 220px;
            height: 220px;
            margin: 0 auto;
          }
          .portrait-ring::before {
            content: '';
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            border: 1px solid rgba(180,150,100,0.3);
          }
          .portrait-ring::after {
            content: '';
            position: absolute;
            inset: -20px;
            border-radius: 50%;
            border: 1px dashed rgba(180,150,100,0.15);
          }

          /* Location card */
          .location-card {
            background: rgba(255,252,244,0.95);
            border: 1px solid rgba(180,150,100,0.2);
            border-radius: 20px;
            padding: 1.75rem 2rem;
            display: flex;
            align-items: center;
            gap: 1.25rem;
            transition: box-shadow 0.3s, transform 0.3s;
            box-shadow: 0 2px 20px rgba(180,150,100,0.08);
          }
          .location-card:hover {
            box-shadow: 0 8px 35px rgba(180,150,100,0.18);
            transform: translateY(-2px);
          }
          .location-card .icon-wrap {
            width: 46px; height: 46px;
            border-radius: 14px;
            background: rgba(180,150,100,0.1);
            border: 1px solid rgba(180,150,100,0.2);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            color: #9B7A4A;
          }

          /* Family card */
          .family-card {
            background: linear-gradient(145deg, #FDFAF4, #F7F0E6);
            border: 1px solid rgba(180,150,100,0.2);
            border-radius: 24px;
            padding: 2.5rem;
            text-align: center;
          }
          .family-name {
            font-size: 1.15rem;
            color: #5C4A30;
            margin-bottom: 0.5rem;
            font-weight: 300;
            letter-spacing: 0.02em;
          }
          .family-separator {
            width: 40px;
            height: 1px;
            background: rgba(180,150,100,0.35);
            margin: 1.2rem auto;
          }

          /* Map button */
          .map-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.85rem 2rem;
            border-radius: 999px;
            border: 1px solid rgba(155,122,74,0.4);
            background: transparent;
            color: #9B7A4A;
            font-size: 0.875rem;
            letter-spacing: 0.05em;
            text-decoration: none;
            transition: background 0.3s, color 0.3s;
          }
          .map-btn:hover { background: rgba(155,122,74,0.08); color: #7A5A30; }

          /* RSVP button */
          .rsvp-btn {
            padding: 1.1rem 3.5rem;
            border-radius: 999px;
            background: linear-gradient(135deg, #9B7A4A, #C4975A);
            color: #FDFAF4;
            font-size: 1rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 35px rgba(155,122,74,0.35);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .rsvp-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 45px rgba(155,122,74,0.45); }

          /* Verse quote */
          .verse {
            position: relative;
            padding: 2rem 2.5rem;
            text-align: center;
          }
          .verse::before {
            content: '"';
            position: absolute;
            top: -1rem;
            left: 1.5rem;
            font-size: 6rem;
            line-height: 1;
            color: rgba(180,150,100,0.15);
            font-family: Georgia, serif;
          }
        `}</style>

        {/* Petals */}
        {PETALS.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
              borderRadius: "50% 0 50% 0",
              background: "linear-gradient(135deg, #D4B896, #E8D5BA)",
            }}
          />
        ))}

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative h-screen paper-bg flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#FDFAF4]" />
          </div>

          <div className="relative z-10 text-center px-8 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2 }}
              className="jost text-white/80 text-xs uppercase mb-6 tracking-[0.35em]"
            >
              Bautizo
            </motion.p>

            {/* Ornament */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: "rgba(255,255,255,0.4)",
                }}
              />
              <span className="text-white/60 text-lg">✦</span>
              <div
                style={{
                  width: 60,
                  height: 1,
                  background: "rgba(255,255,255,0.4)",
                }}
              />
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

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-20 flex flex-col items-center gap-2"
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
            className="portrait-ring"
          >
            <div
              className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#E8D5BA]"
              style={{ boxShadow: "0 8px 40px rgba(180,150,100,0.25)" }}
            >
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
        <section className="py-20 px-6" style={{ background: "#F7F0E6" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="jost text-center text-[#9B7A4A] tracking-[0.2em] text-xs uppercase mb-3">
              Falta poco para el gran día
            </p>
            <h2 className="text-center text-3xl md:text-4xl font-light italic mb-12 text-[#3B2F2F]">
              Cuenta Regresiva
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ════════════════ FAMILIA ════════════════ */}
        <section className="py-24 px-6 paper-bg">
          <div className="max-w-2xl mx-auto grid gap-6 md:grid-cols-2">
            {data.family?.parents && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="family-card"
              >
                <p className="jost text-[#9B7A4A] text-xs tracking-[0.2em] uppercase mb-5">
                  Mis Papás
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
                <p className="jost text-[#9B7A4A] text-xs tracking-[0.2em] uppercase mb-5">
                  Mis Padrinos
                </p>
                <div className="family-separator" />
                <p className="family-name">{data.family.godparents.woman}</p>
                <div className="family-separator" />
                <p className="family-name">{data.family.godparents.man}</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════════════ CEREMONIA + RECEPCIÓN ════════════════ */}
        <section className="py-24 px-6" style={{ background: "#F7F0E6" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="jost text-[#9B7A4A] tracking-[0.2em] text-xs uppercase mb-2">
              El gran día
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic">
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
                <Church size={20} />
              </div>
              <div>
                <p className="jost text-[#9B7A4A] text-xs uppercase tracking-widest mb-0.5">
                  Ceremonia
                </p>
                <p className="jost text-[#3B2F2F] font-medium">
                  {data.location.church}
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
                  <p className="jost text-[#9B7A4A] text-xs uppercase tracking-widest mb-0.5">
                    Recepción
                  </p>
                  <p className="jost text-[#3B2F2F] font-medium">
                    {data.location.reception}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          <div className="text-center mt-10">
            <a
              href={data.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn jost"
            >
              <MapPin size={15} />
              Ver ubicación en el mapa
            </a>
          </div>
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
        <section
          className="py-28 px-6 text-center"
          style={{ background: "#F7F0E6" }}
        >
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
              className="rsvp-btn jost"
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
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{
                background: "rgba(30,20,10,0.65)",
                backdropFilter: "blur(8px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.88, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 30 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="gold-card max-w-sm w-full"
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
                    className="jost flex-1 py-3 rounded-2xl text-[#FDFAF4] text-sm font-medium transition"
                    style={{
                      background: "linear-gradient(135deg, #9B7A4A, #C4975A)",
                      boxShadow: "0 4px 20px rgba(155,122,74,0.35)",
                    }}
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
