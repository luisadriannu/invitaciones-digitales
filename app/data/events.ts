import type { EventData } from "@/app/types/EventData";
import jose from "@/app/data/birthday/jose";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import valentina from "@/app/data/xv/valentina";
import karina from "@/app/data/graduation/karina";
import alan from "@/app/data/firstcommunion/sofia";

const events: Record<string, EventData> = {
  camila,
  jose,
  kevinyjuana,
  valentina,
  karina,
  alan,
};

export default events;
