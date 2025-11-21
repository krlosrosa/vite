import { convertFileToBase64 } from '@/_shared/lib/convertBase64';
import { useImageStore } from '../stores/useImageStore';
// ... e a função handleImageUpload

export default function ImageGallery() {
  const images = useImageStore((state) => state.images);
  const removeImage = useImageStore((state) => state.removeImage);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    try {
      const dataUrl = await convertFileToBase64(file);
      const id = crypto.randomUUID(); // Gerar um ID único
      
      // 💡 Adicionar ao Store
      useImageStore.getState().addImage(id, file.name, dataUrl);
      console.log(`Imagem "${file.name}" persistida no IndexedDB.`);
    } catch (error) {
      console.error('Erro ao processar a imagem:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      <h2>Imagens Offline</h2>
      {images.length === 0 ? (
        <p>Nenhuma imagem salva offline.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {images.map((img) => (
            <div key={img.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
              <p>ID: **{img.id}**</p>
              <p>Nome: **{img.name}**</p>
              {/* O dataUrl Base64 é usado como source */}
              <img 
                src={img.dataUrl} 
                alt={img.name} 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
              />
              <button onClick={() => removeImage(img.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// export default ImageGallery;