"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import LayerTree from "@/components/LayerTree";
import { LAYERS_TREE } from "@/data/layersTree";
import styles from "./page.module.css";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });

export default function Home() {
  const [selected, setSelected] = useState(new Map());
  const [zOverrides, setZOverrides] = useState(new Map());

  /** Leyendas deduplicadas por legendKey */
  // key -> { title, count, seq } ; seq asegura orden apilado (última arriba)
  const legendSeq = useRef(0);
  const [legendByKey, setLegendByKey] = useState(new Map());

  const addLegend = (def) => {
    if (!def?.hasLegend || !def.legendKey) return;
    setLegendByKey((prev) => {
      const next = new Map(prev);
      const rec = next.get(def.legendKey);
      if (rec) rec.count += 1;
      else next.set(def.legendKey, { title: def.legendTitle ?? def.name, count: 1, seq: ++legendSeq.current });
      return new Map(next);
    });
  };
  const removeLegend = (def) => {
    if (!def?.hasLegend || !def.legendKey) return;
    setLegendByKey((prev) => {
      const next = new Map(prev);
      const rec = next.get(def.legendKey);
      if (!rec) return prev;
      rec.count -= 1;
      if (rec.count <= 0) next.delete(def.legendKey);
      return new Map(next);
    });
  };

  /** Cargar visibles por defecto y sus leyendas (deduplicadas) */
  useEffect(() => {
    const defaults = [];
    const scan = (n) => {
      if (n.layers) n.layers.forEach((l) => { if (l.defaultVisible) defaults.push(l); });
      (n.children || []).forEach(scan);
    };
    LAYERS_TREE.forEach(scan);

    const mapSel = new Map();
    defaults.forEach((d) => mapSel.set(d.id, d));
    setSelected(mapSel);

    const init = new Map();
    let seq = 0;
    defaults.forEach((d) => {
      if (d.hasLegend && d.legendKey) {
        const r = init.get(d.legendKey);
        if (r) r.count += 1;
        else init.set(d.legendKey, { title: d.legendTitle ?? d.name, count: 1, seq: ++seq });
      }
    });
    legendSeq.current = seq;
    setLegendByKey(init);
  }, []);

  /** Toggle 1 capa */
  const onToggleLayer = (layer) => {
    setSelected((prev) => {
      const next = new Map(prev);
      const wasOn = next.has(layer.id);
      if (wasOn) {
        next.delete(layer.id);
        removeLegend(layer);
        setZOverrides((z) => { const m = new Map(z); m.delete(layer.id); return m; });
      } else {
        next.set(layer.id, layer);
        addLegend(layer);
      }
      return next;
    });
  };

  /** Toggle masivo (checkbox de grupo) */
  const onToggleMany = (layers, nextOn) => {
    setSelected((prev) => {
      const next = new Map(prev);
      const toAdd = [];
      const toDel = [];
      for (const l of layers) {
        const isOn = next.has(l.id);
        if (nextOn && !isOn) { next.set(l.id, l); toAdd.push(l); }
        if (!nextOn && isOn) { next.delete(l.id); toDel.push(l); }
      }
      // actualiza leyendas en lote
      setLegendByKey((prevLegend) => {
        const out = new Map(prevLegend);
        toAdd.forEach((def) => {
          if (!def.hasLegend || !def.legendKey) return;
          const r = out.get(def.legendKey);
          if (r) r.count += 1;
          else out.set(def.legendKey, { title: def.legendTitle ?? def.name, count: 1, seq: ++legendSeq.current });
        });
        toDel.forEach((def) => {
          if (!def.hasLegend || !def.legendKey) return;
          const r = out.get(def.legendKey);
          if (!r) return;
          r.count -= 1;
          if (r.count <= 0) out.delete(def.legendKey);
        });
        return new Map(out);
      });
      return next;
    });
  };

  /** Z-order helpers (compatibles con ToolsMenu) */
  const effectiveZ = (id) => {
    const def = selected.get(id);
    if (!def) return 400;
    return zOverrides.get(id) ?? def.defaultZ ?? 400;
    };
  const bumpZ = (id, delta = 100) => {
    setZOverrides((prev) => {
      const next = new Map(prev);
      next.set(id, effectiveZ(id) + delta);
      return next;
    });
  };
  const moveTop = (id) => {
    const ids = [...selected.keys()];
    const max = ids.reduce((acc, k) => Math.max(acc, effectiveZ(k)), 400);
    setZOverrides((prev) => {
      const next = new Map(prev);
      next.set(id, max + 100);
      return next;
    });
  };
  const moveBottom = (id) => {
    const ids = [...selected.keys()];
    const min = ids.reduce((acc, k) => Math.min(acc, effectiveZ(k)), 400);
    setZOverrides((prev) => {
      const next = new Map(prev);
      next.set(id, min - 100);
      return next;
    });
  };
  const setZExact = (id, value) => {
    const v = Number(value);
    if (Number.isFinite(v)) {
      setZOverrides((prev) => {
        const next = new Map(prev);
        next.set(id, v);
        return next;
      });
    }
  };

  /** Lista deduplicada para LegendDock: [{key,title}] (orden: más reciente arriba) */
  const legendList = useMemo(
    () => Array.from(legendByKey.entries())
      .sort((a, b) => b[1].seq - a[1].seq)
      .map(([key, { title }]) => ({ key, title })),
    [legendByKey]
  );

  /** Seleccion actual (Map) como memo */
  const selectedLayers = useMemo(() => selected, [selected]);

  return (
    <div className={styles.layout}>
      <LayerTree
        tree={LAYERS_TREE}
        selected={new Set([...selectedLayers.keys()])}
        onToggle={onToggleLayer}
        onToggleMany={onToggleMany}
        onZUp={(id, fast) => bumpZ(id, fast ? 500 : 100)}
        onZDown={(id, fast) => bumpZ(id, fast ? -500 : -100)}
        onZTop={moveTop}
        onZBottom={moveBottom}
        onZSet={setZExact}
        zMap={Object.fromEntries([...selectedLayers.keys()].map((id)=>[id, effectiveZ(id)]))}
      />

      <MapView
        selectedLayers={selectedLayers}
        zOverrides={zOverrides}
        legends={legendList}  
      />
    </div>
  );
}
