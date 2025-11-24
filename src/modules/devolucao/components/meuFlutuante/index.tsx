import { Button } from "@/_shared/components/ui/button";
import ListaItensConferidos from "../listaItensConferidos";
import ListaAnomalias from "../listaItensAnomalia";

type BottomMenuProps = {
  demandaId: number;
  setStep: (step: string) => void;
}

export default function BottomMenu({demandaId, setStep}: BottomMenuProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-20">
      <div className="mx-auto max-w-md p-3">
        <div className="rounded-2xl border bg-card/90 backdrop-blur supports-backdrop-filter:bg-card/80 shadow-lg px-3 py-3 grid grid-cols-4 gap-3">
          <ListaItensConferidos demandaId={demandaId} />
          <ListaAnomalias demandaId={demandaId} />
          {/* Finalizar demanda */}
          <Button
            onClick={() => setStep('finalizacao')}
            className="col-span-2 h-12 text-sm shadow-md"
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}