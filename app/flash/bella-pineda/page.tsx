import type { Metadata } from "next";
import FloralInvitation from "../FloralInvitation";
import { bella } from "./data";

export const metadata: Metadata = {
  title: "Bella Pineda · Mis 60 años",
  description: "Celebremos los 60 años de Bella Pineda. 29 de diciembre de 2026, 7:30 p. m., Pista de Las Anonas. Cena a las 8:40 p. m.",
  robots: { index: false, follow: false },
};

export default function BellaInvitation() {
  return <FloralInvitation event={bella} />;
}
