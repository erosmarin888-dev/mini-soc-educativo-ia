# Modelo de datos simulado

## Entidades principales

| Colección | Clave | Relaciones |
|---|---|---|
| `incidents` | `id` | `alertIds`, `logIds`, `entityIds`, `scenarioId` |
| `alerts` | `id` | `incidentId` |
| `logs` | `id` | asociados desde `incident.logIds` |
| `entities` | `id` | asociados desde `incident.entityIds` |
| `scenarios` | `id` | `incidentId` |
| `playbooks` | `id` | relación conceptual por tipo de respuesta |
| `connectors` | `id` | fuente de salud de ingesta simulada |
| `learning` | `id` | progreso en `localStorage` |

## Reglas de consistencia

- Cada ID es único en su colección.
- Toda alerta apunta a un incidente existente y aparece en `alertIds`.
- Todo log y entidad referenciados existen.
- Cada escenario enlaza el mismo incidente que lo referencia.
- Correos ficticios terminan en `.example`.
- IPs públicas usan rangos TEST-NET; las internas usan RFC1918.
- Fechas se expresan en ISO 8601 UTC y se generan respecto de un tiempo fijo del dataset.

## Persistencia

El dataset base es inmutable. Los cambios de estado, propietario, progreso y chat se guardan bajo la clave `mini-soc-edu-v1` de `localStorage`. “Restablecer progreso” elimina esa clave.
