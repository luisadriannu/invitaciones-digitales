"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarDays, Clock3, MapPin, Cake } from "lucide-react";

import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";

import type { EventData } from "@/app/types/EventData";

interface Props {
  data: EventData;
}

export default function BirthdayBase({ data }: Props) {
  const [showModal, setShowModal] = useState(false);

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola 🎉 Confirmo mi asistencia al cumpleaños de ${data.event.name}`,
    );

    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main
        className="
       bg-linear-to-b
          from-pink-50
          via-purple-50
          to-blue-50
          overflow-hidden
        "
      >
        {/* HERO */}
        <section
          className="
            relative
            min-h-screen
            flex
            items-center
            justify-center
          "
        >
          <Image
            src={data.media.coverImage}
            alt={data.event.name}
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="relative z-10 text-center px-6">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <Cake
                size={60}
                className="
                  mx-auto
                  text-yellow-300
                  mb-6
                "
              />

              <h1
                className="
                  text-white
                  text-5xl
                  md:text-7xl
                  font-bold
                "
              >
                {data.event.name}
              </h1>

              {data.event.age && (
                <p
                  className="
                    text-yellow-300
                    text-3xl
                    mt-4
                  "
                >
                  {data.event.age} años
                </p>
              )}

              <p
                className="
                  text-white/90
                  mt-8
                  text-lg
                "
              >
                ¡Te invito a celebrar conmigo!
              </p>
            </motion.div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className="py-20 px-6">
          <motion.h2
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="
              text-center
              text-4xl
              font-bold
              mb-10
            "
          >
            Falta muy poco 🎉
          </motion.h2>

          <CountDown data={data} />
        </section>

        {/* INFO */}
        <section
          className="
            py-20
            px-6
          "
        >
          <div
            className="
              max-w-4xl
              mx-auto
              grid
              gap-6
            "
          >
            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
                flex
                items-center
                gap-4
              "
            >
              <CalendarDays />

              <div>
                <p className="font-semibold">Fecha</p>

                <p>{data.event.date}</p>
              </div>
            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
                flex
                items-center
                gap-4
              "
            >
              <Clock3 />

              <div>
                <p className="font-semibold">Hora</p>

                <p>{data.event.ceremonyHour}</p>
              </div>
            </div>

            <div
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-xl
                flex
                items-center
                gap-4
              "
            >
              <MapPin />

              <div>
                <p className="font-semibold">Lugar</p>

                <p>{data.location.reception}</p>
              </div>
            </div>
          </div>
        </section>

        {/* UBICACIÓN */}
        <section
          className="
            py-20
            px-6
            text-center
          "
        >
          <a
            href={data.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2

              px-8
              py-4

              rounded-full

              bg-pink-500
              text-white

              hover:bg-pink-600

              transition
            "
          >
            <MapPin size={18} />
            Ver ubicación
          </a>
        </section>

        {/* GALERÍA */}
        <section
          className="
            py-20
            px-6
          "
        >
          <h2
            className="
              text-center
              text-4xl
              font-bold
              mb-10
            "
          >
            Galería 📸
          </h2>

          <Gallery images={data.media.gallery} />
        </section>

        {/* RSVP */}
        <section
          className="
            py-24
            px-6
            text-center
          "
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => setShowModal(true)}
            className="
              px-10
              py-5

              rounded-full

              bg-linear-to-r
              from-pink-500
              to-purple-500

              text-white

              text-lg
              font-semibold

              shadow-xl
            "
          >
            Confirmar asistencia
          </motion.button>
        </section>

        {/* MODAL */}
        {showModal && (
          <div
            className="
              fixed
              inset-0
              z-50

              bg-black/70

              flex
              items-center
              justify-center

              p-6
            "
          >
            <div
              className="
                bg-white
                rounded-3xl
                p-8
                max-w-md
                w-full
              "
            >
              <h3
                className="
                  text-2xl
                  font-bold
                  mb-4
                "
              >
                Confirmar asistencia
              </h3>

              <p className="mb-8">¿Deseas confirmar tu asistencia?</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="
                    flex-1
                    border
                    rounded-xl
                    py-3
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={() => {
                    confirmAttendance();
                    setShowModal(false);
                  }}
                  className="
                    flex-1
                    rounded-xl
                    py-3

                    bg-pink-500
                    text-white
                  "
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
