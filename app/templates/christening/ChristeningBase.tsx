"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import { MapPin } from "lucide-react";

interface Props {
  data: EventData;
}

export default function ChristeningBase({ data }: Props) {
  const [openModal, setOpenModal] = useState(false);

  const coverImage = data.media.coverImage;

  const portraitImage = data.media.gallery[1] ?? coverImage;

  const confirmAttendance = () => {
    const message = encodeURIComponent(
      `Hola, confirmo mi asistencia al bautizo de ${data.event.name}`,
    );

    window.open(
      `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`,
      "_blank",
    );
  };

  return (
    <>
      {data.media.music && <MusicButton src={data.media.music} />}

      <main className="bg-[#fffdf8] text-[#3d3d3d] overflow-hidden">
        {/* HERO */}
        <section className="relative h-screen">
          <Image
            src={coverImage}
            alt={data.event.name}
            fill
            priority
            className="
              object-cover
              scale-105
            "
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                text-white
                tracking-[8px]
                uppercase
                mb-4
              "
            >
              Bautizo
            </motion.p>

            <motion.h1
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
              }}
              className="
                text-white
                text-6xl
                md:text-8xl
                font-light
              "
            >
              {data.event.name}
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
              className="
                text-white/90
                mt-6
                text-xl
              "
            >
              {data.event.date}
            </motion.p>
          </div>
        </section>

        {/* FOTO */}
        <section className="py-24 px-6">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            className="
              relative
              w-72
              h-72
              mx-auto
              rounded-full
              overflow-hidden
           border-8
              border-amber-100
              shadow-2xl
            "
          >
            <Image
              src={portraitImage}
              alt={data.event.name}
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.p
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
              text-2xl
              italic
              max-w-2xl
              mx-auto
              mt-10
            "
          >
            Con la bendición de Dios y el amor de nuestra familia queremos
            compartir contigo este día tan especial.
          </motion.p>
        </section>

        {/* COUNTDOWN */}
        <section className="py-20 px-6 bg-[#faf7f2]">
          <h2 className="text-center text-4xl mb-10">Cuenta Regresiva</h2>

          <CountDown data={data} />
        </section>

        {/* PADRES */}
        {data.family?.parents && (
          <section className="py-24 px-6">
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              className="
                max-w-xl
                mx-auto
                bg-white
                rounded-3xl
                shadow-xl
                p-10
                text-center
              "
            >
              <h2 className="text-4xl mb-8">Mis Papás</h2>

              <p className="mb-3">{data.family.parents.mother}</p>

              <p>{data.family.parents.father}</p>
            </motion.div>
          </section>
        )}

        {/* PADRINOS */}
        {data.family?.godparents && (
          <section className="py-24 px-6 bg-[#faf7f2]">
            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              className="
                max-w-xl
                mx-auto
                bg-white
                rounded-3xl
                shadow-xl
                p-10
                text-center
              "
            >
              <h2 className="text-4xl mb-8">Mis Padrinos</h2>

              <p className="mb-3">{data.family.godparents.man}</p>

              <p>{data.family.godparents.woman}</p>
            </motion.div>
          </section>
        )}

        {/* CEREMONIA */}
        <section className="py-24 px-6 text-center">
          <h2 className="text-4xl mb-6">Ceremonia</h2>

          <p className="text-xl mb-8">{data.location.church}</p>

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
              bg-black
              text-white
            "
          >
            Ver ubicación
            <MapPin size={18} />
          </a>
        </section>

        {/* RECEPCIÓN */}
        {data.location.reception && (
          <section className="py-24 px-6 bg-[#faf7f2] text-center">
            <h2 className="text-4xl mb-6">Recepción</h2>

            <p className="text-xl">{data.location.reception}</p>
          </section>
        )}

        {/* GALERÍA */}
        <section className="py-24 px-6">
          <h2 className="text-center text-4xl mb-10">Galería</h2>

          <div className="relative z-10 mb-5">
            <Gallery images={data.media.gallery} />
          </div>

          <p
            className="
          relative
          z-10
          text-center
          text-xs
          tracking-[0.2em]
          uppercase
          text-[#a08d74]
        "
          >
            Desliza para ver más
          </p>
        </section>

        {/* RSVP */}
        <section className="py-24 px-6 text-center">
          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            whileHover={{
              scale: 1.05,
            }}
            onClick={() => setOpenModal(true)}
            className="
              px-10
              py-5
              rounded-full
              bg-black
              text-white
              text-lg
            "
          >
            Confirmar asistencia
          </motion.button>
        </section>

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full">
              <h3 className="text-3xl mb-4">Confirmar asistencia</h3>

              <p className="mb-8">¿Deseas confirmar tu asistencia?</p>

              <div className="flex gap-3">
                <button
                  onClick={() => setOpenModal(false)}
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
                    setOpenModal(false);
                  }}
                  className="
                    flex-1
                    bg-black
                    text-white
                    rounded-xl
                    py-3
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
