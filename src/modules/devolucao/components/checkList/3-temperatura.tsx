import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/_shared/components/ui/card"
import { Button } from "@/_shared/components/ui/button"
import { Input } from "@/_shared/components/ui/input"
import { Label } from "@/_shared/components/ui/label"
import { AlertCircle, Thermometer, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/_shared/components/ui/alert"
import { useDevolucaoStore } from "../../stores/conferencia"
import type { ChecklistItem } from "../../types/types"

type TemperaturaProps = {
  setCurrentStep: (step: string) => void
  id: string
}

export default function Temperatura({ setCurrentStep, id }: TemperaturaProps) {
  const { checklist, updateChecklist } = useDevolucaoStore()

  if (!id) return null

  const checklistArray = Array.isArray(checklist) ? checklist : []
  const checklistItem = checklistArray.find((c) => c.idDemanda === Number(id))

  const hasProduto = checklistItem?.temperaturaProduto !== undefined && checklistItem.temperaturaProduto !== null
  const hasCaminhao = checklistItem?.temperaturaCaminhao !== undefined && checklistItem.temperaturaCaminhao !== null
  const allTemperaturesFilled = hasProduto && hasCaminhao

  const handleInputChange = (field: keyof ChecklistItem, value: string) => {
    const numericValue = value ? parseFloat(value) : undefined
    
    if (!checklistItem) return
    updateChecklist(Number(id), { [field]: numericValue })
  }

  const handleInputBlur = (field: keyof ChecklistItem, value: string) => {
    if (value && !isNaN(parseFloat(value))) {
      const numericValue = parseFloat(value)
      if (!checklistItem) return
      updateChecklist(Number(id), { [field]: numericValue })
    }
  }

  const formatTemperature = (temp: number | undefined | null): string => {
    if (temp === undefined || temp === null) return ""
    return Number.isInteger(temp) ? temp.toString() : temp.toFixed(1)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <Thermometer className="w-5 h-5" />
          Registro de Temperaturas
        </CardTitle>
        <CardDescription>
          Informe as temperaturas do produto e do caminhão
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Campos de Temperatura */}
        <div className="grid grid-cols-1 gap-6">
          {/* Temperatura do Produto */}
          <div className="space-y-3">
            <Label htmlFor="temperaturaProduto" className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-blue-500" />
              Temperatura do Produto (°C)
              {hasProduto && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            </Label>
            <Input
              id="temperaturaProduto"
              type="number"
              step="0.1"
              placeholder="Ex: 4.5"
              value={formatTemperature(checklistItem?.temperaturaProduto)}
              onChange={(e) => handleInputChange('temperaturaProduto', e.target.value)}
              onBlur={(e) => handleInputBlur('temperaturaProduto', e.target.value)}
              className="text-lg text-center"
            />
            {!hasProduto && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  Informe a temperatura do produto
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Temperatura do Caminhão */}
          <div className="space-y-3">
            <Label htmlFor="temperaturaCaminhao" className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-orange-500" />
              Temperatura do Caminhão (°C)
              {hasCaminhao && <CheckCircle2 className="w-4 h-4 text-green-500" />}
            </Label>
            <Input
              id="temperaturaCaminhao"
              type="number"
              step="0.1"
              placeholder="Ex: 5.0"
              value={formatTemperature(checklistItem?.temperaturaCaminhao)}
              onChange={(e) => handleInputChange('temperaturaCaminhao', e.target.value)}
              onBlur={(e) => handleInputBlur('temperaturaCaminhao', e.target.value)}
              className="text-lg text-center"
            />
            {!hasCaminhao && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="w-4 h-4" />
                <AlertDescription className="text-sm">
                  Informe a temperatura do caminhão
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Informações de Ajuda */}
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <h4 className="text-sm font-medium">Instruções importantes:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Use termômetro calibrado para medição</li>
            <li>• Registre a temperatura com até duas casas decimais</li>
            <li>• Em caso de divergência, repita a medição</li>
          </ul>
        </div>

        {/* Status de Preenchimento */}
        {!allTemperaturesFilled && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              Preencha ambas as temperaturas para continuar
            </AlertDescription>
          </Alert>
        )}

        {/* Botões de Navegação */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep('fotoBauFechado')}
            className="flex-1 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button
            onClick={() => setCurrentStep('anomalia')}
            disabled={!allTemperaturesFilled}
            className="flex-1 gap-2"
          >
            {allTemperaturesFilled ? (
              <>
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <span>Preencha as temperaturas</span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}