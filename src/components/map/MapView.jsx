"use client";
/* MapView: Leaflet imperativo (L.map) */
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LegendDock from "./LegendDock";
import { GEOJSON_REGISTRY } from "@/data/geojson";
import { LAYER_BUILDERS } from "@/data/customLayers";

/** ====== Región: Hidalgo + colindantes ====== */
const FALLBACK_BOUNDS_HGO_REGION = L.latLngBounds([18.0, -101.6], [22.8, -96.0]);
const REGION_LIMIT_KEYS = [
  "LIMITES_HIDALGO",
  "LIMITES_QUERETARO",
  "LIMITES_SAN_LUIS_POTOSI",
  "LIMITES_VERACRUZ",
  "LIMITES_PUEBLA",
  "LIMITES_ESTADO_DE_MEXICO",
];

function boundsFromGeoJSON(geojson) {
  let b = null;
  const add = (latlng) => { b ? b.extend(latlng) : (b = L.latLngBounds(latlng, latlng)); };
  const eachCoord = (coords) => {
    if (typeof coords[0] === "number" && typeof coords[1] === "number") add([coords[1], coords[0]]);
    else coords.forEach(eachCoord);
  };
  if (geojson?.type === "FeatureCollection") {
    geojson.features?.forEach((f) => f?.geometry?.coordinates && eachCoord(f.geometry.coordinates));
  } else if (geojson?.type === "Feature") {
    const g = geojson?.geometry; if (g?.coordinates) eachCoord(g.coordinates);
  } else if (geojson?.type && geojson.coordinates) eachCoord(geojson.coordinates);
  return b;
}
function computeRegionBounds(registry) {
  let region = null;
  REGION_LIMIT_KEYS.forEach((key) => {
    const gj = registry[key];
    if (gj) {
      const b = boundsFromGeoJSON(gj);
      if (b) region = region ? region.extend(b) : L.latLngBounds(b.getSouthWest(), b.getNorthEast());
    }
  });
  return region || FALLBACK_BOUNDS_HGO_REGION;
}

// Normaliza z a un entero y limita el rango (evita panes "infinitos")
const clampZ = (z) => Math.max(-9999, Math.min(9999, Math.round(Number(z ?? 400))));
// Pane para vectores basado en z (cada z tiene su propio pane)
const vecPaneIdFromZ = (z) => `pane_vec_${clampZ(z)}`;

export default function MapView({ selectedLayers, zOverrides, legends }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const regionBoundsRef = useRef(null);

  const groupRef = useRef({});        // { [layerId]: L.Layer }
  const paneRef = useRef({});        // { [paneId]: true }
  const rendererRef = useRef({});     // { [paneId]: L.SVG }
  const lastZRef = useRef({});        // { [layerId]: number }
  const lastPaneRef = useRef({});     // { [layerId]: paneId }
  const lastOnRef = useRef(new Set()); // <- para detectar capas recién encendidas

  // === Orden por z (no altera hooks)
  const visibleDefs = useMemo(() => {
    const arr = Array.from(selectedLayers.values());
    return arr.sort((a, b) => {
      const za = zOverrides.get(a.id) ?? a.defaultZ ?? 400;
      const zb = zOverrides.get(b.id) ?? b.defaultZ ?? 400;
      return za - zb;
    });
  }, [selectedLayers, zOverrides]);

  // === Init mapa con límites
  useEffect(() => {
    if (mapRef.current) return;

    const REGION_BOUNDS = computeRegionBounds(GEOJSON_REGISTRY);
    regionBoundsRef.current = REGION_BOUNDS;

    const map = L.map(mapDivRef.current, {
      maxBounds: REGION_BOUNDS,
      maxBoundsViscosity: 1.0,
      worldCopyJump: false,
    });
    map.fitBounds(REGION_BOUNDS, { padding: [20, 20] });
    const computedMin = map.getBoundsZoom(REGION_BOUNDS, true);
    map.setMinZoom(Math.max(5, computedMin));
    map.setMaxZoom(20);
    const keepInside = () => map.panInsideBounds(REGION_BOUNDS, { animate: false });
    map.on("drag", keepInside);

    const commonTileOpts = {
      minZoom: map.getMinZoom(),
      maxZoom: map.getMaxZoom(),
      noWrap: true,
      bounds: REGION_BOUNDS,
    };

    map.attributionControl.setPrefix("");

    // Bases
    const hidri = L.tileLayer("http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
      ...commonTileOpts, subdomains: ["mt0", "mt1", "mt2", "mt3"],
    }).addTo(map);
    const dark = L.tileLayer("https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", { ...commonTileOpts });
    const sat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", { ...commonTileOpts, subdomains: ["mt0", "mt1", "mt2", "mt3"] });
    const rel = L.tileLayer("http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", { ...commonTileOpts, subdomains: ["mt0", "mt1", "mt2", "mt3"] });
    const carr = L.tileLayer("http://{s}.google.com/vt/lyrs=h&x={x}&y={y}&z={z}", { ...commonTileOpts, subdomains: ["mt0", "mt1", "mt2", "mt3"] });

    L.control.layers(
      {
        "Mapa Híbrido": hidri,
        "Mapa Satelital ": sat,
        "Mapa Dark": dark,
        "Google Relieve": rel,
        "Google Carreteras": carr,
      },
      {},
      { collapsed: true }
    ).addTo(map);

    mapRef.current = map;
    return () => {
      map.off("drag", keepInside);
      map.remove();
      mapRef.current = null;
      groupRef.current = {};
      paneRef.current = {};
      rendererRef.current = {};
      lastZRef.current = {};
      lastPaneRef.current = {};
      lastOnRef.current = new Set();
      regionBoundsRef.current = null;
    };
  }, []);

  // === Panes y renderers
  const ensurePane = (map, paneId, z) => {
    let p = map.getPane(paneId);
    if (!p) p = map.createPane(paneId);
    p.style.zIndex = String(clampZ(z));
    // Re-append para forzar reorden
    const parent = p.parentNode;
    if (parent) parent.appendChild(p);
    paneRef.current[paneId] = true;
    return p;
  };
  const ensureRenderer = (map, paneId) => {
    let r = rendererRef.current[paneId];
    if (!r) {
      r = L.svg({ pane: paneId });
      r.addTo(map);
      rendererRef.current[paneId] = r;
    }
    return r;
  };
  const ensureTilePane = (map, layerId, z) => {
    const paneId = `pane_tile_${layerId}`;
    ensurePane(map, paneId, z);
    return paneId;
  };

  // === Crear capa vectorial (siempre usando pane por z)
  const buildVectorLayer = (ld, paneId, renderer) => {
    const data = GEOJSON_REGISTRY[ld.geojsonId];
    const builder = LAYER_BUILDERS[ld.id];
    if (builder) {
      // builder personalizado; debe respetar pane/renderer si aplica
      return builder(data, paneId, ld);
    }
    return L.geoJSON(data, {
      pane: paneId,
      renderer,
      pointToLayer: (feat, latlng) =>
        L.circleMarker(latlng, { pane: paneId, renderer, radius: 6 }),
      style: (feature) => {
        const t = feature?.geometry?.type || "";
        if (t.includes("Polygon")) return { color: "#146C94", weight: 1, fillColor: "#19A7CE", fillOpacity: 0.25 };
        if (t.includes("Line")) return { color: "#E76F51", weight: 3 };
        return { color: "#6A994E", weight: 3 };
      },
      onEachFeature: (feature, lyr) => {
        const props = feature?.properties || {};
        const title = props.nombre ?? ld.name ?? "Elemento";
        const lines = Object.entries(props).map(([k, v]) => `<div><b>${k}:</b> ${v}</div>`).join("");
        lyr.bindTooltip(`<div><b>${title}</b></div>${lines}`, { sticky: true });
        lyr.on("click", (e) => lyr.openTooltip(e.latlng));
      },
    });
  };

  // === Render / update (con zoom a PMDU recién prendidas)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const REGION_BOUNDS = regionBoundsRef.current || FALLBACK_BOUNDS_HGO_REGION;

    // Capas recién encendidas
    const currentOn = new Set([...selectedLayers.keys()]);
    const newlyOnIds = [...currentOn].filter((id) => !lastOnRef.current.has(id));

    // Bounds acumulados de PMDU recién encendidas
    let pmduUnion = null;

    visibleDefs.forEach((ld) => {
      const zRaw = zOverrides.get(ld.id) ?? ld.defaultZ ?? 400;
      const z = clampZ(zRaw);

      // VECTOR
      if (ld.type === "vector") {
        const paneId = vecPaneIdFromZ(z);
        ensurePane(map, paneId, z);
        const renderer = ensureRenderer(map, paneId);

        const lastZ = lastZRef.current[ld.id];
        const lastPane = lastPaneRef.current[ld.id];
        let layer = groupRef.current[ld.id];

        // Rebuild si no existe o cambió la z/pane
        if (!layer || lastZ !== z || lastPane !== paneId) {
          if (layer && map.hasLayer(layer)) map.removeLayer(layer);
          layer = buildVectorLayer(ld, paneId, renderer);
          groupRef.current[ld.id] = layer;
          lastZRef.current[ld.id] = z;
          lastPaneRef.current[ld.id] = paneId;
          layer.addTo(map);
        } else {
          if (!map.hasLayer(layer)) layer.addTo(map);
        }

        // Si esta capa vectorial se acaba de prender y es PMDU_* → añadir a la unión
        if (
          newlyOnIds.includes(ld.id) &&
          typeof ld.legendKey === "string" &&
          ld.legendKey.startsWith("PMDU_") &&
          typeof groupRef.current[ld.id]?.getBounds === "function"
        ) {
          const b = groupRef.current[ld.id].getBounds?.();
          if (b && b.isValid && b.isValid()) {
            pmduUnion = pmduUnion
              ? pmduUnion.extend(b)
              : L.latLngBounds(b.getSouthWest(), b.getNorthEast());
          }
        }
      }

      // TILE
      if (ld.type === "tile") {
        const paneId = ensureTilePane(map, ld.id, z);
        let layer = groupRef.current[ld.id];
        if (!layer) {
          layer = L.tileLayer(ld.tileUrlTemplate, {
            pane: paneId,
            noWrap: true,
            bounds: REGION_BOUNDS,
            minZoom: map.getMinZoom(),
            maxZoom: map.getMaxZoom(),
            zIndex: z,
            ...(ld.options || {}),
          });
          groupRef.current[ld.id] = layer;
          layer.addTo(map);
        } else {
          if (!map.hasLayer(layer)) layer.addTo(map);
          if (typeof layer.setZIndex === "function") layer.setZIndex(z);
        }
      }
    });

    // Apaga las que ya no están seleccionadas
    Object.keys(groupRef.current).forEach((id) => {
      if (!selectedLayers.has(id)) {
        const layer = groupRef.current[id];
        if (layer && map.hasLayer(layer)) map.removeLayer(layer);
      }
    });

    // Volar a la unión de bounds PMDU recién encendidas
    if (pmduUnion && pmduUnion.isValid && pmduUnion.isValid()) {
      map.flyToBounds(pmduUnion, {
        padding: [40, 40],
        maxZoom: 13,
        duration: 0.7,
      });
    }

    // Snapshot de ON para el siguiente render
    lastOnRef.current = currentOn;
  }, [visibleDefs, selectedLayers, zOverrides]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={mapDivRef} id="map" style={{ width: "100%", height: "100%" }} />
      <LegendDock legends={legends} />
    </div>
  );
}
