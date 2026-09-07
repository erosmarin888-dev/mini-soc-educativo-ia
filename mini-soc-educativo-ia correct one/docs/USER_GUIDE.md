# Guía de usuario

## 1. Resumen operativo

Comienza con los KPIs, revisa el conector degradado y abre la cola priorizada. Los valores se calculan desde el mismo dataset que alimenta las demás vistas.

## 2. Incidentes

Filtra por texto, severidad o estado. Abre una fila con clic, `Enter` o `Espacio`. En el detalle puedes:

- correlacionar alertas, entidades y logs;
- comparar hipótesis con evidencia;
- cambiar propietario y estado localmente;
- abrir el escenario asociado;
- exportar un paquete JSON simulado.

## 3. Logs + KQL

Selecciona una consulta guiada o modifica el texto. El motor admite:

- una tabla como primera línea o `search *`;
- `where Result == "failure|success"`;
- igualdad por `Target`, `IPAddress`, `User` o `UserPrincipalName`;
- `ago(Nh)` y `ago(Nm)`;
- `top N`;
- `summarize Count=count() by Table`.

No asumas compatibilidad completa con Kusto.

## 4. Escenarios

Lee las inyecciones en orden, investiga el incidente enlazado y completa los cuatro controles. El 100% revela la conclusión educativa. El progreso queda solo en el navegador.

## 5. Copiloto IA

Puedes pedir priorización, un resumen por ID, salud de conectores, búsqueda de IP o una consulta KQL. Las respuestas se producen con reglas y plantillas, no con IA generativa.

## 6. Ruta de estudio

Marca los módulos completados. La rutina sugerida es 20 minutos de contenido, 20 de notas, 20 de preguntas y 15–20 de práctica opcional.

## Atajos

- `g`, luego `i`: Incidentes
- `g`, luego `l`: Logs + KQL
- `g`, luego `s`: Escenarios
- `?`: ayuda
- `Esc`: cerrar diálogo
