import type { EventData } from "@/app/types/EventData";
import styles from "./Flash.module.css";

/** Datos compartidos; la ceremonia del bautizo tiene prioridad sobre la fiesta. */
export default function FlashDetails({ data }: { data: EventData }) {
  const isChristening = data.tipo === "bautizo";
  const hour = isChristening ? data.event.ceremonyHour || data.event.partyHour : data.event.partyHour;
  const venue = (isChristening ? data.location.church : data.location.reception) || data.location.reception || data.location.place || data.location.event;
  const school = data.tipo === "graduacion" ? data.location.event : undefined;

  return (
    <dl className={styles.details}>
      <div><dt>Fecha</dt><dd>{data.event.date}{hour && <span className={styles.hour}>{hour}</span>}</dd></div>
      {school && school !== venue && <div><dt>Escuela</dt><dd>{school}</dd></div>}
      {venue && <div><dt>Lugar</dt><dd>{venue}{data.location.place && data.location.place !== venue && <span className={styles.address}>{data.location.place}</span>}</dd></div>}
    </dl>
  );
}
