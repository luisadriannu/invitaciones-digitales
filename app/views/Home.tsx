"use client";

import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* HERO */}
        <section className="text-center mb-20">
          <span
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
          </span>

          <h1
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
          </h1>

          <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-8" />

          <p
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
          </p>
        </section>

        {/* GALERÍA */}
        <section className="mb-20">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="w-16 h-px bg-[#D4AF37]/40" />
            <h2
              className="
                text-[#2B2927]
                text-2xl
                md:text-3xl
                font-light
              "
            >
              Muestras
            </h2>
            <div className="w-16 h-px bg-[#D4AF37]/40" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {samples.map((sample) => (
              <Link
                key={sample.href}
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
                    aspect-[3/4]
                    mb-4
                    bg-[#F2ECE4]
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
                      group-hover:scale-105
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
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
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

          <a
            href={`https://api.whatsapp.com/send?phone=522206283499&text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
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
          </a>
        </section>
      </div>
    </main>
  );
}
