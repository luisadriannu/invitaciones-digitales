import BirthdayBase from "@/app/templates/birthday/BirthdayBase";
// import BirthdayElegant from "@/templates/birthday/BirthdayElegant";
// import BirthdayModern from "@/templates/birthday/BirthdayModern";
import WeddingBase from "@/app/templates/wedding/WeddingBase";
// import BabyShowerBase from "@/templates/babyshower/BabyShowerBase";
// import XVBaseTemplate from "@/templates/xv/XVTemplate";
import ChristeningBase from "@/app/templates/christening/ChristeningBase";

export const templates = {
  cumple: {
    base: BirthdayBase,
    // elegant: BirthdayElegant,
    // modern: BirthdayModern,
  },
  boda: {
    base: WeddingBase,
  },
  // babyshower: {
  //   base: BabyShowerBase,
  // },
  // xv: {
  //   base: XVBaseTemplate,
  // },
  bautizo: {
    base: ChristeningBase,
  },
} as const;
