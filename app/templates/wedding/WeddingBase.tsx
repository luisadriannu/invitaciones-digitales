"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { MapPin, Church, Utensils, Heart, Clock3 } from "lucide-react";

type InfoItem = {
  icon: React.ReactNode;
  label: string;
  value?: string;
};

interface Props {
  data: EventData;
}

/* ── Rose petals ── */
const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: 3 + ((i * 6.1) % 94),
  delay: (i * 0.6) % 7,
  duration: 7 + (i % 5),
  size: 6 + (i % 4) * 3,
  opacity: 0.12 + (i % 4) * 0.06,
  rotate: i * 23,
}));

export default function WeddingBase({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const coverImage = data.media.coverImage;

  const infoItems: InfoItem[] = [
    {
      icon: <Clock3 size={20} />,
      label: "Hora",
      value: data.event.ceremonyHour,
    },
    {
      icon: <Church size={20} />,
      label: "Ceremonia",
      value: data.location.church,
    },
    ...(data.location.reception
      ? [
          {
            icon: <Utensils size={20} />,
            label: "Recepción",
            value: data.location.reception,
          },
        ]
      : []),
  ];

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola 💍 Confirmo mi asistencia a la boda de ${data.event.name}`,
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
        style={{ fontFamily: "'Libre Baskerville', Georgia, serif" }}
        className="relative overflow-hidden"
        id="wedding-main"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Outfit:wght@300;400;500&display=swap');

          #wedding-main {
            background-color: #0C0A08;
            color: #F0E8DC;
          }

          .outfit { font-family: 'Outfit', sans-serif; }
          .script  { font-family: 'Great Vibes', cursive; }

          /* Deep rose noise bg */
          .dark-bg {
            background-color: #0C0A08;
            background-image:
              radial-gradient(ellipse at 15% 20%, rgba(120,40,60,0.18) 0%, transparent 50%),
              radial-gradient(ellipse at 85% 75%, rgba(80,30,50,0.15) 0%, transparent 50%);
          }

          .warm-bg {
            background-color: #110E0A;
            background-image:
              radial-gradient(ellipse at 50% 50%, rgba(100,35,50,0.12) 0%, transparent 60%);
          }

          /* Petal fall */
          @keyframes petalDrift {
            0%   { transform: translateY(-40px) rotate(0deg) translateX(0);   opacity: 0; }
            8%   { opacity: 1; }
            92%  { opacity: 0.5; }
            100% { transform: translateY(105vh) rotate(480deg) translateX(30px); opacity: 0; }
          }
          .petal {
            position: fixed;
            top: 0;
            pointer-events: none;
            z-index: 1;
            animation: petalDrift ease-in-out infinite;
            border-radius: 50% 0 50% 0;
          }

          /* Name in script */
          @keyframes roseShimmer {
            0%   { background-position: -300% center; }
            100% { background-position:  300% center; }
          }
          .name-gold {
            background: linear-gradient(90deg, #C8956A 15%, #F0D080 50%, #C8956A 85%);
            background-size: 300% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: roseShimmer 6s linear infinite;
          }

          /* Ornament line */
          .orn-line {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .orn-line::before,
          .orn-line::after {
            content: '';
            flex: 1;
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(200,149,106,0.35), transparent);
          }
          .orn-line span { color: rgba(200,149,106,0.55); font-size: 0.85rem; }

          /* Glass card */
          .glass-card {
            background: rgba(255,248,240,0.04);
            border: 1px solid rgba(200,149,106,0.15);
            border-radius: 24px;
            padding: 2rem 2.25rem;
            backdrop-filter: blur(6px);
            transition: border-color 0.3s, box-shadow 0.3s, transform 0.3s;
          }
          .glass-card:hover {
            border-color: rgba(200,149,106,0.35);
            box-shadow: 0 8px 40px rgba(200,149,106,0.1);
            transform: translateY(-2px);
          }
          .glass-card .icon-wrap {
            width: 46px; height: 46px;
            border-radius: 14px;
            background: rgba(200,149,106,0.1);
            border: 1px solid rgba(200,149,106,0.2);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            color: #C8956A;
          }

          /* Family block */
          .couple-name {
            font-size: 1.8rem;
            line-height: 1.1;
            color: #F0E8DC;
            font-weight: 400;
          }
          .couple-parents {
            font-size: 0.85rem;
            color: rgba(240,232,220,0.45);
            letter-spacing: 0.04em;
            margin-top: 0.35rem;
          }

          /* Divider */
          .rose-divider {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .rose-divider::before,
          .rose-divider::after {
            content: '';
            display: block;
            width: 1px;
            height: 44px;
            background: linear-gradient(to bottom, transparent, rgba(200,149,106,0.35), transparent);
          }
          .rose-divider span {
            font-size: 1.1rem;
            color: rgba(200,149,106,0.5);
            display: block;
            padding: 4px 0;
          }

          /* RSVP btn */
          .rsvp-btn {
            padding: 1.1rem 3.5rem;
            border-radius: 999px;
            background: linear-gradient(135deg, #8B3A52, #C8956A);
            color: #FFF8F0;
            font-size: 0.9rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            box-shadow: 0 8px 40px rgba(139,58,82,0.4);
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .rsvp-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 50px rgba(139,58,82,0.55); }

          /* Map link */
          .map-link {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 2rem;
            border-radius: 999px;
            border: 1px solid rgba(200,149,106,0.25);
            background: transparent;
            color: #C8956A;
            font-size: 0.85rem;
            letter-spacing: 0.06em;
            text-decoration: none;
            transition: background 0.3s, border-color 0.3s;
          }
          .map-link:hover { background: rgba(200,149,106,0.08); border-color: rgba(200,149,106,0.45); }

          /* Verse */
          .verse-block {
            position: relative;
            padding: 1.5rem 2rem 1.5rem 3.5rem;
            border-left: 1px solid rgba(200,149,106,0.3);
          }
          .verse-block::before {
            content: '"';
            position: absolute;
            left: 0.6rem;
            top: 0.5rem;
            font-size: 3.5rem;
            line-height: 1;
            color: rgba(200,149,106,0.25);
            font-family: Georgia, serif;
          }

          /* Heart pulse */
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.18); }
          }
          .heart-pulse { animation: pulse 2s ease-in-out infinite; }
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
              background: `linear-gradient(${p.rotate}deg, #8B3A52, #C8956A)`,
            }}
          />
        ))}

        {/* ════════════════ HERO ════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center dark-bg">
          <div className="absolute inset-0 z-0">
            <Image
              src={coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-[#0C0A08]" />
          </div>

          <div className="relative z-10 text-center px-8 flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.05em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.4 }}
              className="outfit text-[#C8956A]/70 text-xs uppercase mb-8 tracking-[0.3em]"
            >
              Nos casamos
            </motion.p>

            {/* Couple names in script */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.1 }}
              className="script name-gold leading-none"
              style={{ fontSize: "clamp(3rem, 12vw, 7rem)" }}
            >
              {data.event.name}
            </motion.h1>

            {/* Ornament with heart */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex items-center gap-4 my-8"
            >
              <div
                style={{
                  width: 70,
                  height: 1,
                  background: "rgba(200,149,106,0.35)",
                }}
              />
              <Heart
                size={14}
                fill="#8B3A52"
                color="#8B3A52"
                className="heart-pulse"
              />
              <div
                style={{
                  width: 70,
                  height: 1,
                  background: "rgba(200,149,106,0.35)",
                }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="outfit text-[#F0E8DC]/60 text-sm tracking-widest"
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
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#C8956A]/30 text-sm"
              >
                ↓
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════ FRASE ════════════════ */}
        <section className="relative z-10 py-24 px-6 dark-bg">
          <div className="rose-divider mb-14">
            <span>✦</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto verse-block"
          >
            <p className="text-[1.25rem] italic font-light leading-relaxed text-[#F0E8DC]/80">
              Con el corazón lleno de amor y alegría, queremos que seas parte
              del día más importante de nuestras vidas.
            </p>
            <p className="outfit text-[#C8956A]/50 text-xs tracking-widest uppercase mt-5">
              — Con amor, los novios
            </p>
          </motion.div>

          <div className="rose-divider mt-14">
            <span>♡</span>
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className="py-24 px-6 warm-bg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="outfit text-center text-[#C8956A]/70 tracking-[0.2em] text-xs uppercase mb-3">
              El gran día llega pronto
            </p>
            <h2 className="text-center text-3xl md:text-4xl font-light italic mb-12">
              Cuenta Regresiva
            </h2>
            <CountDown data={data} />
          </motion.div>
        </section>

        {/* ════════════════ NOVIOS / FAMILIA ════════════════ */}
        {(data.family?.parents || data.family?.godparents) && (
          <section className="py-24 px-6 dark-bg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="outfit text-[#C8956A]/70 tracking-[0.2em] text-xs uppercase mb-2">
                Con la bendición de
              </p>
              <h2 className="text-3xl md:text-4xl font-light italic">
                Nuestras Familias
              </h2>
            </motion.div>

            <div className="max-w-2xl mx-auto grid gap-6 md:grid-cols-2">
              {data.family?.parents && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card text-center"
                >
                  <p className="outfit text-[#C8956A]/70 text-xs tracking-[0.2em] uppercase mb-5">
                    Padres
                  </p>
                  <p className="couple-name">{data.family.parents.mother}</p>
                  <div
                    style={{
                      width: 40,
                      height: 1,
                      background: "rgba(200,149,106,0.25)",
                      margin: "1rem auto",
                    }}
                  />
                  <p className="couple-name">{data.family.parents.father}</p>
                </motion.div>
              )}
              {data.family?.godparents && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 }}
                  className="glass-card text-center"
                >
                  <p className="outfit text-[#C8956A]/70 text-xs tracking-[0.2em] uppercase mb-5">
                    Padrinos
                  </p>
                  <p className="couple-name">{data.family.godparents.woman}</p>
                  <div
                    style={{
                      width: 40,
                      height: 1,
                      background: "rgba(200,149,106,0.25)",
                      margin: "1rem auto",
                    }}
                  />
                  <p className="couple-name">{data.family.godparents.man}</p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* ════════════════ EVENTO ════════════════ */}
        <section className="py-24 px-6 warm-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="outfit text-[#C8956A]/70 tracking-[0.2em] text-xs uppercase mb-2">
              El día que nos unimos
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic">
              Detalles del evento
            </h2>
          </motion.div>

          <div className="max-w-xl mx-auto flex flex-col gap-4">
            {infoItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex items-center gap-4"
              >
                <div className="icon-wrap">{item.icon}</div>

                <div>
                  <p className="outfit text-[#C8956A]/60 text-xs uppercase tracking-widest mb-0.5">
                    {item.label}
                  </p>

                  <p className="outfit text-[#F0E8DC] font-medium text-sm">
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={data.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-link outfit"
            >
              <MapPin size={14} />
              Ver ubicación en el mapa
            </a>
          </div>
        </section>

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className="py-24 px-6 dark-bg">
          <div className="rose-divider mb-14">
            <span>✦</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="outfit text-[#C8956A]/70 tracking-[0.2em] text-xs uppercase mb-2">
              Nuestra historia
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic">Galería</h2>
          </motion.div>

          <Gallery images={data.media.gallery} />

          <p className="outfit text-center text-xs tracking-[0.2em] uppercase text-[#C8956A]/40 mt-6">
            Desliza para ver más
          </p>
        </section>

        {/* ════════════════ RSVP ════════════════ */}
        <section className="py-28 px-6 text-center warm-bg">
          <div className="rose-divider mb-14">
            <span>♡</span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3 }}
          >
            <p className="outfit text-[#C8956A]/70 tracking-[0.2em] text-xs uppercase mb-3">
              ¿Nos acompañas?
            </p>
            <h2 className="text-3xl md:text-4xl font-light italic mb-10">
              Confirma tu asistencia
            </h2>
            <button
              className="rsvp-btn outfit"
              onClick={() => setOpenModal(true)}
            >
              Confirmar
            </button>
          </motion.div>
        </section>

        {/* ════════════════ FOOTER ════════════════ */}
        <footer className="py-10 text-center dark-bg border-t border-[rgba(200,149,106,0.1)]">
          <p className="script text-[#C8956A]/50 text-xl">{data.event.name}</p>
          <p className="outfit text-[#F0E8DC]/20 text-xs tracking-widest mt-1">
            {data.event.date}
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
                background: "rgba(12,10,8,0.85)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.85, y: 35 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 35 }}
                transition={{ type: "spring", bounce: 0.3 }}
                style={{
                  background: "linear-gradient(145deg, #1A1210, #140E0C)",
                  border: "1px solid rgba(200,149,106,0.2)",
                  borderRadius: "28px",
                  padding: "2.5rem",
                  maxWidth: "400px",
                  width: "100%",
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(139,58,82,0.08)",
                }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3 heart-pulse inline-block">
                    💍
                  </div>
                  <h3 className="text-2xl font-light italic mb-2">
                    Confirmar asistencia
                  </h3>
                  <p className="outfit text-[#F0E8DC]/50 text-sm">
                    Te redirigiremos a WhatsApp para confirmar tu lugar en
                    nuestra boda.
                  </p>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="outfit flex-1 py-3 rounded-2xl text-[#C8956A]/60 border border-[rgba(200,149,106,0.15)] hover:border-[rgba(200,149,106,0.3)] transition text-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      confirmAttendance();
                      setOpenModal(false);
                    }}
                    className="outfit flex-1 py-3 rounded-2xl text-[#FFF8F0] text-sm font-medium"
                    style={{
                      background: "linear-gradient(135deg, #8B3A52, #C8956A)",
                      boxShadow: "0 4px 25px rgba(139,58,82,0.4)",
                    }}
                  >
                    ¡Confirmar! 💍
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
