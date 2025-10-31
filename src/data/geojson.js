import { HgoInfoGen } from "./base";
import { escMediaSupPrivada } from "./educacionHidalgo";


export const GEOJSON_REGISTRY = {
  HGO_INFO_GEN: HgoInfoGen,
  ESC_PRIV_MS: escMediaSupPrivada,   // ← nuevo

  CALLES_P: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { nombre: "Av. Principal", tipo: "primaria" },
        geometry: {
          type: "LineString",
          coordinates: [
            [-99.2005, 20.1001],
            [-99.195, 20.102],
            [-99.190, 20.104]
          ]
        }
      }
    ]
  },
  CALLES_S: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { nombre: "Calle 2", tipo: "secundaria" },
        geometry: {
          type: "LineString",
          coordinates: [
            [-99.199, 20.101],
            [-99.197, 20.103]
          ]
        }
      }
    ]
  },
  ZONAS_PROT: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { nombre: "Área Protegida A", categoria: "AP" },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-99.205, 20.095],
            [-99.190, 20.095],
            [-99.190, 20.105],
            [-99.205, 20.105],
            [-99.205, 20.095]
          ]]
        }
      }
    ]
  },
  PUNTOS_DEMO: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { nombre: "Marcador A", tipo: "demo" },
        geometry: {
          type: "Point",
          coordinates: [-99.1975, 20.1005]
        }
      }
    ]
  }
};
