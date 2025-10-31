# Next Maps MVP (Leaflet + GeoJSON, listo para mosaicos)

## Requisitos
- Node 18+
- PNPM/NPM/Yarn (usa uno)

## Instalación
```bash
npm i
npm run dev
```
Abre http://localhost:3000

## Qué incluye
- Árbol de capas (hasta 4 niveles) con hojas seleccionables.
- Tooltips por polígono con tap/clic (sin recargar).
- Orden frente/atrás por zIndex (defaultZ mayor = arriba). Controles ▲ ▼ por hoja.
- LegendDock en esquina inferior derecha, apilado vertical, scroll **solo vertical**.
- Capa de abstracción para migrar `type: "vector"` → `type: "tile"` sin romper la UI.
