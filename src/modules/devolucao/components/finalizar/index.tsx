import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/_shared/components/ui/card";
import { Badge } from "@/_shared/components/ui/badge";
import { CheckCircle, Package, AlertTriangle, CheckSquare, Truck, AlertCircle } from "lucide-react";
import { useState } from "react";

// Tipos mockados
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

type ItemDivergencia = {
  sku: string;
  descricao: string;
  tipoDivergencia: 'EXCESSO_FISICO' | 'FALTA_FISICO' | 'PRODUTO_NAO_LISTADO';
}

type DiferencaFisicoContabil = {
  totalItensFisico: number;
  totalItensContabil: number;
  temDiferenca: boolean;
  itensComDivergencia: ItemDivergencia[];
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

  // Mock dos itens com divergência
  const divergenciasMock: ItemDivergencia[] = [
    { 
      sku: "PROD001", 
      descricao: "Arroz Integral 1kg", 
      tipoDivergencia: "EXCESSO_FISICO" 
    },
    { 
      sku: "PROD004", 
      descricao: "Café Tradicional 500g", 
      tipoDivergencia: "FALTA_FISICO" 
    },
    { 
      sku: "PROD008", 
      descricao: "Leite UHT 1L", 
      tipoDivergencia: "PRODUTO_NAO_LISTADO" 
    }
  ];

  const diferencaMock: DiferencaFisicoContabil = {
    totalItensFisico: 8,
    totalItensContabil: 7,
    temDiferenca: divergenciasMock.length > 0,
    itensComDivergencia: divergenciasMock
  };

  // Calcula estatísticas
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

  const getTipoDivergenciaText = (tipo: string) => {
    switch (tipo) {
      case 'EXCESSO_FISICO': return 'Excesso no físico';
      case 'FALTA_FISICO': return 'Falta no físico';
      case 'PRODUTO_NAO_LISTADO': return 'Produto não listado';
      default: return 'Divergência';
    }
  };

  const getTipoDivergenciaColor = (tipo: string) => {
    switch (tipo) {
      case 'EXCESSO_FISICO': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'FALTA_FISICO': return 'bg-red-100 text-red-800 border-red-200';
      case 'PRODUTO_NAO_LISTADO': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFinalizar = async () => {
    setIsLoading(true);
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

        {/* Card de Comparação Físico vs Contábil */}
        <Card className={diferencaMock.temDiferenca ? "border-orange-200" : "border-green-200"}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              {diferencaMock.temDiferenca ? (
                <AlertCircle className="h-5 w-5 text-orange-600" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              Comparação Físico vs Contábil
              {diferencaMock.temDiferenca && (
                <Badge variant="outline" className="text-orange-600 border-orange-300">
                  {diferencaMock.itensComDivergencia.length} divergências
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Status da Comparação */}
              <div className={`p-4 rounded-lg ${
                diferencaMock.temDiferenca ? "bg-orange-50 border border-orange-200" : "bg-green-50 border border-green-200"
              }`}>
                <div className="flex items-center gap-3">
                  {diferencaMock.temDiferenca ? (
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                  <div>
                    <p className={`font-medium ${
                      diferencaMock.temDiferenca ? "text-orange-800" : "text-green-800"
                    }`}>
                      {diferencaMock.temDiferenca ? "Divergências Encontradas" : "Conferência OK"}
                    </p>
                    <p className={`text-sm ${
                      diferencaMock.temDiferenca ? "text-orange-700" : "text-green-700"
                    }`}>
                      {diferencaMock.temDiferenca 
                        ? `${diferencaMock.itensComDivergencia.length} itens com divergência`
                        : "Nenhuma divergência encontrada"
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Resumo da Comparação */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-blue-700">{diferencaMock.totalItensFisico}</p>
                  <p className="text-xs text-blue-600">Itens no Físico</p>
                </div>

                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <CheckSquare className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-purple-700">{diferencaMock.totalItensContabil}</p>
                  <p className="text-xs text-purple-600">Itens no Contábil</p>
                </div>
              </div>

              {/* Lista de Itens com Divergência */}
              {diferencaMock.temDiferenca && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Itens com divergência identificada:
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {diferencaMock.itensComDivergencia.map((item, index) => (
                      <div 
                        key={`${item.sku}-${index}`}
                        className="flex items-center justify-between p-3 border rounded-lg bg-white"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.descricao}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            SKU: {item.sku}
                          </p>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs whitespace-nowrap ${getTipoDivergenciaColor(item.tipoDivergencia)}`}
                        >
                          {getTipoDivergenciaText(item.tipoDivergencia)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  {/* Informação de segurança */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 text-center">
                      🔒 As quantidades específicas não são exibidas por política de segurança
                    </p>
                  </div>
                </div>
              )}
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
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{totalItensConferidos}</p>
                <p className="text-sm text-blue-600">Itens Conferidos</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700">{totalItensValidados}</p>
                <p className="text-sm text-green-600">Itens Validados</p>
                <p className="text-xs text-green-500">
                  {Math.round((totalItensValidados / totalItensContabil) * 100)}%
                </p>
              </div>

              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-700">{totalAnomalias}</p>
                <p className="text-sm text-orange-600">Anomalias</p>
              </div>

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

        {/* Card de Ação Final */}
        <Card className=" from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Processo Concluído
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {diferencaMock.temDiferenca 
                    ? "Conferência finalizada com divergências identificadas. Proceda com a finalização."
                    : "Todas as etapas foram finalizadas sem divergências."
                  }
                </p>
              </div>

              <Button 
                onClick={handleFinalizar}
                disabled={!podeFinalizar || isLoading}
                className={`gap-2 h-12 px-8 ${
                  diferencaMock.temDiferenca 
                    ? "bg-orange-600 hover:bg-orange-700" 
                    : "bg-green-600 hover:bg-green-700"
                }`}
                size="lg"
              >
                <Truck className="h-5 w-5" />
                {isLoading ? "Finalizando..." : "Finalizar Demanda"}
              </Button>

              {diferencaMock.temDiferenca && (
                <p className="text-sm text-orange-600">
                  * Esta demanda contém {diferencaMock.itensComDivergencia.length} itens com divergência
                </p>
              )}

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