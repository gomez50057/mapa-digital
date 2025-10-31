export const LAYERS_TREE = [
  {
    id: "cat_infra",
    name: "Infraestructura",
    children: [
      {
        id: "subcat_vias",
        name: "Vías",
        children: [
          {
            id: "subsubcat_calles",
            name: "Calles",
            layers: [
              {
                id: "calles_principales",
                name: "Calles principales",
                type: "vector",
                geojsonId: "CALLES_P",
                hasLegend: true,
                legendKey: "calles",
                legendTitle: "Calles principales",
                defaultVisible: true,
                defaultZ: 420
              },
              {
                id: "calles_secundarias",
                name: "Calles secundarias",
                type: "vector",
                geojsonId: "CALLES_S",
                hasLegend: true,
                legendKey: "calles_sec",
                legendTitle: "Calles secundarias",
                defaultVisible: false,
                defaultZ: 410
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cat_ambiente",
    name: "Medio ambiente",
    children: [
      {
        id: "subcat_uso_suelo",
        name: "Uso de suelo",
        children: [
          {
            id: "subsubcat_zonas",
            name: "Zonas",
            layers: [
              {
                id: "zonas_protegidas",
                name: "Zonas protegidas",
                type: "vector",
                geojsonId: "ZONAS_PROT",
                hasLegend: true,
                legendKey: "zonas",
                legendTitle: "Zonas protegidas",
                defaultVisible: false,
                defaultZ: 500
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cat_extra",
    name: "Extra (4º nivel demo)",
    children: [
      {
        id: "lvl2",
        name: "Nivel 2",
        children: [
          {
            id: "lvl3",
            name: "Nivel 3",
            children: [
              {
                id: "lvl4",
                name: "Nivel 4 (hojas)",
                layers: [
                  {
                    id: "demo_puntos",
                    name: "Puntos de ejemplo",
                    type: "vector",
                    geojsonId: "PUNTOS_DEMO",
                    hasLegend: true,
                    legendKey: "puntos",
                    legendTitle: "Puntos de ejemplo",
                    defaultVisible: false,
                    defaultZ: 600
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cat_hidalgo",
    name: "Hidalgo",
    layers: [
      {
        id: "hgo_info_gen",
        name: "Info general (municipios)",
        type: "vector",
        geojsonId: "HGO_INFO_GEN",
        hasLegend: false,
        legendKey: "hidalgo",
        legendTitle: "Hidalgo - Info general",
        defaultVisible: true,
        defaultZ: 200
      },
      {
        id: "esc_priv_ms",
        name: "Escuelas Privadas",
        type: "vector",
        geojsonId: "ESC_PRIV_MS",
        hasLegend: false,
        legendKey: "escuelas_privadas",
        legendTitle: "Escuelas Privadas (media y superior)",
        defaultVisible: false,
        defaultZ: 210
      }
    ]
  },






  

];
