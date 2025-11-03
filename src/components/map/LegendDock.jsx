"use client";
import styles from "./LegendDock.module.css";
import { SYMBOLOGY } from "@/data/simbologia";

/**
 * legends: Array de objetos con al menos { legendKey, title? }
 *   - legendKey: clave para buscar en SYMBOLOGY
 *   - title: título a mostrar en la tarjeta (fallback a legendKey)
 */
export default function LegendDock({ legends = [] }) {
  if (!Array.isArray(legends) || legends.length === 0) return null;

  return (
    <div className={styles.dock} aria-live="polite">
      {legends.map((g) => {
        const key = g.legendKey || g.key || g.id;
        const items = SYMBOLOGY[key] || [];
        const title = g.title || g.legendTitle || g.name || key;

        // Si no hay ítems, igual mostramos el título (pero sin lista).
        return (
          <section key={key} className={styles.card}>
            <header className={styles.header}>
              <span className={styles.headerDot} />
              <h4 className={styles.title}>{title}</h4>
            </header>

            {items.length > 0 && (
              <ul className={styles.list}>
                {items.map((it, i) => (
                  <li key={i} className={styles.row}>
                    <span
                      className={styles.swatch}
                      style={{ "--swatch": it.color }}
                      aria-hidden="true"
                    />
                    <span className={styles.label}>{it.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
