export const LAYERS_TREE = [
  // {
  //   id: "cat_infra",
  //   name: "Infraestructura",
  //   children: [
  //     {
  //       id: "subcat_vias",
  //       name: "Vías",
  //       children: [
  //         {
  //           id: "subsubcat_calles",
  //           name: "Calles",
  //           layers: [
  //             {
  //               id: "calles_principales",
  //               name: "Calles principales",
  //               type: "vector",
  //               geojsonId: "CALLES_P",
  //               hasLegend: true,
  //               legendKey: "calles",
  //               legendTitle: "Calles principales",
  //               defaultVisible: true,
  //               defaultZ: 420
  //             },
  //             {
  //               id: "calles_secundarias",
  //               name: "Calles secundarias",
  //               type: "vector",
  //               geojsonId: "CALLES_S",
  //               hasLegend: true,
  //               legendKey: "calles_sec",
  //               legendTitle: "Calles secundarias",
  //               defaultVisible: false,
  //               defaultZ: 410
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "cat_ambiente",
  //   name: "Medio ambiente",
  //   children: [
  //     {
  //       id: "subcat_uso_suelo",
  //       name: "Uso de suelo",
  //       children: [
  //         {
  //           id: "subsubcat_zonas",
  //           name: "Zonas",
  //           layers: [
  //             {
  //               id: "zonas_protegidas",
  //               name: "Zonas protegidas",
  //               type: "vector",
  //               geojsonId: "ZONAS_PROT",
  //               hasLegend: true,
  //               legendKey: "zonas",
  //               legendTitle: "Zonas protegidas",
  //               defaultVisible: false,
  //               defaultZ: 500
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "cat_extra",
  //   name: "Extra (4º nivel demo)",
  //   children: [
  //     {
  //       id: "lvl2",
  //       name: "Nivel 2",
  //       children: [
  //         {
  //           id: "lvl3",
  //           name: "Nivel 3",
  //           children: [
  //             {
  //               id: "lvl4",
  //               name: "Nivel 4 (hojas)",
  //               layers: [
  //                 {
  //                   id: "demo_puntos",
  //                   name: "Puntos de ejemplo",
  //                   type: "vector",
  //                   geojsonId: "PUNTOS_DEMO",
  //                   hasLegend: true,
  //                   legendKey: "puntos",
  //                   legendTitle: "Puntos de ejemplo",
  //                   defaultVisible: false,
  //                   defaultZ: 600
  //                 }
  //               ]
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // },
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

  {
    id: "cat_instrumentos",
    name: "Instrumentos de Planeación",
    children: [
      /* ==================== Pachuca de Soto ==================== */
      {
        id: "pachuca",
        name: "Pachuca de Soto",
        children: [
          {
            id: "pachuca_pmdu",
            name: "PMDU",
            children: [
              {
                id: "pachuca_etapas",
                name: "Etapas de Crecimiento",
                layers: [
                  {
                    id: "SUCLargoP",
                    name: "SUCLargoP",
                    type: "vector",
                    geojsonId: "SUCLargoP",
                    hasLegend: true,
                    legendKey: "PMDU_Pachuca",
                    legendTitle: "Pachuca — PMDU (Etapas)",
                    defaultVisible: false,
                    defaultZ: 520,
                    meta: { color: "#eeef5d" }
                  },
                  {
                    id: "SULargoP",
                    name: "SULargoP",
                    type: "vector",
                    geojsonId: "SULargoP",
                    hasLegend: true,
                    legendKey: "PMDU_Pachuca",
                    legendTitle: "Pachuca — PMDU (Etapas)",
                    defaultVisible: false,
                    defaultZ: 521,
                    meta: { color: "#ffcc50" }
                  },
                  {
                    id: "SUMedianoP",
                    name: "SUMedianoP",
                    type: "vector",
                    geojsonId: "SUMedianoP",
                    hasLegend: true,
                    legendKey: "PMDU_Pachuca",
                    legendTitle: "Pachuca — PMDU (Etapas)",
                    defaultVisible: false,
                    defaultZ: 522,
                    meta: { color: "#ffa722" }
                  },
                  {
                    id: "SUCMedianoP",
                    name: "SUCMedianoP",
                    type: "vector",
                    geojsonId: "SUCMedianoP",
                    hasLegend: true,
                    legendKey: "PMDU_Pachuca",
                    legendTitle: "Pachuca — PMDU (Etapas)",
                    defaultVisible: false,
                    defaultZ: 523,
                    meta: { color: "#ed8900" }
                  }
                ]
              }
            ]
          }
        ]
      },

      /* ==================== Tizayuca ==================== */
      {
        id: "tizayuca",
        name: "Tizayuca",
        children: [
          {
            id: "tiz_pmdu",
            name: "PMDU",
            children: [
              {
                id: "tiz_zon_sec",
                name: "Zonificación Secundaria",
                layers: [
                  { id: "AgriTec", name: "Agricultura Tecnificada", type: "vector", geojsonId: "AgriTec", hasLegend: true, legendKey: "PMDU_Tizayuca", legendTitle: "Tizayuca — PMDU (Zonificación Secundaria)", defaultVisible: false, defaultZ: 540, meta: { color: "#d4e5b3" } },
                  { id: "AgriInd", name: "Agroindustria", type: "vector", geojsonId: "AgriInd", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 541, meta: { color: "#d5d5b3" } },
                  { id: "CRA", name: "Conservación y Restauración Ambiental", type: "vector", geojsonId: "CRA", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 542, meta: { color: "#c9f8b3" } },
                  { id: "CUMBD", name: "Corredor Urbano Mixto Baja Densidad", type: "vector", geojsonId: "CUMBD", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 543, meta: { color: "#ffccb3" } },
                  { id: "CUMMD", name: "Corredor Urbano Mixto Media Densidad", type: "vector", geojsonId: "CUMMD", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 544, meta: { color: "#ffe6b3" } },
                  { id: "CAGUA", name: "Cuerpos de Agua", type: "vector", geojsonId: "CAGUA", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 545, meta: { color: "#80e2ff" } },
                  { id: "EUrb", name: "Equipamiento Urbano", type: "vector", geojsonId: "EUrb", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 546, meta: { color: "#ffb3ee" } },
                  { id: "HDA_Unifamiliar", name: "Hab. Alta (Unifamiliar)", type: "vector", geojsonId: "HDA_Unifamiliar", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 547, meta: { color: "#dbc6c2" } },
                  { id: "HDB_Unifamiliar", name: "Hab. Baja (Unifamiliar)", type: "vector", geojsonId: "HDB_Unifamiliar", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 548, meta: { color: "#f1dfdc" } },
                  { id: "HDM_Unifamiliar", name: "Hab. Media (Unifamiliar)", type: "vector", geojsonId: "HDM_Unifamiliar", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 549, meta: { color: "#ead0cb" } },
                  { id: "HDMA_Unifamiliar", name: "Hab. Media Alta (Unifamiliar)", type: "vector", geojsonId: "HDMA_Unifamiliar", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 550, meta: { color: "#e8cdc8" } },
                  { id: "HDMB_Unifamiliar", name: "Hab. Media Baja (Unifamiliar)", type: "vector", geojsonId: "HDMB_Unifamiliar", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 551, meta: { color: "#eed7d3" } },
                  { id: "HDMA_MdTC", name: "Hab. Alta (multifamiliar dúplex...)", type: "vector", geojsonId: "HDMA_MdTC", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 552, meta: { color: "#d3c2bf" } },
                  { id: "HDmA2", name: "Hab. Muy Alta 2", type: "vector", geojsonId: "HDmA2", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 553, meta: { color: "#bdb8b7" } },
                  { id: "HDmB_Uni", name: "Hab. Muy Baja (Unifamiliar)", type: "vector", geojsonId: "HDmB_Uni", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 554, meta: { color: "#f4e7e4" } },
                  { id: "IBI", name: "Industria de Bajo Impacto", type: "vector", geojsonId: "IBI", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 555, meta: { color: "#f9ecff" } },
                  { id: "IGI", name: "Industria de Gran Impacto", type: "vector", geojsonId: "IGI", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 556, meta: { color: "#dab3d3" } },
                  { id: "IMI", name: "Industria de Mediano Impacto", type: "vector", geojsonId: "IMI", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 557, meta: { color: "#f5d5ff" } },
                  { id: "IUrb", name: "Infraestructura Urbana", type: "vector", geojsonId: "IUrb", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 558, meta: { color: "#b3bed5" } },
                  { id: "mixto", name: "Mixto", type: "vector", geojsonId: "mixto", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 559, meta: { color: "#d5b3b3" } },
                  { id: "ParqueHid", name: "Parque Hídrico", type: "vector", geojsonId: "ParqueHid", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 560, meta: { color: "#bed5b3" } },
                  { id: "RTF", name: "Reserva Territorial Futura", type: "vector", geojsonId: "RTF", hasLegend: true, legendKey: "PMDU_Tizayuca", defaultVisible: false, defaultZ: 561, meta: { color: "#FF7F00" } },
                ]
              }
            ]
          }
        ]
      },

      /* ==================== Villa Tezontepec ==================== */
      {
        id: "villa_tezontepec",
        name: "Villa Tezontepec",
        children: [
          {
            id: "villa_pmdu",
            name: "PMDU",
            children: [
              {
                id: "villa_zon_sec",
                name: "Zonificación Secundaria",
                layers: [
                  { id: "Villa_TUA", name: "Traza Urbana Actual", type: "vector", geojsonId: "Villa_TUA", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 580, meta: { color: "#eed7d3" } },
                  { id: "Villa_agroindustria", name: "Agroindustria", type: "vector", geojsonId: "Villa_agroindustria", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 581, meta: { color: "#d4e5b3" } },
                  { id: "Villa_areaAgri", name: "Área Agrícola", type: "vector", geojsonId: "Villa_areaAgri", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 582, meta: { color: "#d5d5b3" } },
                  { id: "Villa_golf", name: "Club de Golf", type: "vector", geojsonId: "Villa_golf", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 583, meta: { color: "#c9f8b3" } },
                  { id: "Villa_declaratoria", name: "Declaratoria de Destino 1999", type: "vector", geojsonId: "Villa_declaratoria", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 584, meta: { color: "#ffccb3" } },
                  { id: "Villa_equipamiento", name: "Equipamiento", type: "vector", geojsonId: "Villa_equipamiento", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 585, meta: { color: "#ffe6b3" } },
                  { id: "Villa_habitacional", name: "Habitacional", type: "vector", geojsonId: "Villa_habitacional", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 586, meta: { color: "#80e2ff" } },
                  { id: "Villa_parAcu", name: "Parque Acuático", type: "vector", geojsonId: "Villa_parAcu", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 587, meta: { color: "#dbc6c2" } },
                  { id: "Villa_parTer", name: "Parque Temático", type: "vector", geojsonId: "Villa_parTer", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 588, meta: { color: "#f1dfdc" } },
                  { id: "Villa_PLATAH", name: "Proyecto PLATAH", type: "vector", geojsonId: "Villa_PLATAH", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 589, meta: { color: "#ead0cb" } },
                  { id: "Villa_servicios", name: "Servicios", type: "vector", geojsonId: "Villa_servicios", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 590, meta: { color: "#e8cdc8" } },
                  { id: "Villa_mixto", name: "Mixto", type: "vector", geojsonId: "Villa_mixto", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 591, meta: { color: "#ffb3ee" } },
                  { id: "Villa_ZAV", name: "Zona de Amortiguamiento Verde", type: "vector", geojsonId: "Villa_ZAV", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 592, meta: { color: "#d3c2bf" } },
                  { id: "Villa_ZPE", name: "Zona de Preservación Ecológica", type: "vector", geojsonId: "Villa_ZPE", hasLegend: true, legendKey: "PMDU_VillaTezontepec", defaultVisible: false, defaultZ: 593, meta: { color: "#bdb8b7" } }
                ]
              }
            ]
          }
        ]
      },

      /* ==================== Mineral de la Reforma ==================== */
      {
        id: "mineral_reforma",
        name: "Mineral de la Reforma",
        children: [
          {
            id: "mr_pmdu",
            name: "PMDU",
            children: [
              {
                id: "mr_zon_sec",
                name: "Zonificación Secundaria",
                layers: [
                  { id: "MR_EVP", name: "Centro Urbano Mixto", type: "vector", geojsonId: "MR_EVP", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 600, meta: { color: "#ffa420" } },
                  { id: "MR_CUM", name: "Comercio y Servicios", type: "vector", geojsonId: "MR_CUM", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 601, meta: { color: "#e6c9b2" } },
                  { id: "MR_CS", name: "Equipamiento Institucional", type: "vector", geojsonId: "MR_CS", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 602, meta: { color: "#c53131" } },
                  { id: "MR_EI", name: "Equipamiento Regional", type: "vector", geojsonId: "MR_EI", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 603, meta: { color: "#e600aa" } },
                  { id: "MR_ER", name: "Espacios Verdes y Abiertos", type: "vector", geojsonId: "MR_ER", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 604, meta: { color: "#e600aa" } },
                  { id: "MR_EVA", name: "Estructura Vial Propuesta", type: "vector", geojsonId: "MR_EVA", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 605, meta: { color: "#98e500" } },
                  { id: "MR_H05", name: "Habitacional Hasta 50 Hab", type: "vector", geojsonId: "MR_H05", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 606, meta: { color: "#ffebb0" } },
                  { id: "MR_H1", name: "Habitacional Hasta 100 Hab", type: "vector", geojsonId: "MR_H1", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 607, meta: { color: "#ffffbe" } },
                  { id: "MR_H2", name: "Habitacional Hasta 200 Hab", type: "vector", geojsonId: "MR_H2", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 608, meta: { color: "#feff73" } },
                  { id: "MR_H3", name: "Habitacional Hasta 300 Hab", type: "vector", geojsonId: "MR_H3", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 609, meta: { color: "#ffff00" } },
                  { id: "MR_H4", name: "Habitacional Hasta 400 Hab", type: "vector", geojsonId: "MR_H4", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 610, meta: { color: "#e7e600" } },
                  { id: "MR_H5", name: "Habitacional Hasta 500 Hab", type: "vector", geojsonId: "MR_H5", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 611, meta: { color: "#ffc858" } },
                  { id: "MR_H6", name: "Habitacional Hasta 600 Hab", type: "vector", geojsonId: "MR_H6", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 612, meta: { color: "#f0bc59" } },
                  { id: "MR_H7", name: "Habitacional Hasta 700 Hab", type: "vector", geojsonId: "MR_H7", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 613, meta: { color: "#ff9159" } },
                  { id: "MR_ILNC", name: "Industrial Ligera No Contaminante", type: "vector", geojsonId: "MR_ILNC", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 614, meta: { color: "#005be7" } },
                  { id: "MR_PA", name: "Polígono de Actuación", type: "vector", geojsonId: "MR_PA", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 615, meta: { color: "#c6a258" } },
                  { id: "MR_PPDU", name: "Programas Parciales de Desarrollo Urbano", type: "vector", geojsonId: "MR_PPDU", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 616, meta: { color: "#2596be" } },
                  { id: "MR_PAT", name: "Protección Agrícola Temporal", type: "vector", geojsonId: "MR_PAT", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 617, meta: { color: "#a3ff74" } },
                  { id: "MR_PEF", name: "Protección Ecológica Forestal", type: "vector", geojsonId: "MR_PEF", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 618, meta: { color: "#00734c" } },
                  { id: "MR_PPI", name: "Protección Pastizal Inducido", type: "vector", geojsonId: "MR_PPI", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 619, meta: { color: "#38a700" } },
                  // Puentes tenían color vacío en tu snippet: si los activas, fija color en meta o leyenda.
                  // { id:"MR_Puente_bimodal",   ... meta:{color:"#666"} },
                  // { id:"MR_Puente_multimodal",... meta:{color:"#666"} },
                  { id: "MR_Reserva", name: "Reserva", type: "vector", geojsonId: "MR_Reserva", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 620, meta: { color: "#a58b5a" } },
                  { id: "MR_Servicios", name: "Servicios", type: "vector", geojsonId: "MR_Servicios", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 621, meta: { color: "#ff7f7e" } },
                  { id: "MR_SUM", name: "Subcentro Urbano Mixto", type: "vector", geojsonId: "MR_SUM", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 622, meta: { color: "#f1d9d8" } },
                  { id: "MR_ZSEH", name: "Zona Sujeta a Estudio Hidrológico", type: "vector", geojsonId: "MR_ZSEH", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 623, meta: { color: "#9c9c9c" } },
                  { id: "MR_ZSERPCE", name: "ZSERPCE", type: "vector", geojsonId: "MR_ZSERPCE", hasLegend: true, legendKey: "PMDU_MR", defaultVisible: false, defaultZ: 624, meta: { color: "#e2e2ce" } },
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cat_zonas_metropolitanas",
    name: "Zonas metropolitanas",
    children: [
      {
        id: "sub_info_basica",
        name: "Información básica",
        layers: [
          {
            id: "zmvm_info",
            name: "ZMVM",
            type: "vector",
            geojsonId: "ZMVM_INFO",
            hasLegend: false,
            legendKey: "zmvm_info",
            legendTitle: "ZMVM — Información básica",
            defaultVisible: false,
            defaultZ: 520
          },
          {
            id: "zmpachuca_info",
            name: "ZMPachuca",
            type: "vector",
            geojsonId: "ZMPACHUCA_INFO",
            hasLegend: false,
            legendKey: "zmpachuca_info",
            legendTitle: "ZMPachuca — Información básica",
            defaultVisible: false,
            defaultZ: 521
          },
          {
            id: "zmtula_info",
            name: "ZMTula",
            type: "vector",
            geojsonId: "ZMTULA_INFO",
            hasLegend: false,
            legendKey: "zmtula_info",
            legendTitle: "ZMTula — Información básica",
            defaultVisible: false,
            defaultZ: 522
          },
          {
            id: "zmtulancingo_info",
            name: "ZMTulancingo",
            type: "vector",
            geojsonId: "ZMTULANCINGO_INFO",
            hasLegend: false,
            legendKey: "zmtulancingo_info",
            legendTitle: "ZMTulancingo — Información básica",
            defaultVisible: false,
            defaultZ: 523
          }
        ]
      }
    ]
  }









];
