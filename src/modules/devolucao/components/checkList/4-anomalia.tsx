import { Input } from "@/_shared/components/ui/input"
import { Label } from "@/_shared/components/ui/label"
import { useDevolucaoStore } from "../../stores/slices"
import { useState } from "react"
import { Button } from "@/_shared/components/ui/button"
import { convertFileToBase64 } from "@/_shared/lib/convertBase64"
import { Textarea } from "@/_shared/components/ui/textarea"
import type { ChecklistItem } from "../../types/types"
import { Plus, X, Camera, AlertTriangle } from "lucide-react"

type AnomaliaProps = {
  setCurrentStep: (step: string) => void
  setStep: (step: string) => void
} 

export default function Anomalia({ setCurrentStep, setStep }: AnomaliaProps) {

  const [currentAnomalia, setCurrentAnomalia] = useState("")
  const { checklist, updateChecklist } = useDevolucaoStore()

  const handleAddAnomalia = () => {
    if (currentAnomalia.trim() && checklist) {
      // Garantir que anomalias seja um array
      const currentAnomalias = Array.isArray(checklist.anomalias) ? checklist.anomalias : []
      updateChecklist({
        anomalias: [...currentAnomalias, currentAnomalia.trim()]
      })
      setCurrentAnomalia("")
    }
  }

  const handleRemoveAnomalia = (index: number) => {
    if (!checklist || !checklist.anomalias) return
    updateChecklist({
      anomalias: checklist.anomalias.filter((_, i) => i !== index)
    })
  }

  const handleRemoveFotoAnomalia = (index: number) => {
    if (!checklist || !checklist.fotosAnomalia) return
    updateChecklist({
      fotosAnomalia: checklist.fotosAnomalia.filter((_, i) => i !== index)
    })
  }

  const handleFileUpload = (field: 'fotoBauAberto' | 'fotoBauFechado' | 'fotosAnomalia') => 
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!checklist) return
      
      const file = e.target.files?.[0]
      if (file) {
        try {
          const base64String = await convertFileToBase64(file)
          
          if (field === 'fotosAnomalia') {
            // Garantir que fotosAnomalia seja um array
            const currentFotos = Array.isArray(checklist.fotosAnomalia) ? checklist.fotosAnomalia : []
            updateChecklist({
              fotosAnomalia: [...currentFotos, base64String]
            })
          } else {
            updateChecklist({ [field]: base64String })
          }
        } catch (error) {
          console.error("Erro ao converter arquivo:", error)
        }
      }
    }

  const handleInputChange = (field: keyof ChecklistItem, value: any) => {
    if (!checklist) return
    updateChecklist({ [field]: value })
  }

  // Helper para garantir que sempre temos arrays
  const anomalias = Array.isArray(checklist?.anomalias) ? checklist.anomalias : []
  const fotosAnomalia = Array.isArray(checklist?.fotosAnomalia) ? checklist.fotosAnomalia : []

  return (
    <div className="space-y-4 pb-4">
      {/* Header Compacto */}
      <div className="bg-orange-50 p-3 rounded-xl border border-orange-200">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />
          <h3 className="text-base font-semibold text-orange-900">
            4. Anomalias e Observações
          </h3>
        </div>
      </div>
      
      {/* Anomalias Section Compacta */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-900">Anomalias</Label>
          {anomalias.length > 0 && (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">
              {anomalias.length}
            </span>
          )}
        </div>
        
        {/* Input Compacto */}
        <div className="flex gap-2">
          <Input
            value={currentAnomalia}
            onChange={(e) => setCurrentAnomalia(e.target.value)}
            placeholder="Descreva uma anomalia..."
            className="flex-1 text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddAnomalia()
              }
            }}
          />
          <Button 
            type="button"
            size="sm"
            disabled={!currentAnomalia.trim()}
            className="bg-green-600 hover:bg-green-700 px-3"
            onClick={handleAddAnomalia}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Lista Compacta de Anomalias */}
        {anomalias.length > 0 && (
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {anomalias.map((anomalia, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-lg text-sm"
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                <span className="flex-1 text-gray-700 truncate">{anomalia}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                  onClick={() => handleRemoveAnomalia(index)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fotos Compactas */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-900">Fotos</Label>
          {fotosAnomalia.length > 0 && (
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
              {fotosAnomalia.length}
            </span>
          )}
        </div>
        
        {/* Botão de Upload Compacto */}
        <label className="block w-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload('fotosAnomalia')}
            className="hidden"
          />
          <div className="flex items-center justify-center gap-2 p-3 border border-dashed border-blue-300 rounded-xl bg-blue-50 hover:bg-blue-100 active:bg-blue-200 transition-colors cursor-pointer">
            <Camera className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium text-sm">Adicionar Foto</span>
          </div>
        </label>
        
        {/* Grid Compacto de Fotos */}
        {fotosAnomalia.length > 0 && (  
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {fotosAnomalia.map((foto, index) => (
                <div key={index} className="relative aspect-square">
                  <img 
                    src={foto} 
                    alt={`Anomalia ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full shadow-sm"
                    onClick={() => handleRemoveFotoAnomalia(index)}
                  >
                    <X className="w-2.5 h-2.5" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-0.5">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Observações Compactas */}
      <div className="space-y-2">
        <Label htmlFor="obs" className="text-sm font-medium text-gray-900">
          Observações
        </Label>
        <Textarea
          id="obs"
          value={checklist?.obs || ""}
          onChange={(e) => handleInputChange('obs', e.target.value)}
          placeholder="Observações adicionais..."
          rows={3}
          className="resize-none rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Opcional
          </span>
          <span className="text-xs text-gray-500">
            {(checklist?.obs?.length || 0)}/500
          </span>
        </div>
      </div>
      <div className="space-y-2 w-full">
        <Button className="w-full" onClick={() => setCurrentStep('temperatura')}>Voltar</Button>
        <Button className="w-full" onClick={() => setStep('reentrega')}>Próximo</Button>
      </div>
    </div>
  )
}