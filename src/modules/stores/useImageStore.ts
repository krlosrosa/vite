import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { idbStorage } from './idbStorage'; // Importe o storage personalizado

// Interface para o estado do Store (exemplo com imagens)
interface ImageState {
  images: { id: string; name: string; dataUrl: string }[];
  addImage: (id: string, name: string, dataUrl: string) => void;
  removeImage: (id: string) => void;
}

// 

export const useImageStore = create<ImageState>()(
  persist(
    (set) => ({
      images: [],

      addImage: (id, name, dataUrl) =>
        set((state) => ({
          images: [...state.images, { id, name, dataUrl }],
        })),

      removeImage: (id) =>
        set((state) => ({
          images: state.images.filter((img) => img.id !== id),
        })),
    }),
    {
      // ⚠️ IMPORTANTE: `idb-keyval` armazena dados de forma assíncrona.
      // Você deve usar `createJSONStorage` e passar o seu objeto `idbStorage`.
      name: 'image-storage', // Nome da chave no IndexedDB
      storage: createJSONStorage(() => idbStorage),
    }
  )
);