import { Tag } from "lucide-react";
import styles from "./FlashPriceBadge.module.css";

export default function FlashPriceBadge() {
  return (
    <div className={styles.badge} aria-label="Precio: 49 pesos">
      <Tag size={13} strokeWidth={2.5} aria-hidden="true" />
      $49
    </div>
  );
}
