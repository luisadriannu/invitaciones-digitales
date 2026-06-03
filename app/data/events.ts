import type { EventData } from "@/app/types/EventData";
import jose from "@/app/data/birthday/jose";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";

const events: Record<string, EventData> = {
  camila,
  jose,
  kevinyjuana,
};

export default events;
