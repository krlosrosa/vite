"use client"

import { useEffect, useState } from "react"
import { Button } from "@/_shared/components/ui/button"
import { Input } from "@/_shared/components/ui/input"
import { Textarea } from "@/_shared/components/ui/textarea"
import { Label } from "@/_shared/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card"
import type { ChecklistItem } from "../types/types"  
import { useDevolucaoStore } from "../stores/slices"
import { convertFileToBase64 } from "@/_shared/lib/convertBase64"
import { useRouter } from "@tanstack/react-router"

type Step = 1 | 2 | 3 | 4

export default function CheckList({ id }: { id: string }) {
  const { 
    checklist, 
    addChecklist, 
    updateChecklist 
  } = useDevolucaoStore()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [currentAnomalia, setCurrentAnomalia] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const checklistArray = Array.isArray(checklist) ? checklist : [];
  const checklistItem = checklistArray.find((c) => c.id === Number(id));

  // Inicializa o formulário se não houver checklist
  useEffect(() => {
    if (!checklistItem) {
      addChecklist({
        idDemanda: Number(id),
        fotoBauAberto: null,
        fotoBauFechado: null,
        temperaturaProduto: undefined,
        temperaturaCaminhao: undefined,
        anomalias: [],
        fotosAnomalia: [],
        obs: ""
      })
    }
  }, [checklistItem, addChecklist, id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!checklist) return

    try {
      alert('Checklist salvo com sucesso!')
      console.log("Checklist salvo localmente:", checklist)
      // Aqui você pode salvar no localStorage ou indexedDB
      localStorage.setItem('checklist', JSON.stringify(checklist))
      console.log("Checklist salvo com sucesso!")
      router.navigate({ to: '/devolucao/reentrega/$id', params: { id: id } })
    } catch (error) {
      console.error("Erro ao salvar checklist:", error)
    }
  }

  const handleInputChange = (field: keyof ChecklistItem, value: any) => {
    console.log(field, value)
    if (!checklist) return
    
  }

  const handleAddAnomalia = () => {
    if (currentAnomalia.trim() && checklistItem) {
      const currentAnomalias = Array.isArray(checklistItem.anomalias) ? checklistItem.anomalias : [];
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

  const handleFileUpload = (field: 'fotoBauAberto' | 'fotoBauFechado' | 'fotosAnomalia') => 
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!checklistItem) return
      
      const file = e.target.files?.[0]
      if (file) {
        try {
          setIsUploading(true)
          const base64String = await convertFileToBase64(file)
          
          if (field === 'fotosAnomalia') {
            const currentFotos = Array.isArray(checklistItem.fotosAnomalia) ? checklistItem.fotosAnomalia : [];
            updateChecklist(Number(id), {
              fotosAnomalia: [...currentFotos, base64String]
            })
          } else {
            updateChecklist(Number(id), { [field]: base64String })
          }
        } catch (error) {
          console.error("Erro ao converter arquivo:", error)
        } finally {
          setIsUploading(false)
        }
      }
    }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const renderImagePreview = (base64String: string | null, alt: string) => {
    if (!base64String) return null
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

  // Se não há checklist, mostra loading
  if (!checklistItem) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex justify-center items-center py-8">
          <div>Carregando...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex flex-col items-center space-y-4">
          <div>Checklist de Inspeção</div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Etapa 1: Foto Baú Fechado */}
          {currentStep === 1 && (
            <div className="space-y-6 text-center">
              <h3 className="text-lg font-medium">1. Foto do Baú Fechado</h3>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload('fotoBauFechado')}
                  disabled={isUploading}
                />
                {renderImagePreview(checklistItem?.fotoBauFechado || null, "Baú Fechado")}
                {!checklistItem?.fotoBauFechado && (
                  <p className="text-sm text-gray-500">
                    Tire uma foto do baú fechado antes da inspeção
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Etapa 2: Foto Baú Aberto */}
          {currentStep === 2 && (
            <div className="space-y-6 text-center">
              <h3 className="text-lg font-medium">2. Foto do Baú Aberto</h3>
              <div className="space-y-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload('fotoBauAberto')}
                  disabled={isUploading}
                />
                {renderImagePreview(checklistItem?.fotoBauAberto || null, "Baú Aberto")}
                {!checklistItem?.fotoBauAberto && (
                  <p className="text-sm text-gray-500">
                    Tire uma foto do baú aberto durante a inspeção
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Etapa 3: Temperatura */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-center">3. Temperaturas</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temperaturaProduto">Temperatura do Produto (°C)</Label>
                  <Input
                    id="temperaturaProduto"
                    type="number"
                    step="0.1"
                    value={checklistItem?.temperaturaProduto || ""}
                    onChange={(e) => handleInputChange('temperaturaProduto', 
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperaturaCaminhao">Temperatura do Caminhão (°C)</Label>
                  <Input
                    id="temperaturaCaminhao"
                    type="number"
                    step="0.1"
                    value={checklistItem?.temperaturaCaminhao || ""}
                    onChange={(e) => handleInputChange('temperaturaCaminhao',
                      e.target.value ? parseFloat(e.target.value) : undefined
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Etapa 4: Anomalias + Observações */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-center">4. Anomalias e Observações</h3>
              
              {/* Anomalias */}
              <div className="space-y-4">
                <Label>Anomalias Encontradas</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentAnomalia}
                    onChange={(e) => setCurrentAnomalia(e.target.value)}
                    placeholder="Descreva uma anomalia encontrada"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddAnomalia()
                      }
                    }}
                    disabled={isUploading}
                  />
                  <Button 
                    type="button" 
                    onClick={handleAddAnomalia}
                    disabled={isUploading}
                  >
                    Adicionar
                  </Button>
                </div>
                    
                {/* Lista de Anomalias */}
                {checklistItem?.anomalias?.length && (
                  <div className="space-y-2">
                    {checklistItem.anomalias.map((anomalia, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <span>{anomalia}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveAnomalia(index)}
                          disabled={isUploading}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fotos de Anomalias */}
              <div className="space-y-2">
                <Label>Fotos das Anomalias</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload('fotosAnomalia')}
                  disabled={isUploading}
                />
                
                {/* Preview das fotos de anomalias */}
                {checklistItem?.fotosAnomalia?.length && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {checklistItem.fotosAnomalia.map((foto, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={foto} 
                            alt={`Anomalia ${index + 1}`}
                            className="h-20 w-20 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                            onClick={() => handleRemoveFotoAnomalia(index)}
                            disabled={isUploading}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <Label htmlFor="obs">Observações Finais</Label>
                <Textarea
                  id="obs"
                  value={checklistItem?.obs || ""}
                  onChange={(e) => handleInputChange('obs', e.target.value)}
                  placeholder="Observações adicionais sobre a inspeção..."
                  rows={4}
                  disabled={isUploading}
                />
              </div>
            </div>
          )}

          {/* Navegação entre etapas */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isUploading}
            >
              Voltar
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={isUploading}
              >
                Próximo
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isUploading}
                onClick={handleSubmit}
              >
                {isUploading ? 'Processando...' : 'Salvar Checklist'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}