"use client";

import { getEventDate } from "@/app/lib/eventTime";
import { useCountdown } from "@/app/hooks/useCountdown";
import type { EventData } from "@/app/types/EventData";

interface Props {
  data: EventData;
}

export default function CountDown({ data }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(getEventDate(data.event));

  const isFinished =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0;

  return (
    <div className="text-center my-8">
      {isFinished ? (
        <div className="relative inline-block rounded-xl p-0.5 overflow-hidden">
          <div
            className="
              absolute
              inset-0
            bg-linear-to-r
              from-sky-300
              via-purple-300
              to-teal-300
            "
          />

          <div className="relative bg-[#0b1020] rounded-xl px-6 py-3">
            <p
              className="
                text-3xl
                md:text-4xl
                font-extrabold
                text-center
                tracking-wide
              bg-linear-to-r
                from-slate-200
                via-white
                to-slate-300
                bg-clip-text
                text-transparent
              "
            >
              ¡Hoy es el gran día!
            </p>
          </div>
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
