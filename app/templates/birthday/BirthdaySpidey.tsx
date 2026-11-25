"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, Cake, CalendarDays, Clock, Gift, MapPin, MessageCircle, PartyPopper, Sparkles, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import CountDown from "@/app/components/CountDown";
import type { EventData } from "@/app/types/EventData";
import s from "./BirthdaySpidey.module.css";

export default function BirthdaySpidey({ data }: { data: EventData }) {
  const [open, setOpen] = useState(false);
  const [signalOn, setSignalOn] = useState(false);
  const reduceMotion = useReducedMotion();
  const inviteHeading = useRef<HTMLHeadingElement>(null);
  const { event, location } = data;
  const venue = [location.place, location.reception].join(", ");
  const reveal = (x = 0, rotate = 0, scale = 1) => ({
    initial: reduceMotion ? false as const : { opacity: 0.35, x, y: 18, rotate, scale },
    whileInView: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reduceMotion ? 0 : 0.55 },
  });

  useEffect(() => {
    if (!open) return;
    inviteHeading.current?.focus({ preventScroll: true });
  }, [open]);

  function openInvitation() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpen(true);
  }

  return (
    <main className={s.page}>
      <div className={s.particles} aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => (
          <span key={i} style={{
            "--x": `${(i * 37 + 5) % 100}%`,
            "--delay": `${-i * 1.27}s`,
            "--duration": `${11 + i % 6}s`,
            "--size": `${8 + (i * 5) % 14}px`,
          } as CSSProperties}>{i % 4 === 0 ? "ϟ" : "✦"}</span>
        ))}
      </div>
      <header key={open ? "invitation" : "cover"} className={open ? `${s.poster} ${s.invitationHero}` : s.poster}>
        <div className={s.skyline} aria-hidden="true" />
        <div className={s.paper}>
          <span className={s.tag}>{open ? `¡Cumplo ${event.age} años!` : "¡Llamando a los superhéroes!"}</span>
          <div className={s.art}>
            <span className={s.burst} aria-hidden="true" />
            <Zap className={s.artBolt} aria-hidden="true" />
            <Sparkles className={s.artSpark} aria-hidden="true" />
            {open ? (
              <Image className={s.hero} src={data.media.coverImage} alt="Spidey en pose de acción" width={480} height={638} />
            ) : (
              <Image className={s.hero} src="/arismael-spidey.webp" alt="Spidey listo para la fiesta" width={221} height={354} preload />
            )}
          </div>
          <h1 ref={open ? inviteHeading : undefined} tabIndex={open ? -1 : undefined}>{event.name}</h1>
          {open ? (
            <>
              <p className={s.heroDate}>{event.date} · {event.partyHour}</p>
              <a href="#mision">Ver detalles <ArrowDown size={17} aria-hidden="true" /></a>
            </>
          ) : (
            <>
              <strong className={s.age}>¡Cumplo {event.age} años!</strong>
              <p className={s.invitationLine}>¡Tengo una misión para ti!</p>
              <button type="button" onClick={openInvitation}>Abrir invitación <Zap size={18} aria-hidden="true" /></button>
            </>
          )}
        </div>
      </header>
      {open && (
        <div className={s.details}>
          <motion.section {...reveal(0, 0, .94)} className={s.mission} id="mision">
            <Zap className={s.emblem} aria-hidden="true" />
            <h2>¡Que empiece la aventura!</h2>
            {event.phrase && <p className={s.invitationLine}>{event.phrase}</p>}
            <div className={s.dateStrip}>
              <span><CalendarDays size={17} aria-hidden="true" />{event.date}</span>
              <span><Clock size={17} aria-hidden="true" />{event.partyHour}</span>
            </div>
            <p className={s.countLabel}>Cuenta regresiva</p>
            <CountDown data={data} />
          </motion.section>
          <motion.section {...reveal(-24, -2)} className={s.venuePanel}>
            <MapPin className={s.emblem} aria-hidden="true" />
            <h2>Nos vemos en</h2>
            <h3>{location.place}</h3>
            <p>{location.reception}</p>
            <iframe title="Mapa del salón El Mezquite" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&output=embed`} />
            <a href={location.mapUrl} target="_blank" rel="noreferrer">Cómo llegar ↗</a>
          </motion.section>
          <motion.figure {...reveal(0, 1, .92)} className={s.comicPanel}>
            <Image
              src="/arismael-spidey-cielo.webp"
              alt="Spidey saltando entre nubes"
              width={546}
              height={715}
              sizes="(max-width: 564px) calc(100vw - 44px), 520px"
            />
          </motion.figure>
          <motion.section {...reveal(24, 2)} className={s.schedule}>
            <div className={s.signalScene} data-lit={signalOn}>
              <div className={s.cityArt} aria-hidden="true">
                <span className={s.beam} />
                <span className={s.signalMark}>🕷</span>
                <span className={s.rooftops} />
              </div>
              <button type="button" aria-pressed={signalOn} aria-label="Señal arácnida"
                onClick={() => setSignalOn(on => !on)}>
                <Zap size={16} aria-hidden="true" />
                {signalOn ? "Apagar señal" : "Encender señal arácnida"}
              </button>
            </div>
            <Cake className={s.emblem} aria-hidden="true" />
            <h2>Plan de la fiesta</h2>
            <p className={s.invitationLine}>Del primer salto al último pedacito de pastel, ¡nos espera una tarde de diversión!</p>
            <ol>{event.itinerary?.map(item => (
              <li key={item.title}>
                <span><Zap size={15} aria-hidden="true" />{item.title}</span>
                {item.hour && <b>{item.hour} h</b>}
              </li>
            ))}</ol>
          </motion.section>
          <motion.section {...reveal(-18, -2)} className={s.gifts}>
            <Gift className={s.emblem} aria-hidden="true" />
            <h2>{event.giftMessage}</h2>
            <p>¡Lo mejor será celebrar contigo!</p>
          </motion.section>
          <motion.section {...reveal(0, 0, .94)} className={s.rsvp}>
            <div className={s.farewellArt}>
              <Image
                src="/arismael-spidey-despedida.webp"
                alt=""
                width={600}
                height={641}
                sizes="(max-width: 480px) 55vw, 220px"
              />
            </div>
            <PartyPopper className={s.emblem} aria-hidden="true" />
            <h2>¿Vienes a mi fiesta?</h2>
            <p className={s.invitationLine}>¡Te guardo un lugar en mi equipo!</p>
            <a href={`https://wa.me/${data.contact.phone}?text=${encodeURIComponent("¡Hola! Confirmo mi asistencia al cumpleaños de Arismael.")}`}>
              <MessageCircle size={18} aria-hidden="true" /> Confirmar por WhatsApp
            </a>
          </motion.section>
        </div>
      )}
    </main>
  );
}
