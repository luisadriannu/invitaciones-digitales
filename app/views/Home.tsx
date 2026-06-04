"use client";

import { ExternalLink, MessageCircle } from "lucide-react";
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
    <div
      className="
        min-h-screen
        bg-linear-to-br
        from-purple-900
        via-blue-900
        to-indigo-900
        flex
        items-center
        justify-center
        p-6
        overflow-hidden
        relative
      "
    >
      <div
        className="
          absolute
          inset-0
          opacity-20
          bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCI+PC9zdmc+')]
        "
      />

      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-8">
          <div className="inline-block animate-bounce mb-4">
            <svg
              className="w-20 h-20 mx-auto text-pink-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </div>

          <h1
            className="
              text-5xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
              mb-4
            "
          >
            Bienvenido a
            <br />
            <span
              className="
                bg-linear-to-r
                from-pink-400
                via-purple-400
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              Invitaciones Digitales
            </span>
          </h1>
        </div>

        <div className="mt-10">
          <h2 className="text-white text-xl font-semibold mb-6">
            Ver ejemplos de invitaciones
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {samples.map((sample) => (
              <Link
                key={sample.href}
                href={sample.href}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  aspect-3/4
                  block
                "
              >
                <Image
                  src={sample.image}
                  alt={sample.title}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/15
                    flex
                    items-end
                    p-4
                  "
                >
                  <p className="text-white font-semibold">{sample.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <br />

        <p className="text-white mb-2">Para cotizar tu invitacion &#8595;</p>

        <a
          href={`https://api.whatsapp.com/send?phone=522206283499&text=${encodedMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex
            items-center
            gap-2
            px-8
            py-4
            rounded-full
            bg-green-500
            hover:bg-green-600
            text-white
            font-semibold
            transition-all
            duration-300
            hover:scale-105
            shadow-lg
          "
        >
          <MessageCircle size={20} />
          Contáctanos por WhatsApp
        </a>
      </div>
    </div>
  );
}
