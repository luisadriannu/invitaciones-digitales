import type { EventData } from "@/app/types/EventData";

import camila from "@/app/data/christening/camila";
import jose from "@/app/data/birthday/jose";

const events: Record<string, EventData> = {
  camila,
  jose,
};

export default events;
