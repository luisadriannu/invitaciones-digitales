// app/[tipo]/[slug]/opengraph-image.tsx

import { ImageResponse } from "next/og";
import events from "@/app/data/events";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{
    tipo: string;
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const event = events[slug];

  if (!event) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 64,
          background: "#fff",
        }}
      >
        Invitación no encontrada
      </div>,
    );
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg,#f7efe6,#f5d7dc)",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          marginBottom: 20,
        }}
      >
        Bautizo
      </div>

      <div
        style={{
          fontSize: 52,
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        {event.event.name}
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 32,
        }}
      >
        {event.event.date}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
