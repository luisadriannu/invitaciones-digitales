import type { EventData } from "@/app/types/EventData";
import birthdayFlash from "@/app/data/flash/birthday";
import christeningFlash from "@/app/data/flash/christening";
import graduationFlash from "@/app/data/flash/graduation";
import jose from "@/app/data/birthday/jose";
import mia from "@/app/data/birthday/mia";
import mateo from "@/app/data/birthday/mateo";
import eduardo from "@/app/data/birthday/eduardo";
import victoria from "@/app/data/birthday/victoria";
import vicente from "@/app/data/birthday/vicente";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import kevinyjuanalight from "@/app/data/wedding/kevin-y-juana-light";
import valentina from "@/app/data/xv/valentina";
import julia from "@/app/data/xv/julia";
import karina from "@/app/data/graduation/karina";
import sofia from "@/app/data/firstcommunion/sofia";
import itzia from "@/app/data/christening/itzia";

const events: Record<string, EventData> = {
  "cumple-flash": birthdayFlash,
  "bautizo-flash": christeningFlash,
  "graduacion-flash": graduationFlash,
  mateo,
  eduardo,
  mia,
  camila,
  jose,
  victoria,
  vicente,
  kevinyjuana,
  kevinyjuanalight,
  valentina,
  julia,
  karina,
  sofia,
  itzia,
};

export default events;
