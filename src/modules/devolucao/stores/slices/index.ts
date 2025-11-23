// store/index.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { type AppState } from '../../types/types'
import { createDemandaSlice } from './demanda.slice'

import { createChecklistSlice } from './checkList.slice'
import { createConferenciaSlice } from './conferencia.slice'
import { createAnomaliaSlice } from './anomalia.slice'
import { idbStorage } from '../dexieStorage'
import { createItemContabilSlice } from './itemContabil'

export const useDevolucaoStore = create<AppState>()(
  persist(
    (...a) => ({
      ...createDemandaSlice(...a),
      ...createChecklistSlice(...a),
      ...createConferenciaSlice(...a),
      ...createAnomaliaSlice(...a),
      ...createItemContabilSlice(...a),
    }),
    {
      name: 'demand-inspections-storage',
      version: 1,
      storage: createJSONStorage(() => idbStorage),
    }
  )
)
