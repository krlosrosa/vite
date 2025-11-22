// @/_shared/lib/idbStorage.ts

import Dexie, { type Table } from 'dexie'
import { type StateStorage } from 'zustand/middleware'

// 1. Definição do Banco de Dados
// Você pode precisar tipar o objeto de estado aqui, 
// mas por simplicidade, vamos usar 'any' para o 'state' persistido
interface PersistentData {
  key: string // A chave usada pelo Zustand (ex: 'demand-inspections-storage')
  state: string // O estado serializado em JSON
}

// Configuração do DB
class PersistentDB extends Dexie {
  // O nome da tabela deve ser o mesmo usado abaixo
  data!: Table<PersistentData>

  constructor() {
    super('AppPersistentDB') // Nome do banco de dados IndexedDB
    
    // Versão 1: Define o schema
    this.version(1).stores({
      'zustand-data': 'key', // Define 'zustand-data' como a store, com 'key' como índice primário
    })
  }
}

// Instância do DB
const db = new PersistentDB()
const storeName = 'zustand-data' // Nome da nossa store/tabela

// 2. Implementação da Interface StateStorage
export const idbStorage: StateStorage = {
  // LÊ o estado persistido do IndexedDB
  getItem: async (name: string): Promise<string | null> => {
    try {
      console.log('Dexie: Lendo item', name)
      // Busca pelo nome ('demand-inspections-storage')
      const data = await db.table(storeName).get(name) 
      return data?.state ?? null // Retorna a string JSON do estado
    } catch (error) {
      console.error('Dexie Error: Falha ao ler item', error)
      return null
    }
  },

  // ESCREVE o estado persistido no IndexedDB
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      console.log('Dexie: Escrevendo item', name, 'com', value.length, 'bytes')
      // Adiciona ou atualiza (put) o objeto na store
      await db.table(storeName).put({
        key: name,
        state: value,
      })
    } catch (error) {
      console.error('Dexie Error: Falha ao escrever item', error)
      // Aqui, o erro é CRÍTICO. Se for por tamanho (Base64), é aqui que a compressão ajuda.
      throw error 
    }
  },

  // REMOVE o estado persistido (útil para limpar o cache)
  removeItem: async (name: string): Promise<void> => {
    try {
      console.log('Dexie: Removendo item', name)
      await db.table(storeName).delete(name)
    } catch (error) {
      console.error('Dexie Error: Falha ao remover item', error)
    }
  },
}