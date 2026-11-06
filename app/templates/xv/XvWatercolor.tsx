"use client";

import Image from "next/image";
import { Pinyon_Script } from "next/font/google";
import { Children, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, Church, MapPin, Heart, Gift, Mail, MessageCircle, Music2, Pause, X, Utensils, Sparkles } from "lucide-react";
import CountDown from "@/app/components/CountDown";
import type { EventData } from "@/app/types/EventData";
import s from "./XvWatercolor.module.css";

const nameScript = Pinyon_Script({ subsets: ["latin"], weight: "400", display: "swap" });

// Motion forwards children to a DOM element. Normalize its child arrays so
// React retains stable keys in both server rendering and hydration.
function AnimatedDiv({ children, ...props }: Omit<ComponentProps<typeof motion.div>, "children"> & { children?: ReactNode }) {
  return <motion.div {...props}>{Children.toArray(children)}</motion.div>;
}

function Bouquet({ className = "", variety = "anemonas" }: { className?: string; variety?: "anemonas" | "magnolias" }) {
  return <div className={`${s.bouquet} ${className}`} aria-hidden="true"><Image src={`/pictures/xv/deny/${variety}.webp`} alt="" fill sizes="(max-width: 600px) 220px, 300px" /></div>;
}

function FloralCorners({ reverse = false }: { reverse?: boolean }) {
  return <div className={`${s.floralCorners} ${reverse ? s.reverseFlorals : ""}`} aria-hidden="true">
    <Bouquet className={s.cornerTop} variety={reverse ? "magnolias" : "anemonas"} />
    <Bouquet className={s.cornerBottom} variety={reverse ? "anemonas" : "magnolias"} />
    <span className={s.goldSprigTop}>✧</span><span className={s.goldSprigBottom}>✧</span>
  </div>;
}

function FloralDivider({ variety = "anemonas" }: { variety?: "anemonas" | "magnolias" }) {
  return <div className={s.floralDivider} aria-hidden="true"><span /><Bouquet variety={variety} /><span /></div>;
}

function ReferenceFrame({ src }: { src: string }) {
  return <div className={s.referenceFrame} aria-hidden="true">
    <Image src={src} alt="" fill sizes="(max-width: 760px) 100vw, 760px" className={s.referenceFrameImage} />
  </div>;
}

function AgeEmblem({ className = "" }: { className?: string }) {
  return <div className={`${s.openingAgeEmblem} ${className}`} aria-label="Quince años">
    <span className={s.openingRibbon}>Celebrando</span>
    <div className={s.emblemCore}>
      <div className={s.emblemArtwork} aria-hidden="true"><Image src="/pictures/xv/deny/laurel-bow-emblem.png" alt="" fill sizes="170px" /></div>
      <strong>XV</strong>
    </div>
  </div>;
}

export default function XvWatercolor({ data }: { data: EventData }) {
  const reduced = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const [showIntro, setShowIntro] = useState(Boolean(data.media.music));
  const [playing, setPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const reveal = { initial: reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 42, scale: .985 }, whileInView: { opacity: 1, y: 0, scale: 1 }, viewport: { once: true, amount: .16 }, transition: { duration: reduced ? 0 : .85, ease: "easeOut" as const } };
  const revealLeft = { initial: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -38 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: .28 }, transition: { duration: reduced ? 0 : .75, ease: "easeOut" as const } };
  const revealRight = { initial: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 38 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, amount: .28 }, transition: { duration: reduced ? 0 : .75, ease: "easeOut" as const } };
  const popIn = { initial: reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: .86, y: 18 }, whileInView: { opacity: 1, scale: 1, y: 0 }, viewport: { once: true, amount: .35 }, transition: { duration: reduced ? 0 : .65, ease: "easeOut" as const } };
  const countdown = { ...data, event: { ...data.event, partyHour: data.event.ceremonyHour || data.event.partyHour } };
  const whatsapp = `https://wa.me/${data.contact.phone}?text=${encodeURIComponent("¡Hola! Quiero confirmar mi asistencia a los XV años de Deny, el 13 de febrero de 2027.")}`;

  const playMusic = () => {
    setMusicError(false);
    void audio.current?.play().catch(() => setMusicError(true));
  };

  const openInvitation = () => {
    playMusic();
    setShowIntro(false);
    requestAnimationFrame(() => title.current?.focus({ preventScroll: true }));
  };

  return <>
    {data.media.music && <audio ref={audio} src={data.media.music} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setMusicError(true); }} />}
    <AnimatePresence>
      {showIntro && <motion.section key="deny-opening" className={s.opening} aria-labelledby="deny-opening-title" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: reduced ? 1 : 1.02 }} transition={{ duration: reduced ? 0 : .65 }}>
        <div className={s.openingFlowersTop} aria-hidden="true"><Image src={data.media.coverImage} alt="" fill preload sizes="(max-width: 760px) 100vw, 760px" /></div>
        <div className={s.openingFlowersBottom} aria-hidden="true"><Image src={data.media.coverImage} alt="" fill sizes="(max-width: 760px) 100vw, 760px" /></div>
        <div className={s.openingContent}>
          <span className={`${s.openingSparkle} ${s.openingSparkleLeft}`} aria-hidden="true">✦</span>
          <span className={`${s.openingSparkle} ${s.openingSparkleRight}`} aria-hidden="true">✧</span>
          <p>Una nueva etapa está por florecer</p>
          <h2 id="deny-opening-title" className={nameScript.className}>Deny</h2>
          <span className={s.openingOccasion}>Mis quince años</span>
          <AgeEmblem />
          <div className={s.openingDate}><span>13</span><i /><span>FEB · 2027</span></div>
          <button type="button" onClick={openInvitation}>Abrir invitación <ArrowDown size={16} aria-hidden="true" /></button>
        </div>
      </motion.section>}
    </AnimatePresence>
    {!showIntro && data.media.music && <button type="button" className={s.musicToggle} data-playing={playing} aria-label={playing ? "Pausar música" : "Reproducir música"} title={playing ? "Pausar música" : "Reproducir música"} onClick={() => playing ? audio.current?.pause() : playMusic()}>
      {playing ? <Pause size={18} strokeWidth={1.5} aria-hidden="true" /> : <Music2 size={19} strokeWidth={1.5} aria-hidden="true" />}
    </button>}
    {musicError && !showIntro && <p className={s.musicError} role="status">Toca el botón musical para iniciar la canción.</p>}
    <main className={s.page} inert={showIntro} style={showIntro ? { height: "100svh", overflow: "hidden" } : undefined}>
    <div className={s.particles} aria-hidden="true">{Array.from({ length: 14 }, (_, i) => <span key={i} className={i % 3 === 0 ? s.floatingFlower : s.floatingPetal} style={{ left: `${3 + i * 7}%`, animationDelay: `${i * -2.7}s`, animationDuration: `${19 + i % 4 * 4}s` }}>
      {i % 3 === 0 && <svg viewBox="0 0 40 40" fill="currentColor" focusable="false"><g>{[0,72,144,216,288].map(angle => <ellipse key={angle} cx="20" cy="12" rx="5" ry="9" transform={`rotate(${angle} 20 20)`} />)}</g><circle cx="20" cy="20" r="3" fill="#b79a5d" /></svg>}
    </span>)}</div>
    <header className={s.hero}>
      <div className={s.heroFloralTop} aria-hidden="true"><Image src={data.media.coverImage} alt="" fill preload sizes="(max-width: 760px) 100vw, 760px" className={s.heroFlowers} /></div>
      <div className={s.heroFloralBottom} aria-hidden="true"><Image src={data.media.coverImage} alt="" fill sizes="(max-width: 760px) 100vw, 760px" className={s.heroFlowers} /></div>
      <div className={s.heroFiligree} aria-hidden="true"><span>❦</span><span>❦</span></div>
      <div className={s.heroInner}>
        <p className={s.eyebrow}>Hay sueños que florecen</p>
        <AgeEmblem className={s.heroAgeEmblem} />
        <h1 ref={title} tabIndex={-1} className={nameScript.className}>Deny</h1>
        <p className={s.occasion}>Mis quince años</p>
        <div className={s.date}><span>FEBRERO</span><strong>13</strong><span>2027</span></div>
        <p className={s.heroNote}>Una nueva etapa.<br />Un día para recordar siempre.</p>
        <a href="#invitacion" className={s.scroll}>Descubre mi invitación <ArrowDown size={15} /></a>
      </div>
    </header>
    <motion.section {...reveal} id="invitacion" className={`${s.section} ${s.letter}`}>
      <span className={s.smallFlower} aria-hidden="true">✧</span>
      <p className={s.eyebrow}>Con mucho cariño, para ti</p>
      <h2>Mi historia está<br /><em>por florecer</em></h2>
      <p>{data.event.phrase}</p>
      <p className={s.fullName}>{data.event.name}</p>
      <div className={`${s.signature} ${nameScript.className}`}>Deny</div>
    </motion.section>
    {data.media.portraitImage && <motion.section {...reveal} className={`${s.section} ${s.childhood}`} aria-labelledby="deny-memory-title">
      <p className={s.eyebrow}>Donde comenzaron mis sueños</p>
      <h2 id="deny-memory-title">La pequeña que fui,<br /><em>los sueños que vienen</em></h2>
      <figure>
        <div className={s.memoryStage}>
          <div className={s.memoryFrame}>
            <div className={s.memoryPortrait}>
              <Image src={data.media.portraitImage} alt="Deny de pequeña, sonriendo con un moño rosa" fill sizes="(max-width: 400px) 70vw, 300px" />
            </div>
            <div className={s.memoryWreath} aria-hidden="true"><Image src="/pictures/xv/deny/corona-oval.webp" alt="" fill sizes="(max-width: 400px) 90vw, 360px" /></div>
          </div>
        </div>
        <figcaption>Aquella pequeña de grandes sueños hoy comienza una nueva historia.</figcaption>
      </figure>
    </motion.section>}
    <FloralDivider />
    <motion.section {...reveal} className={`${s.section} ${s.countdown} ${s.floralSection}`}>
      <FloralCorners />
      <p className={s.eyebrow}>Reserva este día en tu corazón</p>
      <h2>La ilusión crece…</h2>
      <CountDown data={countdown} />
      <p className={s.fine}>13 de febrero de 2027</p>
    </motion.section>
    <motion.section {...reveal} className={`${s.section} ${s.family}`}>
      <div className={s.familyGarland} aria-hidden="true">
        <Image src="/pictures/xv/deny/guirnalda-hd.webp" alt="" fill sizes="(max-width: 600px) 100vw, 560px" />
      </div>
      <p className={s.eyebrow}>Las raíces de mis sueños</p>
      <h2>El amor que<br /><em>me acompaña</em></h2>
      <AnimatedDiv {...revealLeft} className={s.names}><h3>Mis papás</h3><p>{data.family?.parents?.mother}<span>&</span>{data.family?.parents?.father}</p></AnimatedDiv>
      <AnimatedDiv {...revealRight} className={s.names}><h3>Mis padrinos</h3><p>{data.family?.godparents?.woman}<span>&</span>{data.family?.godparents?.man}</p></AnimatedDiv>
      <Heart size={21} strokeWidth={1} className={s.centerIcon} aria-hidden="true" />
    </motion.section>
    <motion.section {...reveal} className={`${s.section} ${s.venues} ${s.floralSection}`}>
      <FloralCorners reverse />
      <p className={s.eyebrow}>Los lugares de nuestra historia</p>
      <h2>Nos vemos<br /><em>para celebrar</em></h2>
      <AnimatedDiv {...revealLeft} className={s.venue}>
        <Church size={32} strokeWidth={1} aria-hidden="true" /><p className={s.eyebrow}>Ceremonia religiosa</p>
        <h3>{data.location.church}</h3><p className={s.hour}>12:00 p. m.</p>
        <a href={data.location.churchMapUrl} target="_blank" rel="noopener noreferrer" className={s.outline}><MapPin size={15} /> Ver parroquia en el mapa</a>
      </AnimatedDiv>
      <AnimatedDiv {...revealRight} className={s.venue}>
        <Utensils size={30} strokeWidth={1} aria-hidden="true" /><p className={s.eyebrow}>Recepción y comida</p>
        <h3>{data.location.reception}</h3><p className={s.hour}>2:00 p. m.</p>
        <p className={s.fine}>Comida de 2:00 a 4:00 p. m.<br />Protocolo de XV años a las 5:00 p. m.</p>
        <a href={data.location.receptionMapUrl} target="_blank" rel="noopener noreferrer" className={s.outline}><MapPin size={15} /> Cómo llegar al salón</a>
      </AnimatedDiv>
      <AnimatedDiv {...popIn} className={s.mapFrame}>
        <div className={s.mapCrown} aria-hidden="true"><span /><MapPin size={18} strokeWidth={1.2} /><span /></div>
        <iframe className={s.map} src={data.location.mapUrl} title="Ubicación del Salón Frida" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </AnimatedDiv>
    </motion.section>
    <motion.section {...reveal} className={`${s.section} ${s.itinerary} ${s.floralSection}`}>
      <FloralCorners />
      <p className={s.eyebrow}>Cada instante, un recuerdo</p><h2>Así viviremos<br /><em>este gran día</em></h2>
      <div className={s.timeline}>{data.event.itinerary?.map((item, i) => {
        const Icon = [Church, Utensils, Sparkles][i] || Heart;
        const direction = i % 2 === 0 ? revealLeft : revealRight;
        return <AnimatedDiv {...direction} transition={{ ...direction.transition, delay: reduced ? 0 : i * .12 }} key={item.title} className={s.moment}><div className={s.timelineIcon}><Icon size={21} strokeWidth={1.2} aria-hidden="true" /></div><div><p className={s.eyebrow}>{item.hour}</p><h3>{item.title}</h3><p>{item.description}</p></div></AnimatedDiv>;
      })}</div>
    </motion.section>
    <motion.section {...reveal} className={`${s.section} ${s.details} ${s.referenceSection}`}>
      <ReferenceFrame src="/pictures/xv/deny/marco-rosas-dorado.png" />
      <p className={s.eyebrow}>Código de vestimenta</p><h2>Una ocasión<br /><em>para lucir especial</em></h2>
      <AnimatedDiv {...popIn} className={s.formalBadge}>
        <p className={s.formalLabel}>Vestimenta</p>
        <strong>{data.event.dressCode}</strong>
        <span className={s.formalRule} aria-hidden="true" />
      </AnimatedDiv>
      <AnimatedDiv {...popIn} className={s.dressNote}><span aria-hidden="true" /><p>{data.event.dressCodeNote}</p></AnimatedDiv>
    </motion.section>
    <motion.section {...reveal} className={`${s.section} ${s.gifts} ${s.referenceSection}`}>
      <ReferenceFrame src="/pictures/xv/deny/marco-floral-lateral.png" />
      <Gift size={30} strokeWidth={1} className={s.centerIcon} aria-hidden="true" /><p className={s.eyebrow}>Detalles con cariño</p><h2>El mejor regalo<br /><em>es tu compañía</em></h2><p>{data.event.giftMessage}</p>
      <div className={s.giftOptions}><AnimatedDiv {...popIn}><Gift size={24} strokeWidth={1} /><span>Obsequio</span></AnimatedDiv><AnimatedDiv {...popIn} transition={{ ...popIn.transition, delay: reduced ? 0 : .14 }}><Mail size={24} strokeWidth={1} /><span>Lluvia de sobres</span></AnimatedDiv></div>
    </motion.section>
    <motion.section {...reveal} className={`${s.section} ${s.thanks}`}>
      <Bouquet variety="magnolias" /><p className={s.eyebrow}>Gracias por ser parte de mi historia</p><h2>Hay personas que<br /><em>hacen florecer la vida</em></h2><p>Gracias por acompañarme, por cada consejo, por cada abrazo y por el cariño que me ha ayudado a crecer. Llevo en el corazón todo lo que hemos compartido y me emociona crear un recuerdo más a tu lado.</p><div className={`${s.signature} ${nameScript.className}`}>Con amor, Deny</div>
    </motion.section>
    <FloralDivider variety="magnolias" />
    <motion.section {...reveal} className={`${s.section} ${s.rsvp} ${s.floralSection}`}>
      <FloralCorners reverse />
      <MessageCircle size={29} strokeWidth={1} className={s.centerIcon} aria-hidden="true" /><p className={s.eyebrow}>Tu lugar está en mi celebración</p><h2>¿Me acompañas?</h2><p>Me hará muy feliz contar contigo.<br />Confirma tu asistencia para compartir este día tan especial.</p><button className={s.button} onClick={() => dialog.current?.showModal()}>Confirmar asistencia</button>
    </motion.section>
    <motion.footer {...reveal} className={s.footer}><Bouquet className={s.footerBouquet} variety="magnolias" /><p>Una fecha para guardar.<br />Una historia para compartir.</p><strong className={nameScript.className}>Deny</strong><span>13 · FEBRERO · 2027</span></motion.footer>
    <dialog ref={dialog} className={s.dialog} aria-labelledby="deny-confirm-title" onClick={e => { if(e.target === e.currentTarget) dialog.current?.close(); }}><div className={s.dialogInner}><button className={s.close} aria-label="Cerrar confirmación" onClick={() => dialog.current?.close()}><X size={22} /></button><Heart size={29} strokeWidth={1} className={s.centerIcon} /><h2 id="deny-confirm-title">¡Te espero!</h2><p>Envía tu confirmación por WhatsApp y acompáñame a celebrar mis quince años.</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className={s.button} onClick={() => dialog.current?.close()}>Confirmar por WhatsApp</a></div></dialog>
  </main>
  </>;
}
