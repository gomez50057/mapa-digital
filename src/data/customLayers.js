// src/data/customLayers.js
import L from "leaflet";
import { getLegendStyle } from "./simbologia";
import { GEOJSON_REGISTRY } from "./geojson"; // <-- necesario para usar los alias

/* ===== Helpers ===== */
const asNum = (v) => (typeof v === "number" ? v : Number(v));
const fmtHa = (v) => {
  const n = asNum(v);
  return Number.isFinite(n) ? `${n.toFixed(3)} ha` : "—";
};
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
        ent === "Ciudad de México" ? "#3a9680" : "orange";
      return { fillColor: color, color, weight: 2.6, fillOpacity: 0.45 };
    },
    pointToLayer: (feat, latlng) => L.circleMarker(latlng, { pane: paneId, radius: 6 }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties ?? {};
      const html =
        `<div class='PopupT'>${p.NOM_ENT ?? "Entidad"}</div>` +
        `<b>Nombre del Municipio:</b> ${p.NOM_MUN ?? "—"}` +
        `<br><b>Población Municipal:</b> ${fmtNum(p.POBMUN)}` +
        `<br><b>Mujeres:</b> ${fmtNum(p.POBFEM)}` +
        `<br><b>Hombres:</b> ${fmtNum(p.POBMAS)}` +
        `<br><b>Superficie:</b> ${fmtArea(p.Superficie)}` +
        `<br><b>Población Metropolitana:</b> ${fmtNum(p.POBMETRO)}`;
      layer.bindPopup(html);
    }
  });
}

/* ==================== Zonas metropolitanas genéricas ==================== */
function buildMetropolitana(data, paneId, fillColor, strokeColor, zonaLabel = "Zona Metropolitana") {
  return L.geoJSON(data, {
    pane: paneId,
    style: () => ({ fillColor, fillOpacity: 0.7, color: strokeColor, weight: 2 }),
    pointToLayer: (feat, latlng) => L.circleMarker(latlng, { pane: paneId, radius: 6 }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties ?? {};
      let html =
        `<div class='PopupT'><b>${zonaLabel} de</b> ${p.NO_Zona ?? "—"}</div>` +
        `<b>Municipio:</b> ${p.NOM_MUN ?? "—"}` +
        `<br><b>Población Municipal:</b> ${fmtNum(p.POBMUN)}` +
        `<br><b>Mujeres:</b> ${fmtNum(p.POBFEM)}` +
        `<br><b>Hombres:</b> ${fmtNum(p.POBMAS)}` +
        `<br><b>Superficie:</b> ${fmtArea(p.Superficie)}` +
        `<br><b>Población Metropolitana:</b> ${fmtNum(p.POB_ESTATA)}` +
        `<div class='PopupSubT'><b>Instrumentos de Planeación</b></div>`;
      const PMDU = p.PMDU ?? "—";
      if (PMDU !== "No existe" && p.LINKPMDU) {
        html += `<b>PMDU:</b> <a href='${p.LINKPMDU}' target='_blank'>${p.NOM_LINK_P ?? "Consultar"}</a> <b>(${p.FECH ?? "—"})</b>`;
      } else html += `<b>PMDU:</b> ${PMDU}`;
      if (p.LINKPMD) html += `<br><b>PMD:</b> <a href='${p.LINKPMD}' target='_blank'><b>Consultar</b></a> <b>(${p.FECHPMD ?? "—"})</b>`;
      else html += `<br><b>PMD:</b> —`;
      const ATLAS = p.ATLAS ?? "—";
      if (ATLAS !== "No existe" && p.LINKATLAS)
        html += `<br><b>Atlas de Riesgos:</b> <a href='${p.LINKATLAS}' target='_blank'><b>Consultar</b></a> <b>(${p.FECHATLAS ?? "—"})</b>`;
      else html += `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;
      layer.bindPopup(html);
    }
  });
}

/* ==================== Capas informativas Hgo / Escuelas ==================== */
export function buildInfoHgoLayer({ data, paneId, color = "#fff", layerName }) {
  return L.geoJSON(data, {
    pane: paneId,
    style: () => ({ fillColor: "rgba(0, 0, 0, 0.4)", color, weight: 2.6, fillOpacity: 0.6 }),
    onEachFeature: function (feature, layer) {
      const p = feature?.properties || {};
      const n = (x) => (typeof x === "number" ? x : Number(x));
      const fmt = (x) => (isFinite(n(x)) ? n(x).toLocaleString() : (x ?? "—"));
      const sup = isFinite(n(p.Superficie)) ? `${n(p.Superficie).toFixed(3)} km²` : (p.Superficie ?? "—");
      const PMDU = p.PMDU ?? "No existe";
      const ATLAS = p.ATLAS ?? "No existe";
      let html = `
        <div class='PopupT'>${p.NOM_MUN || layerName || "Hidalgo"}</div>
        <b>Población Municipal:</b> ${fmt(p.POBMUN)}
        <br><b>Mujeres:</b> ${fmt(p.POBFEM)}
        <br><b>Hombres:</b> ${fmt(p.POBMAS)}
        <br><b>Superficie:</b> ${sup}
        <br><b>Población Estatal:</b> ${fmt(p.POB_ESTATA)}
        <div class='PopupSubT'><b>Instrumentos de Planeación</b></div>
      `;
      if (PMDU !== "No existe" && p.LINKPMDU)
        html += `<b>PMDU:</b> <a href='${p.LINKPMDU}' target='_blank'>${p.NOM_LINK_P ?? "Consultar"}</a> <b>(</b>${p.FECH ?? ""}<b>)</b>`;
      else html += `<b>PMDU:</b> ${PMDU}`;
      if (p.LINKPMD)
        html += `<br><b>PMD:</b> <a href='${p.LINKPMD}' target='_blank'><b>Consultar</b></a> <b>(</b>${p.FECHPMD ?? ""}<b>)</b>`;
      if (ATLAS !== "No existe" && p.LINKATLAS)
        html += `<br><b>Atlas de Riesgos:</b> <a href='${p.LINKATLAS}' target='_blank'><b>Consultar</b></a> <b>(</b>${p.FECHATLAS ?? ""}<b>)</b>`;
      else html += `<br><b>Atlas de Riesgos:</b> ${ATLAS}`;
      layer.bindPopup(html);
      layer.on("click", (e) => layer.openPopup(e.latlng));
    }
  });
}

export function buildEscPrivLayer({ data, paneId, layerDef }) {
  const stroke = "#7C3AED";
  const fill = "#7C3AED";
  return L.geoJSON(data, {
    pane: paneId,
    pointToLayer: (feat, latlng) =>
      L.circleMarker(latlng, { radius: 6, color: stroke, weight: 1.5, fillColor: fill, fillOpacity: 0.85 }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties || {};
      const nombre = p.NOMBRE || p.nombre || layerDef?.name || "Escuela privada";
      const nivel = p.NIVEL || p.nivel || "—";
      const muni = p.MUNICIPIO || p.municipio || "—";
      const cct = p.CCT || p.CLAVE || "—";
      const sitio = p.SITIO || p.WEB || p.URL;
      layer.bindTooltip(`<div><b>${nombre}</b></div><div>Nivel: ${nivel}</div><div>Municipio: ${muni}</div>`, { sticky: true });
      layer.on("click", (e) => layer.openTooltip(e.latlng));
      let html = `<div class='PopupT'>${nombre}</div>
        <b>Nivel:</b> ${nivel}
        <br><b>Municipio:</b> ${muni}
        <br><b>CCT:</b> ${cct}`;
      if (sitio) html += `<br><b>Sitio:</b> <a href='${sitio}' target='_blank'>${sitio}</a>`;
      layer.bindPopup(html);
    }
  });
}

/* ==================== PMDU (polígonos) ==================== */
/** Soporta meta.fill/meta.stroke (o meta.color como fallback) y “relieve” opcional. */
function pmduPoly(data, paneId, ld, popupBuilder) {
  const sty = getLegendStyle(ld?.legendKey, ld?.legendItem) || {};
  const asLine = !!ld?.meta?.asLine;
  const weight = ld?.meta?.weight ?? (asLine ? 3 : 2.5);

  // Fallbacks que respetan meta.*, y si no, usan la leyenda
  const fillColor = asLine
    ? "transparent"
    : (ld?.meta?.fill || ld?.meta?.color || sty.fill || "#888");

  const strokeColor = ld?.meta?.stroke || ld?.meta?.color || sty.stroke || "#444";

  // “relieve” 3D para CSD1/2/3
  const isCSD = /^CSD[123]/.test(ld?.legendItem || "");
  const w = isCSD ? Math.max(weight, 3.5) : weight;

  return L.geoJSON(data, {
    pane: paneId,
    style: () => ({
      fillColor,
      fillOpacity: asLine ? 0.0 : 0.5,
      color: strokeColor,
      weight: w,
      className: isCSD ? "epz-3d" : ""
    }),
    onEachFeature: (feature, layer) => {
      const p = feature?.properties ?? {};
      if (popupBuilder) layer.bindPopup(popupBuilder(p));
    }
  });
}

/* ====== Popup builders ====== */
const popupPachuca = (p) =>
  `<div class='PopupSubT'><b>Etapas de Crecimiento</b></div>${p?.Name_1 ? `<b>Estatus:</b> ${p.Name_1}<br>` : ""}${
    p?.Ar ? `<b>Área:</b> ${fmtHa(p.Ar)}` : ""}`;

const popupTizayuca = (p) => {
  const keyMappings = { ZonSec: "Zona Sector" };
  let html = `<div class='PopupSubT'><b>${(p?.ZonSec2022 || "").toString().toUpperCase()}</b></div>`;
  for (const k in p) {
    if (!Object.hasOwn(p, k) || k === "ZonSec2022") continue;
    let v = p[k];
    const display = keyMappings[k] || k;
    if (k === "Superficie") v = fmtHa(v);
    if (k === "Plazo") html += `<b>${display}:</b> ${v}<p class='PopText'> Plazo</p><br>`;
    else html += `<b>${display}:</b> ${v}<br>`;
  }
  return html;
};

const popupVilla = (p) => {
  const keyMappings = { ZonSec: "Zona Sector" };
  let html = `<div class='PopupSubT'><b>${(p?.ZonSec || "").toString().toUpperCase()}</b></div>`;
  for (const k in p) {
    if (!Object.hasOwn(p, k) || k === "ZonSec" || k === "NOMGEO") continue;
    let v = p[k];
    const display = keyMappings[k] || k;
    if (k === "Superficie") v = fmtHa(v);
    html += `<b>${display}:</b> ${v}<br>`;
  }
  return html;
};

const popupMR = (p) => {
  let html = `<div class='PopupSubT'><b>${(p?.ZonSec || "").toString().toUpperCase()}</b></div>`;
  for (const k in p) {
    if (!Object.hasOwn(p, k)) continue;
    let v = p[k];
    if (k === "Superficie") v = fmtHa(v);
    if (k === "Etapa" && (v === null || v === undefined)) continue;
    html += `<b>${k}:</b> ${v}<br>`;
  }
  return html;
};

/** Epazoyucan — genérico: respeta Superficie, ignora campos de título duplicados */
const popupEpaz = (p) => {
  const title = (p?.ZonSec || p?.ZonSec2022 || p?.Uso || p?.USO || "").toString().toUpperCase();
  let html = `<div class='PopupSubT'><b>${title}</b></div>`;
  for (const k in p) {
    if (!Object.hasOwn(p, k)) continue;
    if (["ZonSec", "ZonSec2022", "Uso", "USO", "NOMGEO"].includes(k)) continue;
    let v = p[k];
    if (/(Superficie|Área|Area)/i.test(k)) {
      const n = Number(v); v = Number.isFinite(n) ? `${n.toFixed(3)} ha` : v;
    }
    html += `<b>${k}:</b> ${v}<br>`;
  }
  return html;
};

/* ====== Builders concretos ====== */
const buildPachuca   = (data, paneId, ld) => pmduPoly(data, paneId, ld, popupPachuca);
const buildTizayuca  = (data, paneId, ld) => pmduPoly(data, paneId, ld, popupTizayuca);
const buildVilla     = (data, paneId, ld) => pmduPoly(data, paneId, ld, popupVilla);
const buildMineralRef= (data, paneId, ld) => pmduPoly(data, paneId, ld, popupMR);
const buildEpaz      = (data, paneId, ld) => pmduPoly(data, paneId, ld, popupEpaz);

/* ====== Util ====== */
const mapFrom = (ids, fn) => ids.reduce((acc, id) => ((acc[id] = fn), acc), {});

/* ====== IDs por municipio ====== */
const IDS_PACHUCA = ["SUCLargoP", "SULargoP", "SUMedianoP", "SUCMedianoP"];

const IDS_TIZAYUCA = [
  "AgriTec", "AgriInd", "CRA", "CUMBD", "CUMMD", "CAGUA", "EUrb",
  "HDA_Unifamiliar", "HDB_Unifamiliar", "HDM_Unifamiliar", "HDMA_Unifamiliar", "HDMB_Unifamiliar",
  "HDMA_MdTC", "HDmA2", "HDmB_Uni", "IBI", "IGI", "IMI", "IUrb", "mixto", "ParqueHid", "RTF"
];

const IDS_VILLA = [
  "Villa_TUA", "Villa_agroindustria", "Villa_areaAgri", "Villa_golf", "Villa_declaratoria",
  "Villa_equipamiento", "Villa_habitacional", "Villa_parAcu", "Villa_parTer",
  "Villa_PLATAH", "Villa_servicios", "Villa_mixto", "Villa_ZAV", "Villa_ZPE"
];

const IDS_MR = [
  "MR_EVP", "MR_CUM", "MR_CS", "MR_EI", "MR_ER", "MR_EVA",
  "MR_H05", "MR_H1", "MR_H2", "MR_H3", "MR_H4", "MR_H5", "MR_H6", "MR_H7",
  "MR_ILNC", "MR_PA", "MR_PPDU", "MR_PAT", "MR_PEF", "MR_PPI",
  // "MR_Puente_bimodal","MR_Puente_multimodal",
  "MR_Reserva", "MR_Servicios", "MR_SUM", "MR_ZSEH", "MR_ZSERPCE"
];

/* === ALIAS para IDs con acento / nombres largos usados en layersTree === */
Object.assign(GEOJSON_REGISTRY, {
  // Zonificación Secundaria (Epazoyucan)
  "Habitacional_Densidad_Mínima_Epazoyucan": GEOJSON_REGISTRY.EPA_HD1,
  "Habitacional_Densidad_Baja_Epazoyucan":   GEOJSON_REGISTRY.EPA_HD2,
  "Habitacional_Densidad_Media_Epazoyucan":  GEOJSON_REGISTRY.EPA_HD3,
  "comercio_y_servicios_densidad_minima_Epazoyucan": GEOJSON_REGISTRY.EPA_CSD1,
  "comercio_y_servicios_densidad_baja_Epazoyucan":   GEOJSON_REGISTRY.EPA_CSD2,
  "comercio_y_servicios_densidad_media_Epazoyucan":  GEOJSON_REGISTRY.EPA_CSD3,
  "Industria_Ligera_Epazoyucan": GEOJSON_REGISTRY.EPA_IL,
  "agroindustria_Epazoyucan":    GEOJSON_REGISTRY.EPA_AG,
  "Equipamiento_Publico_Epazoyucan":  GEOJSON_REGISTRY.EPA_EQ,
  "Equipamiento_Privado_Epazoyucan":  GEOJSON_REGISTRY.EPA_EQP,
  "poligonoDeActuacion_Epazoyuca_Epazoyucan": GEOJSON_REGISTRY.EPA_PA,

  // Uso no Urbano (Epazoyucan)
  "Aprovechamiento_Epazoyucan":               GEOJSON_REGISTRY.EPA_APROV,
  "Aprovechamiento_conservacion_Epazoyucan":  GEOJSON_REGISTRY.EPA_APROV_CONS,
  "Aprovechamiento_restauracion_Epazoyucan":  GEOJSON_REGISTRY.EPA_APROV_RES,
  "Conservacion_Epazoyuca":                   GEOJSON_REGISTRY.EPA_CONS,
  "Conservacion_restauracion_Epazoyucan":     GEOJSON_REGISTRY.EPA_CONS_RES,
  "Restauracion_Epazoyucan":                  GEOJSON_REGISTRY.EPA_RES,

  // Centros de Población (Epazoyucan)
  "CP_Epazoyucan":      GEOJSON_REGISTRY.EPA_CP_EPAZ,
  "CP_San_Juan_Tizahuapan": GEOJSON_REGISTRY.EPA_CP_SJT,
  "CP_Santa_Mónica":    GEOJSON_REGISTRY.EPA_CP_SM,
  "CP_Xochihuacán":     GEOJSON_REGISTRY.EPA_CP_XOCHI,
});

/* Reemplaza tu IDS_EPAZ por ESTE (coincide con layersTree) */
const IDS_EPAZ = [
  // Zonificación Secundaria
  "Habitacional_Densidad_Mínima_Epazoyucan",
  "Habitacional_Densidad_Baja_Epazoyucan",
  "Habitacional_Densidad_Media_Epazoyucan",
  "comercio_y_servicios_densidad_minima_Epazoyucan",
  "comercio_y_servicios_densidad_baja_Epazoyucan",
  "comercio_y_servicios_densidad_media_Epazoyucan",
  "Industria_Ligera_Epazoyucan",
  "agroindustria_Epazoyucan",
  "Equipamiento_Publico_Epazoyucan",
  "Equipamiento_Privado_Epazoyucan",
  "poligonoDeActuacion_Epazoyuca_Epazoyucan",

  // Uso no Urbano
  "Aprovechamiento_Epazoyucan",
  "Aprovechamiento_conservacion_Epazoyucan",
  "Aprovechamiento_restauracion_Epazoyucan",
  "Conservacion_Epazoyuca",
  "Conservacion_restauracion_Epazoyucan",
  "Restauracion_Epazoyucan",

  // Centros de Población
  "CP_Epazoyucan",
  "CP_San_Juan_Tizahuapan",
  "CP_Santa_Mónica",
  "CP_Xochihuacán"
];

/* ====== Export Builders ====== */
export const LAYER_BUILDERS = {
  // Info general / Escuelas / Zonas Metro
  hgo_info_gen: (data, paneId, ld) => buildInfoHgoLayer({ data, paneId, color: "#fff", layerName: ld?.name }),
  esc_priv_ms: (data, paneId, ld) => buildEscPrivLayer({ data, paneId, layerDef: ld }),
  zmvm_info: (data, paneId) => buildZMVM(data, paneId),
  zmpachuca_info: (data, paneId) => buildMetropolitana(data, paneId, "#B6DC76", "transparent", "Zona Metropolitana"),
  zmtula_info: (data, paneId) => buildMetropolitana(data, paneId, "Aqua", "transparent", "Zona Metropolitana"),
  zmtulancingo_info: (data, paneId) => buildMetropolitana(data, paneId, "#241E4E", "transparent", "Zona Metropolitana"),

  // PMDU
  ...mapFrom(IDS_PACHUCA, buildPachuca),
  ...mapFrom(IDS_TIZAYUCA, buildTizayuca),
  ...mapFrom(IDS_VILLA, buildVilla),
  ...mapFrom(IDS_MR, buildMineralRef),
  ...mapFrom(IDS_EPAZ, buildEpaz),
};