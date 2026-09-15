import { notFound } from "next/navigation";
import events from "@/app/data/events";
import TemplateRenderer from "@/app/templates/TemplateRenderer";

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

  return <TemplateRenderer data={data} />;
}
