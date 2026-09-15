import type { Metadata } from "next";
import Home from "./views/Home";
import events from "./data/events";

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
  const samplePlans = Object.fromEntries(
    Object.entries(events)
      .filter(([, data]) => data.design?.variant !== "flash")
      .map(([slug, data]) => [`/${data.tipo}/${slug}`, data.plan]),
  );

  return <Home samplePlans={samplePlans} />;
}
