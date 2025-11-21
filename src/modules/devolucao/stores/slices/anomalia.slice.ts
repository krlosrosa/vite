// store/anomaliaSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type AnomaliaItem, type AnomaliaSlice } from '../../types/types'

export const createAnomaliaSlice: StateCreator<
  AppState,
  [],
  [],
  AnomaliaSlice
> = (set) => ({
  anomalias: [],
  syncStatus: 'unsynced',

  addAnomalia: (anomalia: AnomaliaItem) => set((state) => ({ anomalias: [...state.anomalias, anomalia] })),

  updateAnomalia: (id: number, anomalia: Partial<AnomaliaItem>) =>
    set((state) => ({
      anomalias: state.anomalias.map((a) => a.id === id ? { ...a, ...anomalia } : a),
    })),
  removeAnomalia: (id: number) => set((state) => ({ anomalias: state.anomalias.filter((a) => a.id !== id) })),
  addFotoAnomalia: (id: number, foto: string) => set((state) => ({ anomalias: state.anomalias.map((a) => a.id === id ? { ...a, fotoBase64: [...a.fotoBase64, foto] } : a) })),
})
