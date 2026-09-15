"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface GalleryProps {
  images: string[];
}

export default function GallerySlider({ images }: GalleryProps) {
  const container = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  useEffect(() => {
    if (!swiper || !container.current || images.length < 2) return;
    let visible = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncAutoplay = () => {
      if (swiper.destroyed) return;
      if (visible && !document.hidden && !reducedMotion.matches) {
        swiper.autoplay.start();
      } else {
        swiper.autoplay.stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAutoplay();
    });
    observer.observe(container.current);
    document.addEventListener("visibilitychange", syncAutoplay);
    reducedMotion.addEventListener("change", syncAutoplay);
    syncAutoplay();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncAutoplay);
      reducedMotion.removeEventListener("change", syncAutoplay);
      if (!swiper.destroyed) swiper.autoplay.stop();
    };
  }, [swiper, images.length]);

  if (!images?.length) {
    return null;
  }

  return (
    <div ref={container} className="relative">
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={images.length > 1 ? {
          delay: 2500,
          disableOnInteraction: false,
        } : false}
        modules={[Autoplay]}
        loop={images.length > 1}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[60vh] overflow-hidden rounded-3xl">
              <Image
                src={src}
                alt=""
                fill
                sizes="128px"
                aria-hidden="true"
                className="
                  object-cover
                  blur-2xl
                  scale-110
                  opacity-40
                "
              />

              <Image
                src={src}
                alt={`Imagen ${index + 1}`}
                fill
                className="
                  object-contain
                  relative
                  z-10
                "
                sizes="100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
