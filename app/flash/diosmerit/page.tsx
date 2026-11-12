import type { Metadata } from "next";
import { ArrowUpRight, MapPin } from "lucide-react";
import MobileOnly from "@/app/components/MobileOnly";
import MonarqueSignature from "@/app/components/MonarqueSignature";
import flash from "../bella-pineda/bella.module.css";
import styles from "./diosmerit.module.css";

export const metadata: Metadata = {
  title: "Diosmerit · Mis XV años",
  description:
    "Acompaña a Diosmerit Aileen Sánchez Palacios a celebrar sus XV años el 29 de diciembre de 2026 en San Juan de la Cruz, Guerrero.",
  robots: { index: false, follow: false },
};

export default function DiosmeritInvitation() {
  return <MobileOnly><InvitationCard /></MobileOnly>;
}

function InvitationCard() {
  return (
    <main className={`${flash.page} ${styles.page}`}>
      <article
        className={`${flash.card} ${styles.card}`}
        aria-labelledby="diosmerit-name"
      >
        <div className={styles.flowers} aria-hidden="true" />
        <div
          className={`${styles.flowers} ${styles.bottomFlowers}`}
          aria-hidden="true"
        />
        <div className={flash.content}>
          <header className={styles.reveal}>
            <p className={flash.eyebrow}>Mis quince años</p>
            <p className={flash.age} aria-hidden="true">
              XV
            </p>
            <div className={flash.divider} aria-hidden="true">
              ✧
            </div>
            <div className={styles.parents}>
              <p>Natividad Sanchez y Vianney Palacios</p>
              <p>Tienen el honor de invitar a los XV años de su hija</p>
            </div>
            <h1 id="diosmerit-name">
              Diosmerit Aileen
              <span className={styles.surname}>Sánchez Palacios</span>
            </h1>
            <p className={flash.message}>
              Me encantará compartir contigo la alegría de mis quince años.
            </p>
          </header>
          <time
            className={`${flash.date} ${styles.reveal}`}
            dateTime="2026-12-29"
            aria-label="29 de diciembre de 2026"
          >
            <span>Diciembre</span>
            <strong>29</strong>
            <span>2026</span>
          </time>
          <div className={`${styles.details} ${styles.reveal}`}>
            <dl className={styles.schedule}>
              <div>
                <dt>Misa</dt>
                <dd>
                  <time dateTime="17:00">5:00 p. m.</time>
                </dd>
              </div>
              <div>
                <dt>Protocolo de la fiesta</dt>
                <dd>
                  <time dateTime="20:00">8:00 p. m.</time>
                </dd>
              </div>
            </dl>
            <p className={styles.venue}>
              <MapPin size={18} aria-hidden="true" />
              <span>
                San Juan de la Cruz
                <br />
                <strong>Cancha de volibol</strong>
              </span>
            </p>
            <div className={flash.actions}>
              <a
                className={flash.confirm}
                href="https://www.google.com/maps/search/?api=1&query=Cancha+de+volibol+San+Juan+de+la+Cruz+Guerrero"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={17} aria-hidden="true" /> Ubicación de la fiesta{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <footer className={styles.reveal}>
            <MonarqueSignature compact />
          </footer>
        </div>
      </article>
    </main>
  );
}
