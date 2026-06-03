import { Metadata } from "next";
import events from "@/app/data/events";

import Invitation from "@/app/views/Invitation";
import MobileOnly from "@/app/components/MobileOnly";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    tipo: string;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const event = events[slug];

  if (!event) {
    return {
      title: "Invitación no encontrada",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: event.seo?.title,
    description: event.seo?.description,
    openGraph: {
      title: event.seo?.title,
      description: event.seo?.description,
      images: [
        {
          url: `${siteUrl}${event.seo?.image}`,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: event.seo?.title,
      description: event.seo?.description,
      images: [`${siteUrl}${event.seo?.image}`],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    tipo: string;
    slug: string;
  }>;
}) {
  const resolvedParams = await params;

  return (
    <MobileOnly>
      <Invitation tipo={resolvedParams.tipo} slug={resolvedParams.slug} />
    </MobileOnly>
  );
}
