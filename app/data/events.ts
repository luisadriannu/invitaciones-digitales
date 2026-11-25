import type { EventData } from "@/app/types/EventData";
import { basicEvents } from "@/app/data/basic";
import birthdayFlash from "@/app/data/flash/birthday";
import arismael from "./birthday/arismael";
import christeningFlash from "@/app/data/flash/christening";
import graduationFlash from "@/app/data/flash/graduation";
import jose from "@/app/data/birthday/jose";
import mia from "@/app/data/birthday/mia";
import mateo from "@/app/data/birthday/mateo";
import cristofer from "@/app/data/birthday/cristofer";
import santiagoFutbol from "@/app/data/birthday/santiago-futbol";
import eduardo from "@/app/data/birthday/eduardo";
import victoria from "@/app/data/birthday/victoria";
import nataliaDaliz from "@/app/data/birthday/natalia-daliz";
import camila from "@/app/data/christening/camila";
import renataSofia from "@/app/data/christening/renata-sofia";
import erikDavid from "@/app/data/christening/erik-david";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import kevinyjuanalight from "@/app/data/wedding/kevin-y-juana-light";
import miguelYAracely from "@/app/data/wedding/miguel-y-aracely";
import carlosYYazmin from "@/app/data/wedding/carlos-y-yazmin";
import valentina from "@/app/data/xv/valentina";
import julia from "@/app/data/xv/julia";
import deny from "@/app/data/xv/deny";
import alexaMarbella from "@/app/data/xv/alexa-marbella";
import karina from "@/app/data/graduation/karina";
import sofia from "@/app/data/firstcommunion/sofia";
import sofiaYAdan from "@/app/data/firstcommunion/sofia-y-adan";
import isabella from "@/app/data/firstcommunion/isabella";
import christmasDinner from "@/app/data/seasonal/christmas-dinner";
import christmasPosada from "@/app/data/seasonal/christmas-posada";
import newYearEve from "@/app/data/seasonal/new-year-eve";

const events: Record<string, EventData> = {
  ...basicEvents,
  arismael,
  "cumple-flash": birthdayFlash,
  "bautizo-flash": christeningFlash,
  "graduacion-flash": graduationFlash,
  mateo,
  cristofer,
  "santiago-futbol": santiagoFutbol,
  eduardo,
  mia,
  camila,
  "renata-sofia": renataSofia,
  "erik-david": erikDavid,
  jose,
  victoria,
  nataliaDaliz,
  kevinyjuana,
  kevinyjuanalight,
  miguelYAracely,
  "carlos-y-yazmin": carlosYYazmin,
  valentina,
  julia,
  deny,
  "alexa-marbella": alexaMarbella,
  karina,
  sofia,
  "sofia-y-adan": sofiaYAdan,
  isabella,
  "cena-navidad": christmasDinner,
  "posada-navidena": christmasPosada,
  "ano-nuevo": newYearEve,
};

export default events;
