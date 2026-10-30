import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import styles from "./MonarqueSignature.module.css";

export default function MonarqueSignature({
  compact = false,
}: {
  compact?: boolean;
}) {
  if (compact) {
    return (
      <Link href="/" className={`${styles.compact} ${styles.logoLink}`} aria-label="Ir al inicio de Monarque · Invitaciones Web">
        <Image
          src="/monarque-banner-cropped.png"
          alt="Monarque · Invitaciones Web"
          width={856}
          height={282}
          sizes="150px"
          className={styles.banner}
        />
      </Link>
    );
  }

  return (
    <footer className={styles.signature} aria-label="Contacto de Monarque">
      <div className={styles.content}>
        <div className={styles.heading}>
          <Link href="/" className={styles.logoLink} aria-label="Ir al inicio de Monarque · Invitaciones Web">
          <Image
            src="/monarque-banner-cropped.png"
            alt="Monarque · Invitaciones Web"
            width={856}
            height={282}
            sizes="280px"
          />
          </Link>
        </div>

        <div className={styles.contacts}>
          <a
            href="https://wa.me/522206283499"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Monarque México: +52 220 628 3499"
          >
            <MessageCircle aria-hidden="true" />
            <span>
              <small>México</small>+52 220 628 3499
            </span>
          </a>
          <a
            href="https://wa.me/51972157720"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Monarque Perú: +51 972 157 720"
          >
            <MessageCircle aria-hidden="true" />
            <span>
              <small>Perú</small>+51 972 157 720
            </span>
          </a>
          <a
            className={styles.email}
            href="mailto:monarqueinvitacionesweb@gmail.com"
          >
            <Mail aria-hidden="true" />
            <span>monarqueinvitacionesweb@gmail.com</span>
          </a>
        </div>

        <div className={styles.ornament} aria-hidden="true">
          <span />
          <b>♥</b>
          <span />
        </div>
      </div>
    </footer>
  );
}
