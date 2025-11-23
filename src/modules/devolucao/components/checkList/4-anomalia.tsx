import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/components/ui/card"
import { Button } from "@/_shared/components/ui/button"
import { Input } from "@/_shared/components/ui/input"
import { Label } from "@/_shared/components/ui/label"
import { Textarea } from "@/_shared/components/ui/textarea"
import { Alert, AlertDescription } from "@/_shared/components/ui/alert"
import { Badge } from "@/_shared/components/ui/badge"
import { AlertTriangle, Camera, Plus, X, ArrowRight, ArrowLeft } from "lucide-react"
import { useDevolucaoStore } from "../../stores/slices"
import { convertFileToBase64 } from "@/_shared/lib/convertBase64"
import { TypeDemanda, type ChecklistItem } from "../../types/types"

type AnomaliaProps = {
  setCurrentStep: (step: string) => void
  setStep: (step: string) => void
  id: string
}

export default function Anomalia({ setCurrentStep, setStep, id }: AnomaliaProps) {
  const [currentAnomalia, setCurrentAnomalia] = useState("")
  const { checklist, updateChecklist, demanda } = useDevolucaoStore()

  if (!id) return null

  const checklistArray = Array.isArray(checklist) ? checklist : []
  const checklistItem = checklistArray.find((c) => c.idDemanda === Number(id))

  // Helpers para garantir que sempre temos arrays
  const anomalias = Array.isArray(checklistItem?.anomalias) ? checklistItem.anomalias : []
  const fotosAnomalia = Array.isArray(checklistItem?.fotosAnomalia) ? checklistItem.fotosAnomalia : []
  const hasAnomalias = anomalias.length > 0
  const hasFotos = fotosAnomalia.length > 0

  function handleSubmit() {
    if (!demanda) return
    if (!checklist) return
    if (demanda.find((d) => d.id === Number(id))?.type !== TypeDemanda.DEVOLUCAO) {
      setStep('reentrega')
    } else {
      setStep('devolucao')
    }
  }

  const handleAddAnomalia = () => {
    if (currentAnomalia.trim() && checklistItem) {
      const currentAnomalias = Array.isArray(checklistItem.anomalias) ? checklistItem.anomalias : []
      updateChecklist(Number(id), {
        anomalias: [...currentAnomalias, currentAnomalia.trim()]
      })
      setCurrentAnomalia("")
    }
  }

  const handleRemoveAnomalia = (index: number) => {
    if (!checklistItem || !checklistItem.anomalias) return
    updateChecklist(Number(id), {
      anomalias: checklistItem.anomalias.filter((_, i) => i !== index)
    })
  }

  const handleRemoveFotoAnomalia = (index: number) => {
    if (!checklistItem || !checklistItem.fotosAnomalia) return
    updateChecklist(Number(id), {
      fotosAnomalia: checklistItem.fotosAnomalia.filter((_, i) => i !== index)
    })
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!checklistItem) return
    
    const file = e.target.files?.[0]
    if (file) {
      try {
        const base64String = await convertFileToBase64(file)
        const currentFotos = Array.isArray(checklistItem.fotosAnomalia) ? checklistItem.fotosAnomalia : []
        updateChecklist(Number(id), {
          fotosAnomalia: [...currentFotos, base64String]
        })
      } catch (error) {
        console.error("Erro ao converter arquivo:", error)
      }
    }
  }

  const handleInputChange = (field: keyof ChecklistItem, value: any) => {
    if (!checklistItem) return
    updateChecklist(Number(id), { [field]: value })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Anomalias e Observações
        </CardTitle>
        <CardDescription>
          Registre qualquer anomalia encontrada durante a inspeção
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Seção de Anomalias */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Anomalias Encontradas</Label>
            {hasAnomalias && (
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {anomalias.length} {anomalias.length === 1 ? 'anomalia' : 'anomalias'}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              value={currentAnomalia}
              onChange={(e) => setCurrentAnomalia(e.target.value)}
              placeholder="Descreva uma anomalia..."
              className="flex-1"
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
              onClick={handleAddAnomalia}
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Adicionar
            </Button>
          </div>

          {/* Lista de Anomalias */}
          {hasAnomalias ? (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {anomalias.map((anomalia, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                  <span className="flex-1 text-sm text-gray-700">{anomalia}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => handleRemoveAnomalia(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800 text-sm">
                Nenhuma anomalia registrada. Adicione anomalias se necessário.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Seção de Fotos */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Fotos das Anomalias</Label>
            {hasFotos && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {fotosAnomalia.length} {fotosAnomalia.length === 1 ? 'foto' : 'fotos'}
              </Badge>
            )}
          </div>

          <label className="block w-full">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
              <Camera className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">Adicionar Foto</span>
            </div>
          </label>

          {/* Grid de Fotos */}
          {hasFotos && (
            <div className="grid grid-cols-3 gap-3">
              {fotosAnomalia.map((foto, index) => (
                <div key={index} className="relative aspect-square group">
                  <img
                    src={foto}
                    alt={`Anomalia ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveFotoAnomalia(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs text-center py-1 rounded-b-lg">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Seção de Observações */}
        <div className="space-y-3">
          <Label htmlFor="obs" className="text-sm font-medium">
            Observações Adicionais
          </Label>
          <Textarea
            id="obs"
            value={checklistItem?.obs || ""}
            onChange={(e) => handleInputChange('obs', e.target.value)}
            placeholder="Observações adicionais sobre a inspeção..."
            rows={4}
            className="resize-none"
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Campo opcional</span>
            <span>{(checklistItem?.obs?.length || 0)}/500 caracteres</span>
          </div>
        </div>

        {/* Botões de Navegação */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('temperatura')}
            className="flex-1 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 gap-2"
          >
            Finalizar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}