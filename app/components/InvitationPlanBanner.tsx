import { invitationPlans, type InvitationPlan } from "@/app/data/plans";

export default function InvitationPlanBanner({
  plan,
}: {
  plan: InvitationPlan;
}) {
  const { label, bannerClassName } = invitationPlans[plan];

  return (
    <span
      aria-label={`Plan ${label}`}
      className={`pointer-events-none absolute -right-12 top-4 z-10 w-36 rotate-45 py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] shadow-md sm:-right-10 sm:top-7 sm:w-40 sm:py-2 sm:text-[11px] ${bannerClassName}`}
    >
      {label}
    </span>
  );
}
