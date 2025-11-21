import { convertFileToBase64 } from "@/_shared/lib/convertBase64";
import { useDevolucaoStore } from "../../stores/slices";
import { renderImagePreview } from "../../utils/renderImage";
import { Input } from "@/_shared/components/ui/input";
import { Button } from "@/_shared/components/ui/button";

type FotoBauFechadoProps = {
  setCurrentStep: (step: string) => void
}

export default function FotoBauFechado({ setCurrentStep }: FotoBauFechadoProps) {

  const { checklist, updateChecklist } = useDevolucaoStore()

  const handleFileUpload = (field: 'fotoBauAberto' | 'fotoBauFechado' | 'fotosAnomalia') =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!checklist) return

      const file = e.target.files?.[0]
      if (file) {
        try {
          const base64String = await convertFileToBase64(file)

          updateChecklist({ [field]: base64String })
        } catch (error) {
          console.error("Erro ao converter arquivo:", error)
        }
      }
    }


  return (
    <div className="space-y-6 text-center">
      <h3 className="text-lg font-medium">2. Foto do Baú Fechado</h3>
      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload('fotoBauFechado')}
        />
        {renderImagePreview(checklist?.fotoBauFechado || null, "Baú Fechado")}
        {!checklist?.fotoBauFechado && (
          <p className="text-sm text-gray-500">
            Tire uma foto do baú fechado antes da inspeção
          </p>
        )}
      </div>
      <div className="space-y-2 w-full">
        <Button className="w-full" onClick={() => setCurrentStep('fotoBauAberto')}>Voltar</Button>
        <Button className="w-full" onClick={() => setCurrentStep('temperatura')}>Próximo</Button>
      </div>
    </div>
  )
}