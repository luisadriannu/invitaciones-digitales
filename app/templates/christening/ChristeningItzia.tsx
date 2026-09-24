"use client";

import { useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type MotionProps,
} from "motion/react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import MusicButton from "@/app/components/MusicButton";
import Gallery from "@/app/components/Gallery";
import LocationMaps from "@/app/components/LocationMaps";
import type { EventData } from "@/app/types/EventData";
import { useCountdown } from "@/app/hooks/useCountdown";
import { MessageCircleHeart, MapPin, Gift } from "lucide-react";

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
  primary: "#633a4d",
  secondary: "#795664",
  accent: "#df6094",
  muted: "#916d79",
  label: "#ad5276",
  decorative: "#b99a58",
  rose: "rgba(183,151,86,",
} as const;

const FONT_DISPLAY = "var(--font-display)";
const FONT_UTILITY = "var(--font-utility)";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[12px] uppercase mb-6"
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

function ItziaOpening({
  image,
  onOpen,
  reduceMotion,
}: {
  image: string;
  onOpen: () => void;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${display.variable} ${utility.variable} fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 overflow-hidden px-6 py-8 text-center`}
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #fffaf7, #f9dce8)",
      }}
    >
      <p
        className="text-[11px] uppercase tracking-[0.3em]"
        style={{ fontFamily: FONT_UTILITY, color: C.label }}
      >
        Tienes una invitación
      </p>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative h-[min(62svh,520px)] w-[min(82vw,350px)] overflow-hidden rounded-t-full rounded-b-[1.75rem] border-[5px] border-[#fffaf7] shadow-[0_18px_50px_rgba(126,69,92,0.2)]"
      >
        <Image
          src={image}
          alt="Itzia con su vestido rosa"
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="(max-width: 640px) 82vw, 350px"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#482b39]/65 to-transparent" />
        <p
          className="absolute inset-x-3 bottom-5 text-4xl italic text-white"
          style={{ fontFamily: FONT_DISPLAY }}
        >
          Itzia Sarai
        </p>
      </motion.div>
      <button
        type="button"
        onClick={onOpen}
        className="min-h-12 rounded-full bg-[#ad5276] px-8 py-3 text-[11px] uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_rgba(173,82,118,0.25)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ad5276]"
        style={{ fontFamily: FONT_UTILITY }}
      >
        Toca para abrir la invitación
      </button>
    </motion.div>
  );
}

export default function ChristeningItzia({ data }: Props) {
  const reduceMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const heroImage = data.media.gallery[7] ?? data.media.coverImage;
  const openingImage = data.media.gallery[0] ?? data.media.coverImage;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${encodeURIComponent(
    `Hola, confirmo mi asistencia al bautizo de ${data.event.name}. ¡Gracias por la invitación!`,
  )}`;

  const confirmAttendance = () => {
    window.open(whatsappUrl, "_blank");
    setOpenModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <ItziaOpening
            image={openingImage}
            reduceMotion={Boolean(reduceMotion)}
            onOpen={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>
      {data.media.music && <MusicButton src={data.media.music} autoPlay color={C.primary} backgroundColor="#fff5f8" />}

      <motion.main
        inert={showIntro}
        id="chr-itzia"
        className={`${display.variable} ${utility.variable} relative ${showIntro ? "h-[100svh]" : "min-h-screen"} overflow-hidden`}
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, #fffaf7 0%, #fff1f5 48%, #f9dce8 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ boxShadow: "inset 0 0 140px rgba(183,151,86,0.10)" }}
        />

        {/* La portada ocupa la primera pantalla; el resto sigue al deslizar. */}
        <section className="relative z-10 min-h-screen min-h-[100svh] w-full overflow-hidden text-white">
          <Image
            src={heroImage}
            alt={data.event.name}
            fill
            priority
            className="object-cover object-[center_38%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#34202b]/85 via-[#432935]/20 to-transparent" />
          <div className="absolute inset-4 rounded-[1.5rem] border border-[#f3dbad]/55 pointer-events-none sm:inset-7" />
          <div className="relative flex min-h-screen min-h-[100svh] flex-col items-center justify-end px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 text-center">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[#f9e4bc]"
              style={{ fontFamily: FONT_UTILITY }}
            >
              Bautizo y presentación
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-xl text-[clamp(3.4rem,12vw,6.5rem)] font-medium leading-[0.9]"
              style={{
                fontFamily: FONT_DISPLAY,
                textShadow: "0 3px 24px rgba(25,12,20,0.4)",
              }}
            >
              {data.event.name}
            </motion.h1>
            <p
              className="mt-4 text-sm tracking-[0.12em] text-[#f9e4bc]"
              style={{ fontFamily: FONT_UTILITY }}
            >
              {data.event.date}
            </p>
            <div
              className="mt-9 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/85"
              style={{ fontFamily: FONT_UTILITY }}
            >
              <span>Desliza para descubrir</span>
              <span aria-hidden="true" className="text-xl leading-none">
                ↓
              </span>
            </div>
          </div>
        </section>

        <div className="relative z-10 flex flex-col items-center gap-12 px-6 py-16 sm:gap-16 sm:py-20">
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

          {/* FAMILIA */}
          <motion.section {...fadeInUp} className="w-full max-w-sm text-center">
            <SectionLabel>Nuestra Familia</SectionLabel>
            <div className="rounded-3xl border border-[#d8b981]/50 bg-white/55 px-6 py-6 shadow-[0_12px_32px_rgba(126,69,92,0.06)]">
              {data.family?.parents && (
                <div>
                  <p
                    className="mb-2 text-[10px] uppercase tracking-[0.26em]"
                    style={{ fontFamily: FONT_UTILITY, color: C.label }}
                  >
                    Sus papás
                  </p>
                  <p
                    className="text-[1.35rem] italic leading-tight"
                    style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
                  >
                    {data.family.parents.father}{" "}
                    <span className="text-[#b99a58]">&</span>{" "}
                    {data.family.parents.mother}
                  </p>
                </div>
              )}
              {data.family?.parents && data.family?.godparents && (
                <div className="mx-auto my-5 h-px w-16 bg-[#d8b981]/70" />
              )}
              {data.family?.godparents && (
                <div>
                  <p
                    className="mb-2 text-[10px] uppercase tracking-[0.26em]"
                    style={{ fontFamily: FONT_UTILITY, color: C.label }}
                  >
                    Sus padrinos
                  </p>
                  <p
                    className="text-[1.35rem] italic leading-tight"
                    style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
                  >
                    {data.family.godparents.man}{" "}
                    <span className="text-[#b99a58]">&</span>{" "}
                    {data.family.godparents.woman}
                  </p>
                </div>
              )}
              {data.family?.godparents && (
                <div>
                  <div className="mx-auto my-5 h-px w-16 bg-[#d8b981]/70" />
                  <p
                    className="mb-2 text-[10px] uppercase tracking-[0.26em]"
                    style={{ fontFamily: FONT_UTILITY, color: C.label }}
                  >
                    Sus padrinos de presentación
                  </p>
                  <p
                    className="text-[1.35rem] italic leading-tight"
                    style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
                  >
                    Pablo Manuel Reynoso de la Paz{" "}
                    <span className="text-[#b99a58]">&</span> <br /> Deniss
                    Benitez Espinoza
                  </p>
                </div>
              )}
            </div>
          </motion.section>

          {/* DETALLES */}
          <motion.section {...fadeInUp} className="w-full max-w-sm text-center">
            <SectionLabel>El gran día</SectionLabel>
            <div className="overflow-hidden rounded-3xl border border-[#d8b981]/50 bg-white/55 text-left shadow-[0_12px_32px_rgba(126,69,92,0.06)]">
              <div className="flex items-center gap-4 px-6 py-5">
                <span
                  className="w-16 shrink-0 text-[10px] uppercase tracking-[0.15em]"
                  style={{ fontFamily: FONT_UTILITY, color: C.label }}
                >
                  Misa
                </span>
                <div>
                  <p
                    className="text-[1.55rem] italic leading-none"
                    style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
                  >
                    {data.event.ceremonyHour ?? "9:00 AM"}
                  </p>
                  {data.location.church && (
                    <p
                      className="mt-1 flex items-center gap-1 text-sm"
                      style={{ fontFamily: FONT_UTILITY, color: C.secondary }}
                    >
                      <MapPin size={12} />
                      {data.location.church}
                    </p>
                  )}
                </div>
              </div>
              <div className="mx-6 h-px bg-[#d8b981]/50" />
              <div className="flex items-center gap-4 px-6 py-5">
                <span
                  className="w-16 shrink-0 text-[10px] uppercase tracking-[0.15em]"
                  style={{ fontFamily: FONT_UTILITY, color: C.label }}
                >
                  Fiesta
                </span>
                <div>
                  <p
                    className="text-[1.55rem] italic leading-none"
                    style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
                  >
                    {data.event.partyHour}
                  </p>
                  {data.location.reception && (
                    <p
                      className="mt-1 flex items-center gap-1 text-sm"
                      style={{ fontFamily: FONT_UTILITY, color: C.secondary }}
                    >
                      <MapPin size={12} />
                      {data.location.reception}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {(data.event.specialMusic ||
              ((data.event.dressCodeNote ?? data.event.dressCode) &&
                !/^sin código/i.test(
                  data.event.dressCodeNote ?? data.event.dressCode ?? "",
                ))) && (
              <details
                className="mt-5 text-left text-sm"
                style={{ fontFamily: FONT_UTILITY, color: C.secondary }}
              >
                <summary className="cursor-pointer text-center underline decoration-[#b99a58] underline-offset-4">
                  Otros detalles
                </summary>
                <div className="mt-4 space-y-2 rounded-2xl bg-white/50 p-4">
                  {data.event.specialMusic && (
                    <p>
                      <span className="font-medium">Canción:</span>{" "}
                      {data.event.specialMusic}
                    </p>
                  )}
                  {(data.event.dressCodeNote ?? data.event.dressCode) &&
                    !/^sin código/i.test(
                      data.event.dressCodeNote ?? data.event.dressCode ?? "",
                    ) && (
                      <p>
                        <span className="font-medium">Vestimenta:</span>{" "}
                        {data.event.dressCodeNote ?? data.event.dressCode}
                      </p>
                    )}
                </div>
              </details>
            )}
            {data.location.mapUrl && <LocationMaps data={data} />}
          </motion.section>

          {/* GALERIA */}
          <motion.section {...fadeInUp} className="w-full max-w-sm text-center">
            <h2
              className="italic font-light mb-6"
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
              className="italic font-light mt-4"
              style={{
                fontFamily: FONT_DISPLAY,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                color: C.muted,
              }}
            >
              Desliza para ver más
            </p>
          </motion.section>

          {/* REGALOS */}
          {data.event.giftMessage && (
            <motion.section
              {...fadeInUp}
              initial={reduceMotion ? false : fadeInUp.initial}
              aria-labelledby="itzia-gifts-title"
              className="w-full max-w-sm text-center"
            >
              <div className="rounded-3xl border border-[#d8b981]/50 bg-white/55 px-6 py-8 shadow-[0_12px_32px_rgba(126,69,92,0.06)]">
                <Gift
                  size={28}
                  strokeWidth={1.25}
                  aria-hidden="true"
                  className="mx-auto mb-4"
                  style={{ color: C.decorative }}
                />
                <h2
                  id="itzia-gifts-title"
                  className="mb-4 text-[2.1rem] font-light italic"
                  style={{ fontFamily: FONT_DISPLAY, color: C.primary }}
                >
                  Opciones de regalo
                </h2>
                <p
                  className="text-lg leading-relaxed"
                  style={{ fontFamily: FONT_DISPLAY, color: C.secondary }}
                >
                  {data.event.giftMessage}
                </p>
              </div>
            </motion.section>
          )}

          {/* RSVP */}
          <motion.section
            {...fadeInUp}
            className="w-full max-w-sm text-center pb-4"
          >
            <h2
              className="italic font-light mb-6"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "2.1rem",
                color: C.primary,
              }}
            >
              Confirma tu asistencia
            </h2>
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
