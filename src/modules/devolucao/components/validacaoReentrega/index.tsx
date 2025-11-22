import { itensContabil } from "@/__mocks__/itensContabil";
import { Button } from "@/_shared/components/ui/button";
import { Check, CheckCircle, Undo2 } from "lucide-react";

type ValidacaoReentregaProps = {
  setStep: (step: string) => void;
  id: string;
};

export default function ValidacaoReentrega({ setStep, id }: ValidacaoReentregaProps) {
  console.log(id)
  const handleValidarItem = (itemId: number) => {
    console.log(`Item ${itemId} ${itensContabil.find(item => item.id === itemId)?.validado ? 'desvalidado' : 'validado'}`);
    // Aqui você atualizaria o estado do item para validado: true/false
  };

  return (
    <div className="min-h-screen bg-background p-3 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Conferência de Reentrega</h1>
        <span className="text-sm text-muted-foreground">
          {itensContabil.filter(item => item.validado).length}/{itensContabil.length} itens
        </span>
      </div>

      {itensContabil.map((item) => (
        <div 
          key={item.id} 
          className={`bg-card border rounded-lg p-3 space-y-2 relative ${
            item.validado ? 'border-green-500 bg-green-50' : ''
          }`}
        >
          {/* Indicador de validação */}
          {item.validado && (
            <div className="absolute -top-2 -right-2">
              <CheckCircle className="h-6 w-6 text-green-600 fill-green-600" />
            </div>
          )}

          {/* Código e Descrição na mesma linha */}
          <div className="flex justify-between items-start gap-2">
            <span className="text-sm font-medium text-muted-foreground">{item.sku}</span>
            <p className="text-sm flex-1 text-right">{item.descricao}</p>
          </div>

          {/* Lote e Fabricação */}
          <div className="flex flex-col gap-1">
            {item.lote && (
              <div className="text-xs text-muted-foreground">
                Lote: {item.lote}
              </div>
            )}
            {item.fabricacao && (
              <div className="text-xs text-muted-foreground">
                Fabricação: {item.fabricacao}
              </div>
            )}
          </div>

          {/* Quantidades na mesma linha */}
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-muted-foreground">Caixas: </span>
              <span className="font-medium">{item.quantidadeCaixas}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Unidades: </span>
              <span className="font-medium">{item.quantidadeUnidades}</span>
            </div>
          </div>

          {/* Botão alternado */}
          {item.validado ? (
            <Button 
              variant="outline"
              className="w-full gap-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
              onClick={() => handleValidarItem(item.id)}
            >
              <Undo2 className="h-4 w-4" />
              Desfazer
            </Button>
          ) : (
            <Button 
              className="w-full gap-2"
              onClick={() => handleValidarItem(item.id)}
            >
              <Check className="h-4 w-4" />
              Confirmar
            </Button>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="flex gap-2 sticky bottom-3">
        <Button variant="outline" className="flex-1" onClick={() => setStep("anterior")}>
          Voltar
        </Button>
        <Button className="flex-1" onClick={() => setStep("proximo")}>
          Finalizar
        </Button>
      </div>
    </div>
  );
}

export interface ItemContabil {
  tipo: 'devolucao' | 'reentrega';
  id: number;
  sku: string;
  descricao: string;
  quantidadeCaixas: number;
  quantidadeUnidades: number;
  lote?: string;
  fabricacao?: string;
  validado: boolean;
}