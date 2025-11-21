// store/counterSlice.ts
import { type StateCreator } from 'zustand'
import { type AppState, type ChecklistItem, type ChecklistSlice } from '../../types/types'

export const createChecklistSlice: StateCreator<
  AppState,
  [],
  [],
  ChecklistSlice
> = (set) => ({
  checklist: null,
  setChecklist: (checklist: ChecklistItem) => set(() => ({ checklist: { ...checklist, syncStatus: 'unsynced' } })),
    updateChecklist: (c) =>
      set((state) => ({
        checklist: state.checklist ? { ...state.checklist, ...c } : null,
      })),
  clearChecklist: () => set(() => ({ checklist: null })),
  syncChecklist: () =>
    set((state) => ({
      checklist: state.checklist ? { ...state.checklist, syncStatus: 'syncing' } : null,
    })),
})
