"use client";

import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import type { EventData, EventType, EventVariant } from "@/app/types/EventData";
import { templates } from "./index";

export default function TemplateRenderer({ data }: { data: EventData }) {
  const templateRegistry = templates as unknown as Partial<
    Record<
      EventType,
      Partial<Record<EventVariant, ComponentType<{ data: EventData }>>>
    >
  >;
  const templatesByType = templateRegistry[data.tipo];
  const variant = data.design?.variant ?? "base";
  const Template = templatesByType?.[variant];

  if (!Template) notFound();
  return <Template data={data} />;
}
