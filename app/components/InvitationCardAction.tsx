import { ArrowUpRight, MousePointerClick } from "lucide-react";

export default function InvitationCardAction() {
  return (
    <span className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-current px-3 py-2 text-xs font-semibold leading-tight">
      <MousePointerClick size={16} className="shrink-0" aria-hidden="true" />
      Ver invitación
      <ArrowUpRight size={16} className="hidden shrink-0 sm:block" aria-hidden="true" />
    </span>
  );
}
