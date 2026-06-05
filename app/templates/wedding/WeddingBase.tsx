"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { Church, Utensils, Heart, Clock3 } from "lucide-react";
import LocationMaps from "@/app/components/LocationMaps";
import { Great_Vibes } from "next/font/google";

type InfoItem = {
  icon: React.ReactNode;
  label: string;
  value?: string;
};

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

interface Props {
  data: EventData;
}

/* ── Tailwind shorthand constants ── */
const darkBg =
  "bg-[#0C0A08] [background-image:radial-gradient(ellipse_at_15%_20%,rgba(120,40,60,0.18)_0%,transparent_50%),radial-gradient(ellipse_at_85%_75%,rgba(80,30,50,0.15)_0%,transparent_50%)]";

const warmBg =
  "bg-[#110E0A] [background-image:radial-gradient(ellipse_at_50%_50%,rgba(100,35,50,0.12)_0%,transparent_60%)]";

const glassCard =
  "bg-[rgba(255,248,240,0.04)] border border-[rgba(200,149,106,0.15)] rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(200,149,106,0.35)] hover:shadow-[0_8px_40px_rgba(200,149,106,0.1)] hover:-translate-y-0.5";

/* Rose divider: vertical line + symbol + vertical line via flex-col */
function RoseDivider({ symbol }: { symbol: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-px h-11 bg-linear-to-b from-transparent via-[rgba(200,149,106,0.35)] to-transparent" />
      <span className="text-[rgba(200,149,106,0.5)] text-lg py-1">
        {symbol}
      </span>
      <div className="w-px h-11 bg-linear-to-b from-transparent via-[rgba(200,149,106,0.35)] to-transparent" />
    </div>
  );
}

/* Small horizontal divider */
function SmallDivider() {
  return <div className="w-10 h-px bg-[rgba(200,149,106,0.25)] mx-auto my-4" />;
}

/* Rose petals */
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
        <section
          className={`relative min-h-screen flex flex-col items-center justify-center ${darkBg}`}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src={coverImage}
              alt={data.event.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/40 to-[#0C0A08]" />
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

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1.1 }}
              className={`${greatVibes.className} name-gold leading-tight`}
              style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
            >
              {data.event.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex items-center gap-4 my-8"
            >
              <div className="w-17.5 h-px bg-[rgba(200,149,106,0.35)]" />
              <Heart
                size={14}
                fill="#8B3A52"
                color="#8B3A52"
                className="heart-pulse"
              />
              <div className="w-17.5 h-px bg-[rgba(200,149,106,0.35)]" />
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
        <section className={`relative z-10 py-24 px-6 ${darkBg}`}>
          <div className="mb-14">
            <RoseDivider symbol="✦" />
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

          <div className="mt-14">
            <RoseDivider symbol="♡" />
          </div>
        </section>

        {/* ════════════════ COUNTDOWN ════════════════ */}
        <section className={`py-24 px-6 ${warmBg}`}>
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

        {/* ════════════════ FAMILIA ════════════════ */}
        {(data.family?.parents || data.family?.godparents) && (
          <section className={`py-24 px-6 ${darkBg}`}>
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
                  className={`text-center ${glassCard}`}
                >
                  <p className="outfit text-[#C8956A]/70 text-xs tracking-[0.2em] uppercase mb-5">
                    Padres
                  </p>
                  <p className="couple-name">{data.family.parents.mother}</p>
                  <SmallDivider />
                  <p className="couple-name">{data.family.parents.father}</p>
                </motion.div>
              )}
              {data.family?.godparents && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 }}
                  className={`text-center ${glassCard}`}
                >
                  <p className="outfit text-[#C8956A]/70 text-xs tracking-[0.2em] uppercase mb-5">
                    Padrinos
                  </p>
                  <p className="couple-name">{data.family.godparents.woman}</p>
                  <SmallDivider />
                  <p className="couple-name">{data.family.godparents.man}</p>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* ════════════════ EVENTO ════════════════ */}
        <section className={`py-24 px-6 ${warmBg}`}>
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
                className={`flex items-center gap-4 ${glassCard}`}
              >
                <div className="w-11.5 h-11.5 rounded-[14px] bg-[rgba(200,149,106,0.1)] border border-[rgba(200,149,106,0.2)] flex items-center justify-center shrink-0 text-[#C8956A]">
                  {item.icon}
                </div>
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

          <LocationMaps data={data} />
        </section>

        {/* ════════════════ ITINERARIO ════════════════ */}
        {data.event.itinerary && (
          <section className={`py-24 px-6 ${darkBg}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="outfit text-[#C8956A]/70 tracking-[0.2em] text-xs uppercase mb-2">
                Celebremos juntos
              </p>
              <h2 className="text-3xl md:text-4xl font-light italic">
                Itinerario del Evento
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {data.event.itinerary.map((item, index) => (
                <motion.div
                  key={`${item.hour}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-5 items-start ${glassCard}`}
                >
                  <div className="min-w-20 text-center">
                    <p className="outfit text-[#C8956A] text-sm tracking-wider">
                      {item.hour}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-[#F0E8DC]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="outfit text-[#F0E8DC]/60 text-sm mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ════════════════ GALERÍA ════════════════ */}
        <section className={`py-14 px-6 ${darkBg}`}>
          <div className="mb-14">
            <RoseDivider symbol="✦" />
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
        <section className={`py-28 px-6 text-center ${warmBg}`}>
          <div className="mb-14">
            <RoseDivider symbol="♡" />
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
        <footer
          className={`py-10 text-center ${darkBg} border-t border-[rgba(200,149,106,0.1)]`}
        >
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
