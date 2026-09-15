// Agrega aquí nuevos planes: InvitationPlan se actualiza automáticamente.
export const invitationPlans = {
  basic: {
    label: "Básico",
    bannerClassName: "bg-[#EEE7DD] text-[#51483E]",
    embeddedMap: false,
  },
  premium: {
    label: "Premium",
    bannerClassName: "bg-[#755316] text-[#FFF5DA]",
    embeddedMap: true,
  },
} as const;

export type InvitationPlan = keyof typeof invitationPlans;
