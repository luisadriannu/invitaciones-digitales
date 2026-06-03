import { notFound } from "next/navigation";
import events from "@/app/data/events";
import { templates } from "@/app/templates";

interface InvitationProps {
  tipo: string;
  slug: string;
}

export default function Invitation({ tipo, slug }: InvitationProps) {
  const data = events[slug];

  if (!data) {
    notFound();
  }

  if (data.tipo !== tipo) {
    notFound();
  }

  const templatesByType = templates[data.tipo as keyof typeof templates];

  const variant = (data.variant ?? "base") as "base" | "elegant" | "modern";

  const Template = templatesByType?.[variant as keyof typeof templatesByType];

  if (!Template) {
    notFound();
  }

  return <Template data={data} />;
}
