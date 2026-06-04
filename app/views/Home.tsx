"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

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

export default function Home() {
  const message = `Hola 👋
Quiero más información acerca de las invitaciones.`;

  const encodedMessage = encodeURIComponent(message);

  const samples = [
    {
      title: "Primera Comunión",
      image: "/pictures/firstcommunion/sofia/sofia-1.jpg",
      href: "/primeracomunion/sofia",
    },
    {
      title: "Graduación",
      image: "/pictures/graduation/karina/graduation-1.jpg",
      href: "/graduacion/karina",
    },
    {
      title: "XV Años",
      image: "/pictures/xv/valentina/xv-1.jpeg",
      href: "/xv/valentina",
    },
    {
      title: "Cumpleaños",
      image: "/pictures/birthday/jose/jose-1.jpg",
      href: "/cumple/jose",
    },
    {
      title: "Boda",
      image: "/pictures/wedding/kevin-y-juana/kevin-y-juana-1.jpg",
      href: "/boda/kevinyjuana",
    },
    {
      title: "Bautizo",
      image: "/pictures/christening/camila/camila-1.jpg",
      href: "/bautizo/camila",
    },
  ];

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
        <section className="mb-24">
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

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {samples.map((sample) => (
              <motion.div
                key={sample.href}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                }}
              >
                <Link
                  href={sample.href}
                  className="
                    group
                    block
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
                      sizes="(max-width:768px) 50vw, 33vw"
                      className="
                        object-cover
                        transition-all
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                    />
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
            "
          >
            <MessageCircle size={20} />
            Cotizar por WhatsApp
          </motion.a>
        </motion.section>
      </div>
    </main>
  );
}
