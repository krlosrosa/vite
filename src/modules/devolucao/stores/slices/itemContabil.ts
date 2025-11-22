// store/counterSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type ItemContabil, type ItemContabilSlice } from '../../types/types'

export const createItemContabilSlice: StateCreator<
  AppState,
  [],
  [],
  ItemContabilSlice
> = (set, get) => ({
  itens: [],
  setItensContabil: (itens: ItemContabil[]) => set(() => ({ itens })),
  getItemById: (sku: string) => {
    const { itens } = get();
    return itens.find(item => item.sku === sku);
  },
})
