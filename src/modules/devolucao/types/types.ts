import type { SyncStatus } from "./slices.types"

export const ListaDemandasZodDtoItemStatus = {
  AGUARDANDO_LIBERACAO: 'AGUARDANDO_LIBERACAO',
  AGUARDANDO_CONFERENCIA: 'AGUARDANDO_CONFERENCIA',
  EM_CONFERENCIA: 'EM_CONFERENCIA',
  CONFERENCIA_FINALIZADA: 'CONFERENCIA_FINALIZADA',
  FINALIZADO: 'FINALIZADO',
  CANCELADO: 'CANCELADO',
} as const;

export const TypeDemanda = {
  REENTREGA: 'REENTREGA',
  DEVOLUCAO: 'DEVOLUCAO',
  AMBOS: 'AMBOS',
} as const;

export type TypeDemanda = typeof TypeDemanda[keyof typeof TypeDemanda];

export type ListaDemandasZodDtoItemStatus = typeof ListaDemandasZodDtoItemStatus[keyof typeof ListaDemandasZodDtoItemStatus];

//ConferenciaSlice
export type ItemConferencia = {
  id: number;  // opcional para inserção
  demandaId: number;
  tipo: string;
  sku: string;
  descricao: string;
  lote: string;
  sif: string;
  fabricacao: string;
  quantidadeCaixas: number;
  quantidadeUnidades: number;
}

export type ConferenciaSlice = {
  conferencias: ItemConferencia[]
  syncStatus?: SyncStatus;
  addConferencia: (conferencia: ItemConferencia) => void
  updateConferencia: (id: number, conferencia: Partial<ItemConferencia>) => void
  removeConferencia: (id: number) => void
}

//AnomaliaSlice
export type AnomaliaItem = {
  id: number;
  fotoBase64: string[];
  demandaId: number;
  sku: string;
  natureza: string;
  tipo: string;
  causa: string;
  caixas: number;
  unidades: number;
  observacoes: string;
}

export type AnomaliaSlice = {
  anomalias: AnomaliaItem[]
  syncStatus?: SyncStatus;
  addAnomalia: (anomalia: AnomaliaItem) => void
  updateAnomalia: (id: number, anomalia: Partial<AnomaliaItem>) => void
  removeAnomalia: (id: number) => void
  addFotoAnomalia: (id: number, foto: string) => void
}

// DemandaSlice
export type DemandaItem = {
  id: number;
  placa: string;
  motorista: string;
  data: string;
  conferenteId?: string;
  doca?: string;
  status: ListaDemandasZodDtoItemStatus;
  transportadora: string;
  cargaSegregada: boolean;
  retornoPalete: boolean;
  quantidadePaletes: number;
  syncStatus?: SyncStatus;
  step?: number;
  type: TypeDemanda;
}

export type DemandaSlice = {
  demanda: DemandaItem | null
  setDemanda: (d: DemandaItem, step: number) => void
  updateDemanda: (d: Partial<DemandaItem>) => void
  clearDemanda: () => void
  syncDemanda: () => void
  updateStep: (step: number) => void
}


// ChecklistSlice
export type ChecklistItem = {
  id?: number;
  idDemanda: number;
  fotoBauAberto: string | null;
  fotoBauFechado: string | null;
  temperaturaProduto?: number;
  temperaturaCaminhao?: number;
  anomalias: string[];
  fotosAnomalia: string[];
  obs?: string
  syncStatus?: SyncStatus;
}
export type ChecklistSlice = {
  checklist: ChecklistItem | null
  syncStatus?: SyncStatus;
  setChecklist: (c: ChecklistItem) => void
  updateChecklist: (c: Partial<ChecklistItem>) => void
  clearChecklist: () => void
  syncChecklist: () => void
}

// Store unificada
export type AppState = DemandaSlice & ChecklistSlice & ConferenciaSlice & AnomaliaSlice