import { ExternalLink } from "lucide-react";
import styles from "./InvitationCardAction.module.css";

export default function InvitationCardAction() {
  return (
    <span className={styles.action}>
      Click para ver
      <ExternalLink
        size={14}
        className="shrink-0 text-[#D4AF37]"
        aria-hidden="true"
      />
    </span>
  );
}
