import { ExternalLink } from "lucide-react";

export default function InvitationCardAction() {
  return (
    <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold tracking-wide text-[#2B2927] shadow-md transition-transform duration-300 group-hover:scale-105">
      Click para ver
      <ExternalLink
        size={14}
        className="shrink-0 text-[#D4AF37]"
        aria-hidden="true"
      />
    </span>
  );
}
