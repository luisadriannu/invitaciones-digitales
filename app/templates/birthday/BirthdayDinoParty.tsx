"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, CalendarDays, Clock3, ScanLine, Leaf, MapPin, ShieldCheck, MessageCircle } from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import styles from "./BirthdayDinoParty.module.css";

const species = [
  { name: "T. REX", code: "TR-01", message: "Depredador del Cretácico" },
  { name: "TRICERATOPS", code: "TC-02", message: "Herbívoro de tres cuernos" },
  { name: "BRACHIOSAURUS", code: "BR-03", message: "Gigante del Jurásico" },
];

function Countdown({ startsAt }: { startsAt: string }) {
  const [remaining, setRemaining] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setRemaining(Math.max(0, new Date(startsAt).getTime() - Date.now()));
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [startsAt]);
  if (remaining === 0) return <p className={styles.started}>¡Llegó el día de nuestra dino fiesta!</p>;
  const values = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400000), Math.floor(remaining / 3600000) % 24, Math.floor(remaining / 60000) % 60, Math.floor(remaining / 1000) % 60];
  return <div className={styles.countdown} aria-label="Tiempo restante para la fiesta">{["Días", "Horas", "Minutos", "Segundos"].map((label, index) => <div key={label}><strong>{values[index] === null ? "—" : String(values[index]).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>;
}

export default function BirthdayDinoParty({ data }: { data: EventData }) {
  const page = useRef<HTMLElement>(null);
  const [found, setFound] = useState<number[]>([]);
  useEffect(() => {
    if (!page.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(styles.visible);
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    page.current.querySelectorAll(`.${styles.reveal}`).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const phone = data.contact.phone.replace(/\D/g, "");
  const confirmation = data.contact.confirmationLink || (phone ? `https://wa.me/${phone}?text=${encodeURIComponent(`¡Hola! Queremos acompañar a ${data.event.name} en su dino fiesta.`)}` : undefined);

  return (
    <main ref={page} className={styles.page}>
      <header className={styles.header}><ShieldCheck size={18} /><span>RESERVA JURÁSICA · ACCESO ESPECIAL</span><span>05</span></header>
      <section className={styles.hero}>
        <p className={styles.kicker}>HAS SIDO SELECCIONADO PARA LA EXPEDICIÓN</p>
        <h1>{data.event.name}</h1>
        <div className={styles.birthdayLine}><span>¡cumple</span><strong>{data.event.age}</strong><span>años!</span></div>
        <p className={styles.heroCopy}>El parque abre sus puertas.<br /><em>La aventura lleva tu nombre.</em></p>
        <div className={styles.art}><Image src={data.media.coverImage} alt="Tiranosaurio realista entre la niebla y la vegetación de una reserva jurásica con un portón iluminado" width={1122} height={1402} preload sizes="(max-width: 640px) 100vw, 640px" /></div>
        <div className={styles.heroCaption}><span>SECTOR 05 / ZONA DE EXPLORACIÓN</span><span>ACCESO AUTORIZADO</span></div>
        <a className={styles.primary} href="#la-fiesta">Ver mi pase de acceso <ArrowDown size={17} /></a>
      </section>

      <section id="la-fiesta" className={`${styles.intro} ${styles.reveal}`}>
        <p className={styles.kicker}>CUENTA REGRESIVA PARA LA APERTURA</p><h2>Bienvenido<br /><em>a lo extraordinario.</em></h2>
        <p className={styles.copy}>{data.event.phrase}</p>
        <div className={styles.dateStrip}><CalendarDays size={19} /><span>{data.event.date}</span><span className={styles.dot}>•</span><span>{data.event.partyHour}</span></div>
        {data.event.startsAt && <><p className={styles.countLabel}>LA AVENTURA COMIENZA EN</p><Countdown startsAt={data.event.startsAt} /></>}
      </section>

      <section className={`${styles.locationSection} ${styles.reveal}`}>
        <div className={styles.locationCard}><div className={styles.cardHeading}><span>BASE DE OPERACIONES</span><MapPin size={23} /></div><h2>Las puertas<br />de la reserva.</h2><p className={styles.venue}>{data.location.reception}</p><p className={styles.address}>{data.location.place}</p><div className={styles.time}><Clock3 size={17} /> Te esperamos a las {data.event.partyHour}</div>{data.location.mapUrl && <a className={styles.primary} href={data.location.mapUrl} target="_blank" rel="noopener noreferrer">Ver ubicación <ArrowUpRight size={17} /></a>}<span className={styles.cardStamp}>PASE DE ACCESO<br />INVITADO ESPECIAL</span></div>
      </section>

      <section className={`${styles.section} ${styles.reveal}`}>
        <p className={styles.kicker}>BITÁCORA DE LA EXPEDICIÓN</p><h2>Tu ruta<br />por el parque.</h2>
        <ol className={styles.itinerary}>{data.event.itinerary?.map((item, index) => <li key={item.hour}><span className={styles.number}>{String(index + 1).padStart(2, "0")}</span><div><time>{item.hour}</time><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol>
      </section>

      <section className={`${styles.game} ${styles.reveal}`}>
        <p className={styles.kicker}>ARCHIVO DE ESPECIES / TERMINAL DE CAMPO</p><h2>Identifica las señales.</h2><p>Activa cada escáner para revelar una especie de la reserva.</p>
        <div className={styles.scanners}>{species.map((dino, index) => <button key={dino.code} type="button" className={styles.scanner} aria-label={found.includes(index) ? `${dino.name}: ${dino.message}` : `Identificar especie ${index + 1}`} aria-pressed={found.includes(index)} onClick={() => setFound((previous) => previous.includes(index) ? previous : [...previous, index])}><ScanLine size={25} strokeWidth={1.25} /><span className={styles.scanResult}><small>{dino.code} / {found.includes(index) ? "IDENTIFICADO" : "SEÑAL DETECTADA"}</small><strong>{found.includes(index) ? dino.name : "ACTIVAR ESCÁNER"}</strong>{found.includes(index) && <span>{dino.message}</span>}</span><ArrowUpRight size={17} /></button>)}</div>
        <p className={styles.gameStatus} aria-live="polite">{found.length === 3 ? "Registro completo. Expedición autorizada." : `${found.length} / 3 especies identificadas`}</p>
      </section>

      <section className={`${styles.dress} ${styles.reveal}`}><Leaf size={32} /><div><p className={styles.kicker}>LISTOS PARA LA AVENTURA</p><h2>Equipo de exploración</h2><p>{data.event.dressCode}</p><div className={styles.swatches} aria-label="Verde militar, arena y negro"><span /><span /><span /></div></div></section>

      <section className={`${styles.rsvp} ${styles.reveal}`}><ShieldCheck size={32} /><p className={styles.kicker}>EL MEJOR REGALO ES QUE VENGAS</p><h2>Tu lugar en<br />la expedición.</h2><p className={styles.copy}>Confirma tu acceso y prepárate para<br />un cumpleaños fuera de lo común.</p>{confirmation ? <a href={confirmation} target="_blank" rel="noopener noreferrer" className={styles.primary}>Confirmar asistencia <MessageCircle size={18} /></a> : <p className={styles.demo}>Invitación de muestra con datos ficticios.<br />Agrega el teléfono de la familia para activar la confirmación.</p>}{data.family?.parents && <p className={styles.parents}>Con cariño, {data.family.parents.mother} y {data.family.parents.father}</p>}</section>
      <footer className={styles.footer}><span>{data.event.name} · {data.event.age} años</span><span>UNA AVENTURA PARA RECORDAR</span></footer>
    </main>
  );
}
