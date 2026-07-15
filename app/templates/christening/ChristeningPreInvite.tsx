"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Cormorant_Garamond, Jost } from "next/font/google";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { useCountdown } from "@/app/hooks/useCountdown";
import { MessageCircleHeart } from "lucide-react";

interface Props {
  data: EventData;
}

/* ─────────────────────────────────────────────
   Tipografía
   Display: Cormorant Garamond — serif clásica, ligera,
   con itálicas elegantes para los acentos ceremoniales.
   Utilitaria: Jost — sans geométrica para versalitas/labels.
   Si ya cargas estas fuentes en tu layout raíz, puedes borrar
   este bloque y usar tus variables globales en su lugar.
───────────────────────────────────────────── */
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

/* Motas de luz muy sutiles — reemplazan los pétalos;
   menos literal, más "polvo de luz" ambiental. */
const MOTES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 8 + ((i * 11) % 84),
  delay: (i * 0.9) % 7,
  duration: 11 + (i % 3) * 2,
  size: 3 + (i % 3),
}));

function DoveMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M32 26c-3-8-10-13-19-13 5 3 7 7 7 11-6-1-11 1-15 5 6 1 11 0 15-3 1 6 6 10 12 11" />
      <path d="M32 26c3-8 10-13 19-13-5 3-7 7-7 11 6-1 11 1 15 5-6 1-11 0-15-3-1 6-6 10-12 11" />
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

const MESES: Record<string, number> = {
  Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
  Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11,
};

function PreCountDown({ data }: { data: EventData }) {
  const [dia, mes, año] = data.event.date.split(" ");
  const [hora, periodo] = data.event.partyHour.split(" ");
  const [hh, mm] = hora.split(":").map(Number);
  const hora24 = periodo === "PM" && hh !== 12 ? hh + 12 : hh === 12 && periodo === "AM" ? 0 : hh;
  const target = new Date(Number(año), MESES[mes], Number(dia), hora24, mm);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const finished = days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  const units = [
    { value: days,    label: "Días" },
    { value: hours,   label: "Horas" },
    { value: minutes, label: "Minutos" },
    { value: seconds, label: "Segundos" },
  ];

  if (finished) {
    return (
      <p className="italic text-2xl" style={{ fontFamily: "var(--font-display)", color: "#2f2b24" }}>
        ¡Hoy es el gran día!
      </p>
    );
  }

  return (
    <div className="flex justify-center gap-5">
      {units.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span
            className="italic font-light leading-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.6rem, 10vw, 3.8rem)",
              color: "#2f2b24",
              letterSpacing: "-0.02em",
            }}
          >
            {String(value).padStart(2, "0")}
          </span>
          <span
            style={{
              fontFamily: "var(--font-utility)",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#a3855a",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ChristeningPreInvite({ data }: Props) {
  const [photo1, photo2] = data.media.gallery;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${encodeURIComponent(
    `Hola, quiero enviar mis mejores deseos para el bautizo de ${data.event.name}.`,
  )}`;

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main
        id="chr-pre"
        className={`${display.variable} ${utility.variable} relative min-h-screen overflow-hidden`}
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, #fffdf8 0%, #f8f2e6 45%, #efe7d5 100%)",
        }}
      >
        {/* Motas de luz */}
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

        {/* Viñeta suave */}
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            boxShadow: "inset 0 0 140px rgba(122,110,74,0.10)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center px-6 py-20 gap-14">
          {/* ════════ HEADER ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-sm"
          >
            <p
              className="text-[10px] uppercase mb-5"
              style={{
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.32em",
                color: "#a3855a",
              }}
            >
              Sacramento del Bautismo
            </p>

            <div
              className="flex items-center justify-center gap-3 mb-5"
              style={{ color: "#8a9a86" }}
            >
              <div
                className="h-px w-9"
                style={{ background: "rgba(163,133,90,0.35)" }}
              />
              <DoveMark className="w-7 h-5" />
              <div
                className="h-px w-9"
                style={{ background: "rgba(163,133,90,0.35)" }}
              />
            </div>

            <p
              className="italic font-light mb-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.95rem",
                color: "#6b6455",
              }}
            >
              Con la bendición de Dios
            </p>
            <h1
              className="font-medium"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 13vw, 5.5rem)",
                color: "#2f2b24",
                lineHeight: 1.05,
              }}
            >
              {data.event.name}
            </h1>
            <p
              className="italic font-light mt-2"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.15rem",
                color: "#6b6455",
              }}
            >
              será bautizada
            </p>
          </motion.div>

          {/* ════════ FOTOS ════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9 }}
            className="relative w-full max-w-sm flex flex-row items-start justify-center gap-3 px-2"
          >
            {/* Foto 1 — más alta, alineada arriba */}
            {photo1 && (
              <div
                className="relative flex-1 rounded-2xl overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  boxShadow: "0 0 0 1px rgba(184,147,90,0.4), 0 20px 50px rgba(70,60,40,0.18)",
                }}
              >
                <Image
                  src={photo1}
                  alt={data.event.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Foto 2 — misma proporción, desplazada hacia abajo */}
            {photo2 && (
              <div
                className="relative flex-1 rounded-2xl overflow-hidden mt-8"
                style={{
                  aspectRatio: "3/4",
                  boxShadow: "0 0 0 1px rgba(184,147,90,0.4), 0 20px 50px rgba(70,60,40,0.18)",
                }}
              >
                <Image
                  src={photo2}
                  alt={data.event.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}
          </motion.div>

          {/* ════════ COUNTDOWN — estilo certificado ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative w-full max-w-sm p-9 text-center"
            style={{
              background: "#fffaf0",
              boxShadow:
                "0 0 0 1px rgba(184,147,90,0.4), 0 0 0 5px #fffaf0, 0 0 0 6px rgba(184,147,90,0.25), 0 20px 45px rgba(70,60,40,0.1)",
            }}
          >
            {/* esquinas ornamentales */}
            {[
              "top-2 left-2 rotate-0",
              "top-2 right-2 rotate-90",
              "bottom-2 right-2 rotate-180",
              "bottom-2 left-2 -rotate-90",
            ].map((pos, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className={`absolute w-4 h-4 ${pos}`}
                style={{ color: "#b8935a" }}
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
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                color: "#2f2b24",
              }}
            >
              Cuenta Regresiva
            </h2>
            <p
              className="text-[10px] uppercase mb-1"
              style={{
                fontFamily: "var(--font-utility)",
                letterSpacing: "0.28em",
                color: "#a3855a",
              }}
            >
              El gran día llega en
            </p>

            <PreCountDown data={data} />
            <p
              className="italic mt-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "0.85rem",
                color: "#8a7f68",
                letterSpacing: "0.02em",
              }}
            >
              {data.event.date}
            </p>
          </motion.div>

          {/* ════════ DIVIDER ════════ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
            style={{ color: "#8a9a86" }}
          >
            <LaurelSprig className="w-12 h-4" />
            <DoveMark className="w-6 h-4" />
            <LaurelSprig className="w-12 h-4" flip />
          </motion.div>

          {/* ════════ WISHES ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center pb-8"
          >
            <p
              className="italic font-light mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.05rem",
                color: "#6b6455",
              }}
            >
              Muy pronto recibirás la invitación con todos los detalles de este
              día tan especial.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="chr-cta"
            >
              <MessageCircleHeart size={16} />
              <span>Envíanos tus deseos</span>
            </a>
          </motion.div>
        </div>

        <style jsx>{`
          .chr-mote {
            position: fixed;
            top: -10px;
            border-radius: 9999px;
            background: radial-gradient(
              circle,
              rgba(184, 147, 90, 0.55),
              rgba(184, 147, 90, 0)
            );
            animation: chr-drift linear infinite;
            pointer-events: none;
            z-index: 0;
          }
          @keyframes chr-drift {
            0% {
              transform: translateY(-10px) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.4;
            }
            100% {
              transform: translateY(108vh) translateX(18px);
              opacity: 0;
            }
          }
          .chr-cta {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            padding: 0.85rem 1.9rem;
            font-family: var(--font-utility);
            font-size: 0.72rem;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #6b5a35;
            background: transparent;
            border: 1px solid rgba(184, 147, 90, 0.55);
            border-radius: 2px;
            transition:
              background 0.35s ease,
              color 0.35s ease;
          }
          .chr-cta:hover {
            background: #b8935a;
            color: #fffaf0;
          }
          @media (prefers-reduced-motion: reduce) {
            .chr-mote {
              animation: none;
              opacity: 0.3;
            }
          }
        `}</style>
      </main>
    </>
  );
}
