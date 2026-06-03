"use client";

import { useCountdown } from "@/app/hooks/useCountdown";
import type { EventData } from "@/app/types/EventData";

interface Props {
  data: EventData;
}

export default function CountDown({ data }: Props) {
  const meses: Record<string, number> = {
    Enero: 0,
    Febrero: 1,
    Marzo: 2,
    Abril: 3,
    Mayo: 4,
    Junio: 5,
    Julio: 6,
    Agosto: 7,
    Septiembre: 8,
    Octubre: 9,
    Noviembre: 10,
    Diciembre: 11,
  };

  const [dia, mes, año] = data.event.date.split(" ");
  const [hora, periodo] = data.event.partyHour.split(" ");

  const [horas, minutos] = hora.split(":").map(Number);

  const hora24 =
    periodo === "PM" && horas !== 12
      ? horas + 12
      : horas === 12 && periodo === "AM"
        ? 0
        : horas;

  const targetDate = new Date(
    Number(año),
    meses[mes],
    Number(dia),
    hora24,
    minutos,
  );

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

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
