import { HgoInfoGen } from "../capas/Hidalgo/base";
import { escMediaSupPrivada } from "../capas/Hidalgo/educacionHidalgo";
import { ZMPACHUCA_INFO, ZMTULA_INFO, ZMTULANCINGO_INFO, ZMVM_INFO } from "../capas/zonas metropolitanas/info basica/zonasMetro";

// Pachuca (Etapas)
import { SUCLargoP, SULargoP, SUMedianoP, SUCMedianoP } from "@/capas/zonas metropolitanas/info basica/PMDU/pachucaDeSoto/EC_Pachuca";

// Tizayuca (Zonificación Secundaria)
import {
  AgriTec, AgriInd, CRA, CUMBD, CUMMD, CAGUA, EUrb,
  HDA_Unifamiliar, HDB_Unifamiliar, HDM_Unifamiliar,
  HDMA_Unifamiliar, HDMB_Unifamiliar, HDMA_MdTC, HDmA2, HDmB_Uni,
  IBI, IGI, IMI, IUrb, mixto, ParqueHid, RTF
} from "@/capas/zonas metropolitanas/info basica/PMDU/tizayuca/zonSecTizayuca";

// Villa Tezontepec (Zonificación Secundaria)
import {
  Villa_TUA, Villa_agroindustria, Villa_areaAgri, Villa_golf, Villa_declaratoria,
  Villa_equipamiento, Villa_habitacional, Villa_parAcu, Villa_parTer,
  Villa_PLATAH, Villa_servicios, Villa_mixto, Villa_ZAV, Villa_ZPE
} from "@/capas/zonas metropolitanas/info basica/PMDU/villaDeTezontepec/zonSecVillaTezontepec";

// Mineral de la Reforma (Zonificación Secundaria)
import {
  MR_EVP, MR_CUM, MR_CS, MR_EI, MR_ER, MR_EVA,
  MR_H05, MR_H1, MR_H2, MR_H3, MR_H4, MR_H5, MR_H6, MR_H7,
  MR_ILNC, MR_PA, MR_PPDU, MR_PAT, MR_PEF, MR_PPI,
  // MR_Puente_bimodal, MR_Puente_multimodal,
  MR_Reserva, MR_Servicios, MR_SUM, MR_ZSEH, MR_ZSERPCE
} from "@/capas/zonas metropolitanas/info basica/PMDU/mineralDeLaReforma/zonSecMR";



export const GEOJSON_REGISTRY = {
  HGO_INFO_GEN: HgoInfoGen,
  ESC_PRIV_MS: escMediaSupPrivada,

  ZMVM_INFO: ZMVM_INFO,
  ZMPACHUCA_INFO: ZMPACHUCA_INFO,
  ZMTULA_INFO: ZMTULA_INFO,
  ZMTULANCINGO_INFO: ZMTULANCINGO_INFO,


  /* Pachuca */
  SUCLargoP, SULargoP, SUMedianoP, SUCMedianoP,

  /* Tizayuca */
  AgriTec, AgriInd, CRA, CUMBD, CUMMD, CAGUA, EUrb,
  HDA_Unifamiliar, HDB_Unifamiliar, HDM_Unifamiliar,
  HDMA_Unifamiliar, HDMB_Unifamiliar, HDMA_MdTC, HDmA2, HDmB_Uni,
  IBI, IGI, IMI, IUrb, mixto, ParqueHid, RTF,

  /* Villa Tezontepec */
  Villa_TUA, Villa_agroindustria, Villa_areaAgri, Villa_golf, Villa_declaratoria,
  Villa_equipamiento, Villa_habitacional, Villa_parAcu, Villa_parTer,
  Villa_PLATAH, Villa_servicios, Villa_mixto, Villa_ZAV, Villa_ZPE,

  /* Mineral de la Reforma */
  MR_EVP, MR_CUM, MR_CS, MR_EI, MR_ER, MR_EVA,
  MR_H05, MR_H1, MR_H2, MR_H3, MR_H4, MR_H5, MR_H6, MR_H7,
  MR_ILNC, MR_PA, MR_PPDU, MR_PAT, MR_PEF, MR_PPI,
  // MR_Puente_bimodal, MR_Puente_multimodal,
  MR_Reserva, MR_Servicios, MR_SUM, MR_ZSEH, MR_ZSERPCE,

};
