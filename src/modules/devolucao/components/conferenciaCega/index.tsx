import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { Card, CardContent, CardHeader } from "@/_shared/components/ui/card";
import { Save, Package, Box } from "lucide-react";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useDevolucaoStore } from "../../stores/conferencia";
import { useForm } from "react-hook-form";
import Anomalia from "../anomalia";

// Schema Zod para validação de um item
export const ItemConferenciaSchema = z.object({
  sku: z.string().min(1, "SKU é obrigatório"),
  descricao: z.string().optional(),
  lote: z.string().min(1, "Lote é obrigatório"),
  sif: z.string().min(1, "SIF é obrigatório"),
  fabricacao: z.string().min(1, "Data de fabricação é obrigatória"),
  quantidadeCaixas: z.number().min(0, "Quantidade de caixas não pode ser negativa"),
  quantidadeUnidades: z.number().min(0, "Quantidade de unidades não pode ser negativa"),
});

export type ItemConferencia = z.infer<typeof ItemConferenciaSchema>;

type ConferenciaCegaProps = {
  demandaId: number;
}

export default function ConferenciaCega({ demandaId}: ConferenciaCegaProps) {
  const { 
    addConferencia, 
    setItemSelecionado, 
    setLoteSelecionado,
    setDescricaoSelecionada,
  } = useDevolucaoStore();

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, setFocus } = useForm<ItemConferencia>({
    resolver: zodResolver(ItemConferenciaSchema),
    defaultValues: {
      sku: "",
      descricao: "",
      lote: "",
      sif: "",
      fabricacao: "",
      quantidadeCaixas: 0,
      quantidadeUnidades: 0
    }
  });


  // Observa os campos do formulário
  const watchedFields = watch();

  // Atualiza estados automaticamente quando os campos mudam
  const handleFieldChange = (field: keyof ItemConferencia, value: any) => {
    if (field === 'sku' && value) {
      setItemSelecionado(value);
      // Simula carregamento da descrição (substitua por sua API)
      setValue('descricao', `Descrição do produto ${value}`);
      setDescricaoSelecionada(`Descrição do produto ${value}`);
    }
    
    if (field === 'lote' && value) {
      setLoteSelecionado(value);
    }
  };

  const onSubmit = (data: ItemConferencia) => {
    const novoItem = {
      ...data,
      id: Date.now(),
      demandaId: demandaId,
      tipo: "devolucao"
    };
    addConferencia(novoItem);
    
    // Reset do formulário após adicionar
    reset();
    
    // Foca no campo SKU após salvar
    setTimeout(() => {
      setFocus('sku');
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Formulário para Novo Item */}
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Nova Conferência</h2>
              <Anomalia demandaId={demandaId} />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* SKU */}
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium">
                  Código SKU *
                </Label>
                <Input
                  id="sku"
                  {...register('sku')}
                  onChange={(e) => {
                    handleFieldChange('sku', e.target.value);
                  }}
                  placeholder="Digite o código do produto"
                  className="h-10"
                />
                {errors.sku && (
                  <p className="text-sm text-red-600">{errors.sku.message}</p>
                )}
              </div>

              {/* Descrição (apenas exibição) */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Descrição do Produto
                </Label>
                <div className="min-h-10 p-3 bg-muted/50 rounded-md border">
                  <p className="text-sm text-muted-foreground">
                    {watchedFields.descricao || "A descrição será carregada automaticamente ao inserir o SKU"}
                  </p>
                </div>
              </div>

              {/* Informações do Lote */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="lote" className="text-sm font-medium">
                    Lote *
                  </Label>
                  <Input
                    id="lote"
                    {...register('lote')}
                    onChange={(e) => {
                      handleFieldChange('lote', e.target.value);
                    }}
                    placeholder="Nº do lote"
                    className="h-9"
                  />
                  {errors.lote && (
                    <p className="text-sm text-red-600">{errors.lote.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sif" className="text-sm font-medium">
                    SIF *
                  </Label>
                  <Input
                    id="sif"
                    {...register('sif')}
                    placeholder="Nº SIF"
                    className="h-9"
                  />
                  {errors.sif && (
                    <p className="text-sm text-red-600">{errors.sif.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fabricacao" className="text-sm font-medium">
                    Fabricação *
                  </Label>
                  <Input
                    id="fabricacao"
                    type="date"
                    {...register('fabricacao')}
                    className="h-9"
                  />
                  {errors.fabricacao && (
                    <p className="text-sm text-red-600">{errors.fabricacao.message}</p>
                  )}
                </div>
              </div>

              {/* Quantidades - Lado a lado */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="caixas" className="text-sm font-medium flex items-center gap-2">
                    <Box className="h-4 w-4 text-blue-600" />
                    Caixas *
                  </Label>
                  <Input
                    id="caixas"
                    type="number"
                    min="0"
                    {...register('quantidadeCaixas', { valueAsNumber: true })}
                    placeholder="0"
                    className="h-10 text-center text-lg font-semibold"
                  />
                  {errors.quantidadeCaixas && (
                    <p className="text-sm text-red-600">{errors.quantidadeCaixas.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="unidades" className="text-sm font-medium flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-600" />
                    Unidades *
                  </Label>
                  <Input
                    id="unidades"
                    type="number"
                    min="0"
                    {...register('quantidadeUnidades', { valueAsNumber: true })}
                    placeholder="0"
                    className="h-10 text-center text-lg font-semibold"
                  />
                  {errors.quantidadeUnidades && (
                    <p className="text-sm text-red-600">{errors.quantidadeUnidades.message}</p>
                  )}
                </div>
              </div>

              {/* Botões de ação */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" className="flex-1 h-12">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 h-12 gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Conferência
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}