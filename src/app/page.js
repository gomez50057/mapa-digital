"use client";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import LayerTree from "@/components/LayerTree";
import { LAYERS_TREE } from "@/data/layersTree";
import styles from "./page.module.css";

const MapView = dynamic(() => import("@/components/map/MapView"), { ssr: false });

export default function Home() {
  /** =================== Estado principal =================== */
  const [selected, setSelected] = useState(new Map());     // id -> layerDef
  const [zOverrides, setZOverrides] = useState(new Map()); // id -> z

  /** Leyendas deduplicadas por legendKey, con orden “última arriba”. */
  // legendByKey: key -> { title, count, seq, items:Set<string>, extras:Array<{color,text}> }
  const legendSeq = useRef(0);
  const [legendByKey, setLegendByKey] = useState(new Map());

  /** =================== Helpers leyendas =================== */
  const addLegend = (def) => {
    if (!def?.hasLegend || !def.legendKey) return;
    setLegendByKey((prev) => {
      const next = new Map(prev);
      const rec = next.get(def.legendKey);
      if (rec) {
        rec.count += 1;
        if (def.legendItem) rec.items.add(def.legendItem);
        if (def.legendExtra && def.legendExtra.color && def.legendExtra.text) {
          rec.extras.push({ ...def.legendExtra });
        }
      } else {
        const items = new Set();
        if (def.legendItem) items.add(def.legendItem);
        next.set(def.legendKey, {
          title: def.legendTitle ?? def.name ?? def.legendKey,
          count: 1,
          seq: ++legendSeq.current,
          items,
          extras: def.legendExtra && def.legendExtra.color && def.legendExtra.text
            ? [{ ...def.legendExtra }]
            : []
        });
      }
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
      if (def.legendItem) rec.items.delete(def.legendItem);
      // Limpia extras no deterministas (opcional): aquí las dejamos
      if (rec.count <= 0) next.delete(def.legendKey);
      return new Map(next);
    });
  };

  /** =================== Carga de defaults =================== */
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

    // Inicializa leyendas con items por legendKey
    const init = new Map();
    let seq = 0;
    defaults.forEach((d) => {
      if (!d.hasLegend || !d.legendKey) return;
      if (!init.has(d.legendKey)) {
        init.set(d.legendKey, {
          title: d.legendTitle ?? d.name ?? d.legendKey,
          count: 1,
          seq: ++seq,
          items: new Set(d.legendItem ? [d.legendItem] : []),
          extras: d.legendExtra && d.legendExtra.color && d.legendExtra.text
            ? [{ ...d.legendExtra }]
            : []
        });
      } else {
        const r = init.get(d.legendKey);
        r.count += 1;
        if (d.legendItem) r.items.add(d.legendItem);
        if (d.legendExtra && d.legendExtra.color && d.legendExtra.text) {
          r.extras.push({ ...d.legendExtra });
        }
      }
    });
    legendSeq.current = seq;
    setLegendByKey(init);
  }, []);

  /** =================== Toggles =================== */
  // Toggle de capa individual (checkbox de hoja)
  const onToggleLayer = (layer) => {
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(layer.id)) {
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

  // Toggle masivo (checkbox de grupo): layers:Array<layerDef>, nextOn:boolean
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
      // Leyendas en lote
      setLegendByKey((prevLegend) => {
        const out = new Map(prevLegend);
        toAdd.forEach((def) => {
          if (!def.hasLegend || !def.legendKey) return;
          const r = out.get(def.legendKey);
          if (r) {
            r.count += 1;
            if (def.legendItem) r.items.add(def.legendItem);
            if (def.legendExtra && def.legendExtra.color && def.legendExtra.text) {
              r.extras.push({ ...def.legendExtra });
            }
            // Traer a tope esa leyenda por interacción reciente:
            r.seq = ++legendSeq.current;
          } else {
            const items = new Set();
            if (def.legendItem) items.add(def.legendItem);
            out.set(def.legendKey, {
              title: def.legendTitle ?? def.name ?? def.legendKey,
              count: 1,
              seq: ++legendSeq.current,
              items,
              extras: def.legendExtra && def.legendExtra.color && def.legendExtra.text
                ? [{ ...def.legendExtra }]
                : []
            });
          }
        });
        toDel.forEach((def) => {
          if (!def.hasLegend || !def.legendKey) return;
          const r = out.get(def.legendKey);
          if (!r) return;
          r.count -= 1;
          if (def.legendItem) r.items.delete(def.legendItem);
          if (r.count <= 0) out.delete(def.legendKey);
        });
        return new Map(out);
      });
      return next;
    });
  };

  /** =================== Z-order helpers =================== */
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

  /** =================== Derivados (memo) =================== */
  const selectedLayers = useMemo(() => selected, [selected]);

  // Leyenda final para LegendDock (orden: seq desc → la última activada arriba)
  const legendList = useMemo(() => {
    return [...legendByKey.entries()]
      .sort((a, b) => b[1].seq - a[1].seq)
      .map(([legendKey, rec]) => ({
        legendKey,
        title: rec.title,
        filterTexts: Array.from(rec.items || []), // filtra ítems de simbología a SOLO lo seleccionado
        extras: rec.extras || []
      }));
  }, [legendByKey]);

  /** =================== Render =================== */
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
        zMap={Object.fromEntries(
          [...selectedLayers.keys()].map((id) => [id, effectiveZ(id)])
        )}
      />

      <MapView
        selectedLayers={selectedLayers}
        zOverrides={zOverrides}
        legends={legendList}  // ✅ deduplicada + solo ítems seleccionados
      />
    </div>
  );
}
