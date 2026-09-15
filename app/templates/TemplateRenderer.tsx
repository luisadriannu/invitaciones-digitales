"use client";

import { notFound } from "next/navigation";
import type { EventData } from "@/app/types/EventData";
import { templates } from "./index";

export default function TemplateRenderer({ data }: { data: EventData }) {
  const templatesByType = templates[data.tipo as keyof typeof templates];
  const variant = data.design?.variant ?? "base";
  const Template = templatesByType?.[variant as keyof typeof templatesByType];

  if (!Template) notFound();
  return <Template data={data} />;
}
