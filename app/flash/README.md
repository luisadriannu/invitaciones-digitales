# Flash

Invitaciones de una vista: `/flash/cumple`, `/flash/graduacion`, `/flash/bautizo`. Selector: `/flash`.

Personaliza `data.ts`: nombre, edad opcional, una fotografía, fecha, hora, lugar, enlace de Maps y teléfono internacional para WhatsApp. Las muestras reutilizan José, Karina y Camila. José usa 5 años como edad de ejemplo autorizada; modifica `age` en la muestra para personalizarla. Revisa los números originales antes de compartir; se conservan sin añadir prefijos supuestos.

Se usa el lugar de recepción y la hora de fiesta del evento. Los enlaces de Maps existentes se conservan; si falta el enlace, se ofrece una búsqueda del lugar. Comprueba que la ubicación original corresponda con el nombre del salón antes de enviar la invitación.

La ruta es independiente de las invitaciones tradicionales. Las fotos se optimizan con Next Image, los estilos están aislados en CSS Modules y los metadatos se generan en el servidor. En horizontal se usan dos columnas manteniendo una sola fotografía y los dos botones visibles.


Nuevos diseños de cumpleaños: /flash/cumple-ticket (Boleto de fiesta) y /flash/cumple-pop (Fiesta Pop). Ambos reutilizan los datos de José y la edad de ejemplo de 5 años.
