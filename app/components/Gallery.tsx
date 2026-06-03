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
            <div className="relative w-full aspect-4/3">
              <Image
                src={src}
                alt={`Imagen ${index + 1}`}
                fill
                className="
                  object-cover
                  rounded-2xl
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
