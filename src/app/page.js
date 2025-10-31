"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import LayerTree from "@/components/LayerTree";
import { LAYERS_TREE } from "@/data/layersTree";
import styles from "./page.module.css";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });

export default function Home() {
  const [selected, setSelected] = useState(new Map());
  const [legendStack, setLegendStack] = useState([]);
  const [zOverrides, setZOverrides] = useState(new Map());

  // Cargar defaults visibles (una vez)
  useEffect(() => {
    const defs = [];
    const scan = (node) => {
      if (node.layers) node.layers.forEach(l => { if (l.defaultVisible) defs.push(l); });
      (node.children || []).forEach(scan);
    };
    LAYERS_TREE.forEach(scan);

    const map = new Map();
    defs.forEach(d => map.set(d.id, d));
    setSelected(map);

    const legends = defs.filter(d => d.hasLegend).reverse();
    setLegendStack(legends);
  }, []);

  // Helper: zIndex efectivo (usa overrides si existen)
  const getZ = (id, overrides = zOverrides, sel = selected) => {
    const def = sel.get(id);
    return overrides.get?.(id) ?? (def?.defaultZ ?? 400);
  };

  const onToggleLayer = (layer) => {
    setSelected(prev => {
      const next = new Map(prev);
      if (next.has(layer.id)) {
        next.delete(layer.id);
        setLegendStack(ls => ls.filter(l => l.id !== layer.id));
        setZOverrides(z => { const m = new Map(z); m.delete(layer.id); return m; });
      } else {
        next.set(layer.id, layer);
        if (layer.hasLegend) {
          setLegendStack(ls => [layer, ...ls.filter(l => l.id !== layer.id)]);
        }
      }
      return next;
    });
  };

  // ▲ / ▼ (Shift = salto ±500)
  const bumpZ = (layerId, delta = 100) => {
    setZOverrides(prev => {
      const next = new Map(prev);
      const current = getZ(layerId, prev);
      next.set(layerId, current + delta);
      return next;
    });
  };

  // ⤒ (al tope)
  const moveTop = (layerId) => {
    setZOverrides(prev => {
      const ids = [...selected.keys()];
      const max = ids.reduce((acc, id) => Math.max(acc, getZ(id, prev)), -Infinity);
      const next = new Map(prev);
      next.set(layerId, (Number.isFinite(max) ? max : 400) + 100);
      return next;
    });
  };

  // ⤓ (al fondo)
  const moveBottom = (layerId) => {
    setZOverrides(prev => {
      const ids = [...selected.keys()];
      const min = ids.reduce((acc, id) => Math.min(acc, getZ(id, prev)), Infinity);
      const next = new Map(prev);
      next.set(layerId, (Number.isFinite(min) ? min : 400) - 100);
      return next;
    });
  };

  // z exacto (Enter o blur)
  const setZExact = (layerId, value) => {
    const v = Number(value);
    if (!Number.isFinite(v)) return;
    setZOverrides(prev => {
      const next = new Map(prev);
      next.set(layerId, v);
      return next;
    });
  };

  const zMap = useMemo(() => {
    const out = {};
    for (const id of selected.keys()) {
      out[id] = zOverrides.get(id) ?? (selected.get(id)?.defaultZ ?? 400);
    }
    return out;
  }, [selected, zOverrides]);
  const selectedLayers = useMemo(() => selected, [selected]);

  return (
    <div className={styles.layout}>
      <LayerTree
        tree={LAYERS_TREE}
        selected={new Set([...selectedLayers.keys()])}
        onToggle={onToggleLayer}
        onZUp={(id, fast) => bumpZ(id, fast ? 500 : 100)}     // ▲ (Shift = +500)
        onZDown={(id, fast) => bumpZ(id, fast ? -500 : -100)} // ▼ (Shift = -500)
        onZTop={moveTop}                                       // ⤒ tope
        onZBottom={moveBottom}                                 // ⤓ fondo
        onZSet={setZExact}                                     // input numérico
        zMap={zMap}
      />
      <MapView
        selectedLayers={selectedLayers}
        zOverrides={zOverrides}
        legends={legendStack}
      />
    </div>
  );
}
