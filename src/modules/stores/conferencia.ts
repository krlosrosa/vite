import { create } from "zustand"

export type ItemConferido = {
  id?: number | undefined
  sku: string
  descricao: string
  lote: string
  sif: string
  fabricacao: string
  caixa: string
  unidade: string
}


type ItensConferidosStore = {
  itens: ItemConferido[]
  setItens: (itens: ItemConferido[]) => void
  addItem: (item: ItemConferido) => void
}

export const useItensConferidosStore = create<ItensConferidosStore>((set) => ({
  itens: [],
  setItens: (itens: ItemConferido[]) => set({ itens }),
  addItem: (item: ItemConferido) => set((state) => ({ itens: [...state.itens, item] })),
}))




