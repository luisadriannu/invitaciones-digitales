import BirthdayBase from "@/app/templates/birthday/BirthdayBase";
import BirthdayDinosaur from "@/app/templates/birthday/BirthdayDinosaur";
// import BirthdayElegant from "@/templates/birthday/BirthdayElegant";
// import BirthdayModern from "@/templates/birthday/BirthdayModern";
import WeddingBase from "@/app/templates/wedding/WeddingBase";
// import BabyShowerBase from "@/templates/babyshower/BabyShowerBase";
import xvBaseTemplate from "@/app/templates/xv/xvBaseTemplate";
import ChristeningBase from "@/app/templates/christening/ChristeningBase";
import GraduationBase from "@/app/templates/graduation/GraduationBase";
import FirstCommunionTemplate from "@/app/templates/firstcommunion/FirstCommunionTemplate";

export const templates = {
  cumple: {
    base: BirthdayBase,
    dinosaur: BirthdayDinosaur,
    // elegant: BirthdayElegant,
    // modern: BirthdayModern,
  },
  boda: {
    base: WeddingBase,
  },
  // babyshower: {
  //   base: BabyShowerBase,
  // },
  primeracomunion: {
    base: FirstCommunionTemplate,
  },
  graduacion: {
    base: GraduationBase,
  },
  xv: {
    base: xvBaseTemplate,
  },
  bautizo: {
    base: ChristeningBase,
  },
} as const;
