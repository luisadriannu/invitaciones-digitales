import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const message = encodeURIComponent("Hola 👋 Mi invitación no está disponible. ¿Podrían ayudarme a encontrarla?");

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>Invitaciones Digitales</Link>
        <span className={styles.headerNote}>Momentos para compartir</span>
      </header>

      <section className={styles.content} aria-labelledby="not-found-title">
        <div className={styles.illustration} aria-hidden="true">
          <span className={styles.number}>4</span>
          <div className={styles.seal}><Mail size={48} strokeWidth={1} /><span>✦</span></div>
          <span className={styles.number}>4</span>
        </div>
        <p className={styles.eyebrow}>Página no encontrada · 404</p>
        <h1 id="not-found-title">Esta invitación<br />se nos ha escapado</h1>
        <div className={styles.rule} aria-hidden="true" />
        <p className={styles.description}>No encontramos la página que buscas. Revisa que el enlace esté completo o vuelve al inicio para descubrir nuestras invitaciones.</p>
        <Link href="/" className={styles.primary}><ArrowLeft size={17} aria-hidden="true" />Volver al inicio</Link>

        <div className={styles.help}>
          <p>¿Buscas una invitación en especial?</p>
          <a href={`https://api.whatsapp.com/send?phone=522206283499&text=${message}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} strokeWidth={1.5} aria-hidden="true" />Te ayudamos por WhatsApp<ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      <footer className={styles.footer}><span aria-hidden="true">✦</span>Diseños elegantes para momentos inolvidables</footer>
    </main>
  );
}
