"use client";

import { useState } from "react";
import { basicSamples } from "@/app/data/basic";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Variants } from "motion/react";
import { flashEvents } from "@/app/flash/data";
import flashStyles from "@/app/flash/flash.module.css";
import InvitationCardAction from "@/app/components/InvitationCardAction";
import InvitationPlanBanner from "@/app/components/InvitationPlanBanner";
import FlashPriceBadge from "@/app/components/FlashPriceBadge";
import type { InvitationPlan } from "@/app/data/plans";

const eventCategories = [
  "Cumpleaños",
  "XV Años",
  "Boda",
  "Bautizo",
  "Primera Comunión",
  "Graduación",
] as const;

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
    },
  },
};

const stagger: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function Home({
  samplePlans,
}: {
  samplePlans: Record<string, InvitationPlan>;
}) {
  const [category, setCategory] = useState("Todas");
  const [plan, setPlan] = useState<"todos" | "basic" | "premium" | "flash">(
    "todos",
  );
  const message = `Hola 👋
Quiero más información acerca de las invitaciones.`;

  const encodedMessage = encodeURIComponent(message);

  const samples = [
    ...basicSamples.map((sample) => ({
      category: sample.category,
      title: sample.title,
      subtitle: "Básico",
      image: sample.image,
      href: `/${sample.tipo}/${sample.slug}`,
    })),
    {
      category: "XV Años",
      title: "XV de Julia · Jardín de rosas",
      image: "/pictures/xv/julia/xv-julia-3.jpg",
      href: "/xv/julia",
    },
    {
      category: "Cumpleaños",
      title: "Cumpleaños de Mateo",
      subtitle: "Jurásica",
      image: "/pictures/birthday/mateo/jurassic-expedition.png",
      href: "/cumple/mateo",
    },
    {
      category: "Cumpleaños",
      title: "Cumpleaños de Mía",
      subtitle: "Guerreras pop",
      image: "/pictures/birthday/mia/guerreras-pop-hd.png",
      href: "/cumple/mia",
    },
    {
      category: "Primera Comunión",
      title: "Primera Comunión",
      image: "/pictures/firstcommunion/sofia/sofia-1.jpg",
      href: "/primeracomunion/sofia",
    },
    {
      category: "Graduación",
      title: "Graduación",
      image: "/pictures/graduation/karina/graduation-1.jpg",
      href: "/graduacion/karina",
    },
    {
      category: "XV Años",
      title: "XV Años",
      image: "/pictures/xv/valentina/xv-1.jpeg",
      href: "/xv/valentina",
    },
    {
      category: "Cumpleaños",
      title: "Cumpleaños",
      subtitle: "Clásica",
      image: "/pictures/birthday/jose/jose-1.jpg",
      href: "/cumple/jose",
    },
    {
      category: "Cumpleaños",
      title: "Cumpleaños Victoria",
      subtitle: "Pastel",
      image: "/pictures/birthday/victoria/victoria-4.jpg",
      href: "/cumple/victoria",
    },
    {
      category: "Boda",
      title: "Boda Clásica",
      subtitle: "Clásica",
      image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
      href: "/boda/kevinyjuana",
    },
    {
      category: "Boda",
      title: "Boda Light",
      subtitle: "Light",
      image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-5.jpg",
      href: "/boda/kevinyjuanalight",
    },
    {
      category: "Bautizo",
      title: "Bautizo",
      image: "/pictures/christening/camila/camila-1.jpg",
      href: "/bautizo/camila",
    },
    {
      title: "Cumpleaños Dinosaurios",
      category: "Cumpleaños",
      image: "/pictures/birthday/vicente/Jurassic_Park.svg",
      href: "/cumple/eduardo",
    },
  ];

  const filteredSamples = samples.filter(
    (sample) =>
      (category === "Todas" || sample.category === category) &&
      (plan === "todos" || samplePlans[sample.href] === plan),
  );
  const showFlash =
    (category === "Todas" || category === "Flash") &&
    (plan === "todos" || plan === "flash");
  const resultCount =
    filteredSamples.length + (showFlash ? Object.keys(flashEvents).length : 0);

  return (
    <main className="min-h-screen bg-[#FAF8F4] relative overflow-hidden">
      {/* Glow dorado */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          opacity-40
          bg-[radial-gradient(circle_at_top,#D4AF3730,transparent_55%)]
        "
      />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* HERO */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-24"
        >
          <motion.span
            variants={fadeUp}
            className="
              block
              uppercase
              tracking-[0.6em]
              text-[11px]
              text-[#B8860B]
              mb-6
            "
          >
            Invitaciones Digitales
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="
              text-5xl
              md:text-7xl
              font-light
              text-[#2B2927]
              leading-tight
              mb-8
            "
          >
            Diseños elegantes para
            <br />
            momentos inolvidables
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="
              h-px
              bg-[#D4AF37]
              mx-auto
              mb-8
            "
          />

          <motion.p
            variants={fadeUp}
            className="
              text-[#6A635C]
              text-lg
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Invitaciones digitales personalizadas para bodas, XV años, bautizos,
            graduaciones, cumpleaños y celebraciones especiales.
          </motion.p>
        </motion.section>

        {/* GALERÍA */}
        <section>
          <div className="flex items-center justify-center gap-6 mb-12">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-px bg-[#D4AF37]/40"
            />

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
              text-[#2B2927]
                text-3xl
                md:text-5xl
                font-light
                whitespace-nowrap
              "
            >
              Muestras
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-px bg-[#D4AF37]/40"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              text-center
              text-[#6A635C]
              text-sm
              md:text-base
              -mt-6
              mb-12
              flex
              items-center
              justify-center
              gap-2
              underline
            "
          >
            Toca cualquiera de las muestras para abrir la invitación
          </motion.p>

          <div className="mx-auto mb-10 max-w-sm">
            <label
              htmlFor="event-category"
              className="mb-2 block text-sm font-medium text-[#6A635C]"
            >
              Selecciona el tipo de evento
            </label>
            <select
              id="event-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-[#D4AF37]/40 bg-white px-4 py-3 text-[#2B2927] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B]"
            >
              <option value="Todas">Todas las categorías</option>
              {eventCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label
              htmlFor="event-plan"
              className="mb-2 mt-6 block text-sm font-medium text-[#6A635C]"
            >
              Selecciona el tipo de plan
            </label>
            <select
              id="event-plan"
              value={plan}
              onChange={(event) => setPlan(event.target.value as typeof plan)}
              className="w-full rounded-xl border border-[#D4AF37]/40 bg-white px-4 py-3 text-[#2B2927] shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B]"
            >
              <option value="todos">Todos los planes</option>
              <option value="premium">Premium</option>
              <option value="basic">Básico</option>
              <option value="flash">Flash</option>
            </select>
            <p
              role="status"
              className="mt-3 text-center text-xs text-[#6A635C]"
            >
              {resultCount}{" "}
              {resultCount === 1
                ? "invitación disponible"
                : "invitaciones disponibles"}
            </p>
          </div>

          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredSamples.map((sample) => (
              <motion.div
                key={sample.href}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px 80px 0px" }}
                whileHover={{
                  y: -6,
                }}
              >
                <Link
                  href={sample.href}
                  prefetch={false}
                  aria-label={`Ver invitación: ${sample.title}`}
                  className="
                    group
                    block
                    rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8860B]
                  "
                >
                  <div
                    className="
                      relative
                      overflow-hidden
                      aspect-3/4
                      mb-4
                      bg-[#F2ECE4]
                      rounded-xl
                    "
                  >
                    <Image
                      src={sample.image}
                      alt={sample.title}
                      fill
                      sizes="(max-width: 767px) calc((100vw - 72px) / 2), (max-width: 1279px) calc((100vw - 96px) / 3), 395px"
                      className="
                        object-cover
                        transition-all
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                    />
                    {samplePlans[sample.href] && (
                      <InvitationPlanBanner plan={samplePlans[sample.href]} />
                    )}
                    <InvitationCardAction />
                  </div>

                  <div className="text-center">
                    <p
                      className="
                          uppercase
                          tracking-[0.25em]
                          text-[12px]
                          text-[#B8860B]
                          mb-1
                        "
                    >
                      Invitación
                    </p>

                    <h3
                      className="
                          text-[#2B2927]
                          text-lg
                          font-medium
                        "
                    >
                      {sample.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {showFlash && (
          <section aria-labelledby="flash-heading" className="mb-14 mt-6">
            <div className="text-center mb-10">
              <div className="w-20 h-px bg-[#D4AF37]/40 mx-auto mb-6" />
              <h2
                id="flash-heading"
                className="text-3xl md:text-5xl font-light text-[#2B2927]"
              >
                Invitaciones Flash
              </h2>
              <p className="mt-5 text-sm md:text-base text-[#6A635C]">
                Toda la emoción y lo esencial, en una sola vista. Elige un
                diseño para abrir la invitación.
              </p>
            </div>

            <nav
              aria-label="Invitaciones Flash"
              className={flashStyles.previews}
            >
              {Object.entries(flashEvents).map(([slug, event]) => (
                <Link
                  key={slug}
                  href={`/flash/${slug}`}
                  prefetch={false}
                  aria-label={`Ver invitación: ${event.designLabel ?? event.title} de ${event.name}`}
                  className={`${flashStyles.preview} ${flashStyles[event.theme]} ${event.design ? flashStyles[event.design] : ""} rounded-xl text-center group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8860B]`}
                >
                  <div className={flashStyles.previewPhoto}>
                    <Image
                      src={event.photo}
                      alt={event.name}
                      fill
                      sizes="150px"
                    />
                  </div>
                  <span>{event.designLabel ?? event.title}</span>
                  <strong>{event.name.split(" ")[0]}</strong>
                  <FlashPriceBadge />
                </Link>
              ))}
            </nav>

            <div className="text-center mt-8">
              <Link
                href="/flash"
                className="inline-flex items-center gap-2 text-sm text-[#8A6508] underline underline-offset-4"
              >
                Ver la colección Flash
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-8" />

          <p
            className="
              text-[#6A635C]
              text-lg
              mb-3
            "
          >
            ¿Te gustó algún diseño?
          </p>

          <p
            className="
              text-[#B8860B]
              uppercase
              tracking-[0.2em]
              text-sm
              mb-8
            "
          >
            Solicita tu cotización personalizada
          </p>

          <motion.a
            href={`https://api.whatsapp.com/send?phone=522206283499&text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              inline-flex
              items-center
              gap-3
              px-10
              py-4
              border
              border-[#D4AF37]
              text-[#2B2927]
              font-medium
              hover:bg-[#D4AF37]
              hover:text-white
              transition-all
              duration-300
              mb-4
            "
          >
            <MessageCircle size={20} />
            Cotizar por WhatsApp
          </motion.a>

          <p className="text-xs">
            Para mayor privacidad tu invitación nunca aparecera en esta sección,
            solo tú y tus invitados pueden acceder a ella.
          </p>
        </motion.section>
      </div>
    </main>
  );
}
