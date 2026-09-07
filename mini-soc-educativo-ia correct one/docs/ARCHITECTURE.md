# Arquitectura

## Objetivos

- Ejecutarse sin build, red o dependencias.
- Mantener una única fuente de verdad para incidentes, alertas, entidades y logs.
- Permitir uso directo con `file://` y despliegue estático en GitHub Pages.
- Hacer visibles todas las limitaciones de la simulación.

## Capas

1. **Presentación (`index.html`, `src/styles.css`)**: shell, navegación responsive, tablas, tarjetas, diálogo y componentes accesibles.
2. **Dominio (`src/data.js`)**: objeto global `MINI_SOC_DATA`, exportable también con CommonJS para pruebas.
3. **Aplicación (`src/app.js`)**: router por hash, renderizado, filtros, motor KQL limitado, respuestas IA basadas en reglas, exportación y persistencia local.
4. **Calidad (`tests/validate-data.js`)**: integridad referencial, restricciones de datos ficticios y archivos requeridos.
5. **Generación (`tools/generate-data.py`)**: dataset reproducible con semilla fija.

## Decisiones

- **Hash routing** evita configuración de rewrite en GitHub Pages.
- **Scripts clásicos** evitan bloqueos CORS de módulos bajo `file://`.
- **Sin `fetch`**: el dataset se carga como JavaScript para funcionar desde disco.
- **Sin framework**: superficie de ataque y mantenimiento mínimos para este alcance.
- **`localStorage`**: cambios y progreso son reversibles y específicos del navegador.
