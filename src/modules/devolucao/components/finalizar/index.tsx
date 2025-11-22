import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card";
import { Badge } from "@/_shared/components/ui/badge";  
import { CheckCircle, Package, AlertTriangle, CheckSquare, Truck } from "lucide-react";
import { useState } from "react";

// Tipos mockados baseados na sua estrutura
type DemandaItem = {
  id: number;
  placa: string;
  motorista: string;
  data: string;
  status: string;
  transportadora: string;
  type: string;
}

type ChecklistItem = {
  id: number;
  temperaturaProduto: number;
  temperaturaCaminhao: number;
}

type ItemConferencia = {
  id: number;
  sku: string;
  descricao: string;
}

type AnomaliaItem = {
  id: number;
  natureza: string;
  tipo: string;
}

type ItemContabil = {
  id: number;
  sku: string;
  descricao: string;
  validado: boolean;
}

type Props = {
  onFinalizarDemanda: () => void;
}

export default function FinalizacaoDemanda({ onFinalizarDemanda }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  // Dados mockados
  const demandaMock: DemandaItem = {
    id: 12345,
    placa: "ABC1D23",
    motorista: "João Silva Santos",
    data: "2024-01-15",
    status: "EM_CONFERENCIA",
    transportadora: "Transportes Rápidos LTDA",
    type: "REENTREGA"
  };

  const checklistMock: ChecklistItem = {
    id: 1,
    temperaturaProduto: 4,
    temperaturaCaminhao: 5
  };

  const conferenciasMock: ItemConferencia[] = [
    { id: 1, sku: "PROD001", descricao: "Arroz Integral 1kg" },
    { id: 2, sku: "PROD002", descricao: "Feijão Carioca 1kg" },
    { id: 3, sku: "PROD003", descricao: "Açúcar Cristal 1kg" },
    { id: 4, sku: "PROD004", descricao: "Café Tradicional 500g" },
    { id: 5, sku: "PROD005", descricao: "Óleo de Soja 900ml" }
  ];

  const anomaliasMock: AnomaliaItem[] = [
    { id: 1, natureza: "Qualidade", tipo: "Produto avariado" },
    { id: 2, natureza: "Embalagem", tipo: "Embalagem danificada" }
  ];

  const itensContabilMock: ItemContabil[] = [
    { id: 1, sku: "PROD001", descricao: "Arroz Integral 1kg", validado: true },
    { id: 2, sku: "PROD002", descricao: "Feijão Carioca 1kg", validado: true },
    { id: 3, sku: "PROD003", descricao: "Açúcar Cristal 1kg", validado: true },
    { id: 4, sku: "PROD004", descricao: "Café Tradicional 500g", validado: false },
    { id: 5, sku: "PROD005", descricao: "Óleo de Soja 900ml", validado: false },
    { id: 6, sku: "PROD006", descricao: "Farinha de Trigo 1kg", validado: true },
    { id: 7, sku: "PROD007", descricao: "Sal Refinado 1kg", validado: true }
  ];

  // Calcula estatísticas com dados mockados
  const totalItensConferidos = conferenciasMock.length;
  const totalItensContabil = itensContabilMock.length;
  const totalItensValidados = itensContabilMock.filter(item => item.validado).length;
  const totalAnomalias = anomaliasMock.length;
  
  // Verifica se pode finalizar
  const podeFinalizar = 
    demandaMock.status !== 'FINALIZADO' && 
    demandaMock.status !== 'CANCELADO' &&
    totalItensConferidos > 0 &&
    checklistMock !== null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FINALIZADO': return 'bg-green-100 text-green-800';
      case 'CANCELADO': return 'bg-red-100 text-red-800';
      case 'EM_CONFERENCIA': return 'bg-blue-100 text-blue-800';
      case 'CONFERENCIA_FINALIZADA': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoDemandaColor = (tipo: string) => {
    switch (tipo) {
      case 'REENTREGA': return 'bg-blue-100 text-blue-800';
      case 'DEVOLUCAO': return 'bg-orange-100 text-orange-800';
      case 'AMBOS': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFinalizar = async () => {
    setIsLoading(true);
    // Simula uma requisição
    await new Promise(resolve => setTimeout(resolve, 2000));
    onFinalizarDemanda();
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Finalizar Demanda</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Revise as informações antes de finalizar o processo
          </p>
        </div>

        {/* Card de Resumo da Demanda */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Resumo da Demanda #{demandaMock.id}</span>
              <Badge variant="secondary" className={getStatusColor(demandaMock.status)}>
                {demandaMock.status.replace(/_/g, ' ')}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Placa:</span>
                <p className="font-medium">{demandaMock.placa}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Motorista:</span>
                <p className="font-medium">{demandaMock.motorista}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Transportadora:</span>
                <p className="font-medium">{demandaMock.transportadora}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <Badge variant="outline" className={getTipoDemandaColor(demandaMock.type)}>
                  {demandaMock.type}
                </Badge>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Data:</span>
                <p className="font-medium">{new Date(demandaMock.data).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Estatísticas */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Resumo da Conferência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Itens Conferidos */}
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{totalItensConferidos}</p>
                <p className="text-sm text-blue-600">Itens Conferidos</p>
              </div>

              {/* Itens Validados */}
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700">{totalItensValidados}</p>
                <p className="text-sm text-green-600">Itens Validados</p>
                <p className="text-xs text-green-500">
                  {Math.round((totalItensValidados / totalItensContabil) * 100)}%
                </p>
              </div>

              {/* Anomalias */}
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-700">{totalAnomalias}</p>
                <p className="text-sm text-orange-600">Anomalias</p>
              </div>

              {/* Checklist */}
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">1</p>
                <p className="text-sm text-purple-600">Checklist</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card de Detalhes */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Detalhes do Processo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Checklist */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <span className="text-sm font-medium">Checklist Veicular</span>
                  <p className="text-xs text-muted-foreground">
                    Temperatura: Produto {checklistMock.temperaturaProduto}°C / Caminhão {checklistMock.temperaturaCaminhao}°C
                  </p>
                </div>
              </div>
              <Badge variant="default">Concluído</Badge>
            </div>

            {/* Conferência Cega */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-green-600" />
                <div>
                  <span className="text-sm font-medium">Conferência Cega</span>
                  <p className="text-xs text-muted-foreground">
                    {conferenciasMock.length} produtos conferidos
                  </p>
                </div>
              </div>
              <Badge variant="default">{totalItensConferidos} itens</Badge>
            </div>

            {/* Validação de Itens */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-green-600" />
                <div>
                  <span className="text-sm font-medium">Validação de Itens</span>
                  <p className="text-xs text-muted-foreground">
                    {totalItensValidados} de {totalItensContabil} validados
                  </p>
                </div>
              </div>
              <Badge variant="default">{totalItensValidados}/{totalItensContabil}</Badge>
            </div>

            {/* Anomalias */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <span className="text-sm font-medium">Registro de Anomalias</span>
                  <p className="text-xs text-muted-foreground">
                    {anomaliasMock.map(a => a.tipo).join(', ')}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">{totalAnomalias} registros</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Itens Não Validados */}
        {itensContabilMock.filter(item => !item.validado).length > 0 && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Itens Pendentes de Validação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {itensContabilMock
                  .filter(item => !item.validado)
                  .map(item => (
                    <div key={item.id} className="flex justify-between items-center p-2 bg-orange-50 rounded">
                      <div>
                        <p className="text-sm font-medium">{item.sku}</p>
                        <p className="text-xs text-muted-foreground">{item.descricao}</p>
                      </div>
                      <Badge variant="outline" className="text-orange-600">Pendente</Badge>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        )}

        {/* Card de Ação Final */}
        <Card className="from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Processo Concluído
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Todas as etapas foram finalizadas. Clique no botão abaixo para 
                  encerrar a demanda.
                </p>
              </div>

              <Button 
                onClick={handleFinalizar}
                disabled={!podeFinalizar || isLoading}
                className="gap-2 h-12 px-8 bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Truck className="h-5 w-5" />
                {isLoading ? "Finalizando..." : "Finalizar Demanda"}
              </Button>

              {!podeFinalizar && (
                <p className="text-sm text-orange-600">
                  * Complete todas as etapas obrigatórias antes de finalizar
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}