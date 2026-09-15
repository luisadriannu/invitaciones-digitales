import BirthdayBase from "@/app/templates/birthday/BirthdayBase";
import BirthdayDino from "@/app/templates/birthday/BirthdayDino";
import BirthdayPastel from "@/app/templates/birthday/BirthdayPastel";
import BirthdayPop from "@/app/templates/birthday/BirthdayPop";
import BirthdayDinoParty from "@/app/templates/birthday/BirthdayDinoParty";
import BirthdayFlash from "@/app/templates/flash/BirthdayFlash";
import ChristeningFlash from "@/app/templates/flash/ChristeningFlash";
import GraduationFlash from "@/app/templates/flash/GraduationFlash";
// import BirthdayElegant from "@/templates/birthday/BirthdayElegant";
// import BirthdayModern from "@/templates/birthday/BirthdayModern";
import WeddingBase from "@/app/templates/wedding/WeddingBase";
import WeddingLight from "@/app/templates/wedding/WeddingLight";
// import BabyShowerBase from "@/templates/babyshower/BabyShowerBase";
import xvBaseTemplate from "@/app/templates/xv/xvBaseTemplate";
import ChristeningBase from "@/app/templates/christening/ChristeningBase";
import ChristeningItzia from "@/app/templates/christening/ChristeningItzia";
import GraduationBase from "@/app/templates/graduation/GraduationBase";
import FirstCommunionTemplate from "@/app/templates/firstcommunion/FirstCommunionTemplate";

export const templates = {
  cumple: {
    base: BirthdayBase,
    dinosaur: BirthdayDino,
    pastel: BirthdayPastel,
    pop: BirthdayPop,
    dinoParty: BirthdayDinoParty,
    flash: BirthdayFlash,
    // elegant: BirthdayElegant,
    // modern: BirthdayModern,
  },
  boda: {
    base: WeddingBase,
    light: WeddingLight,
  },
  // babyshower: {
  //   base: BabyShowerBase,
  // },
  primeracomunion: {
    base: FirstCommunionTemplate,
  },
  graduacion: {
    flash: GraduationFlash,
    base: GraduationBase,
  },
  xv: {
    base: xvBaseTemplate,
  },
  bautizo: {
    flash: ChristeningFlash,
    base: ChristeningBase,
    itzia: ChristeningItzia,
  },
} as const;
