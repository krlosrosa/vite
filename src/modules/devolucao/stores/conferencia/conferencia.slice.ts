// store/counterSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type ItemConferencia, type ConferenciaSlice } from '../../types/types'

export const createConferenciaSlice: StateCreator<
  AppState,
  [],
  [],
  ConferenciaSlice
> = (set) => ({
  conferencias: [],
  itemSelecionado: null,
  loteSelecionado: null,
  descricaoSelecionada: null,
  addConferencia: (conferencia: ItemConferencia) => set((state) => ({ conferencias: [...state.conferencias, conferencia] })),
  updateConferencia: (id: number, conferencia: Partial<ItemConferencia>) =>
    set((state) => ({
      conferencias: state.conferencias.map((c) => c.id === id ? { ...c, ...conferencia } : c),
    })),
  removeConferencia: (id: number) => set((state) => ({ conferencias: state.conferencias.filter((c) => c.id !== id) })),
  setItemSelecionado: (sku: string) => set({ itemSelecionado: sku }),
  setLoteSelecionado: (lote: string) => set({ loteSelecionado: lote }),
  setDescricaoSelecionada: (descricao: string) => set({ descricaoSelecionada: descricao }),
  
})
