import Image from "next/image";

const socialLinks = [
  {
    label: "WhatsApp",
    detail: "+52 220 628 3499",
    href: "https://wa.me/522206283499",
    icon: "/socia-media/whatsapp.svg",
  },
  {
    label: "Email",
    detail: "monarqueinvitacionesweb@gmail.com",
    href: "mailto:monarqueinvitacionesweb@gmail.com",
    icon: "/socia-media/gmail.svg",
  },
  {
    label: "TikTok",
    detail: "@monarqueinvitaciones",
    href: "https://www.tiktok.com/@monarque216?_r=1&_t=ZS-9A2klCb5BpQ",
    icon: "/socia-media/tiktok.svg",
  },
  {
    label: "Facebook",
    detail: "Monarque - Invitaciones Digitales",
    href: "https://www.facebook.com/profile.php?id=61594530067384",
    icon: "/socia-media/facebook.svg",
  },
] as const;

export default function HomeFooter() {
  return (
    <footer className="relative z-10 border-t border-[#D4AF37]/25 bg-[#FFFDF9] px-6 py-14 text-[#2B2927]">
      <div className="mx-auto max-w-5xl text-center">
        <div className="mx-auto flex items-center justify-center gap-3 text-[#B8860B]">
          <span className="h-px w-10 bg-current/40" />
          <span className="text-xs" aria-hidden="true">
            ✦
          </span>
          <span className="h-px w-10 bg-current/40" />
        </div>

        <Image
          src="/monarque-footer-banner-v2.png"
          alt="Monarque"
          width={1640}
          height={624}
          unoptimized
          className="h-auto w-full"
        />
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

        <nav className="mt-9" aria-label="Redes sociales y contacto">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {socialLinks.map((social) => (
              <li key={social.label} className="h-full">
                <a
                  href={social.href}
                  target={
                    social.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    social.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={`${social.label}: ${social.detail}`}
                  className="group flex h-40 flex-col items-center justify-center rounded-2xl border border-[#D8C9B7] bg-[#FAF8F4] px-3 py-5 shadow-[0_8px_24px_rgba(69,55,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#C8A33A] hover:shadow-[0_12px_30px_rgba(69,55,42,0.09)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B8860B]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                    <Image
                      src={social.icon}
                      alt=""
                      aria-hidden="true"
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                  </span>
                  <strong className="mt-3 text-sm font-medium">
                    {social.label}
                  </strong>
                  <span className="mt-1 w-full whitespace-normal text-center text-xs leading-snug text-[#7B736B] [overflow-wrap:anywhere]">
                    {social.detail}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs mt-6">
          Para mayor privacidad tu invitación nunca aparecera en esta sección,
          solo tú y tus invitados pueden acceder a ella.
        </p>
        <p className="mt-6 border-t border-[#D4AF37]/20 pt-4 text-xs text-[#8A8279]">
          © {new Date().getFullYear()} Monarque Invitaciones Digitales
        </p>
      </div>
    </footer>
  );
}
