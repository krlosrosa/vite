// store/counterSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type DemandaItem, type DemandaSlice } from '../../types/types'

export const createDemandaSlice: StateCreator<
  AppState,
  [],
  [],
  DemandaSlice
> = (set) => ({
  demanda: null,
  syncStatus: 'unsynced',
  setDemanda: (demanda: DemandaItem, step: number) => set(() => ({ demanda: { ...demanda, syncStatus: 'unsynced', step } })),
    updateDemanda: (d) =>
      set((state) => ({
        demanda: state.demanda ? { ...state.demanda, ...d } : null,
      })),
  clearDemanda: () => set(() => ({ demanda: null })),
  syncDemanda: () =>
    set((state) => ({
      demanda: state.demanda ? { ...state.demanda, syncStatus: 'syncing' } : null,
    })),
  updateStep: (step: number) => set((state) => ({ demanda: state.demanda ? { ...state.demanda, step } : null })),
})
