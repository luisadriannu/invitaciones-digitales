import type { Metadata } from "next";
import Home from "./views/Home";
import events from "./data/events";

export const metadata: Metadata = {
  title: "Invitaciones Digitales",
  description:
    "Invitaciones digitales para bodas, XV años, bautizos y graduaciones.",

  twitter: {
    card: "summary_large_image",
    title: "Monarque · Invitaciones Web",
    description: "Invitaciones digitales para momentos únicos.",
    images: ["/seo/monarque-share.jpg"],
  },
  openGraph: {
    title: "Invitaciones Digitales",
    description:
      "Invitaciones digitales para bodas, XV años, bautizos y graduaciones.",
    images: [{ url: "/seo/monarque-share.jpg", width: 1200, height: 457, alt: "Monarque · Invitaciones Web" }],
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
