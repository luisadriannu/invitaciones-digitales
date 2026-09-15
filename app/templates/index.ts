"use client";

import dynamic from "next/dynamic";
const BirthdayBase = dynamic(() => import("@/app/templates/birthday/BirthdayBase"));
const BirthdayDino = dynamic(() => import("@/app/templates/birthday/BirthdayDino"));
const BirthdayPastel = dynamic(() => import("@/app/templates/birthday/BirthdayPastel"));
const BirthdayPop = dynamic(() => import("@/app/templates/birthday/BirthdayPop"));
const BirthdayDinoParty = dynamic(() => import("@/app/templates/birthday/BirthdayDinoParty"));
const BirthdayFlash = dynamic(() => import("@/app/templates/flash/BirthdayFlash"));
const ChristeningFlash = dynamic(() => import("@/app/templates/flash/ChristeningFlash"));
const GraduationFlash = dynamic(() => import("@/app/templates/flash/GraduationFlash"));
// import BirthdayElegant from "@/templates/birthday/BirthdayElegant";
// import BirthdayModern from "@/templates/birthday/BirthdayModern";
const WeddingBase = dynamic(() => import("@/app/templates/wedding/WeddingBase"));
const WeddingLight = dynamic(() => import("@/app/templates/wedding/WeddingLight"));
// import BabyShowerBase from "@/templates/babyshower/BabyShowerBase";
const xvBaseTemplate = dynamic(() => import("@/app/templates/xv/xvBaseTemplate"));
const XvRoseGarden = dynamic(() => import("@/app/templates/xv/XvRoseGarden"));
const ChristeningBase = dynamic(() => import("@/app/templates/christening/ChristeningBase"));
const ChristeningItzia = dynamic(() => import("@/app/templates/christening/ChristeningItzia"));
const GraduationBase = dynamic(() => import("@/app/templates/graduation/GraduationBase"));
const FirstCommunionTemplate = dynamic(() => import("@/app/templates/firstcommunion/FirstCommunionTemplate"));

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
    roseGarden: XvRoseGarden,
  },
  bautizo: {
    flash: ChristeningFlash,
    base: ChristeningBase,
    itzia: ChristeningItzia,
  },
} as const;
