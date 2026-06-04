import type { Metadata } from "next";
import Home from "./views/Home";

export const metadata: Metadata = {
  title: "Invitaciones Digitales",
  description:
    "Invitaciones digitales para bodas, XV años, bautizos y graduaciones.",

  openGraph: {
    title: "Invitaciones Digitales",
    description:
      "Invitaciones digitales para bodas, XV años, bautizos y graduaciones.",
    images: ["/seo/icon.png"],
  },
};

export default function Page() {
  return <Home />;
}
