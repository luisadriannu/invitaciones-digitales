"use client";

import { ExternalLink, MessageCircle } from "lucide-react";

export default function Home() {
  const message = `Hola 👋
Quiero más información acerca de las invitaciones.`;

  const encodedMessage = encodeURIComponent(message);

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

          <p className="text-white/90 text-lg">
            Las muestras ahora están en{" "}
            <a
              href="https://invitaciones-muestra.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-pink-400
                hover:text-pink-300
                font-semibold
                inline-flex
                items-center
                gap-2
              "
            >
              invitaciones-muestra.vercel.app
              <ExternalLink size={18} />
            </a>
          </p>
        </div>

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
