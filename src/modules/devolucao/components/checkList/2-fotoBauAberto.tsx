import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/components/ui/card"
import { Button } from "@/_shared/components/ui/button"
import { Input } from "@/_shared/components/ui/input"
import { Label } from "@/_shared/components/ui/label"
import { AlertCircle, Camera, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/_shared/components/ui/alert"
import { renderImagePreview } from "../../utils/renderImage"
import { convertFileToBase64 } from "@/_shared/lib/convertBase64"
import { useDevolucaoStore } from "../../stores/conferencia"

type FotoBauAbertoProps = {
  setCurrentStep: (step: string) => void
  id: string
}

export default function FotoBauAberto({ setCurrentStep, id }: FotoBauAbertoProps) {
  const { checklist, updateChecklist } = useDevolucaoStore()
  const [isUploading] = useState(false)

  if (!id) return null

  const checklistArray = Array.isArray(checklist) ? checklist : []
  const checklistItem = checklistArray.find((c) => c.idDemanda === Number(id)) || undefined
  const hasPhoto = !!checklistItem?.fotoBauAberto

  const handleFileUpload = () =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!checklistItem) return;
      const file = e.target.files?.[0];
      if (file) {
        try {
          const base64String = await convertFileToBase64(file);
          updateChecklist(Number(id), { fotoBauAberto: base64String });
        } catch (error) {
          console.error("Erro ao converter arquivo:", error);
        }
      }
    };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" />
          Foto do Baú Aberto
        </CardTitle>
        <CardDescription>
          Tire uma foto do baú completamente aberto antes da inspeção interna
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Área de Upload */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="foto-bau-aberto" className="text-sm font-medium">
              Selecione ou tire uma foto
            </Label>
            <Input
              id="foto-bau-aberto"
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
        {/* Botão de Ação */}
        <div className="flex flex-col md:flex-row gap-2 justify-between">

          <Button
            onClick={() => setCurrentStep('fotoBauFechado')}
            disabled={!hasPhoto || isUploading}
            className="w-full gap-2"
          >
            {hasPhoto ? (
              <>
                Próximo Anterior
                <ArrowLeft className="w-4 h-4" />
              </>
            ) : (
              "Faça upload da foto para continuar"
            )}
          </Button>
          <Button
            onClick={() => setCurrentStep('temperatura')}
            disabled={!hasPhoto || isUploading}
            className="w-full gap-2"
          >
            {hasPhoto ? (
              <>
                Próximo Passo
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              "Faça upload da foto para continuar"
            )}
          </Button>
        </div>

        {/* Preview da Imagem */}
        <div className="space-y-3">
          {hasPhoto ? (
            <>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="w-4 h-4" />
                <span>Foto registrada com sucesso!</span>
              </div>
              {renderImagePreview(checklistItem?.fotoBauAberto || null, "Baú Aberto")}
            </>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Nenhuma foto registrada. Tire uma foto do baú aberto para continuar.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Dicas */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="text-sm font-medium">Dicas para uma boa foto:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Certifique-se de que o baú está completamente aberto</li>
            <li>• Tire a foto em um local bem iluminado</li>
            <li>• Mostre todo o interior do baú na foto</li>
            <li>• Evite sombras que possam esconder detalhes</li>
          </ul>
        </div>


      </CardContent>
    </Card>
  )
}