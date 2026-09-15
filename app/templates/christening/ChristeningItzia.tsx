"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type MotionProps } from "motion/react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import MusicButton from "@/app/components/MusicButton";
import EnvelopeIntro from "@/app/components/EnvelopeIntro";
import Gallery from "@/app/components/Gallery";
import LocationMaps from "@/app/components/LocationMaps";
import type { EventData } from "@/app/types/EventData";
import { useCountdown } from "@/app/hooks/useCountdown";
import { MessageCircleHeart, Music, MapPin, Sparkles } from "lucide-react";

interface Props {
  data: EventData;
}

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const utility = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-utility",
});

const C = {
  primary: "#5a3a48",
  secondary: "#8a6b76",
  accent: "#d98cae",
  muted: "#a3818c",
  label: "#c98fa8",
  decorative: "#e0a8bf",
  blush: "rgba(217,140,174,",
  rose: "rgba(201,143,168,",
  ring: "rgba(224,168,191,",
  shadow: "rgba(150,90,115,",
} as const;

const FONT_DISPLAY = "var(--font-display)";
const FONT_UTILITY = "var(--font-utility)";

const MOTES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 11) % 84),
  delay: (i * 0.9) % 7,
  duration: 11 + (i % 3) * 2,
  size: 3 + (i % 3),
}));

const MESES: Record<string, number> = {
  Enero: 0,
  Febrero: 1,
  Marzo: 2,
  Abril: 3,
  Mayo: 4,
  Junio: 5,
  Julio: 6,
  Agosto: 7,
  Septiembre: 8,
  Octubre: 9,
  Noviembre: 10,
  Diciembre: 11,
};

const fadeInUp: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9 },
};

function FadeIn({
  children,
  className,
  style,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function DoveMark({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 26c-3-8-10-13-19-13 5 3 7 7 7 11-6-1-11 1-15 5 6 1 11 0 15-3 1 6 6 10 12 11" />
      <path d="M32 26c3-8 10-13 19-13-5 3-7 7-7 11 6-1 11 1 15 5-6 1-11 0-15-3 1 6-6 10-12 11" />
      <circle cx="32" cy="21" r="2.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LaurelSprig({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 60 22"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <path d="M2 11h50" />
      {[6, 14, 22, 30, 38, 46].map((x, i) => (
        <path key={i} d={`M${x} 11c3-4 6-5 9-4-1 3-4 5-9 4z`} />
      ))}
    </svg>
  );
}

function CrossIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 32"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M12 4v24" />
      <path d="M4 12h16" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[13px] uppercase mb-10"
      style={{
        fontFamily: FONT_UTILITY,
        letterSpacing: "0.32em",
        color: C.label,
      }}
    >
      {children}
    </p>
  );
}

function DetailLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[11px] uppercase mb-4"
      style={{
        fontFamily: FONT_UTILITY,
        letterSpacing: "0.28em",
        color: C.accent,
      }}
    >
      {children}
    </p>
  );
}

function DetailValue({
  children,
  mb = false,
}: {
  children: React.ReactNode;
  mb?: boolean;
}) {
  return (
    <p
      className={`italic font-light ${mb ? "mb-2" : ""}`}
      style={{
        fontFamily: FONT_DISPLAY,
        fontSize: "1.75rem",
        color: C.primary,
      }}
    >
      {children}
    </p>
  );
}

function OrnamentDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-2">
      <div className="h-px w-6" style={{ background: `${C.rose}0.3)` }} />
      <div
        className="w-1 h-1 rounded-full"
        style={{ background: `${C.blush}0.5)` }}
      />
      <div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: `${C.blush}0.7)` }}
      />
      <div
        className="w-1 h-1 rounded-full"
        style={{ background: `${C.blush}0.5)` }}
      />
      <div className="h-px w-6" style={{ background: `${C.rose}0.3)` }} />
    </div>
  );
}

function LaurelDivider() {
  return (
    <motion.div
      {...fadeInUp}
      className="flex items-center gap-4 py-2"
      style={{ color: C.decorative }}
    >
      <LaurelSprig className="w-12 h-4" />
      <DoveMark className="w-6 h-4" />
      <LaurelSprig className="w-12 h-4" flip />
    </motion.div>
  );
}

function DetailSection({
  icon,
  label,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="flex items-center justify-center gap-2 mb-4">
        {icon}
        <DetailLabel>{label}</DetailLabel>
      </div>
      {children}
    </FadeIn>
  );
}

function PreCountDown({ data }: { data: EventData }) {
  const [dia, mes, año] = data.event.date.split(" ");
  const [hora, periodo] = data.event.partyHour.split(" ");
  const [hh, mm] = hora.split(":").map(Number);
  const hora24 =
    periodo === "PM" && hh !== 12
      ? hh + 12
      : hh === 12 && periodo === "AM"
        ? 0
        : hh;
  const target = new Date(Number(año), MESES[mes], Number(dia), hora24, mm);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const finished = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  if (finished) {
    return (
      <p
        className="italic text-2xl"
        style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
      >
        ¡Hoy es el gran día!
      </p>
    );
  }

  return (
    <div className="flex justify-center gap-5">
      {[
        { value: days, label: "Días" },
        { value: hours, label: "Horas" },
        { value: minutes, label: "Minutos" },
        { value: seconds, label: "Segundos" },
      ].map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span
            className="italic font-light leading-none"
            style={{
              fontFamily: FONT_DISPLAY,
              fontSize: "clamp(3rem, 11vw, 4.4rem)",
              color: C.primary,
              letterSpacing: "-0.02em",
            }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: FONT_UTILITY,
              fontSize: "0.72rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: C.label,
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

const COUNTDOWN_CORNERS = [
  "top-2 left-2 rotate-0",
  "top-2 right-2 rotate-90",
  "bottom-2 right-2 rotate-180",
  "bottom-2 left-2 -rotate-90",
];

export default function ChristeningItzia({ data }: Props) {
  const [showIntro, setShowIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const heroImage = data.media.gallery[0] ?? data.media.coverImage;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${encodeURIComponent(
    `Hola, confirmo mi asistencia al bautizo de ${data.event.name}. ¡Gracias por la invitación!`,
  )}`;

  const confirmAttendance = () => {
    window.open(whatsappUrl, "_blank");
    setOpenModal(false);
  };

  return (
    <>
      {showIntro && (
        <EnvelopeIntro
          onOpen={() => {
            setShowIntro(false);
            setRevealed(true);
          }}
        />
      )}
      {data.media.music && <MusicButton src={data.media.music} />}

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        id="chr-itzia"
        className={`${display.variable} ${utility.variable} relative min-h-screen overflow-hidden`}
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, #fffbfc 0%, #fdf1f5 45%, #f8dfe9 100%)",
        }}
      >
        {MOTES.map((m) => (
          <div
            key={m.id}
            className="chr-mote"
            style={{
              left: `${m.x}%`,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.duration}s`,
            }}
          />
        ))}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ boxShadow: "inset 0 0 140px rgba(160,90,115,0.10)" }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 py-20 gap-16">
          {/* HERO DECORATION */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <CrossIcon className="w-6 h-8" style={{ color: "#b86485" }} />
            <div className="flex items-center gap-3 mt-3">
              <LaurelSprig className="w-14 h-5 text-[#d98cae]" />
              <div className="w-2 h-2 rounded-full" style={{ background: "#c98fa8" }} />
              <LaurelSprig className="w-14 h-5 text-[#d98cae]" flip />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-px w-16" style={{ background: "rgba(201,143,168,0.4)" }} />
              <DoveMark className="w-5 h-3" style={{ color: "#d98cae" }} />
              <div className="h-px w-16" style={{ background: "rgba(201,143,168,0.4)" }} />
            </div>
          </motion.div>

          {/* HERO */}
          <motion.section
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-sm"
            style={{
              aspectRatio: "3/4",
              boxShadow: `0 0 0 1px ${C.ring}0.4), 0 30px 60px ${C.shadow}0.22)`,
              borderRadius: "1.5rem",
              overflow: "hidden",
            }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={heroImage}
                alt={data.event.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  fontFamily: FONT_UTILITY,
                  fontSize: "0.78rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Bautizo y Presentación
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.7 }}
                className="flex items-center gap-3 my-3"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                <div className="h-px w-8 bg-white/30" />
                <DoveMark className="w-6 h-4" />
                <div className="h-px w-8 bg-white/30" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
                className="font-medium leading-none"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "clamp(2.8rem, 13vw, 5rem)",
                  color: "#fff",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                {data.event.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="italic font-light mt-2"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "1.3rem",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                será bautizada y presentada
              </motion.p>
            </div>
          </motion.section>

          {/* VERSE */}
          <motion.div
            {...fadeInUp}
            className="relative text-center max-w-sm px-6"
          >
            <p
              className="italic font-light leading-relaxed"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.35rem",
                color: C.secondary,
              }}
            >
              Con la bendición de Dios y el amor de nuestra familia, queremos
              compartir contigo este día tan especial en el que{" "}
              <span className="font-medium" style={{ color: C.primary }}>
                {data.event.name}
              </span>{" "}
              recibirá las aguas bautismales.
            </p>
          </motion.div>

          {/* PORTRAIT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="itzia-portrait-ring"
            style={{ position: "relative", width: 200, height: 200 }}
          >
            <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#f0d4e0] shadow-[0_8px_40px_rgba(200,140,170,0.25)]">
              <Image
                src={heroImage}
                alt={data.event.name}
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </motion.div>

          {/* COUNTDOWN */}
          <motion.div
            {...fadeInUp}
            className="itzia-countdown relative w-full max-w-sm p-9 text-center"
          >
            {COUNTDOWN_CORNERS.map((pos, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className={`absolute w-4 h-4 ${pos}`}
                style={{ color: C.accent }}
              >
                <path
                  d="M1 1v7M1 1h7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </svg>
            ))}
            <h2
              className="italic font-light mb-7"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.9rem",
                color: C.primary,
              }}
            >
              Cuenta Regresiva
            </h2>
            <p
              className="text-[12px] uppercase mb-1"
              style={{
                fontFamily: FONT_UTILITY,
                letterSpacing: "0.28em",
                color: C.label,
              }}
            >
              El gran día llega en
            </p>
            <PreCountDown data={data} />
            <p
              className="italic mt-6"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1rem",
                color: C.muted,
                letterSpacing: "0.02em",
              }}
            >
              {data.event.date}
            </p>
          </motion.div>

          <LaurelDivider />

          {/* FAMILIA */}
          <motion.section {...fadeInUp} className="w-full max-w-sm text-center">
            <SectionLabel>Nuestra Familia</SectionLabel>
            {data.family?.parents && (
              <FadeIn delay={0.1} className="mb-12">
                <DetailLabel>Padres</DetailLabel>
                <p
                  className="italic font-light"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.55rem",
                    color: C.primary,
                    lineHeight: 1.4,
                  }}
                >
                  {data.family.parents.father}
                </p>
                <div
                  className="w-8 h-px mx-auto my-4"
                  style={{ background: `${C.blush}0.4)` }}
                />
                <p
                  className="italic font-light"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.55rem",
                    color: C.primary,
                    lineHeight: 1.4,
                  }}
                >
                  {data.family.parents.mother}
                </p>
              </FadeIn>
            )}
            <OrnamentDivider />
            <div className="my-8" />
            {data.family?.godparents && (
              <FadeIn delay={0.25}>
                <DetailLabel>Padrinos</DetailLabel>
                <p
                  className="italic font-light"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.55rem",
                    color: C.primary,
                    lineHeight: 1.4,
                  }}
                >
                  {data.family.godparents.man}
                </p>
                <div
                  className="w-8 h-px mx-auto my-4"
                  style={{ background: `${C.blush}0.4)` }}
                />
                <p
                  className="italic font-light"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.55rem",
                    color: C.primary,
                    lineHeight: 1.4,
                  }}
                >
                  {data.family.godparents.woman}
                </p>
              </FadeIn>
            )}
          </motion.section>

          {/* DETALLES */}
          <motion.section {...fadeInUp} className="w-full max-w-sm text-center">
            <SectionLabel>El Gran Día</SectionLabel>
            <DetailSection
              icon={
                <CrossIcon className="w-3 h-4" style={{ color: C.accent }} />
              }
              label="Ceremonia"
              delay={0.1}
            >
              <DetailValue mb>Misa</DetailValue>
              <DetailValue>{data.event.ceremonyHour ?? "9:00 AM"}</DetailValue>
            </DetailSection>
            <OrnamentDivider />
            <DetailSection
              icon={
                <Sparkles className="w-3 h-3" style={{ color: C.accent }} />
              }
              label="Hora de la Fiesta"
              delay={0.2}
            >
              <DetailValue>{data.event.partyHour}</DetailValue>
            </DetailSection>
            {(data.event.dressCode || data.event.dressCodeNote) && (
              <>
                <OrnamentDivider />
                <FadeIn delay={0.3} className="my-10">
                  <DetailLabel>Código de Vestimenta</DetailLabel>
                  <p
                    className="italic font-light"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: "1.5rem",
                      color: C.primary,
                    }}
                  >
                    {data.event.dressCodeNote ?? data.event.dressCode}
                  </p>
                </FadeIn>
              </>
            )}
            {data.event.specialMusic && (
              <>
                <OrnamentDivider />
                <DetailSection
                  icon={
                    <Music className="w-3 h-3" style={{ color: C.accent }} />
                  }
                  label="Música Especial"
                  delay={0.35}
                >
                  <p
                    className="italic font-light"
                    style={{
                      fontFamily: FONT_DISPLAY,
                      fontSize: "1.4rem",
                      color: C.primary,
                    }}
                  >
                    {data.event.specialMusic}
                  </p>
                </DetailSection>
              </>
            )}
            <OrnamentDivider />
            <DetailSection
              icon={<MapPin className="w-3 h-3" style={{ color: C.accent }} />}
              label="Ubicación"
              delay={0.4}
            >
              {data.location.church && (
                <p
                  className="italic font-light mb-3"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.4rem",
                    color: C.primary,
                  }}
                >
                  {data.location.church}
                </p>
              )}
              {data.location.reception && (
                <p
                  className="italic font-light"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.4rem",
                    color: C.secondary,
                  }}
                >
                  {data.location.reception}
                </p>
              )}
            </DetailSection>
            {data.location.mapUrl && <LocationMaps data={data} />}
          </motion.section>

          <LaurelDivider />

          {/* GALERIA */}
          <motion.section {...fadeInUp} className="w-full max-w-sm text-center">
            <SectionLabel>Recuerdos</SectionLabel>
            <h2
              className="italic font-light mb-8"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "2.1rem",
                color: C.primary,
              }}
            >
              Galería
            </h2>
            <Gallery images={data.media.gallery} />
            <p
              className="mt-4"
              style={{
                fontFamily: FONT_UTILITY,
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.label,
              }}
            >
              Desliza para ver más
            </p>
          </motion.section>

          {/* DIVIDER 2 */}
          <motion.div
            {...fadeInUp}
            className="flex items-center gap-4 py-2"
            style={{ color: C.decorative }}
          >
            <LaurelSprig className="w-12 h-4" />
            <CrossIcon className="w-4 h-5" />
            <LaurelSprig className="w-12 h-4" flip />
          </motion.div>

          {/* RSVP */}
          <motion.section
            {...fadeInUp}
            className="w-full max-w-sm text-center pb-4"
          >
            <SectionLabel>¿Nos acompañas?</SectionLabel>
            <h2
              className="italic font-light mb-3"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "2.1rem",
                color: C.primary,
              }}
            >
              Confirma tu asistencia
            </h2>
            <p
              className="italic font-light mb-8"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.05rem",
                color: C.muted,
              }}
            >
              Esperamos contar con tu presencia en este día tan especial
            </p>
            <button
              className="itzia-rsvp-btn"
              onClick={() => setOpenModal(true)}
            >
              <MessageCircleHeart size={16} />
              <span>Confirmar Asistencia</span>
            </button>
          </motion.section>

          {/* FOOTER */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center pt-8 pb-4"
          >
            <div
              className="flex items-center justify-center gap-3 mb-6"
              style={{ color: C.decorative }}
            >
              <div
                className="h-px w-12"
                style={{ background: `${C.rose}0.3)` }}
              />
              <DoveMark className="w-5 h-3" />
              <div
                className="h-px w-12"
                style={{ background: `${C.rose}0.3)` }}
              />
            </div>
            <p
              className="italic font-light mb-1"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.2rem",
                color: C.muted,
              }}
            >
              Con amor — {data.event.name}
            </p>
            <p
              style={{
                fontFamily: FONT_UTILITY,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: C.label,
              }}
            >
              {data.event.date}
            </p>
          </motion.footer>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              style={{
                background: "rgba(90,58,72,0.55)",
                backdropFilter: "blur(6px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.88, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.88, y: 30 }}
                transition={{ type: "spring", bounce: 0.3 }}
                className="itzia-modal-card max-w-sm w-full"
              >
                <DoveMark
                  className="w-10 h-6 mx-auto mb-4"
                  style={{ color: C.accent }}
                />
                <h3
                  className="italic font-light mb-2"
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontSize: "1.75rem",
                    color: C.primary,
                  }}
                >
                  Confirmar asistencia
                </h3>
                <p
                  className="mb-8"
                  style={{
                    fontFamily: FONT_UTILITY,
                    fontSize: "0.9rem",
                    color: C.secondary,
                    letterSpacing: "0.05em",
                  }}
                >
                  Te redirigiremos a WhatsApp para confirmar tu lugar en la
                  celebración.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="itzia-modal-cancel"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmAttendance}
                    className="itzia-modal-confirm"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  );
}
