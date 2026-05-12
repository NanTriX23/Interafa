export interface TeamImages {
  [key: string]: string;
}

export const TEAMS_IMAGES: TeamImages = {
  PERSEU: "https://scaer.com.br/wp-content/uploads/2025/06/2025-2029_Perseu_Destaque-removebg-preview-1.png",
  UIRAÇU: "/Bolacha.png",
  ATHOS: "https://scaer.com.br/wp-content/uploads/2025/06/2023-2026_Athos_Destaque-fill-350x351-1.webp",
  DRAKON: "/drakon-removebg-preview.png",

};

export const TEAM_GRADIENTS: { [key: string]: string } = {
  PERSEU: "linear-gradient(90deg, #02091E, #12326F)",
  UIRAÇU: "linear-gradient(90deg, #3A0202, #FF301A)",
  ATHOS: "linear-gradient(90deg, #3E2C00, #F4B000)",
  DRAKON: "linear-gradient(90deg, #00331C, #00A86B)", // Ajustar cor se necessário
};

export const AVAILABLE_TEAMS = ["", "ATHOS", "UIRAÇU", "PERSEU", "DRAKON", "AMAN", "AFA", "EN"];
export const GENERAL_TEAMS = ["ATHOS", "UIRAÇU", "PERSEU", "DRAKON"];

export type TableType = "ranking" | "ranking_time" | "ranking_mark" | "ranking_points" | "matches" | "matches_sets" | "medals";

export interface SportEvent {
  id: string;
  name: string;
  tableType: TableType;
}

export interface SportConfig {
  id: string;
  name: string;
  icon: string;
  url: string;
  events: SportEvent[];
}

export const SPORTS_CONFIG: SportConfig[] = [
  {
    id: "geral",
    name: "Quadro Geral de Medalhas",
    icon: "https://scaer.com.br/wp-content/uploads/2025/11/ChatGPT_Image_26_de_nov._de_2025__10_39_25-removebg-preview.png",
    url: "https://script.google.com/macros/s/AKfycbzi_Q0LlUmy9L2N5RTd01dgXja84lKOOEriq7R69hxdMkwLwgZGViIbYGEYKJaI8vD-nQ/exec",
    events: [
      { id: "quadrogeral", name: "Quadro de Medalhas", tableType: "medals" },
      { id: "podios", name: "Pódios por Esporte", tableType: "medals" }
    ]
  },
  {
    id: "atletismo",
    name: "Atletismo",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/ath.png",
    url: "https://script.google.com/macros/s/AKfycbyMjdH28bWj3thrN2Jlw4QAmDV_kuMqGjn5NpATUDS1pD2139ckI81SfZA6gmjUpLJfVg/exec",
    events: [
      { id: "100mMASC", name: "100m MASC", tableType: "ranking" },
      { id: "200mMASC", name: "200m MASC", tableType: "ranking" },
      { id: "400mMASC", name: "400m MASC", tableType: "ranking" },
      { id: "800mMASC", name: "800m MASC", tableType: "ranking" },
      { id: "100mFEM", name: "100m FEM", tableType: "ranking" },
      { id: "200mFEM", name: "200m FEM", tableType: "ranking" },
      { id: "400mFEM", name: "400m FEM", tableType: "ranking" },
      { id: "800mFEM", name: "800m FEM", tableType: "ranking" },
      { id: "1.500mMASC", name: "1.500m MASC", tableType: "ranking" },
      { id: "5.000mMASC", name: "5.000m MASC", tableType: "ranking" },
      { id: "10.000mMASC", name: "10.000m MASC", tableType: "ranking" },
      { id: "1.500mFEM", name: "1.500m FEM", tableType: "ranking" },
      { id: "5.000mFEM", name: "5.000m FEM", tableType: "ranking" },
      { id: "10.000mFEM", name: "10.000m FEM", tableType: "ranking" },
      { id: "110mBarreiras", name: "110m c/Barreiras", tableType: "ranking" },
      { id: "400mBarreiras", name: "400m c/Barreiras", tableType: "ranking" },
      { id: "3000mObstaculos", name: "3.000m c/Obstáculos", tableType: "ranking" },
      { id: "4x100mMASC", name: "4x100m MASC", tableType: "ranking" },
      { id: "4x400mMASC", name: "4x400m MASC", tableType: "ranking" },
      { id: "4x100mFEM", name: "4x100m FEM", tableType: "ranking" },
      { id: "4x400mFEM", name: "4x400m FEM", tableType: "ranking" },
      { id: "SaltoAlturaMASC", name: "Salto em Altura MASC", tableType: "ranking" },
      { id: "SaltoAlturaFEM", name: "Salto em Altura FEM", tableType: "ranking" },
      { id: "SaltoDistanciaMASC", name: "Salto em Distância MASC", tableType: "ranking" },
      { id: "SaltoDistanciaFEM", name: "Salto em Distância FEM", tableType: "ranking" },
      { id: "SaltoTriplo", name: "Salto Triplo", tableType: "ranking" },
      { id: "SaltoVara", name: "Salto com Vara", tableType: "ranking" },
      { id: "Peso", name: "Peso", tableType: "ranking" },
      { id: "Dardo", name: "Dardo", tableType: "ranking" },
      { id: "GERAL", name: "Geral", tableType: "ranking" }
    ]
  },
  {
    id: "basquete",
    name: "Basquete",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/bkb.png",
    url: "https://script.google.com/macros/s/AKfycbwRgr8UWVd0plX2seoRdbGuLlhOpKP8H7OxV0mFs23BFXW0x6CHaunV4cJXPC4XLMxDEQ/exec",
    events: [
      { id: "basquete", name: "Partidas", tableType: "matches_sets" }
    ]
  },
  {
    id: "futebol",
    name: "Futebol",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/fbl.png",
    url: "https://script.google.com/macros/s/AKfycbwtbBVunCtwJ4rPgQAaUwE6XBul0Zqt7xkYOi6X_qcfo_3HERKw3wtlUO4VgBWY-1XeDQ/exec",
    events: [
      { id: "futebol", name: "Partidas", tableType: "matches" }
    ]
  },
  {
    id: "judo",
    name: "Judô",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/jud.png",
    url: "https://script.google.com/macros/s/AKfycbw2UC7MrAdT73C6Zk6bE9jEiwuEKm94I52UcNceo9QbadNrRBPrwwH6h__MdQHVYLTqDA/exec",
    events: [
      { id: "ligeiro", name: "Ligeiro", tableType: "matches" },
      { id: "meio-leve", name: "Meio-Leve", tableType: "matches" },
      { id: "leve", name: "Leve", tableType: "matches" },
      { id: "meio-medio", name: "Meio-Médio", tableType: "matches" },
      { id: "medio", name: "Médio", tableType: "matches" },
      { id: "meio-pesado", name: "Meio-Pesado", tableType: "matches" },
      { id: "pesado", name: "Pesado", tableType: "matches" },
      { id: "absoluto", name: "Absoluto", tableType: "matches" }
    ]
  },
  {
    id: "esgrima",
    name: "Esgrima",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/fen.png",
    url: "",
    events: [
      { id: "florete-masc", name: "Florete Masculino", tableType: "matches" },
      { id: "florete-fem", name: "Florete Feminino", tableType: "matches" },
      { id: "espada-masc", name: "Espada Masculino", tableType: "matches" },
      { id: "espada-fem", name: "Espada Feminino", tableType: "matches" },
      { id: "sabre-masc", name: "Sabre Masculino", tableType: "matches" },
      { id: "sabre-fem", name: "Sabre Feminino", tableType: "matches" },
      { id: "absoluto", name: "Absoluto", tableType: "matches" }
    ]
  },
  {
    id: "natacao",
    name: "Natação",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/swm.png",
    url: "https://script.google.com/macros/s/AKfycbwG514pg936nGsjwHxWkTeGtDKijgDTNlS6l7wL1fh0F0cqOsSHoiUVdkZ_3onX6K2cpg/exec",
    events: [
      { id: "equipes", name: "Equipes", tableType: "medals" },
      { id: "200LM", name: "200LM", tableType: "ranking" },
      { id: "100CM", name: "100CM", tableType: "ranking" },
      { id: "50LF", name: "50LF", tableType: "ranking" },
      { id: "100LM", name: "100LM", tableType: "ranking" },
      { id: "100PM", name: "100PM", tableType: "ranking" },
      { id: "50PF", name: "50PF", tableType: "ranking" },
      { id: "4x100LM", name: "4x100LM", tableType: "ranking" },
      { id: "4x50LF", name: "4x50LF", tableType: "ranking" },
      { id: "100BM", name: "100BM", tableType: "ranking" },
      { id: "50BF", name: "50BF", tableType: "ranking" },
      { id: "200MM", name: "200MM", tableType: "ranking" },
      { id: "50CF", name: "50CF", tableType: "ranking" },
      { id: "50LM", name: "50LM", tableType: "ranking" },
      { id: "4x100MM", name: "4x100MM", tableType: "ranking" },
      { id: "4x50MF", name: "4x50MF", tableType: "ranking" },
      { id: "4x50LM", name: "4x50LM", tableType: "ranking" }
    ]
  },
  {
    id: "orientacao",
    name: "Orientação",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/ChatGPT-Image-15-de-jul.-de-2025-14_26_32-1.png",
    url: "https://script.google.com/macros/s/AKfycbwojdwUV6saeIrTGAnpTCLuwTRYW6aQz7jqjMHEHZKh4j9jicDRHLq1UhOcLIDm3VoC9g/exec",
    events: [
      { id: "GERAL", name: "Geral", tableType: "ranking" },
      { id: "MMASC", name: "Médio Masculino", tableType: "ranking" },
      { id: "MFEM", name: "Médio Feminino", tableType: "ranking" },
      { id: "LMASC", name: "Longo Masculino", tableType: "ranking" },
      { id: "LFEM", name: "Longo Feminino", tableType: "ranking" }
    ]
  },
  {
    id: "pentatlo",
    name: "Pentatlo",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/mpn.png",
    url: "https://script.google.com/macros/s/AKfycbwQHydiGtkQgKQIShys73GBIgm8cULESubEJe1Vj-avtBICcJfVZEz1FkfLpzw4tInSfg/exec",
    events: [
      { id: "ppm", name: "Pista de Pentatlo Militar", tableType: "ranking" },
      { id: "natacao-utilitaria", name: "Natação Utilitária", tableType: "ranking" },
      { id: "lancamento-de-granada", name: "Lançamento de Granada", tableType: "ranking" },
      { id: "tiro", name: "Tiro", tableType: "ranking" },
      { id: "cross-country", name: "Cross Country", tableType: "ranking" },
      { id: "GERAL", name: "Geral (Pontuação Total)", tableType: "ranking" }
    ]
  },
  {
    id: "polo",
    name: "Polo Aquático",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/wpo.png",
    url: "https://script.google.com/macros/s/AKfycbxplaXp_QkqPO6vLBMoXkBdfELJLM1L3BInY_Kojgrzu7MNoJ4OodMc6_1qf9ardak/exec",
    events: [
      { id: "polo", name: "Partidas", tableType: "matches" }
    ]
  },
  {
    id: "tiro",
    name: "Tiro",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/sho.png",
    url: "https://script.google.com/macros/s/AKfycbxEOhlppGhGCZxkgKLzMTvnkl_vkNjbnmFJ2R3fUx0496KxZv2ILQX_SQ8ztSGqhwGO0A/exec",
    events: [
      { id: "pistola-ar", name: "Pistola de Ar", tableType: "ranking" },
      { id: "carabina-ar", name: "Carabina de Ar", tableType: "ranking" },
      { id: "fogo-central", name: "Fogo Central", tableType: "ranking" },
      { id: "GERAL", name: "Geral", tableType: "ranking" }
    ]
  },
  {
    id: "triathlon",
    name: "Triathlon",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/tri.png",
    url: "https://script.google.com/macros/s/AKfycbwUUArVYUalO2H736WESs1D985lGMU7TmPJiPt9ZuFi5_l5rH4heaxBnIge2QtpXggA0Q/exec",
    events: [
      { id: "sprint", name: "Sprint", tableType: "ranking" },
      { id: "olimpico", name: "Olímpico", tableType: "ranking" },
      { id: "revezamento", name: "Revezamento", tableType: "ranking" },
      { id: "GERAL", name: "Geral", tableType: "ranking" }
    ]
  },
  {
    id: "volei",
    name: "Vôlei",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/vvo.png",
    url: "https://script.google.com/macros/s/AKfycbxEOhlppGhGCZxkgKLzMTvnkl_vkNjbnmFJ2R3fUx0496KxZv2ILQX_SQ8ztSGqhwGO0A/exec",
    events: [
      { id: "volei", name: "Partidas", tableType: "matches_sets" }
    ]
  },
  {
    id: "escalada",
    name: "Escalada",
    icon: "https://scaer.com.br/wp-content/uploads/2025/07/clb.png",
    url: "",
    events: [

      { id: "GERAL", name: "Geral", tableType: "ranking" }
    ]
  }
];
