"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  if (!images?.length) {
    return null;
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        loop
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[60vh] overflow-hidden rounded-3xl">
              <Image
                src={src}
                alt=""
                fill
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
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
