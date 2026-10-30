"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  Church,
  MapPin,
  MessageCircle,
  Wheat,
  X,
} from "lucide-react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import type { EventData } from "@/app/types/EventData";
import s from "./BasicDualInvitation.module.css";

function JurassicFern({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 300"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M80 292C65 207 70 109 82 14" stroke="#a5ab6d" strokeWidth="2" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} transform={`translate(0 ${i * 24})`}>
          <path
            d={`M76 45C${27 - i} 42 14 18 12 3C44 7 66 23 76 45Z`}
            fill={i % 2 ? "#3f6334" : "#587444"}
          />
          <path
            d="M76 52C119 43 143 23 148 8C113 12 86 30 76 52Z"
            fill={i % 2 ? "#537440" : "#345a31"}
          />
          <path
            d="M76 45L24 12M76 52L135 17"
            stroke="#a9b67a"
            strokeOpacity=".35"
          />
        </g>
      ))}
    </svg>
  );
}

function JurassicFootprint({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M28 49 19 12Q18 3 24 7L40 36 46 3Q49-3 52 5L55 39 72 19Q79 14 76 24L64 57Q62 64 59 72L53 89Q44 100 32 90L20 74Q13 65 18 58Z" />
    </svg>
  );
}

export default function BasicDualInvitation({ data }: { data: EventData }) {
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const countdownData = {
    ...data,
    event: {
      ...data.event,
      partyHour: data.event.ceremonyHour || data.event.partyHour,
    },
  };
  const birthday = data.companionBirthday;
  const reveal = {
    initial: { opacity: 1, y: reduced ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduced ? 0 : 0.7 },
  };
  const whatsapp = `https://wa.me/${data.contact.phone}?text=${encodeURIComponent(`¡Hola! Quiero confirmar mi asistencia a la Primera Comunión de ${data.event.name} y al cumpleaños de ${birthday?.name}, el ${data.event.date}.`)}`;

  return (
    <main className={s.page}>
      <header className={s.opening}>
        <div className={s.coverHeading}>
          <span>Mi Primera Comunión</span>
          <span>21 · 11 · 2026</span>
        </div>
        <div className={`${s.coverPhotos} ${s.communionCover}`}>
          <div className={`${s.coverPanel} ${s.sofiaPanel}`}>
            <Image
              src={data.media.coverImage}
              alt="Sofía con un ramo de flores"
              fill
              preload
              sizes="(max-width: 760px) 100vw, 760px"
            />
            <div className={s.coverOrnaments} aria-hidden="true">
              {Array.from({ length: 8 }, (_, i) => <i key={i} style={{ left: `${10 + i * 11}%`, top: `${12 + (i % 3) * 24}%`, animationDelay: `${i * -.8}s` }}>✦</i>)}
            </div>
            <div className={`${s.photoCaption} ${s.coverBlessing}`}>
              <strong>Un día de luz</strong>
              <p>Te invito a compartir una bendición especial</p>
            </div>
          </div>
          <div className={s.coverCurtainLeft} aria-hidden="true" />
          <div className={s.coverCurtainRight} aria-hidden="true" />
        </div>
        <div className={s.coverInvitation}>
          <div className={s.monogram} aria-hidden="true">
            S
          </div>
          <p className={s.eyebrow}>Mi Primera Comunión</p>
          <h1>Sofía Dariel</h1>
          <p className={s.coverSurname}>López Mateos</p>
          <p>
            Con mucha fe y alegría recibiré a Jesús.
            <br />
            Me encantará compartir este día contigo.
          </p>
          <div className={s.date}>
            <span>SÁBADO</span>
            <strong>21</strong>
            <span>
              NOVIEMBRE
              <br />
              2026
            </span>
          </div>
          <a href="#sofia" className={s.discover}>
            Acompáñame en este día especial <ArrowDown size={16} />
          </a>
        </div>
      </header>

      <section id="sofia" className={s.communion} aria-labelledby="sofia-title">
        <div className={s.specks} aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${9 + i * 10}%`,
                top: `${12 + (i % 4) * 22}%`,
                animationDelay: `${i * -0.8}s`,
              }}
            />
          ))}
        </div>
        <motion.div {...reveal} className={s.arch}>
          <p className={s.eyebrow}>Con fe, amor y alegría</p>
          <div className={s.cross} aria-hidden="true">
            <svg viewBox="0 0 64 88" width="64" height="88" fill="none" focusable="false">
              <path d="M28 4h8v23h21v8H36v49h-8V35H7v-8h21Z" fill="currentColor" />
            </svg>
          </div>
          <p className={s.eyebrow}>Mi Primera Comunión</p>
          <h2 id="sofia-title">Sofía Dariel</h2>
          <p className={s.surname}>López Mateos</p>
          <div className={s.communionPortrait}>
            <Image
              src="/pictures/duo/sofia-y-adan-2.webp"
              alt="Sofía saltando feliz en la playa"
              fill
              sizes="(max-width: 600px) 72vw, 340px"
            />
          </div>
          <Wheat
            className={s.wheat}
            size={38}
            strokeWidth={1}
            aria-hidden="true"
          />
          <p className={s.invite}>
            Un día muy especial en mi corazón,
            <br />
            que quiero compartir contigo.
          </p>
          <p className={s.day}>{data.event.date}</p>
        </motion.div>
        <motion.div {...reveal} className={s.family}>
          <p className={s.eyebrow}>Con el amor de mis padres</p>
          <p>
            {data.family?.parents?.mother}
            <span>&</span>
            {data.family?.parents?.father}
          </p>
          <p className={s.eyebrow}>Y la compañía de mis padrinos</p>
          <p>
            {data.family?.godparents?.woman}
            <span>&</span>
            {data.family?.godparents?.man}
          </p>
        </motion.div>
        <motion.div {...reveal} className={s.ceremony}>
          <Church size={30} strokeWidth={1.2} aria-hidden="true" />
          <p className={s.eyebrow}>La misa</p>
          <h3>{data.location.church}</h3>
          <p className={s.time}>{data.event.ceremonyHour}</p>
          <a
            className={s.button}
            href={data.location.churchMapUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={17} /> Cómo llegar a la parroquia
          </a>
        </motion.div>
      </section>

      {birthday && (
        <section className={s.birthday} aria-labelledby="adan-title">
          <div className={s.jungleDecor} aria-hidden="true">
            <JurassicFern className={s.fernTopLeft} />
            <JurassicFern className={s.fernTopRight} />
            <JurassicFern className={s.fernMiddleLeft} />
            <JurassicFern className={s.fernBottomRight} />
            <JurassicFern className={s.fernBottomLeft} />
            <JurassicFootprint className={s.trackOne} />
            <JurassicFootprint className={s.trackTwo} />
            <JurassicFootprint className={s.trackThree} />
          </div>
          <div className={s.embers} aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <i
                key={i}
                style={{
                  left: `${4 + ((i * 7) % 94)}%`,
                  animationDelay: `${i * -2.4}s`,
                  animationDuration: `${23 + (i % 4) * 3}s`,
                }}
              />
            ))}
          </div>
          <div className={s.dinoArt}>
            <Image
              src={birthday.image}
              alt="Tiranosaurio y triceratops junto a un río entre selva y montañas volcánicas"
              fill
              sizes="(max-width: 760px) 100vw, 760px"
              className={s.dinoImage}
            />
            <motion.div {...reveal} className={s.jurassicWelcome}>
              <p>
                Y también te damos
                <br />
                la bienvenida a
              </p>
              <h3>
                la aventura
                <br />
                de <em>Adán</em>
              </h3>
              <span>Un cumpleaños de proporciones jurásicas</span>
            </motion.div>
          </div>
          <motion.div {...reveal} className={s.dinoContent}>
            <div className={s.expeditionBackdrop} aria-hidden="true">
              <svg className={s.contourMap} viewBox="0 0 400 900" preserveAspectRatio="none" fill="none" focusable="false">
                <path d="M-50 50C140-80 90 220 260 110S490 80 460 260M-40 75C130-50 80 245 270 135S470 110 435 270M-30 100C120-20 70 270 280 160S450 140 410 280M-50 580C100 390 190 680 350 520S460 480 480 710M-40 610C110 420 180 710 360 550S440 510 460 730M-30 640C120 450 170 740 370 580S420 540 440 750" />
              </svg>
              <JurassicFern className={s.portraitFernLeft} />
              <JurassicFern className={s.portraitFernRight} />
              <JurassicFern className={s.lowerFernRight} />
              <JurassicFootprint className={s.localTrackLeft} />
              <JurassicFootprint className={s.localTrackRight} />
            </div>
            <p className={s.expedition}>La aventura continúa</p>
            <div className={s.explorerPortrait}>
              <Image
                src="/pictures/duo/sofia-y-adan-7.webp"
                alt="Adán, el festejado de esta aventura"
                fill
                sizes="220px"
              />
              <span aria-hidden="true">6</span>
            </div>
            <p className={s.eyebrow}>Mi cumpleaños</p>
            <h2 id="adan-title">{birthday.name}</h2>
            <div className={s.age}>
              <svg className={s.ageCompass} viewBox="0 0 180 180" fill="none" aria-hidden="true" focusable="false">
                <circle cx="90" cy="90" r="75" stroke="currentColor" strokeWidth=".7" />
                <circle cx="90" cy="90" r="68" stroke="currentColor" strokeWidth=".6" strokeDasharray="2 8" />
                <path d="M90 3 94 15 90 24 86 15ZM90 177 94 165 90 156 86 165ZM3 90 15 86 24 90 15 94ZM177 90 165 86 156 90 165 94Z" fill="currentColor" />
              </svg>
              <strong>{birthday.age}</strong>
              <span>AÑOS DE AVENTURAS</span>
            </div>
            <p className={s.roar}>{birthday.phrase}</p>
            <div className={s.fossilDivider} aria-hidden="true">
              <span />✦<span />
            </div>
          </motion.div>
          <motion.div {...reveal} className={s.adventureStory}>
            <p className={s.eyebrow}>Pequeño explorador · Grandes aventuras</p>
            <h3>¡La aventura de crecer!</h3>
            <div className={s.adventurePhoto}>
              <Image
                src="/pictures/duo/sofia-y-adan-8.webp"
                alt="Un recuerdo de Adán cuando era más pequeño"
                fill
                sizes="(max-width: 600px) 72vw, 330px"
              />
              <span>Recuerdos de mi aventura</span>
            </div>
            <p>
              Seis años de sonrisas, descubrimientos y momentos que se quedan en
              el corazón. Hoy quiero sumar uno más contigo.
            </p>
          </motion.div>
          <motion.div {...reveal} className={s.expeditionTicket}>
            <p className={s.eyebrow}>Tu próxima expedición</p>
            <h3>Destino: ¡mis 6 años!</h3>
            <p>
              Prepara tu espíritu aventurero y acompáñame a celebrar un
              cumpleaños lleno de grandes rugidos.
            </p>
            <div className={s.ticketDate}>
              <span>NOVIEMBRE</span>
              <strong>21</strong>
              <span>2026</span>
            </div>
            <p className={s.dinoDate}>
              Nos vemos en {data.location.reception}
              <br />
              {data.event.partyHour}
            </p>
            <a href="#celebracion" className={s.dinoLink}>
              ¡Vamos a celebrar! <ArrowDown size={18} />
            </a>
          </motion.div>
          <div className={s.closingDinosaur}>
            <Image
              src="/pictures/birthday/mateo/jurassic-expedition.webp"
              alt="Un gran tiranosaurio entre la vegetación de la selva"
              fill
              sizes="(max-width: 760px) 100vw, 760px"
            />
            <p className={s.dinosaurFarewell}>¡Nos espera una<br /><em>gran aventura!</em></p>
          </div>
        </section>
      )}

      <section
        id="celebracion"
        className={s.celebration}
        aria-labelledby="celebracion-title"
      >
        <motion.div {...reveal} className={s.countdown}>
          <p className={s.eyebrow}>Cada vez falta menos</p>
          <h2>Un día, dos alegrías</h2>
          <CountDown data={countdownData} />
        </motion.div>
        <motion.div {...reveal}>
          <p className={s.eyebrow}>Sofía & Adán</p>
          <h2 id="celebracion-title">
            Una celebración
            <br />
            <em>para compartir</em>
          </h2>
          <p>
            Después de la misa, nos reunimos para festejar estas dos grandes
            alegrías.
          </p>
          <div className={s.reception}>
            <MapPin size={30} strokeWidth={1.2} aria-hidden="true" />
            <p className={s.eyebrow}>Recepción</p>
            <h3>{data.location.reception}</h3>
            <p className={s.time}>{data.event.partyHour}</p>
            <p>{data.event.date}</p>
            <a
              className={s.button}
              href={data.location.receptionMapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin size={17} /> Cómo llegar a la terraza
            </a>
          </div>
          <div className={s.note}>
            <p>{data.event.dressCode}</p>
            <p>
              Solo recuerda:{" "}
              <strong>{data.event.dressCodeNote?.toLowerCase()}.</strong>
            </p>
          </div>
        </motion.div>
        {data.media.gallery.length > 0 && (
          <motion.section
            {...reveal}
            className={s.gallery}
            aria-labelledby="gallery-title"
          >
            <p className={s.eyebrow}>Nuestros recuerdos</p>
            <h2 id="gallery-title">Momentos especiales</h2>
            <Gallery images={data.media.gallery} />
            <p className={s.galleryHint}>Desliza para ver más recuerdos</p>
          </motion.section>
        )}
        <motion.div {...reveal} className={s.rsvp}>
          <MessageCircle size={30} strokeWidth={1.2} aria-hidden="true" />
          <h2>¿Nos acompañas?</h2>
          <p>
            Confirma tu asistencia a más tardar el
            <br />
            <strong>{data.contact.confirmationDeadline}.</strong>
          </p>
          <button
            className={s.button}
            onClick={() => dialog.current?.showModal()}
          >
            <MessageCircle size={18} /> Confirmar asistencia
          </button>
        </motion.div>
        <footer className={s.footer}>
          <span>Con mucho cariño</span>
          <p>Sofía & Adán</p>
          <span>¡Te esperamos!</span>
        </footer>
      </section>
      <dialog
        ref={dialog}
        className={s.dialog}
        aria-labelledby="confirmation-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className={s.dialogContent}>
          <button
            className={s.close}
            aria-label="Cerrar confirmación"
            onClick={() => dialog.current?.close()}
          >
            <X size={22} />
          </button>
          <MessageCircle size={30} strokeWidth={1.2} aria-hidden="true" />
          <h2 id="confirmation-title">Confirmar asistencia</h2>
          <p>
            Nos encantará compartir este día contigo. Envía tu confirmación por
            WhatsApp para acompañar a Sofía y Adán.
          </p>
          <a
            className={s.button}
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => dialog.current?.close()}
          >
            Confirmar por WhatsApp
          </a>
        </div>
      </dialog>
    </main>
  );
}
