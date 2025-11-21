// src/stores/slices/types.ts

import type { StateCreator } from 'zustand';

// --- GLOBAIS ---
export type SyncStatus = 'unsynced' | 'syncing' | 'synced' | 'error';
export type ProcessKey = 'demandas' | 'checklists' | 'conferencias';

// Estrutura base para qualquer processo rastreável por sincronização
export interface SyncableProcess<T> {
    data: T;
    syncStatus: SyncStatus;
    lastSynced: number | null;
}

// Helper para tipagem de slices
export type GlobalState = DemandSlice & ChecklistSlice & ConferenciaSlice;

// Helper para a função base do Zustand (simplifica a assinatura das slices)
export type CustomStateCreator<T> = StateCreator<GlobalState, [], [], T>;

// --- INTERFACES DE DADOS ---

// A. Gerenciar a Demanda
export interface DemandDetails {
    status: 'pendente' | 'em andamento' | 'concluída';
    currentStep: number;
    motoristaId?: string;
}

// B. Checklist
export interface ChecklistData {
    [key: string]: boolean;
}

// C. Conferência (Itens que estão sendo conferidos)
export interface ItemConferencia {
    itemId: string;
    nomeProduto: string;
    quantidadeSolicitada: number;
    quantidadeConferida: number;
}

// D. Anomalias (Referenciado por ItemId da Conferência)
export interface AnomalyData {
    anomaliaId: string;
    descricao: string;
    fotoBase64: string;
}

// --- INTERFACES DE SLICE ---

// 1. Demand Slice
export interface DemandState {
  demandas: Record<number, SyncableProcess<DemandDetails>>;
}
export interface DemandActions {
    initializeDemand: (id: number, motoristaId: string) => void;
    updateDemandStep: (idDemanda: number, step: number) => void;
    setDemandStatus: (idDemanda: number, status: SyncStatus) => void; // Ação para o Sync Service
}
export type DemandSlice = DemandState & DemandActions;

// 2. Checklist Slice
export interface ChecklistState {
    checklists: Record<number, SyncableProcess<ChecklistData>>;
}
export interface ChecklistActions {
    updateChecklistItem: (idDemanda: number, itemKey: string, value: boolean) => void;
    setChecklistStatus: (idDemanda: number, status: SyncStatus) => void; // Ação para o Sync Service
}
export type ChecklistSlice = ChecklistState & ChecklistActions;

// 3. Conferencia Slice
export interface ConferenciaState {
    conferencias: Record<number, SyncableProcess<ItemConferencia[]>>;
    anomalias: Record<number, Record<string, AnomalyData[]>>;
}
export interface ConferenciaActions {
    addConferenciaItem: (idDemanda: number, item: ItemConferencia) => void;
    addAnomalyToItem: (idDemanda: number, itemId: string, anomaly: AnomalyData) => void;
    setConferenciaStatus: (idDemanda: number, status: SyncStatus) => void; // Ação para o Sync Service
}
export type ConferenciaSlice = ConferenciaState & ConferenciaActions;