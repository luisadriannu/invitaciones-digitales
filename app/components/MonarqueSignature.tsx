import Image from "next/image";
import styles from "./MonarqueSignature.module.css";

export default function MonarqueSignature({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.compact : styles.signature}>
      <Image
        src="/monarque-banner.png"
        alt="Monarque · Invitaciones Web"
        width={1640}
        height={624}
        sizes={compact ? "150px" : "(max-width: 480px) 100vw, 480px"}
        className={styles.banner}
      />
    </div>
  );
}
