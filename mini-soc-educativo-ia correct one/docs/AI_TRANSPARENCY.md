# Transparencia de IA

## Qué es

La vista “Copiloto IA” es una interfaz educativa que selecciona respuestas mediante coincidencias de texto y reglas JavaScript sobre el dataset local.

## Qué no es

- No es un modelo de lenguaje.
- No llama a una API.
- No envía prompts, telemetría ni datos.
- No aprende de las conversaciones.
- No ejecuta acciones de seguridad.
- No produce una evaluación independiente de riesgo.

## Riesgos didácticos

Las respuestas pueden simplificar un caso, omitir contexto o sugerir una prioridad que un analista real cambiaría. Por eso cada salida se marca como simulada y requiere validación humana.

## Privacidad

El chat se guarda en `localStorage` para conservar la experiencia entre recargas. “Restablecer progreso” lo elimina. No hay cookies, trackers ni almacenamiento remoto.
