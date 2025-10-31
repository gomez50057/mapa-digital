"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./LayerTree.module.css";

/* ===================== Helpers ===================== */
function isLeaf(node){
  return node && node.id && !node.children && !node.layers;
}

/* ===================== ToolsMenu ===================== */
function ToolsMenu({ id, zCurrent = 400, onZTop, onZUp, onZDown, onZBottom, onZSet }) {
  const min = -1000, max = 2000, step = 10;
  const [val, setVal] = useState(zCurrent);
  const detailsRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => { setVal(zCurrent); }, [zCurrent]);

  // Auto-posiciona el panel para que no se salga de la pantalla
  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    const onToggle = () => {
      if (!el.open) return;
      const panel = panelRef.current;
      if (!panel) return;

      // limpia posición anterior
      el.dataset.pos = "";
      const rect = panel.getBoundingClientRect();
      const vw = window.innerWidth, vh = window.innerHeight;
      const margin = 8;
      const pos = [];
      if (rect.right > vw - margin) pos.push("left");
      if (rect.bottom > vh - margin) pos.push("up");
      el.dataset.pos = pos.join(" "); // "", "left", "up", "left up"
    };
    el.addEventListener("toggle", onToggle);
    return () => el.removeEventListener("toggle", onToggle);
  }, []);

  const filledPct = ((val - min) * 100) / (max - min);

  return (
    <details
      ref={detailsRef}
      className={styles.tools}
      onClick={(e)=>e.stopPropagation()}
    >
      <summary
        className={styles.toolsBtn}
        aria-label="Herramientas de orden"
        onMouseDown={(e)=>{ e.preventDefault(); e.stopPropagation(); }}
      >
        {/* Icono tuerca */}
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M12 15.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7m8.94-2.61l-1.66.96c.04.36.07.72.07 1.09s-.03.73-.07 1.09l1.66.96c.19.11.27.35.18.56a9.984 9.984 0 0 1-2.01 3.48c-.15.17-.39.21-.58.1l-1.66-.96c-.57.46-1.2.83-1.88 1.12l-.25 1.91c-.03.22-.22.39-.45.39h-4c-.23 0-.42-.17-.45-.39l-.25-1.91c-.68-.29-1.31-.66-1.88-1.12l-1.66.96c-.19.11-.43.07-.58-.1a9.984 9.984 0 0 1-2.01-3.48a.46.46 0 0 1 .18-.56l1.66-.96A8.74 8.74 0 0 1 3 15.98c0-.37.03-.73.07-1.09l-1.66-.96a.46.46 0 0 1-.18-.56a9.984 9.984 0 0 1 2.01-3.48c.15-.17.39-.21.58-.1l1.66.96c.57-.46 1.2-.83 1.88-1.12l1.66-.96c.19-.11.43-.07.58.1a9.984 9.984 0 0 1 2.01 3.48c.09.21.01.45-.18.56" />
        </svg>
      </summary>

      <div
        ref={panelRef}
        className={styles.toolsPanel}
        onClick={(e)=>e.stopPropagation()}
      >
        {/* Slider + badge */}
        <div className={styles.toolsRow}>
          <input
            type="range"
            min={-1000}
            max={2000}
            step={10}
            value={val}
            onChange={(e)=> setVal(Number(e.target.value))}
            onPointerUp={()=> onZSet(id, val)}
            onKeyDown={(e)=>{ if (e.key === "Enter") onZSet(id, val); }}
            className={styles.zslider}
            style={{ "--filled": `${((val - (-1000)) * 100) / (2000 - (-1000))}%` }}
          />
          <span className={styles.zbadge}>z:{val}</span>
        </div>

        {/* Botones */}
        <div className={styles.toolsRow}>
          <button type="button" title="Traer al frente (Top)" onClick={()=>onZTop(id)}>⤒</button>
          <button type="button" title="Subir (▲). Shift = +500" onClick={(e)=>onZUp(id, e.shiftKey)}>▲</button>
          <button type="button" title="Bajar (▼). Shift = -500" onClick={(e)=>onZDown(id, e.shiftKey)}>▼</button>
          <button type="button" title="Enviar atrás (Bottom)" onClick={()=>onZBottom(id)}>⤓</button>
        </div>

        {/* z exacto */}
        <div className={styles.toolsRow}>
          <input
            type="number"
            className={styles.zinput}
            placeholder="z exacto"
            value={val}
            onChange={(e)=> setVal(Number(e.target.value || 0))}
            onBlur={(e)=>{ if (e.currentTarget.value !== "") onZSet(id, Number(e.currentTarget.value)); }}
            onKeyDown={(e)=>{ if (e.key === "Enter") onZSet(id, Number(e.currentTarget.value)); }}
          />
        </div>

        <div className={styles.toolsHint}>Tip: usa Shift para saltar ±500</div>
      </div>
    </details>
  );
}

/* ===================== Nodo del árbol ===================== */
function Node({
  node,
  level = 1,
  selected = new Set(),
  onToggle = () => {},
  onZUp = () => {},
  onZDown = () => {},
  onZTop = () => {},
  onZBottom = () => {},
  onZSet = () => {},
  zMap = {},
}) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const hasLayers = Array.isArray(node.layers) && node.layers.length > 0;

  if (!isLeaf(node)) {
    return (
      <div className={styles.node} data-level={level}>
        <details open className={styles.group}>
          <summary className={styles.summary}>{node.name}</summary>

          {/* subcarpetas */}
          {hasChildren && node.children.map((ch) => (
            <Node
              key={ch.id || ch.name}
              node={ch}
              level={Math.min(level + 1, 4)}
              selected={selected}
              onToggle={onToggle}
              onZUp={onZUp}
              onZDown={onZDown}
              onZTop={onZTop}
              onZBottom={onZBottom}
              onZSet={onZSet}
              zMap={zMap}
            />
          ))}

          {/* hojas (capas) */}
          {hasLayers && node.layers.map((layer) => {
            const isOn = selected.has(layer.id);
            return (
              <div key={layer.id} className={styles.leaf}>
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() => onToggle(layer)}
                />
                <span>{layer.name}</span>
                <span className={styles.zval}>z:{zMap?.[layer.id] ?? (layer.defaultZ ?? 400)}</span>

                <ToolsMenu
                  id={layer.id}
                  zCurrent={zMap?.[layer.id] ?? (layer.defaultZ ?? 400)}
                  onZTop={onZTop}
                  onZUp={onZUp}
                  onZDown={onZDown}
                  onZBottom={onZBottom}
                  onZSet={onZSet}
                />
              </div>
            );
          })}
        </details>
      </div>
    );
  }

  // Hoja suelta (node es la capa)
  const isOn = selected.has(node.id);
  return (
    <div className={styles.leaf}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => onToggle(node)}
      />
      <span>{node.name}</span>
      <span className={styles.zval}>z:{zMap?.[node.id] ?? (node.defaultZ ?? 400)}</span>

      <ToolsMenu
        id={node.id}
        zCurrent={zMap?.[node.id] ?? (node.defaultZ ?? 400)}
        onZTop={onZTop}
        onZUp={onZUp}
        onZDown={onZDown}
        onZBottom={onZBottom}
        onZSet={onZSet}
      />
    </div>
  );
}

/* ===================== Default export ===================== */
export default function LayerTree({
  tree = [],
  selected = new Set(),
  onToggle = () => {},
  onZUp = () => {},
  onZDown = () => {},
  onZTop = () => {},
  onZBottom = () => {},
  onZSet = () => {},
  zMap = {},
}) {
  return (
    <aside className={styles.sidebar}>
      {tree.map((root) => (
        <Node
          key={root.id || root.name}
          node={root}
          level={1}
          selected={selected}
          onToggle={onToggle}
          onZUp={onZUp}
          onZDown={onZDown}
          onZTop={onZTop}
          onZBottom={onZBottom}
          onZSet={onZSet}
          zMap={zMap}
        />
      ))}
    </aside>
  );
}
