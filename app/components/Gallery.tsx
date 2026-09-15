"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GallerySlider = dynamic(() => import("./GallerySlider"));

export default function Gallery({ images }: { images: string[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div ref={container} className="relative h-[60vh] overflow-hidden rounded-3xl">
      {!ready && <Image src={images[0]} alt="Imagen 1" fill sizes="100vw" className="object-contain" />}
      {ready && <GallerySlider images={images} />}
    </div>
  );
}
