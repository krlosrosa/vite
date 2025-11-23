import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/components/ui/card"
import { Button } from "@/_shared/components/ui/button"
import { Input } from "@/_shared/components/ui/input"
import { Label } from "@/_shared/components/ui/label"
import { AlertCircle, Camera, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/_shared/components/ui/alert"
import { convertFileToBase64 } from "@/_shared/lib/convertBase64"
import { useDevolucaoStore } from "../../stores/slices"
import { renderImagePreview } from "../../utils/renderImage"

type FotoBauFechadoProps = {
  setCurrentStep: (step: string) => void
  id: string
}

export default function FotoBauFechado({ setCurrentStep, id }: FotoBauFechadoProps) {
  const { checklist, updateChecklist, addChecklist } = useDevolucaoStore()
  const [isUploading, setIsUploading] = useState(false)

  if (!id) return null

  const checklistArray = Array.isArray(checklist) ? checklist : []
  const checklistItem = checklistArray.find((c) => c.idDemanda === Number(id))
  const hasPhoto = !!checklistItem?.fotoBauFechado

  const handleFileUpload = () =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const base64String = await convertFileToBase64(file)
      
      if (!checklistItem) {
        addChecklist({
          idDemanda: Number(id),
          fotoBauFechado: base64String,
        })
      } else {
        updateChecklist(Number(id), { fotoBauFechado: base64String })
      }
    } catch (error) {
      console.error("Erro ao converter arquivo:", error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" />
          Foto do Baú Fechado
        </CardTitle>
        <CardDescription>
          Tire uma foto do baú completamente fechado após a inspeção
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Área de Upload */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="foto-bau-fechado" className="text-sm font-medium">
              Selecione ou tire uma foto
            </Label>
            <Input
              id="foto-bau-fechado"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileUpload()}
              disabled={isUploading}
              className="cursor-pointer"
            />
          </div>

          {isUploading && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="text-blue-800">
                Processando imagem...
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Preview da Imagem */}
        <div className="space-y-3">
          {hasPhoto ? (
            <>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Foto registrada com sucesso!</span>
              </div>
              {renderImagePreview(checklistItem?.fotoBauFechado || null, "Baú Fechado")}
            </>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Nenhuma foto registrada. Tire uma foto do baú fechado para continuar.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Dicas */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="text-sm font-medium">Dicas para uma boa foto:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Certifique-se de que o baú está completamente fechado</li>
            <li>• Verifique se todas as travas estão engatadas</li>
            <li>• Mostre toda a traseira do veículo na foto</li>
            <li>• Garanta que a placa do veículo esteja visível</li>
            <li>• Tire a foto em um local bem iluminado</li>
          </ul>
        </div>

        {/* Botões de Navegação */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('fotoBauAberto')}
            disabled={isUploading}
            className="flex-1 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button
            onClick={() => setCurrentStep('temperatura')}
            disabled={!hasPhoto || isUploading}
            className="flex-1 gap-2"
          >
            {hasPhoto ? (
              <>
                Próximo
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              "Upload necessário"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}