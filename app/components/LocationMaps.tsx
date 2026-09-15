import { invitationPlans } from "@/app/data/plans";
import type { EventData } from "@/app/types/EventData";
import { MapPin } from "lucide-react";

interface Props {
  data: EventData;
}

export default function LocationMaps({ data }: Props) {
  if (!data.location.mapUrl) return null;

  return (
    <div className="text-center mt-10">
      <p className="text-3xl md:text-4xl font-light italic mb-6">Ubicación</p>

      {invitationPlans[data.plan].embeddedMap ? (
        <iframe
          src={data.location.mapUrl}
          height="250"
          className="w-full rounded-2xl border border-[#efc8d230]"
          loading="lazy"
        />
      ) : (
        <a
          href={data.location.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-btn jost"
        >
          <MapPin size={15} />
          Ver ubicación en el mapa
        </a>
      )}
    </div>
  );
}
