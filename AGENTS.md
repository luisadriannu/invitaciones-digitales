<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Invitation design defaults

- Every new invitation should include tasteful motion by default: an animated opening, subtle decorative particles or ambient movement, section reveal transitions, and responsive button microinteractions.
- Keep animations smooth and lightweight, and always provide a `prefers-reduced-motion` fallback.
- Flash invitations use static decoration without animated petals, floating flowers, or decorative particle effects.
- When an invitation has music and an opening screen, start its music directly from the “Abrir invitación” click, not before. Provide a pause/resume control.
- Position invitation music controls fixed at the bottom-right corner, respecting mobile safe-area insets.
- `/cumple/arismael` uses the user-provided Spidey song stored at `public/arismael-spidey.mp3`.
