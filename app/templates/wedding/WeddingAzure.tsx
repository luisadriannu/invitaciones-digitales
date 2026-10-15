"use client";

import { useState } from "react";
import Image from "next/image";
import Gallery from "@/app/components/Gallery";
import { ArrowDown, ArrowUpRight, Wine, HeartHandshake, Sparkles, Utensils, Mail, MapPin, Heart } from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import CountDown from "@/app/components/CountDown";
import styles from "./WeddingAzure.module.css";

function BotanicalSprig({ className }: { className: string }) {
  return <svg className={className} viewBox="0 0 150 240" fill="none" aria-hidden="true" focusable="false">
    <path d="M30 230C90 164 42 99 120 12M56 185L20 139M65 144L112 106M75 98L47 58" stroke="currentColor" strokeWidth="1.2" />
    <g fill="currentColor" fillOpacity=".16" stroke="currentColor" strokeWidth=".8">
      <path d="M54 190C10 183 7 159 20 139C43 147 54 167 54 190Z" />
      <path d="M64 150C70 117 91 102 112 106C110 133 89 149 64 150Z" />
      <path d="M75 105C43 97 35 76 47 58C67 66 78 83 75 105Z" />
      <path d="M87 70C91 43 111 30 132 34C128 57 110 70 87 70Z" />
      <path d="M112 25C105 6 119 0 133 2C132 15 123 24 112 25Z" />
    </g>
  </svg>;
}

const icons = [Wine, HeartHandshake, Sparkles, Utensils];

export default function WeddingAzure({ data }: { data: EventData }) {
  const [notice, setNotice] = useState(false);
  const names = data.event.name.split(" y ");
  const phone = data.contact.phone.replace(/\D/g, "");
  const placeholder = !phone || /^52?0+$/.test(phone);
  const message = encodeURIComponent(`Hola, me gustaría confirmar mi asistencia a la boda de ${data.event.name}, el ${data.event.date}.`);
  return <main className={styles.page}>
    <div className={styles.particles} aria-hidden="true">
      {Array.from({ length: 16 }, (_, index) => <span key={index} className={styles.particle} style={{
        left: `${(index * 37 + 7) % 100}%`,
        width: index % 3 === 0 ? 6 : 3,
        height: index % 3 === 0 ? 9 : 3,
        animationDuration: `${22 + index % 7 * 3}s`,
        animationDelay: `-${index * 3.7}s`,
      }} />)}
    </div>
    <section className={styles.hero}><BotanicalSprig className={styles.botanicalLeft} /><BotanicalSprig className={styles.botanicalRight} />
      <header className={styles.topline}><span>M & A</span><span>NUESTRA BODA · 2026</span></header>
      <div className={styles.heroFrame}>
        <span className={styles.eyebrow}>JUNTOS, PARA SIEMPRE</span>
        <div className={styles.coverPhoto}><Image src={data.media.coverImage} alt="Fotografía de portada de la invitación" fill sizes="(max-width: 700px) 70vw, 340px" preload className={styles.photo} /></div>
        <h1>{names[0]}<em>&</em>{names[1]}</h1>
        <p className={styles.heroText}>Hay historias que se escriben con el corazón.<br />La nuestra comienza un nuevo capítulo.</p>
        <div className={styles.date}><span>NOVIEMBRE</span><strong>28</strong><span>2026</span></div>
        <p className={styles.place}>{data.location.reception}</p>
      </div>
      <a href="#celebracion" className={styles.discover}>DESCUBRE NUESTRO DÍA <ArrowDown size={16} /></a>
      <span className={styles.cornerFlower} aria-hidden="true">✳</span>
    </section>

    <section id="celebracion" className={styles.intro}>
      <p className={styles.eyebrow}>CON TODO NUESTRO AMOR</p>
      <h2>El mejor lugar es<br /><em>a tu lado.</em></h2>
      <p>Queremos compartir la alegría de nuestra unión con las personas que forman parte de nuestra historia. Será un honor celebrar contigo.</p>
      <div className={styles.divider}>✧</div>
      <p className={styles.eyebrow}>CADA VEZ MÁS CERCA DEL SÍ</p>
      <CountDown data={data} />
      <small>28 de noviembre de 2026 · Desde las 6:00 p. m.</small>
    </section>

    {data.media.gallery[0] && <figure className={styles.storyPhoto}>
      <Image src={data.media.gallery[0]} alt="Un recuerdo especial en pareja" fill sizes="(max-width: 700px) 100vw, 700px" className={styles.photo} />
      <figcaption>Una vida entera <em>a tu lado.</em></figcaption>
    </figure>}

    <section className={styles.family}><BotanicalSprig className={styles.botanicalRight} />
      <p className={styles.eyebrow}>NUESTRAS RAÍCES</p>
      <h2>Con el amor<br />de <em>nuestros padres</em></h2>
      <div className={styles.parents}>
        <article><span>PADRES DEL NOVIO</span><p>{data.family?.groomParents?.father}</p><i>&</i><p>{data.family?.groomParents?.mother}</p></article>
        <div className={styles.familyHeart}><Heart size={20} strokeWidth={1} /></div>
        <article><span>PADRES DE LA NOVIA</span><p>{data.family?.brideParents?.father}</p><i>&</i><p>{data.family?.brideParents?.mother}</p><small>Siempre presente en nuestros corazones.</small></article>
      </div>
    </section>

    <section className={styles.program}>
      <p className={styles.eyebrow}>SÁBADO · 28 DE NOVIEMBRE</p>
      <h2>Un día para<br /><em>recordar siempre.</em></h2>
      <p className={styles.programNote}>Nos gustaría contar con tu presencia en la ceremonia civil a las 7:30 p. m.</p>
      <ol>{data.event.itinerary?.map((item, index) => { const Icon = icons[index] ?? Heart; return <li key={item.title}><span className={styles.stepIcon}><Icon size={23} strokeWidth={1.2} /></span><div><time>{item.hour}</time><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div><span className={styles.stepNumber}>0{index + 1}</span></li>; })}</ol>
    </section>

    <section className={styles.venue}>
      <p className={styles.eyebrow}>AQUÍ CELEBRAREMOS</p>
      <MapPin size={30} strokeWidth={1} className={styles.pin} />
      <h2>{data.location.reception}</h2><p>Un lugar, nuestras personas favoritas<br />y un recuerdo para toda la vida.</p>
      {data.location.mapUrl && <iframe src={data.location.mapUrl} title="Ubicación de Salón El Mezquite" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
      <a className={styles.outlineButton} href="https://www.google.com/maps/search/?api=1&query=18.3544797%2C-100.6605371" target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={17} /></a>
    </section>

    {data.media.gallery.length > 0 && <section className={styles.gallery} aria-labelledby="azure-gallery-title">
      <p className={styles.eyebrow}>NUESTRA HISTORIA EN IMÁGENES</p>
      <h2 id="azure-gallery-title">Instantes que se vuelven<br /><em>eternos.</em></h2>
      <div className={styles.galleryFrame}><Gallery images={data.media.gallery} /></div>
      <p className={styles.galleryHint}>Desliza para ver más recuerdos</p>
    </section>}

    <section className={styles.gifts}><BotanicalSprig className={styles.botanicalLeft} />
      <div className={styles.envelope} aria-hidden="true"><Mail size={52} strokeWidth={.8} /><Heart size={17} /></div>
      <p className={styles.eyebrow}>MESA DE REGALOS</p>
      <h2>Tu presencia,<br /><em>nuestro mejor regalo.</em></h2>
      <p>Contar con ustedes en nuestra boda es el mejor regalo. Pero si desean pueden hacernos un obsequio en efectivo.</p>
      <div className={styles.giftNote}><span>¡Lluvia de sobres!</span><p>Habrá un buzón en recepción.</p></div>
    </section>

    <section className={styles.rsvp}><BotanicalSprig className={styles.botanicalRight} />
      <p className={styles.eyebrow}>GUARDAMOS UN LUGAR PARA TI</p>
      <h2>¿Nos acompañas?</h2><p>Nos encantará compartir este día contigo.<br />Confirma tu asistencia para celebrar juntos.</p>
      {placeholder ? <><button className={styles.button} onClick={() => setNotice(true)}>Confirmar asistencia <ArrowUpRight size={17} /></button>{notice && <p role="status" className={styles.notice}>El contacto para confirmar estará disponible próximamente.</p>}</> : <a className={styles.button} href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noopener noreferrer">Confirmar asistencia <ArrowUpRight size={17} /></a>}
      <div className={styles.signature}>Miguel <span>&</span> Aracely</div><small>28 · 11 · 2026</small>
    </section>
    <footer className={styles.footer}>HECHO CON AMOR · PARA UN AMOR QUE PERDURA</footer>
  </main>;
}


