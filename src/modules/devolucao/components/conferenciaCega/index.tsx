import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { Card, CardContent, CardHeader } from "@/_shared/components/ui/card";
import { Trash2, Save, Package, Box } from "lucide-react";
import { useState } from "react";

// Tipo da conferência
export type ItemConferencia = {
  id: number;
  demandaId: number;
  tipo: string;
  sku: string;
  descricao: string;
  lote: string;
  sif: string;
  fabricacao: string;
  quantidadeCaixas: number;
  quantidadeUnidades: number;
}

export default function ConferenciaCega() {
  const [itens, setItens] = useState<ItemConferencia[]>([
    {
      id: 1,
      demandaId: 1,
      tipo: "reentrega",
      sku: "",
      descricao: "",
      lote: "",
      sif: "",
      fabricacao: "",
      quantidadeCaixas: 0,
      quantidadeUnidades: 0
    }
  ]);

  const removerItem = (id: number) => {
    if (itens.length > 1) {
      setItens(itens.filter(item => item.id !== id));
    }
  };

  const atualizarItem = (id: number, campo: keyof ItemConferencia, valor: any) => {
    setItens(itens.map(item => 
      item.id === id ? { ...item, [campo]: valor } : item
    ));
  };

  const handleSalvar = () => {
    console.log("Itens conferidos:", itens);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Lista de Itens */}
        <div className="space-y-4">
          {itens.map((item) => (
            <Card key={item.id} className="shadow-sm py-2">
              <CardHeader className="">
                <div className="flex justify-between items-center">
                  {itens.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removerItem(item.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* SKU */}
                <div className="space-y-2">
                  <Label htmlFor={`sku-${item.id}`} className="text-sm font-medium">
                    Código SKU *
                  </Label>
                  <Input
                    id={`sku-${item.id}`}
                    value={item.sku}
                    onChange={(e) => atualizarItem(item.id, 'sku', e.target.value)}
                    placeholder="Digite o código do produto"
                    className="h-10"
                  />
                </div>

                {/* Descrição (apenas exibição) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Descrição do Produto
                  </Label>
                  <div className="min-h-10 p-3 bg-muted/50 rounded-md border">
                    <p className="text-sm text-muted-foreground">
                      {item.descricao || "A descrição será carregada automaticamente ao inserir o SKU"}
                    </p>
                  </div>
                </div>

                {/* Informações do Lote */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`lote-${item.id}`} className="text-sm font-medium">
                      Lote
                    </Label>
                    <Input
                      id={`lote-${item.id}`}
                      value={item.lote}
                      onChange={(e) => atualizarItem(item.id, 'lote', e.target.value)}
                      placeholder="Nº do lote"
                      className="h-9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`sif-${item.id}`} className="text-sm font-medium">
                      SIF
                    </Label>
                    <Input
                      id={`sif-${item.id}`}
                      value={item.sif}
                      onChange={(e) => atualizarItem(item.id, 'sif', e.target.value)}
                      placeholder="Nº SIF"
                      className="h-9"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`fabricacao-${item.id}`} className="text-sm font-medium">
                      Fabricação
                    </Label>
                    <Input
                      id={`fabricacao-${item.id}`}
                      value={item.fabricacao}
                      onChange={(e) => atualizarItem(item.id, 'fabricacao', e.target.value)}
                      type="date"
                      className="h-9"
                    />
                  </div>
                </div>

                {/* Quantidades - Lado a lado */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`caixas-${item.id}`} className="text-sm font-medium flex items-center gap-2">
                      <Box className="h-4 w-4 text-blue-600" />
                      Caixas *
                    </Label>
                    <Input
                      id={`caixas-${item.id}`}
                      type="number"
                      min="0"
                      value={item.quantidadeCaixas}
                      onChange={(e) => atualizarItem(item.id, 'quantidadeCaixas', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-10 text-center text-lg font-semibold"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`unidades-${item.id}`} className="text-sm font-medium flex items-center gap-2">
                      <Package className="h-4 w-4 text-green-600" />
                      Unidades *
                    </Label>
                    <Input
                      id={`unidades-${item.id}`}
                      type="number"
                      min="0"
                      value={item.quantidadeUnidades}
                      onChange={(e) => atualizarItem(item.id, 'quantidadeUnidades', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-10 text-center text-lg font-semibold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-4 bg-background/95 backdrop-blur p-4 rounded-lg border shadow-lg">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12">
              Cancelar
            </Button>
            <Button onClick={handleSalvar} className="flex-1 h-12 gap-2">
              <Save className="h-4 w-4" />
              Salvar Conferência
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}