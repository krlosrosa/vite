import { get, set, del } from 'idb-keyval';
import { type StateStorage } from 'zustand/middleware';

// Objeto de armazenamento personalizado para o Zustand
export const idbStorage: StateStorage = {
  // O Zustand espera que getItem retorne uma Promise<string | null> ou string | null.
  // Como idb-keyval pode armazenar tipos não-string (como ArrayBuffer/Blob,
  // ideal para imagens), precisamos garantir que a desserialização 
  // do Zustand (que assume strings) seja tratada, ou usar `createJSONStorage`.
  // Para armazenar a STRING do JSON serializado do estado (o comportamento padrão do persist):
  getItem: async (name: string): Promise<string | null> => {
    // get(name) retorna o valor armazenado no IndexedDB
    const value = await get(name);
    
    // Se o valor não for uma string (por exemplo, undefined, null ou outro tipo
    // que o Zustand não espera para a serialização padrão), 
    // retornamos null para evitar erros.
    return typeof value === 'string' ? value : null;
  },

  setItem: async (name: string, value: string): Promise<void> => {
    // set(name, value) armazena a string JSON do estado
    await set(name, value);
  },

  removeItem: async (name: string): Promise<void> => {
    // del(name) remove o item
    await del(name);
  },
};