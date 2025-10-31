// src/data/customLayers.js
import L from "leaflet";

/* ==================== Utils seguros ==================== */
const fmtNum = (v) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n.toLocaleString("es-MX") : "—";
};
const fmtArea = (v) => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? `${n.toFixed(3)} km²` : "—";
};


/* ==================== ZMVM (por entidad) ==================== */
function buildZMVM(data, paneId) {
  return L.geoJSON(data, {
    pane: paneId,
    style: (feature) => {
      const ent = feature?.properties?.NOM_ENT;
      const color =
        ent === "Hidalgo" ? "#BC955B" :
          ent === "Estado de México" ? "#691B31" :
            ent === "Ciudad de México" ? "#3a9680" :
              "orange";
      return {
        fillColor: color,
        color,
        weight: 2.6,
        fillOpacity: 0.45
      };
    },
    pointToLayer: (feat, latlng) => L.circleMarker(latlng, { pane: paneId, radius: 6 }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties ?? {};
      const poblacionMun = fmtNum(p.POBMUN);
      const poblacionFem = fmtNum(p.POBFEM);
      const poblacionMas = fmtNum(p.POBMAS);
      const supMun = fmtArea(p.Superficie);
      const pobMetro = fmtNum(p.POBMETRO);

      const html =
        `<div class='PopupT'>${p.NOM_ENT ?? "Entidad"}</div>` +
        `<b>Nombre del Municipio:</b> ${p.NOM_MUN ?? "—"}` +
        `<br><b>Población Municipal:</b> ${poblacionMun}` +
        `<br><b>Mujeres:</b> ${poblacionFem}` +
        `<br><b>Hombres:</b> ${poblacionMas}` +
        `<br><b>Superficie:</b> ${supMun}` +
        `<br><b>Población Metropolitana:</b> ${pobMetro}`;

      layer.bindPopup(html);
    }
  });
}

/* ==================== ZMP / ZMT / ZMTUL (metropolitanas genéricas) ==================== */
function buildMetropolitana(data, paneId, fillColor, strokeColor, zonaLabel = "Zona Metropolitana") {
  return L.geoJSON(data, {
    pane: paneId,
    style: () => ({
      fillColor: fillColor,
      fillOpacity: 0.7,
      color: strokeColor,
      weight: 2
    }),
    pointToLayer: (feat, latlng) => L.circleMarker(latlng, { pane: paneId, radius: 6 }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties ?? {};
      const poblacionMun = fmtNum(p.POBMUN);
      const poblacionFem = fmtNum(p.POBFEM);
      const poblacionMas = fmtNum(p.POBMAS);
      const supMun = fmtArea(p.Superficie);
      const pobEst = fmtNum(p.POB_ESTATA);

      let html =
        `<div class='PopupT'><b>${zonaLabel} de</b> ${p.NO_Zona ?? "—"}</div>` +
        `<b>Municipio:</b> ${p.NOM_MUN ?? "—"}` +
        `<br><b>Población Municipal:</b> ${poblacionMun}` +
        `<br><b>Mujeres:</b> ${poblacionFem}` +
        `<br><b>Hombres:</b> ${poblacionMas}` +
        `<br><b>Superficie:</b> ${supMun}` +
        `<br><b>Población Metropolitana:</b> ${pobEst}` +
        `<div class='PopupSubT'><b>Instrumentos de Planeación</b></div>`;

      // PMDU
      const PMDU = p.PMDU ?? "—";
      if (PMDU !== "No existe" && p.LINKPMDU) {
        html += `<b>PMDU:</b> <a href='${p.LINKPMDU}' target='_blank'>${p.NOM_LINK_P ?? "Consultar"}</a> <b>(${p.FECH ?? "—"})</b>`;
      } else {
        html += `<b>PMDU:</b> ${PMDU}`;
      }

      // PMD
      if (p.LINKPMD) {
        html += `<br><b>PMD:</b> <a href='${p.LINKPMD}' target='_blank'><b> Consultar </b></a> <b>(${p.FECHPMD ?? "—"})</b>`;
      } else {
        html += `<br><b>PMD:</b> —`;
      }

      // ATLAS
      const ATLAS = p.ATLAS ?? "—";
      if (ATLAS !== "No existe" && p.LINKATLAS) {
        html += `<br><b>Atlas de Riesgos:</b> <a href='${p.LINKATLAS}' target='_blank'><b> Consultar </b></a> <b>(${p.FECHATLAS ?? "—"})</b>`;
      } else {
        html += `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;
      }

      layer.bindPopup(html);
    }
  });
}



export function buildInfoHgoLayer({ data, paneId, color = "#fff", layerName }) {
  return L.geoJSON(data, {
    pane: paneId,
    style: () => ({
      fillColor: "rgba(0, 0, 0, 0.4)",
      color: color,
      weight: 2.6,
      fillOpacity: 0.6
    }),
    onEachFeature: function (feature, layer) {
      const p = feature?.properties || {};
      const n = (x) => (typeof x === "number" ? x : Number(x));
      const fmt = (x) => (isFinite(n(x)) ? n(x).toLocaleString() : (x ?? "—"));

      const poblacionMun = fmt(p.POBMUN);
      const poblacionFem = fmt(p.POBFEM);
      const poblacionMas = fmt(p.POBMAS);
      const sup = isFinite(n(p.Superficie)) ? `${n(p.Superficie).toFixed(3)} km²` : (p.Superficie ?? "—");
      const pobEst = fmt(p.POB_ESTATA);

      const PMDU = p.PMDU ?? "No existe";
      const LINKPMDU = p.LINKPMDU;
      const PMD = p.PMD;
      const LINKPMD = p.LINKPMD;
      const ATLAS = p.ATLAS ?? "No existe";
      const LINKATLAS = p.LINKATLAS;

      const titulo = p.NOM_MUN || layerName || "Hidalgo";

      let html = `
        <div class='PopupT'>${titulo}</div>
        <b>Población Municipal:</b> ${poblacionMun}
        <br><b>Mujeres:</b> ${poblacionFem}
        <br><b>Hombres:</b> ${poblacionMas}
        <br><b>Superficie:</b> ${sup}
        <br><b>Población Estatal:</b> ${pobEst}
        <div class='PopupSubT'><b>Instrumentos de Planeación</b></div>
      `;

      // PMDU
      if (PMDU !== "No existe" && LINKPMDU) {
        html += `<b>PMDU:</b> <a href='${LINKPMDU}' target='_blank'>${p.NOM_LINK_P ?? "Consultar"}</a> <b>(</b>${p.FECH ?? ""}<b>)</b>`;
      } else {
        html += `<b>PMDU:</b> ${PMDU}`;
      }

      // PMD
      if (LINKPMD) {
        html += `<br><b>PMD:</b> <a href='${LINKPMD}' target='_blank'><b> Consultar </b></a> <b>(</b>${p.FECHPMD ?? ""}<b>)</b>`;
      }

      // ATLAS
      if (ATLAS !== "No existe" && LINKATLAS) {
        html += `<br><b>Atlas de Riesgos:</b> <a href='${LINKATLAS}' target='_blank'><b> Consultar </b></a> <b>(</b>${p.FECHATLAS ?? ""}<b>)</b>`;
      } else {
        html += `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;
      }

      layer.bindPopup(html);
      layer.on("click", (e) => layer.openPopup(e.latlng)); // tap/clic
    }
  });
}

export function buildEscPrivLayer({ data, paneId, layerDef }) {
  const stroke = "#7C3AED";
  const fill = "#7C3AED";

  return L.geoJSON(data, {
    pane: paneId,
    pointToLayer: (feat, latlng) =>
      L.circleMarker(latlng, {
        radius: 6,
        color: stroke,
        weight: 1.5,
        fillColor: fill,
        fillOpacity: 0.85
      }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties || {};
      const nombre = p.NOMBRE || p.nombre || layerDef?.name || "Escuela privada";
      const nivel = p.NIVEL || p.nivel || "—";
      const subs = p.SUBSISTEMA || p.subsistema || "Privado";
      const muni = p.MUNICIPIO || p.municipio || "—";
      const cct = p.CCT || p.CLAVE || "—";
      const sitio = p.SITIO || p.WEB || p.URL;

      const tooltip = `<div><b>${nombre}</b></div><div>Nivel: ${nivel}</div><div>Municipio: ${muni}</div>`;
      layer.bindTooltip(tooltip, { sticky: true });
      layer.on("click", (e) => layer.openTooltip(e.latlng));

      let html = `<div class='PopupT'>${nombre}</div>
        <b>Nivel:</b> ${nivel}
        <br><b>Subsistema:</b> ${subs}
        <br><b>Municipio:</b> ${muni}
        <br><b>CCT:</b> ${cct}`;
      if (sitio) {
        html += `<br><b>Sitio:</b> <a href='${sitio}' target='_blank'>${sitio}</a>`;
      }
      layer.bindPopup(html);
    }
  });
}

export const LAYER_BUILDERS = {
  "hgo_info_gen": (data, paneId, ld) => buildInfoHgoLayer({ data, paneId, color: "#fff", layerName: ld?.name }),
  "esc_priv_ms": (data, paneId, ld) => buildEscPrivLayer({ data, paneId, layerDef: ld }),
  // ZMVM con color por entidad
  zmvm_info: (data, paneId /*, ld */) => buildZMVM(data, paneId),

  // Metropolitana Pachuca
  zmpachuca_info: (data, paneId /*, ld */) =>
    buildMetropolitana(data, paneId, "#B6DC76", "transparent", "Zona Metropolitana"),

  // Metropolitana Tula
  zmtula_info: (data, paneId /*, ld */) =>
    buildMetropolitana(data, paneId, "Aqua", "transparent", "Zona Metropolitana"),

  // Metropolitana Tulancingo
  zmtulancingo_info: (data, paneId /*, ld */) =>
    buildMetropolitana(data, paneId, "#241E4E", "transparent", "Zona Metropolitana"),
};