// store/counterSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type ChecklistItem, type ChecklistSlice } from '../../types/types'

export const createChecklistSlice: StateCreator<
  AppState,
  [],
  [],
  ChecklistSlice
> = (set) => ({
  checklist: [],
  addChecklist: (checklist: ChecklistItem) => set((state) => {
    const checklistArray = Array.isArray(state.checklist) ? state.checklist : [];
    return { checklist: [...checklistArray, checklist] };
  }),
  updateChecklist: (id: number, checklist: Partial<ChecklistItem>) =>
    set((state) => {
      const checklistArray = Array.isArray(state.checklist) ? state.checklist : [];
      return {
        checklist: checklistArray.map((c) => c.idDemanda === id ? { ...c, ...checklist } : c),
      };
    }),
  removeChecklist: (id: number) => set((state) => {
    const checklistArray = Array.isArray(state.checklist) ? state.checklist : [];
    return { checklist: checklistArray.filter((c) => c.idDemanda !== id) };
  }),
})
