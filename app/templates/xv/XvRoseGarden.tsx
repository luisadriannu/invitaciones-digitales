"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Gallery from "@/app/components/Gallery";
import {
  ArrowDown,
  ArrowUpRight,
  Flower2,
  Heart,
  Church,
  Wine,
  Sparkles,
} from "lucide-react";
import MusicButton from "@/app/components/MusicButton";
import { useCountdown } from "@/app/hooks/useCountdown";
import type { EventData } from "@/app/types/EventData";
import styles from "./XvRoseGarden.module.css";

export default function XvRoseGarden({ data }: { data: EventData }) {
  const reducedMotion = useReducedMotion();
  const reveal = {
    initial: { opacity: 1, y: 0 },
    whileInView: reducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: [0.35, 1], y: [22, 0] },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reducedMotion ? 0 : 0.8 },
  };
  const time = useCountdown(new Date(data.event.startsAt!));
  const message = encodeURIComponent(
    `¡Hola! Me encantará acompañar a ${data.event.name} en sus XV años. Quiero confirmar mi asistencia.`,
  );
  const confirmation =
    data.contact.confirmationLink ??
    `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${message}`;

  return (
    <main className={styles.invitation}>
      <div className={styles.petals} aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            key={index}
            className={styles.petal}
            style={{
              left: `${(index * 29) % 100}%`,
              width: `${9 + (index % 4) * 3}px`,
              height: `${14 + (index % 4) * 3}px`,
              animationDuration: `${13 + (index % 5) * 2}s`,
              animationDelay: `${-index * 2.7}s`,
            }}
          />
        ))}
      </div>
      {data.media.music && <MusicButton src={data.media.music} />}
      <header className={styles.hero}>
        <div className={styles.topline}>
          <span>Una nueva etapa florece</span>
          <Flower2 size={19} aria-hidden="true" />
        </div>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>Mis quince años</p>
          <h1>{data.event.name}</h1>
          <p className={styles.script}>Un sueño en rosa</p>
        </div>
        <div className={styles.portrait}>
          <Image
            src={data.media.coverImage}
            alt={`${data.event.name} en su vestido rosa de XV años`}
            fill
            priority
            sizes="(max-width: 600px) 86vw, 480px"
            className={styles.photo}
          />
          <span className={styles.seal} aria-label="Quince años">
            XV<small>años</small>
          </span>
        </div>
        <div className={styles.date}>
          <span>Reserva este día</span>
          <strong>{data.event.date}</strong>
        </div>
        <a href="#invitacion" className={styles.scroll}>
          La historia apenas comienza <ArrowDown size={15} />
        </a>
      </header>

      <motion.section {...reveal} id="invitacion" className={styles.letter}>
        <Flower2 size={35} strokeWidth={1} aria-hidden="true" />
        <p className={styles.eyebrow}>Con mucho cariño, para ti</p>
        <h2>
          Los momentos más bonitos
          <br />
          se viven <em>juntos.</em>
        </h2>
        <p className={styles.prose}>{data.event.phrase}</p>
        <span className={styles.signature}>{data.event.name}</span>
      </motion.section>

      <motion.section {...reveal} className={styles.countdown}>
        <p className={styles.eyebrow}>Cada vez más cerca</p>
        <h2>La ilusión ya se siente</h2>
        <div
          className={styles.numbers}
          aria-label="Cuenta regresiva para la recepción"
        >
          {(
            [
              ["days", "Días"],
              ["hours", "Horas"],
              ["minutes", "Minutos"],
              ["seconds", "Segundos"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <strong>{String(time[key]).padStart(2, "0")}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
        <p className={styles.small}>Hasta el día en que este sueño florezca.</p>
      </motion.section>

      <motion.section {...reveal} className={styles.section}>
        <p className={styles.eyebrow}>Mis raíces, mi hogar</p>
        <h2>
          El amor que me
          <br />
          ha visto <em>crecer</em>
        </h2>
        <div className={styles.family}>
          {data.family?.parents && (
            <div>
              <Heart size={21} strokeWidth={1} aria-hidden="true" />
              <h3>Mis padres</h3>
              <p>
                {data.family.parents.mother}
                <br />
                <span>&</span>
                <br />
                {data.family.parents.father}
              </p>
            </div>
          )}
          {data.family?.godparents && (
            <div>
              <Flower2 size={23} strokeWidth={1} aria-hidden="true" />
              <h3>Mis padrinos</h3>
              <p>
                {data.family.godparents.woman}
                <br />
                <span>&</span>
                <br />
                {data.family.godparents.man}
              </p>
            </div>
          )}
        </div>
      </motion.section>

      <motion.section {...reveal} className={styles.venues}>
        <p className={styles.eyebrow}>Nuestro punto de encuentro</p>
        <h2>
          Una fecha.
          <br />
          <em>Mil recuerdos.</em>
        </h2>
        <p className={styles.small}>{data.event.date}</p>
        <div className={styles.cards}>
          {[
            {
              name: data.location.church,
              hour: data.event.ceremonyHour,
              label: "La ceremonia",
              Icon: Church,
            },
            {
              name: data.location.reception,
              hour: data.event.partyHour,
              label: "La celebración",
              Icon: Wine,
              reception: true,
            },
          ].map(
            ({ name, hour, label, Icon, reception }) =>
              name && (
                <article key={label} className={styles.card}>
                  <Icon size={29} strokeWidth={1} aria-hidden="true" />
                  <p className={styles.eyebrow}>{label}</p>
                  <h3>{name}</h3>
                  <p>{hour}</p>
                  {reception &&
                  data.plan === "premium" &&
                  data.location.mapUrl ? (
                    <div className={styles.map}>
                      <iframe
                        src={data.location.mapUrl}
                        width="100%"
                        height="220"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa de ${data.location.reception}`}
                      />
                    </div>
                  ) : (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consultar ubicación <ArrowUpRight size={15} />
                    </a>
                  )}
                </article>
              ),
          )}
        </div>
      </motion.section>

      {data.event.itinerary && (
        <motion.section {...reveal} className={styles.section}>
          <p className={styles.eyebrow}>Así viviremos la magia</p>
          <h2>
            El día, <em>paso a paso</em>
          </h2>
          <ol className={styles.timeline}>
            {data.event.itinerary.map((item) => (
              <li key={item.title}>
                <time>{item.hour}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.section>
      )}

      <motion.section {...reveal} className={styles.dress}>
        <Sparkles size={28} strokeWidth={1} aria-hidden="true" />
        <p className={styles.eyebrow}>Código de vestimenta</p>
        <h2>{data.event.dressCode}</h2>
        <div className={styles.swatches} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <p className={styles.prose}>{data.event.dressCodeNote}</p>
      </motion.section>

      {data.media.gallery.length > 0 && (
        <motion.section {...reveal} className={styles.gallery}>
          <p className={styles.eyebrow}>Instantes que florecen</p>
          <h2>
            Un poquito de <em>mi historia</em>
          </h2>
          <div className={styles.galleryFrame}>
            <Gallery images={data.media.gallery} />
          </div>
          <p className={styles.small}>Desliza para descubrir mis fotos</p>
        </motion.section>
      )}

      <motion.section {...reveal} className={styles.rsvp}>
        <span className={styles.largeXV} aria-hidden="true">
          XV
        </span>
        <div className={styles.rsvpContent}>
          <p className={styles.eyebrow}>Hay un lugar para ti</p>
          <h2>
            Mi noche será más bonita
            <br />
            <em>si estás tú.</em>
          </h2>
          <p className={styles.prose}>
            Confirma tu asistencia y acompáñame a escribir el primer capítulo de
            esta nueva etapa.
          </p>
          <a
            className={styles.button}
            href={confirmation}
            target="_blank"
            rel="noopener noreferrer"
          >
            Confirmar asistencia <ArrowUpRight size={18} />
          </a>
          <p className={styles.small}>Con todo mi cariño</p>
          <span className={styles.signature}>{data.event.name}</span>
        </div>
      </motion.section>
      <footer className={styles.footer}>
        <Flower2 size={19} aria-hidden="true" />
        <span>
          {data.event.name} · Mis XV años · {data.event.date}
        </span>
      </footer>
    </main>
  );
}
