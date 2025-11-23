// store/counterSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type DemandaItem, type DemandaSlice } from '../../types/types'

export const createDemandaSlice: StateCreator<
  AppState,
  [],
  [],
  DemandaSlice
> = (set) => ({
  demanda: [],
  addDemanda: (demanda: DemandaItem) => set((state) => {
    const demandaArray = Array.isArray(state.demanda) ? state.demanda : [];
    return { demanda: [...demandaArray, demanda] };
  }),
  updateDemanda: (id: number, demanda: Partial<DemandaItem>) =>
    set((state) => {
      const demandaArray = Array.isArray(state.demanda) ? state.demanda : [];
      return {
        demanda: demandaArray.map((d) => d.id === id ? { ...d, ...demanda } : d),
      };
    }),
  removeDemanda: (id: number) => set((state) => {
    const demandaArray = Array.isArray(state.demanda) ? state.demanda : [];
    return { demanda: demandaArray.filter((d) => d.id !== id) };
  }),
})
