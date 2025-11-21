import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { useDevolucaoStore } from "../../stores/slices";
import type { ChecklistItem } from "../../types/types";
import { Button } from "@/_shared/components/ui/button";

type TemperaturaProps = {
  setCurrentStep: (step: string) => void
}

export default function Temperatura({ setCurrentStep }: TemperaturaProps) {

  const { checklist, updateChecklist } = useDevolucaoStore()

  const handleInputChange = (field: keyof ChecklistItem, value: any) => {
    if (!checklist) return
    updateChecklist({ [field]: value })
  }

  return (
    <div className="space-y-6">
    <h3 className="text-lg font-medium text-center">3. Temperaturas</h3>
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <Label htmlFor="temperaturaProduto">Temperatura do Produto (°C)</Label>
        <Input
          id="temperaturaProduto"
          type="number"
          step="0.1"
          value={checklist?.temperaturaProduto || ""}
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
          value={checklist?.temperaturaCaminhao || ""}
          onChange={(e) => handleInputChange('temperaturaCaminhao',
            e.target.value ? parseFloat(e.target.value) : undefined
          )}
        />
      </div>
    </div>
    <div className="space-y-2 w-full">
      <Button className="w-full" onClick={() => setCurrentStep('fotoBauFechado')}>Voltar</Button>
      <Button className="w-full" onClick={() => setCurrentStep('anomalia')}>Próximo</Button>
    </div>
  </div>
  )
}