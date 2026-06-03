"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function MobileOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b1020] text-white text-center px-6">
        <p className="text-xl">
          Para una mejor experiencia, por favor accede desde un dispositivo
          móvil. ¡Gracias!
        </p>

        <Image
          src="/no-desktop.gif"
          alt="No computadoras"
          width={500}
          height={500}
          className="w-lg"
        />
      </div>
    );
  }

  return <>{children}</>;
}
