"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
  Star,
  ArrowDown,
  Mic2,
  Heart,
  MessageCircle,
} from "lucide-react";
import type { EventData } from "@/app/types/EventData";
import CountDown from "@/app/components/CountDown";
import styles from "./BirthdayPop.module.css";

export default function BirthdayPop({ data }: { data: EventData }) {
  const pageRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    page
      .querySelectorAll(
        `.${styles.section}, .${styles.dress}, .${styles.timeline} li`,
      )
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const phone = data.contact.phone.replace(/\D/g, "");
  const confirmation =
    data.contact.confirmationLink ||
    (phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(`¡Hola! Quiero confirmar mi asistencia al cumpleaños de ${data.event.name}.`)}`
      : undefined);

  return (
    <main ref={pageRef} className={styles.page} data-paused={paused}>
      <section className={styles.hero}>
        <div className={styles.stardust} aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <span
              key={index}
              style={{
                left: `${(index * 29 + 7) % 100}%`,
                top: `${(index * 17 + 9) % 90}%`,
                animationDelay: `${-index * 0.65}s`,
                animationDuration: `${4 + (index % 4)}s`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
        <div className={styles.topline}>
          <span>UNA MISIÓN MUY ESPECIAL</span>
          <Sparkles size={18} />
        </div>

        <div className={styles.heroTitle}>
          <p className={styles.eyebrow}>ESTÁS INVITADO A MI CUMPLE</p>
          <h1>
            {data.event.name}
            <span>¡cumple {data.event.age}!</span>
          </h1>
        </div>
        <div className={styles.art}>
          <Image
            src={data.media.coverImage}
            alt="Tres guerreras pop con trajes negros, blancos y dorados frente a una bola disco y luces de neón"
            fill
            preload
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>
        <div className={styles.heroBottom}>
          <span className={styles.badge}>
            <Star size={13} fill="currentColor" /> EDICIÓN CUMPLEAÑOS
          </span>
          <h2>
            GUERRERAS
            <br />
            <span>POP</span>
          </h2>
          <p>Música. Magia. ¡Y mucho poder de amistad!</p>
          <a href="#tu-pase" className={styles.primary}>
            Descubre tu misión <ArrowDown size={17} />
          </a>
        </div>
      </section>

      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {[0, 1].map((copy) => (
            <span key={copy}>
              ★ BRILLA A TU MANERA ★ EL PODER DE LA AMISTAD&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section id="tu-pase" className={styles.section}>
        <p className={styles.eyebrow}>EL ESCENARIO ESTÁ CASI LISTO</p>
        <h2>Solo faltas tú.</h2>
        <p className={styles.copy}>{data.event.phrase}</p>
        <div className={styles.countdown}>
          <CountDown data={data} />
        </div>
        <p className={styles.small}>Para nuestra gran aventura</p>
      </section>

      <section className={`${styles.section} ${styles.ticketSection}`}>
        <div className={styles.ticket}>
          <div className={styles.ticketTop}>
            <span>GUERRERAS POP · LIVE</span>
            <Star size={20} />
          </div>
          <p className={styles.eyebrow}>ACCESO A UN DÍA INOLVIDABLE</p>
          <h2>Tu pase de estrella</h2>
          <div className={styles.details}>
            <div>
              <CalendarDays />
              <p>
                <span>FECHA</span>
                {data.event.date}
              </p>
            </div>
            <div>
              <Clock3 />
              <p>
                <span>ABRIMOS EL ESCENARIO</span>
                {data.event.partyHour}
              </p>
            </div>
            <div>
              <MapPin />
              <p>
                <span>LUGAR DE LA MISIÓN</span>
                {data.location.reception}
                <small>{data.location.place}</small>
              </p>
            </div>
          </div>
          {data.location.mapUrl && (
            <a
              className={styles.darkButton}
              href={data.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Cómo llegar <MapPin size={16} />
            </a>
          )}
          <div className={styles.ticketStub}>
            <span>
              CUMPLE {data.event.age} · {data.event.name.toUpperCase()}
            </span>
            <span>★ VIP ★</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Mic2 className={styles.sectionIcon} size={32} />
        <p className={styles.eyebrow}>EL PROGRAMA DEL SHOW</p>
        <h2>
          Una fiesta.
          <br />
          <em>Mil momentos épicos.</em>
        </h2>
        <ol className={styles.timeline}>
          {data.event.itinerary?.map((item, index) => (
            <li key={item.hour}>
              <span className={styles.step}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <time>{item.hour}</time>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.dress}>
        <Sparkles size={30} />
        <p className={styles.eyebrow}>DRESS CODE</p>
        <h2>
          Activa tu look
          <br />
          de superestrella.
        </h2>
        <div className={styles.swatches} aria-label="Lila, rosa y plateado">
          <span />
          <span />
          <span />
        </div>
        <p>{data.event.dressCode}</p>
        <small>Lo más importante: venir con ganas de divertirte.</small>
      </section>

      <section className={styles.section}>
        <Heart size={30} className={styles.sectionIcon} />
        <p className={styles.eyebrow}>TE GUARDAMOS UN LUGAR</p>
        <h2>¿Te unes al equipo?</h2>
        <p className={styles.copy}>
          Cada estrella hace esta fiesta más especial.
          <br />
          ¡Me encantará celebrar contigo!
        </p>
        {confirmation ? (
          <a
            href={confirmation}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primary}
          >
            <MessageCircle size={18} /> Confirmar asistencia
          </a>
        ) : (
          <p className={styles.demo}>
            Invitación de muestra · Datos ficticios.
            <br />
            La confirmación estará disponible al agregar el contacto de la
            familia.
          </p>
        )}
        {data.family?.parents && (
          <p className={styles.parents}>
            Con cariño, {data.family.parents.mother} y{" "}
            {data.family.parents.father}
          </p>
        )}
      </section>
      <footer className={styles.footer}>
        <Star size={20} />
        <strong>
          {data.event.name} · {data.event.age} años
        </strong>
        <span>NACIMOS PARA BRILLAR JUNTAS</span>
      </footer>
    </main>
  );
}
