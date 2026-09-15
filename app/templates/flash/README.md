# Invitaciones Flash

Tres diseños estándar originales, con una foto y los datos esenciales:

- `BirthdayFlash.tsx`: cumpleaños, con nombre y edad; rosa ciruela y marco festivo.
- `ChristeningFlash.tsx`: bautizo; marfil, verde salvia, cruz y fotografía en arco.
- `GraduationFlash.tsx`: graduación; verde oscuro, detalles dorados y marco recto.

Comparten `FlashDetails.tsx` y `Flash.module.css`. Son componentes sin estado, galerías, cuenta regresiva ni dependencias de animación.

## Uso

Utiliza `design: { variant: "flash" }` en un evento con `tipo: "cumple"`, `"bautizo"` o `"graduacion"` y regístralo en `app/data/events.ts`.

Edita `event.name`, `event.date`, `media.coverImage` y el lugar. En cumpleaños agrega `event.age`. En bautizo se muestra `location.church` y `event.ceremonyHour`; en los demás se usa `location.reception` y `event.partyHour`. Para graduación, `location.event` guarda el nombre de la escuela. La hora puede estar vacía para mostrar solo la fecha. `location.place` admite una dirección opcional.

Los campos `contact`, `media.gallery` y `event.dressCode` se conservan vacíos por compatibilidad con `EventData`; no se muestran en estas plantillas. Las fotografías de los ejemplos reutilizan archivos del proyecto.

## Ejemplos

- `/cumple/cumple-flash` → `app/data/flash/birthday.ts`
- `/bautizo/bautizo-flash` → `app/data/flash/christening.ts`
- `/graduacion/graduacion-flash` → `app/data/flash/graduation.ts`

Los ejemplos aparecen en el grupo Flash del inicio y respetan la visualización móvil del proyecto.
