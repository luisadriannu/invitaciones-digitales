"use client";

import { getEventDate } from "@/app/lib/eventTime";
import { useCountdown } from "@/app/hooks/useCountdown";
import type { EventData } from "@/app/types/EventData";

interface Props {
  data: EventData;
}

export default function CountDown({ data }: Props) {
  const { days, hours, minutes, seconds, isReady } = useCountdown(
    getEventDate(data.event),
  );

  const isFinished =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div className="text-center my-8">
      {!isReady ? (
        <p className="text-sm tracking-wide text-current/70" role="status">
          Calculando cuenta regresiva…
        </p>
      ) : isFinished ? (
        <div
          className="relative inline-flex max-w-full items-center justify-center gap-4 overflow-hidden rounded-full border px-6 py-4 text-current backdrop-blur-sm sm:px-9"
          style={{
            backgroundColor:
              "color-mix(in srgb, currentColor 10%, transparent)",
            borderColor:
              "color-mix(in srgb, currentColor 28%, transparent)",
            boxShadow:
              "0 12px 32px color-mix(in srgb, currentColor 10%, transparent)",
          }}
        >
          <span className="text-xs opacity-45" aria-hidden="true">
            ✦
          </span>
          <p className="font-serif text-[clamp(1.6rem,8vw,2.25rem)] font-normal italic leading-tight tracking-normal">
            Hoy es el gran día
          </p>
          <span className="text-xs opacity-45" aria-hidden="true">
            ✦
          </span>
        </div>
      ) : (
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{days}</span>

            <span className="text-sm">Días</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{hours}</span>

            <span className="text-sm">Horas</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{minutes}</span>

            <span className="text-sm">Minutos</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold">{seconds}</span>

            <span className="text-sm">Segundos</span>
          </div>
        </div>
      )}
    </div>
  );
}
