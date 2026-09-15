import type { EventData } from "@/app/types/EventData";
import birthdayFlash from "@/app/data/flash/birthday";
import christeningFlash from "@/app/data/flash/christening";
import graduationFlash from "@/app/data/flash/graduation";
import jose from "@/app/data/birthday/jose";
import mia from "@/app/data/birthday/mia";
import mateo from "@/app/data/birthday/mateo";
import victoria from "@/app/data/birthday/victoria";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import kevinyjuanalight from "@/app/data/wedding/kevin-y-juana-light";
import valentina from "@/app/data/xv/valentina";
import karina from "@/app/data/graduation/karina";
import sofia from "@/app/data/firstcommunion/sofia";
import juandiego from "@/app/data/birthday/juanDiego";
import gianniyjoey from "@/app/data/graduation/gianniyjoey";
import itzia from "@/app/data/christening/itzia";
import heidi from "@/app/data/graduation/heidi";

const events: Record<string, EventData> = {
  "cumple-flash": birthdayFlash,
  "bautizo-flash": christeningFlash,
  "graduacion-flash": graduationFlash,
  mateo,
  mia,
  camila,
  jose,
  victoria,
  kevinyjuana,
  kevinyjuanalight,
  valentina,
  karina,
  sofia,
  juandiego,
  gianniyjoey,
  itzia,
  heidi,
};

export default events;
