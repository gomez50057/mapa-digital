// ⚠️ Debe existir exactamente en src/data/simbologia.js
// Expone ambos nombres (SYMBOLOGY y SIMBOLOGIA) + export default, para compatibilidad.

export const SYMBOLOGY = {
  PMDU_Pachuca: [
    { color: "#c65911", text: "----" },
    { color: "#691B31", text: "En proceso de elaboración" },
    { color: "#DDC9A3", text: "Instrumento vigente" },
    { color: "#BC955B", text: "Instrumento vigente en proceso de actualización" },
    { color: "#98989A", text: "No existe" },
    { color: "#A02142", text: "Solicitado SEDATU" },
    { color: "#20344c", text: "Susceptible de elaborar" }
  ],

  PMDU_Tizayuca: [
    { color: "#d4e5b3", text: "Agricultura Tecnificada" },
    { color: "#d5d5b3", text: "Agroindustria" },
    { color: "#c9f8b3", text: "Conservación y Restauración Ambiental" },
    { color: "#ffccb3", text: "Corredor Urbano Mixto de Baja Densidad" },
    { color: "#ffe6b3", text: "Corredor Urbano Mixto de Media Densidad" },
    { color: "#80e2ff", text: "Cuerpos de Agua" },
    { color: "#ffb3ee", text: "Equipamiento Urbano" },
    { color: "#dbc6c2", text: "Habitacional Densidad Alta (Unifamiliar)" },
    { color: "#f1dfdc", text: "Habitacional Densidad Baja (Unifamiliar)" },
    { color: "#ead0cb", text: "Habitacional Densidad Media (Unifamiliar)" },
    { color: "#e8cdc8", text: "Habitacional Densidad Media Alta (Unifamiliar)" },
    { color: "#eed7d3", text: "Habitacional Densidad Media Baja (Unifamiliar)" },
    { color: "#d3c2bf", text: "Habitacional Densidad Alta (multifamiliar dúplex, tríplex y cuádruplex)" },
    { color: "#bdb8b7", text: "Habitacional Densidad Muy Alta 2" },
    { color: "#f4e7e4", text: "Habitacional Densidad Muy Baja (Unifamiliar)" },
    { color: "#f9ecff", text: "Industria de Bajo Impacto" },
    { color: "#dab3d3", text: "Industria de Gran Impacto" },
    { color: "#f5d5ff", text: "Industria de Mediano Impacto" },
    { color: "#b3bed5", text: "Infraestructura Urbana" },
    { color: "#d5b3b3", text: "Mixto" },
    { color: "#bed5b3", text: "Parque Hídrico" },
    { color: "#FF7F00", text: "Reserva Territorial Futura" }
  ],

  PMDU_VillaTezontepec: [
    { color: "#d4e5b3", text: "Agroindustria" },
    { color: "#d5d5b3", text: "Área Agrícola" },
    { color: "#c9f8b3", text: "Club de Golf" },
    { color: "#ffccb3", text: "Declaratoria de Destino 1999" },
    { color: "#ffe6b3", text: "Equipamiento" },
    { color: "#80e2ff", text: "Habitacional" },
    { color: "#ffb3ee", text: "Mixto" },
    { color: "#dbc6c2", text: "Parque Acuático" },
    { color: "#f1dfdc", text: "Parque Temático" },
    { color: "#ead0cb", text: "Proyecto PLATAH" },
    { color: "#e8cdc8", text: "Servicios" },
    { color: "#eed7d3", text: "Traza Urbana Actual" },
    { color: "#d3c2bf", text: "Zona de Amortiguamiento Verde" },
    { color: "#bdb8b7", text: "Zona de Preservación Ecológica" }
  ],

  PMDU_MR: [
    { color: "#ffa420", text: "Centro Urbano Mixto" },
    { color: "#e6c9b2", text: "Comercio y Servicios" },
    { color: "#c53131", text: "Equipamiento Institucional" },
    { color: "#e600aa", text: "Equipamiento Regional" },
    { color: "#e600aa", text: "Espacios Verdes y Abiertos" },
    { color: "#98e500", text: "Estructura Vial Propuesta" },
    { color: "#ffebb0", text: "Habitacional Hasta 50 Hab" },
    { color: "#ffffbe", text: "Habitacional Hasta 100 Hab" },
    { color: "#feff73", text: "Habitacional Hasta 200 Hab" },
    { color: "#ffff00", text: "Habitacional Hasta 300 Hab" },
    { color: "#e7e600", text: "Habitacional Hasta 400 Hab" },
    { color: "#ffc858", text: "Habitacional Hasta 500 Hab" },
    { color: "#f0bc59", text: "Habitacional Hasta 600 Hab" },
    { color: "#ff9159", text: "Habitacional Hasta 700 Hab" },
    { color: "#005be7", text: "Industrial Ligera No Contaminante" },
    { color: "#c6a258", text: "Polígono de Actuación" },
    { color: "#2596be", text: "Programas Parciales de Desarrollo Urbano" },
    { color: "#a3ff74", text: "Protección Agricola Temporal" },
    { color: "#00734c", text: "Protección Ecologíca Forestal" },
    { color: "#38a700", text: "Protección Pastizal Inducido" },
    { color: "#a58b5a", text: "Reserva" },
    { color: "#ff7f7e", text: "Servicios" },
    { color: "#f1d9d8", text: "Subcentro Urbano Mixto" },
    { color: "#9c9c9c", text: "Zona Sujeta a Estudio Hidrológico" },
    { color: "#e2e2ce", text: "ZSERPCE" }
  ],

  // ===== Epazoyucan =====
  PMDU_Epazoyucan_ZonSec: [
    { color: "#FFFFBE", text: "Habitacional Densidad Mínima (HD1)" },
    { color: "#FFFF73", text: "Habitacional Densidad Baja (HD2)" },
    { color: "#E6E600", text: "Habitacional Densidad Media (HD3)" },
    { color: "#FFD37F", text: "CSD1: Comercio y Servicios Densidad Mínima" },
    { color: "#FFAA00", text: "CSD2: Comercio y Servicios Densidad Baja" },
    { color: "#FF5500", text: "CSD3: Comercio y Servicios Densidad Media" },
    { color: "#DF73FF", text: "Industria Ligera (IL)" },
    { color: "#962142", text: "Agroindustria (AG)" },
    { color: "#FF3399", text: "Equipamiento Público (EQ)" },
    { color: "#FF66CC", text: "Equipamiento Privado (EQP)" },
    { color: "#A87000", text: "Polígono de Actuación (PA)" }
  ],

  PMDU_Epazoyucan_NoUrbano: [
    { color: "#A3FF73", text: "Aprovechamiento" },
    { color: "#58FB3F", text: "Aprovechamiento – Conservación" },
    { color: "#56AC2E", text: "Aprovechamiento – Restauración" },
    { color: "#A2F77E", text: "Conservación" },
    { color: "#00A884", text: "Conservación – Restauración" },
    { color: "#6CBA63", text: "Restauración" }
  ],

  PMDU_Epazoyucan_CP: [
    { color: "#A900E6", text: "CP Epazoyucan" },
    { color: "#000000", text: "CP San Juan Tizahuapan" },
    { color: "#FFAA00", text: "CP Santa Mónica" },
    { color: "#FF00C5", text: "CP Xochihuacán" }
  ]
};

// Alias en español para compatibilidad con importaciones antiguas
export const SIMBOLOGIA = SYMBOLOGY;

// Índice rápido: legendKey -> (legendItem -> objeto)
const LEGEND_INDEX = Object.fromEntries(
  Object.entries(SYMBOLOGY).map(([key, arr]) => [
    key,
    Object.fromEntries(arr.map((it) => [it.text, it]))
  ])
);

/** Devuelve { fill, stroke } a partir de (legendKey, legendItem) */
export function getLegendStyle(legendKey, legendItem) {
  const item = LEGEND_INDEX?.[legendKey]?.[legendItem];
  if (!item) return null;
  return { fill: item.color, stroke: item.stroke || item.color };
}

// Compat con `import simb from "@/data/simbologia"`
export default SYMBOLOGY;
