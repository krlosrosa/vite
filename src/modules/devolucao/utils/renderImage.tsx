export const renderImagePreview = (base64String: string | null, alt: string) => {
  if (!base64String) return <p className="text-sm text-gray-500">Nenhuma foto encontrada</p>
  return (
    <div className="mt-2 flex justify-center">
      <img 
        src={base64String} 
        alt={alt}
        className="h-32 w-32 object-cover rounded border"
      />
    </div>
  )
}