"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowDown, Cake, CalendarDays, Castle, Clock, Gift, MapPin, MessageCircle, Music2, PartyPopper, Pause, Smile, Sparkles, Star, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import CountDown from "@/app/components/CountDown";
import Gallery from "@/app/components/Gallery";
import type { EventData } from "@/app/types/EventData";
import s from "./BirthdaySpidey.module.css";

const activityIcons = { Apertura: PartyPopper, Brincolín: Castle, "Show de payasos": Smile, Piñatas: Star, Pastel: Cake, Aguinaldos: Gift };

function WebCorner({ flip = false }: { flip?: boolean }) {
  return <svg className={`${s.webCorner} ${flip ? s.webFlipped : ""}`} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M0 0L100 0M0 0L92 38M0 0L71 71M0 0L38 92M0 0L0 100M24 0Q20 5 22 9Q16 10 17 17Q10 16 9 22Q5 20 0 24M48 0Q40 10 44 18Q32 20 34 34Q20 32 18 44Q10 40 0 48M72 0Q60 15 66 27Q48 30 51 51Q30 48 27 66Q15 60 0 72M96 0Q80 20 88 36Q64 40 68 68Q40 64 36 88Q20 80 0 96" stroke="currentColor" strokeWidth="1.5" />
  </svg>;
}

function ComicLink() {
  return <div className={s.comicLink} aria-hidden="true"><span /><Zap size={20} /><span /></div>;
}

export default function BirthdaySpidey({ data }: { data: EventData }) {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [signalOn, setSignalOn] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
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

  useEffect(() => {
    if (!opening) return;
    const revealTimer = window.setTimeout(() => setOpen(true), 340);
    const finishTimer = window.setTimeout(() => setOpening(false), 850);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(finishTimer);
    };
  }, [opening]);

  function openInvitation() {
    if (opening || open) return;
    // Keep playback in the user gesture so mobile browsers can allow sound.
    void audioRef.current?.play().catch(() => setMusicPlaying(false));
    window.scrollTo({ top: 0, behavior: "instant" });
    if (reduceMotion) setOpen(true);
    else setOpening(true);
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => setMusicPlaying(false));
    else audio.pause();
  }

  return (
    <main className={s.page}>
      {opening && (
        <div className={s.openingWipe} aria-hidden="true">
          <strong>¡ZAS!</strong>
        </div>
      )}
      {data.media.music && <audio ref={audioRef} src={data.media.music} preload="none" loop
        onPlay={() => setMusicPlaying(true)} onPause={() => setMusicPlaying(false)}
        onError={() => setMusicPlaying(false)} />}
      {open && data.media.music && <button type="button" className={s.musicControl}
        onClick={toggleMusic} aria-label={musicPlaying ? "Pausar música" : "Reproducir música"}
        title={musicPlaying ? "Pausar música" : "Reproducir música"}>
        {musicPlaying ? <Pause size={20} aria-hidden="true" /> : <Music2 size={20} aria-hidden="true" />}
      </button>}
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
              <Image className={s.portrait} src={data.media.coverImage} alt={`${event.name} con su traje de Spidey`} width={540} height={717} sizes="(max-width: 480px) 55vw, 220px" />
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
            <div className={s.countFrame}>
              <WebCorner /><WebCorner flip />
              <p className={s.comicLabel}>¡La misión se acerca!</p>
              <p className={s.countLabel}>Cuenta regresiva</p>
              <CountDown data={data} />
            </div>
          </motion.section>
          <ComicLink />
          {data.media.gallery.length > 0 && (
            <motion.section {...reveal(0, 0, .96)} aria-labelledby="spidey-gallery">
              <h2 id="spidey-gallery">Mis fotos de superhéroe</h2>
              <Gallery images={data.media.gallery} />
              <p>Desliza para ver mis fotos</p>
            </motion.section>
          )}
          <motion.section {...reveal(-24, -2)} className={s.venuePanel}>
            <WebCorner flip />
            <p className={s.comicLabel}>¡Aquí es la misión!</p>
            <MapPin className={s.emblem} aria-hidden="true" />
            <h2>Nos vemos en</h2>
            <h3>{location.place}</h3>
            <p>{location.reception}</p>
            <div className={s.mapFrame}>
              <span className={s.mapStamp} aria-hidden="true"><MapPin size={15} />Punto de encuentro</span>
              <iframe title="Mapa del salón El Mezquite" loading="lazy" src={`https://maps.google.com/maps?q=${encodeURIComponent(venue)}&output=embed`} />
            </div>
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
            <ol>{event.itinerary?.map(item => {
              const ActivityIcon = activityIcons[item.title as keyof typeof activityIcons] ?? Zap;
              return (
              <li key={item.title}>
                <span><span className={s.activityIcon}><ActivityIcon size={21} aria-hidden="true" /></span>{item.title}</span>
                {item.hour && <b>{item.hour} h</b>}
              </li>
            ); })}</ol>
          </motion.section>
          <ComicLink />
          <motion.section {...reveal(-18, -2)} className={s.gifts}>
            <div className={s.giftArt} aria-hidden="true">
              <WebCorner />
              <Sparkles className={s.giftSpark} size={24} />
              <Gift className={s.giftBox} size={66} strokeWidth={1.6} />
              <Star className={s.giftStar} size={20} />
            </div>
            <h2>Gracias por acompañarme</h2>
            <p className={s.invitationLine}>{event.giftMessage}</p>
          </motion.section>
          <ComicLink />
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
