/** Existing invitations default to central Mexico; every event can override this. */
export const DEFAULT_EVENT_TIME_ZONE = "America/Mexico_City";

type EventSchedule = {
  date: string;
  partyHour: string;
  ceremonyHour?: string;
  timeZone?: string;
};

const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const cache = new Map<string, number>();

/** Resolve local event time into one instant, independently of the reader's zone.
 * Ambiguous/nonexistent DST times are rejected rather than silently shifted.
 */
export function getEventDate(event: EventSchedule): Date {
  const timeZone = event.timeZone ?? DEFAULT_EVENT_TIME_ZONE;
  const time = event.partyHour || event.ceremonyHour || "";
  const key = JSON.stringify([event.date, time, timeZone]);
  const cached = cache.get(key);
  if (cached !== undefined) return new Date(cached);

  const dateMatch = /^(\d{1,2})\s+(\p{L}+)\s+(\d{4})$/u.exec(event.date.trim());
  // Accept AM/PM, a. m./p. m. and a range beginning with a valid start time.
  const timeMatch = /^(\d{1,2}):(\d{2})\s*([ap])\.?\s*m\.?(?=\s|$)/i.exec(time.trim());
  if (!dateMatch || !timeMatch) throw new Error(`Fecha u hora de evento inválida: ${event.date}, ${time}`);
  const day = Number(dateMatch[1]);
  const month = months.indexOf(dateMatch[2].toLowerCase());
  const year = Number(dateMatch[3]);
  const hour12 = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const hour = hour12 % 12 + (timeMatch[3].toLowerCase() === "p" ? 12 : 0);
  const wallTime = Date.UTC(year, month, day, hour, minute);
  const check = new Date(wallTime);
  if (year < 1000 || month < 0 || hour12 < 1 || hour12 > 12 || minute > 59 || check.getUTCMonth() !== month || check.getUTCDate() !== day) {
    throw new Error(`Fecha u hora de evento inválida: ${event.date}, ${time}`);
  }

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  function localEpoch(instant: number) {
    const parts = Object.fromEntries(formatter.formatToParts(instant).map(({ type, value }) => [type, value]));
    return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day), Number(parts.hour), Number(parts.minute), Number(parts.second));
  }
  // Sample both sides of a potential daylight-saving transition.
  const offsets = new Set([-36, 0, 36].map((hours) => {
    const sample = wallTime + hours * 3600000;
    return localEpoch(sample) - sample;
  }));
  const candidates = [...offsets].map((offset) => wallTime - offset).filter((instant) => localEpoch(instant) === wallTime);
  if (candidates.length !== 1) throw new Error(`Hora inexistente o ambigua en ${timeZone}: ${event.date}, ${time}`);
  if (cache.size >= 200) cache.clear();
  cache.set(key, candidates[0]);
  return new Date(candidates[0]);
}
