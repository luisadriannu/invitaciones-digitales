import type { EventData } from "@/app/types/EventData";
import jose from "@/app/data/birthday/jose";
import camila from "@/app/data/christening/camila";
import kevinyjuana from "@/app/data/wedding/kevin-y-juana";
import valentina from "@/app/data/xv/valentina";
import karina from "@/app/data/graduation/karina";
import sofia from "@/app/data/firstcommunion/sofia";
import juandiego from "@/app/data/birthday/juanDiego";
import gianniyjoey from "@/app/data/graduation/gianniyjoey";

const events: Record<string, EventData> = {
  camila,
  jose,
  kevinyjuana,
  valentina,
  karina,
  sofia,
  juandiego,
  gianniyjoey,
};

export default events;
