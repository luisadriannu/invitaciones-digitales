import { Metadata } from "next";
import events from "@/app/data/events";

import Invitation from "@/app/views/Invitation";
import MobileOnly from "@/app/components/MobileOnly";

export function generateStaticParams() {
  return Object.entries(events).map(([slug, event]) => ({
    tipo: event.tipo,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    tipo: string;
    slug: string;
  }>;
}): Promise<Metadata> {
  const { tipo, slug } = await params;

  const event = events[slug];

  if (!event || event.tipo !== tipo) {
    return {
      title: "Invitación no encontrada",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://invitacionesdigitales-two.vercel.app";
  const imageUrl = new URL(event.seo.image, siteUrl).toString();

  return {
    title: event.seo?.title,
    description: event.seo?.description,
    openGraph: {
      title: event.seo?.title,
      description: event.seo?.description,
      images: [
        {
          url: imageUrl,
          alt: event.seo.title,
          // No declarar dimensiones inventadas para fotos de otros formatos.
          ...(event.seo.imageWidth && event.seo.imageHeight
            ? { width: event.seo.imageWidth, height: event.seo.imageHeight }
            : {}),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: event.seo?.title,
      description: event.seo?.description,
      images: [imageUrl],
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
