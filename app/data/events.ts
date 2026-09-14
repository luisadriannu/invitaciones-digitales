import type { EventData } from "@/app/types/EventData";
import jose from "@/app/data/birthday/jose";
import vicente from "@/app/data/birthday/vicente";
import mateo from "@/app/data/birthday/mateo";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import valentina from "@/app/data/xv/valentina";
import karina from "@/app/data/graduation/karina";
import sofia from "@/app/data/firstcommunion/sofia";
import itzia from "@/app/data/christening/itzia";

const events: Record<string, EventData> = {
  camila,
  jose,
  vicente,
  mateo,
  kevinyjuana,
  valentina,
  karina,
  sofia,
  itzia,
};

export default events;
