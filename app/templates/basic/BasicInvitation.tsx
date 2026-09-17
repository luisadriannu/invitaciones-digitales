"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CakeSlice, Church, GraduationCap, Wheat, MapPin, CalendarDays, Clock, ArrowDown, MessageCircle, X } from "lucide-react";
import Gallery from "@/app/components/Gallery";
import CountDown from "@/app/components/CountDown";
import MusicButton from "@/app/components/MusicButton";
import type { EventData } from "@/app/types/EventData";
import styles from "./BasicInvitation.module.css";

const themes = {
  cumple: { label: "Mi cumpleaños", intro: "Un día para celebrar", closing: "¡La fiesta es mejor contigo!", Icon: CakeSlice },
  bautizo: { label: "Mi bautizo", intro: "Un regalo del cielo", closing: "Gracias por ser parte de esta bendición", Icon: Church },
  graduacion: { label: "Mi graduación", intro: "El comienzo de algo grande", closing: "¡Celebremos todo lo que viene!", Icon: GraduationCap },
  primeracomunion: { label: "Mi primera comunión", intro: "Un encuentro lleno de amor", closing: "Te espero con mucha ilusión", Icon: Wheat },
};

export default function BasicInvitation({ data }: { data: EventData }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reducedMotion = useReducedMotion();
  const theme = themes[data.tipo as keyof typeof themes];
  const { Icon } = theme;
  const confirmation = data.contact.confirmationLink || (data.contact.phone
    ? `https://wa.me/${data.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`¡Hola! Confirmo mi asistencia al evento de ${data.event.name}.`)}`
    : undefined);
  const reveal = {
    initial: { opacity: 1, y: reducedMotion ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.65 },
  };
  // La cuenta regresiva comienza en la ceremonia cuando la hay.
  const countdownData = { ...data, event: { ...data.event, partyHour: data.event.ceremonyHour || data.event.partyHour } };

  return (
    <main className={`${styles.page} ${styles[data.tipo]}`} style={{
      "--ink": data.design?.colors?.primary || "#826534",
      "--paper": data.design?.colors?.background || "#faf5e9",
    } as CSSProperties}>
      {data.media.music && <MusicButton src={data.media.music} color={data.design?.colors?.primary} backgroundColor={data.design?.colors?.background} />}
      <header className={styles.hero}>
        <div className={styles.cover}>
          <Image src={data.media.coverImage} alt={`Retrato de ${data.event.name}`} fill preload sizes="(max-width: 760px) 100vw, 760px" className={styles.coverImage} />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{theme.intro}</p>
          <div className={styles.emblem}><Icon size={32} strokeWidth={1.3} aria-hidden="true" /></div>
          <p className={styles.label}>{theme.label}</p>
          <h1>{data.event.name}</h1>
          {data.event.age !== undefined && <p className={styles.age}>¡Cumplo {data.event.age} {data.event.age === 1 ? "año" : "años"}!</p>}
          <p className={styles.heroDate}>{data.event.date}</p>
          <a href="#bienvenida" className={styles.scroll}>Desliza para descubrir <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </header>

      <motion.section {...reveal} id="bienvenida" className={`${styles.section} ${styles.welcome}`}>
        <span className={styles.flourish} aria-hidden="true">✦</span>
        <p className={styles.eyebrow}>Estás invitado</p>
        <h2>Los momentos más bonitos<br /><em>se comparten</em></h2>
        <p className={styles.phrase}>{data.event.phrase}</p>
      </motion.section>

      <motion.section {...reveal} className={`${styles.section} ${styles.countdown}`}>
        <p className={styles.eyebrow}>Cada vez falta menos</p>
        <h2>Nos vemos en…</h2>
        <CountDown data={countdownData} />
        <p className={styles.smallNote}>Guarda la fecha y acompáñame</p>
      </motion.section>

      {data.family && <motion.section {...reveal} className={`${styles.section} ${styles.family}`}>
        <Icon size={30} strokeWidth={1.2} aria-hidden="true" />
        <p className={styles.eyebrow}>Con amor y gratitud</p>
        <h2>Mi familia</h2>
        {data.family.parents && <div className={styles.familyGroup}>
          <h3>Con la bendición de mis padres</h3>
          <p>{data.family.parents.mother}<span>&</span>{data.family.parents.father}</p>
        </div>}
        {data.family.godparents && <div className={styles.familyGroup}>
          <h3>Con el cariño de mis padrinos</h3>
          <p>{data.family.godparents.woman}<span>&</span>{data.family.godparents.man}</p>
        </div>}
      </motion.section>}

      <motion.section {...reveal} className={`${styles.section} ${styles.details}`}>
        <p className={styles.eyebrow}>Todo listo para nuestro encuentro</p>
        <h2>¿Cuándo y dónde?</h2>
        <div className={styles.date}><CalendarDays size={21} aria-hidden="true" /><p>{data.event.date}</p></div>
        {data.location.event && <p className={styles.school}>{data.location.event}</p>}
        <div className={styles.venues}>
          {data.location.church && <div className={styles.venue}>
            <Church size={30} strokeWidth={1.3} aria-hidden="true" />
            <h3>Ceremonia religiosa</h3><p>{data.location.church}</p>
            <p className={styles.hour}><Clock size={15} aria-hidden="true" />{data.event.ceremonyHour}</p>
          </div>}
          {(data.location.reception || data.location.place) && <div className={styles.venue}>
            <MapPin size={30} strokeWidth={1.3} aria-hidden="true" />
            <h3>{data.location.church ? "Recepción" : "La celebración"}</h3>
            <p>{data.location.reception || data.location.place}</p>
            <p className={styles.hour}><Clock size={15} aria-hidden="true" />{data.event.partyHour}</p>
          </div>}
        </div>
        {data.location.mapUrl && <a className={styles.outlineButton} href={data.location.mapUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" />{data.location.church ? "Ver ubicación de la recepción" : "Ver ubicación"}</a>}
        {data.event.dressCode && <div className={styles.dressCode}><p className={styles.eyebrow}>Código de vestimenta</p><p>{data.event.dressCode}</p><span>{data.event.dressCodeNote || "Tu mejor sonrisa será el complemento perfecto."}</span></div>}
      </motion.section>

      {data.media.gallery.length > 0 && <motion.section {...reveal} className={`${styles.section} ${styles.gallery}`}>
        <p className={styles.eyebrow}>Recuerdos que guardo en el corazón</p>
        <h2>Momentos especiales</h2>
        <Gallery images={data.media.gallery} />
        <p className={styles.smallNote}>Desliza para ver más recuerdos</p>
      </motion.section>}

      <motion.section {...reveal} className={`${styles.section} ${styles.rsvp}`}>
        <MessageCircle size={30} strokeWidth={1.2} aria-hidden="true" />
        <p className={styles.eyebrow}>¿Me acompañas?</p>
        <h2>Tu lugar está aquí</h2>
        <p className={styles.phrase}>Me encantará contar contigo. Confirma tu asistencia para preparar juntos un día inolvidable.</p>
        <button className={styles.button} onClick={() => dialog.current?.showModal()}>Confirmar asistencia</button>
      </motion.section>
      <footer className={styles.footer}><span aria-hidden="true">✦</span><p>{theme.closing}</p><strong>{data.event.name}</strong></footer>

      <dialog ref={dialog} className={styles.dialog} aria-labelledby="confirmation-title" onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.dialogContent}>
          <button className={styles.close} aria-label="Cerrar confirmación" onClick={() => dialog.current?.close()}><X size={22} /></button>
          <MessageCircle size={32} strokeWidth={1.3} aria-hidden="true" />
          <h2 id="confirmation-title">Confirmar asistencia</h2>
          {confirmation ? <><p>Envía tu confirmación por WhatsApp. ¡Gracias por compartir este día conmigo!</p><a className={styles.button} href={confirmation} target="_blank" rel="noopener noreferrer" onClick={() => dialog.current?.close()}>Enviar confirmación</a></>
            : <><p>Esta es una invitación de muestra. En tu invitación, este botón enviará la confirmación al WhatsApp que elijas.</p><button className={styles.button} onClick={() => dialog.current?.close()}>Entendido</button></>}
        </div>
      </dialog>
    </main>
  );
}
