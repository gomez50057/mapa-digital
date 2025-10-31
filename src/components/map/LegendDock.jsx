"use client";
import styles from "./LegendDock.module.css";
import { SIMBOLOGIA } from "@/data/simbologia";

export default function LegendDock({ legends = [] }) {
  if (!legends.length) return null;
  return (
    <aside className={styles.legendDock} aria-label="Leyendas activas">
      <div className={styles.legendList} role="list">
        {legends.map(lg => {
          const rows = SIMBOLOGIA[lg.legendKey] || [];
          return (
            <section key={lg.id} className={styles.legendCard} role="listitem">
              {lg.legendTitle && <h4 className={styles.legendTitle}>{lg.legendTitle}</h4>}
              {rows.length ? (
                <table className={styles.table}>
                  <tbody>
                  {rows.map((r,i)=>(
                    <tr key={i}>
                      <td><span className={styles.color} style={{background:r.color}} /></td>
                      <td>{r.text}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              ) : (
                <div className={styles.empty}>Sin simbología definida</div>
              )}
            </section>
          );
        })}
      </div>
    </aside>
  );
}
