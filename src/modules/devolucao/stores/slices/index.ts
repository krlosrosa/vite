// store/index.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { type AppState } from '../../types/types'
import { createDemandaSlice } from './demanda.slice'

import { idbStorage } from '../idbStorage' // exemplo: seu storage customizado  
import { createChecklistSlice } from './checkList.slice'
import { createConferenciaSlice } from './conferencia.slice'
import { createAnomaliaSlice } from './anomalia.slice'

export const useDevolucaoStore = create<AppState>()(
  persist(
    (set, get, api) => ({
      ...createDemandaSlice(set, get, api),
      ...createChecklistSlice(set, get, api),
      ...createConferenciaSlice(set, get, api),
      ...createAnomaliaSlice(set, get, api),
    }),
    {
      name: 'demand-inspections-storage',
      version: 1,
      storage: createJSONStorage(() => idbStorage),
    }
  )
)
