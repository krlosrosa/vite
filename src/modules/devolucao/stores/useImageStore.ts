import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { idbStorage } from './idbStorage'; // Certifique-se de que este caminho está correto

// --- Interfaces ---

/**
 * Define a estrutura de dados para uma única inspeção/demanda.
 * Todas as imagens são armazenadas como strings Base64 (Data URLs).
 */
interface DemandaData {
  id?: number; 
  idDemanda: number; // Chave principal para identificar a demanda sendo inspecionada
  
  // Imagens obrigatórias (string Base64)
  fotoBauAberto: string | null; 
  fotoBauFechado: string | null;
  
  // Dados Numéricos
  temperaturaProduto?: number;
  temperaturaCaminhao?: number;
  
  // Dados de Anomalia
  anomalias: string[];        // Ex: ['vidro quebrado', 'caixa amassada']
  fotosAnomalia: string[];    // Array de strings Base64 para as fotos das anomalias
  
  // Observação
  obs?: string;
}

/**
 * Define o estado e as ações do nosso Store.
 */
interface DemandStoreState {
  demandas: DemandaData[];
  
  // Ações Principais:
  adicionarDemanda: (data: DemandaData) => void;
  
  // Ação UNIFICADA para atualizar qualquer campo (texto, número ou Base64) em etapas.
  atualizarCampoDemanda: (
    idDemanda: number, 
    campo: keyof DemandaData, 
    valor: any 
  ) => void;

  // Ação específica para adicionar um item a um array (como anomalias ou fotosAnomalia)
  adicionarItemArray: (
    idDemanda: number, 
    campo: 'anomalias' | 'fotosAnomalia', // Apenas campos que são arrays de string
    item: string 
  ) => void;

  // ... (outras ações como remover, carregar, etc.)
}

// --- Implementação do Store ---

export const useDemandStore = create<DemandStoreState>()(
  // Envolve o Store com o middleware 'persist'
  persist(
    (set) => ({
      // Estado Inicial
      demandas: [
        {idDemanda: 1, fotoBauAberto: null, fotoBauFechado: null, anomalias: [], fotosAnomalia: [], obs: ''},
      ],

      // Ação: Adicionar uma nova demanda (geralmente no início do fluxo)
      adicionarDemanda: (data) =>
        set((state) => ({
          demandas: [...state.demandas, data],
        })),

      // Ação: Atualizar qualquer campo em uma demanda existente (ideal para etapas)
      atualizarCampoDemanda: (idDemanda, campo, valor) =>
        set((state) => ({
          demandas: state.demandas.map((demanda) =>
            demanda.idDemanda === idDemanda
              ? { ...demanda, [campo]: valor } // Atualização Dinâmica
              : demanda
          ),
        })),

      // Ação: Adicionar um item (string ou Base64) a um array dentro da demanda
      adicionarItemArray: (idDemanda, campo, item) =>
        set((state) => ({
          demandas: state.demandas.map((demanda) =>
            demanda.idDemanda === idDemanda
              ? { ...demanda, [campo]: [...(demanda[campo] || []), item] }
              : demanda
          ),
        })),
    }),
    
    // Configurações do Middleware Persist
    {
      name: 'demand-inspections-storage', // Chave usada no IndexedDB
      version: 1, // Bom para migrações futuras de estado
      
      // Usa nosso objeto de armazenamento idbStorage com serialização JSON
      storage: createJSONStorage(() => idbStorage),
    }
  )
);