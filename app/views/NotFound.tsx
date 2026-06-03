import Link from "next/link";

export default function NotFound() {
  const message = `Hola 👋
Mi invitación no esta disponible.`;

  const encodedMessage = encodeURIComponent(message);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6 overflow-hidden relative">
      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <div className="inline-block">
            <svg
              className="w-24 h-24 mx-auto text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-8xl font-bold text-white leading-tight">404</h1>

          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Invitación no encontrada
          </h2>

          <p className="text-xl text-gray-300 font-light max-w-md mx-auto">
            Lo sentimos, la invitación que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-purple-500/50 hover:scale-105 transition-all"
          >
            Volver al inicio
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 justify-center pt-8">
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://api.whatsapp.com/send?phone=522206283499&text=${encodedMessage}`}
            className="text-white text-sm flex items-center justify-center gap-1 cursor-pointer"
          >
            Atención a cliente
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
              <path d="M11 13l9 -9" />
              <path d="M15 4h5v5" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
