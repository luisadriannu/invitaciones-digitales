import type { EventData } from "@/app/types/EventData";
import { basicEvents } from "@/app/data/basic";
import birthdayFlash from "@/app/data/flash/birthday";
import christeningFlash from "@/app/data/flash/christening";
import graduationFlash from "@/app/data/flash/graduation";
import jose from "@/app/data/birthday/jose";
import mia from "@/app/data/birthday/mia";
import mateo from "@/app/data/birthday/mateo";
import eduardo from "@/app/data/birthday/eduardo";
import victoria from "@/app/data/birthday/victoria";
import nataliaDaliz from "@/app/data/birthday/natalia-daliz";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import kevinyjuanalight from "@/app/data/wedding/kevin-y-juana-light";
import miguelYAracely from "@/app/data/wedding/miguel-y-aracely";
import carlosYYazmin from "@/app/data/wedding/carlos-y-yazmin";
import valentina from "@/app/data/xv/valentina";
import julia from "@/app/data/xv/julia";
import karina from "@/app/data/graduation/karina";
import sofia from "@/app/data/firstcommunion/sofia";

const events: Record<string, EventData> = {
  ...basicEvents,
  "cumple-flash": birthdayFlash,
  "bautizo-flash": christeningFlash,
  "graduacion-flash": graduationFlash,
  mateo,
  eduardo,
  mia,
  camila,
  jose,
  victoria,
  nataliaDaliz,
  kevinyjuana,
  kevinyjuanalight,
  miguelYAracely,
  "carlos-y-yazmin": carlosYYazmin,
  valentina,
  julia,
  karina,
  sofia,
};

export default events;
