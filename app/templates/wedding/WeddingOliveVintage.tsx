"use client";

import { motion, useReducedMotion } from "motion/react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Cormorant_Garamond, Libre_Baskerville } from "next/font/google";
import CountDown from "@/app/components/CountDown";
import type { EventData } from "@/app/types/EventData";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cy-display" });
const utility = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cy-utility" });

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
} as const;

function Leaf({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 120" fill="none" aria-hidden="true" className="h-24 w-16 text-[#7C8261]" style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M11 112C25 78 38 48 67 9" stroke="currentColor" strokeWidth="1.3" />
      <path d="M23 84C8 77 7 65 9 58c11 3 18 10 14 26ZM34 61c-11-12-7-24-2-30 9 7 12 16 2 30ZM48 40c-7-13-1-23 5-28 7 8 7 17-5 28ZM29 76c16 0 23-10 25-17-12-2-22 2-25 17ZM43 52c15 1 23-8 25-15-11-3-21 1-25 15Z" fill="currentColor" opacity=".72" />
    </svg>
  );
}

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[#9A7837]" style={{ fontFamily: "var(--font-cy-utility)" }}>{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-medium italic text-[#464B38] sm:text-5xl">{children}</h2>
      <p className="mt-3 text-lg text-[#9A7837]" aria-hidden="true">❦</p>
    </div>
  );
}

export default function WeddingOliveVintage({ data }: { data: EventData }) {
  const reduceMotion = useReducedMotion();
  const [groom, bride] = data.event.name.split(" & ");

  return (
    <main className={`${display.variable} ${utility.variable} overflow-hidden bg-[#E9DEC8] text-[#454938] [background-image:radial-gradient(circle_at_15%_20%,rgba(111,83,39,.09),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(111,83,39,.08),transparent_30%)]`} style={{ fontFamily: "var(--font-cy-display)" }}>
      <section className="relative flex min-h-[100svh] items-center justify-center bg-[#37402F] px-6 py-12 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.018)_0,rgba(255,255,255,.018)_1px,transparent_1px,transparent_7px)]">
        <div className="absolute inset-3 border border-[#C9AB68]/45" />
        <div className="absolute inset-5 border border-[#C9AB68]/15" />
        <div className="absolute left-4 top-2 opacity-55"><Leaf /></div>
        <div className="absolute bottom-2 right-4 opacity-55"><Leaf flip /></div>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex min-h-[82svh] w-full max-w-lg flex-col items-center justify-end overflow-hidden border-[9px] border-[#D7C7A8] px-7 pb-16 pt-32 text-center outline outline-1 outline-offset-4 outline-[#B49350]/65 shadow-[0_25px_70px_rgba(22,28,18,.32)]"
        >
          <Image src={data.media.coverImage} alt="Fotografía ilustrativa de boda" fill priority className="object-cover object-center sepia-[.48] saturate-[.72] contrast-[.92]" sizes="(max-width: 640px) calc(100vw - 40px), 512px" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#272B20]/95 via-[#463D2D]/25 to-[#6F5B39]/15" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#263020]/90 to-transparent" />
          <span className="absolute left-3 top-2 text-4xl text-[#E0C687]/80" aria-hidden="true">⌜</span>
          <span className="absolute right-3 top-2 text-4xl text-[#E0C687]/80" aria-hidden="true">⌝</span>
          <div className="relative mb-7 flex h-18 w-18 items-center justify-center rounded-full border-4 border-double border-[#B49350]/70 bg-[#EDE1C8]/95">
            <span className="text-2xl italic text-[#657052]">C<span className="mx-1 text-base text-[#B49350]">&</span>Y</span>
          </div>
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.38em] text-[#E0C687]" style={{ fontFamily: "var(--font-cy-utility)" }}>Boda civil</p>
          <h1 className="relative mt-7 max-w-md text-[clamp(2.7rem,10vw,5rem)] font-medium leading-[.9] text-[#FFF9EE] [text-shadow:0_3px_24px_rgba(0,0,0,.45)]">
            <span className="block">{groom}</span>
            <span className="my-4 block text-2xl italic text-[#E0C687]">y</span>
            <span className="block">{bride}</span>
          </h1>
          <div className="relative my-7 h-px w-20 bg-[#E0C687]/70" />
          <p className="relative text-sm font-medium uppercase tracking-[0.22em] text-[#F5E9D0]" style={{ fontFamily: "var(--font-cy-utility)" }}>30 · Enero · 2027</p>
        </motion.div>
      </section>

      <section className="relative px-7 py-24 text-center">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_15%,rgba(133,99,45,.15),transparent_25%),radial-gradient(circle_at_80%_80%,rgba(133,99,45,.12),transparent_28%)]" />
        <motion.div {...reveal} className="relative mx-auto max-w-xl">
          <span className="text-5xl leading-none text-[#B08D46]/50">“</span>
          <p className="mt-1 text-2xl italic leading-relaxed text-[#555A45] sm:text-3xl">{data.event.phrase}</p>
          <div className="mx-auto mt-9 h-px w-16 bg-[#B08D46]/55" />
          <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-[#7A8063]" style={{ fontFamily: "var(--font-cy-utility)" }}>Carlos & Yazmin</p>
        </motion.div>
      </section>

      <section className="relative h-[78svh] min-h-[620px] overflow-hidden bg-[#C9B994] [background-image:radial-gradient(rgba(87,66,36,.16)_1px,transparent_1px)] [background-size:9px_9px]">
        <motion.div {...reveal} className="absolute left-[7%] top-[7%] h-[64%] w-[66%] -rotate-3 bg-[#F4EBD9] p-2 pb-12 shadow-[0_18px_40px_rgba(52,43,27,.28)]">
          <div className="relative h-full w-full overflow-hidden border border-[#8F7342]/35">
            <Image src={data.media.gallery[0]} alt="Fotografía ilustrativa de novia" fill className="object-cover object-center sepia-[.7] grayscale-[.35] contrast-[.9]" sizes="66vw" />
          </div>
          <p className="mt-2 text-center text-xl italic text-[#5A5544]">Un instante para recordar</p>
        </motion.div>
        <motion.div {...reveal} className="absolute bottom-[8%] right-[6%] h-[45%] w-[53%] rotate-3 bg-[#F4EBD9] p-2 pb-11 shadow-[0_18px_40px_rgba(52,43,27,.3)]">
          <div className="relative h-full w-full overflow-hidden border border-[#8F7342]/35">
            <Image src={data.media.gallery[1]} alt="Fotografía ilustrativa de anillos" fill className="object-cover object-center sepia-[.48] saturate-[.72] contrast-[.9]" sizes="53vw" />
          </div>
          <p className="mt-2 text-center text-lg italic text-[#5A5544]">Para toda la vida</p>
        </motion.div>
        <div className="absolute right-[8%] top-[9%] text-center text-[#5A5544]">
          <p className="text-3xl">❦</p>
          <p className="mt-1 text-[8px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-cy-utility)" }}>Nuestra historia</p>
        </div>
      </section>

      <section className="bg-[#DED3BE] px-5 py-20 [background-image:linear-gradient(90deg,transparent_97%,rgba(126,96,45,.08)_100%)] [background-size:22px_100%]">
        <motion.div {...reveal} className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Acompáñanos">La celebración</SectionHeading>
          <div className="mt-12 grid border-4 border-double border-[#A78340]/45 bg-[#F3E9D5] sm:grid-cols-3">
            <div className="flex min-h-40 flex-col items-center justify-center border-b border-[#A78340]/25 p-6 text-center sm:border-b-0 sm:border-r">
              <CalendarDays size={23} strokeWidth={1.25} className="text-[#687054]" />
              <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-[#9A7837]" style={{ fontFamily: "var(--font-cy-utility)" }}>Fecha</p><p className="mt-2 text-xl">Sábado 30 de enero</p>
            </div>
            <div className="flex min-h-40 flex-col items-center justify-center border-b border-[#A78340]/25 p-6 text-center sm:border-b-0 sm:border-r">
              <Clock size={23} strokeWidth={1.25} className="text-[#687054]" />
              <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-[#9A7837]" style={{ fontFamily: "var(--font-cy-utility)" }}>Ceremonia civil</p><p className="mt-2 text-xl">7:00 PM</p>
            </div>
            <div className="flex min-h-40 flex-col items-center justify-center p-6 text-center">
              <MapPin size={23} strokeWidth={1.25} className="text-[#687054]" />
              <p className="mt-4 text-[9px] uppercase tracking-[0.25em] text-[#9A7837]" style={{ fontFamily: "var(--font-cy-utility)" }}>Lugar</p><p className="mt-2 text-xl leading-tight">{data.location.reception}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative px-6 py-24 before:absolute before:inset-4 before:border before:border-[#9A7837]/20">
        <motion.div {...reveal} className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Con la bendición de">Nuestros padres</SectionHeading>
          <div className="mt-12 grid gap-10 border-y-4 border-double border-[#9A7837]/35 py-12 text-center sm:grid-cols-2 sm:gap-0">
            {data.family?.groomParents && <div className="px-6 sm:border-r sm:border-[#B08D46]/30">
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#9A7837]" style={{ fontFamily: "var(--font-cy-utility)" }}>Familia del novio</p>
              <p className="mt-6 text-2xl">{data.family.groomParents.father}</p><span className="my-3 block text-sm italic text-[#B08D46]">y</span><p className="text-2xl">{data.family.groomParents.mother}</p>
            </div>}
            {data.family?.brideParents && <div className="border-t border-[#B08D46]/30 px-6 pt-10 sm:border-t-0 sm:pt-0">
              <p className="text-[9px] uppercase tracking-[0.28em] text-[#9A7837]" style={{ fontFamily: "var(--font-cy-utility)" }}>Familia de la novia</p>
              <p className="mt-6 text-2xl">{data.family.brideParents.father}</p><span className="my-3 block text-sm italic text-[#B08D46]">y</span><p className="text-2xl">{data.family.brideParents.mother}</p>
            </div>}
          </div>
        </motion.div>
      </section>

      <section className="relative bg-[#3E4635] px-8 py-20 text-center text-[#F5F0E7] [background-image:radial-gradient(rgba(214,190,133,.08)_1px,transparent_1px)] [background-size:12px_12px]">
        <div className="absolute inset-4 border-4 border-double border-[#D2B777]/30" />
        <motion.div {...reveal} className="relative mx-auto max-w-xl">
          <p className="text-[10px] uppercase tracking-[0.34em] text-[#D2B777]" style={{ fontFamily: "var(--font-cy-utility)" }}>Cada vez falta menos</p>
          <h2 className="mt-3 text-4xl italic">Para nuestro gran día</h2>
          <div className="mt-8 border-y border-[#D2B777]/35 py-2"><CountDown data={data} /></div>
        </motion.div>
      </section>

      {data.event.itinerary && <section className="px-5 py-24 [background-image:radial-gradient(circle_at_10%_20%,rgba(133,99,45,.1),transparent_22%),radial-gradient(circle_at_90%_75%,rgba(133,99,45,.09),transparent_24%)]">
        <motion.div {...reveal} className="mx-auto max-w-2xl">
          <SectionHeading eyebrow="El orden del día">Nuestro programa</SectionHeading>
          <div className="mt-12 border-4 border-double border-[#B08D46]/35 bg-[#F2E8D3]/65 px-5 py-4 sm:px-8">
            {data.event.itinerary.map((item, index) => <motion.div
              key={`${item.hour}-${item.title}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-[5.5rem_1fr] gap-5 border-b border-[#B08D46]/20 py-6 last:border-b-0 sm:grid-cols-[8rem_1fr]"
            >
              <p className="pt-1 text-right text-[9px] font-semibold uppercase leading-relaxed tracking-[0.1em] text-[#987536]" style={{ fontFamily: "var(--font-cy-utility)" }}>{item.hour}</p>
              <div className="border-l border-[#7C8261]/35 pl-5"><h3 className="text-2xl font-medium text-[#464B38]">{item.title}</h3>{item.description && <p className="mt-1 text-base italic text-[#777565]">{item.description}</p>}</div>
            </motion.div>)}
          </div>
        </motion.div>
      </section>}

      <footer className="relative border-t-4 border-double border-[#9A7837]/35 bg-[#CDBD9C] px-6 py-16 text-center [background-image:repeating-linear-gradient(0deg,rgba(89,70,39,.035)_0,rgba(89,70,39,.035)_1px,transparent_1px,transparent_5px)]">
        <div className="mx-auto flex max-w-sm items-center justify-center gap-2"><Leaf /><div><p className="text-4xl italic text-[#4F5842]">C & Y</p><p className="mt-3 text-[9px] uppercase tracking-[0.3em] text-[#987536]" style={{ fontFamily: "var(--font-cy-utility)" }}>30 · 01 · 2027</p></div><Leaf flip /></div>
      </footer>
    </main>
  );
}
