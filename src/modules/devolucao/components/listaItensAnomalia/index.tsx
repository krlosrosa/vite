import { Badge } from "@/_shared/components/ui/badge";
import { Button } from "@/_shared/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/_shared/components/ui/drawer";
import { Card, CardContent } from "@/_shared/components/ui/card";
import { AlertTriangle, Trash2, Camera, Package, Box } from "lucide-react";
import { useDevolucaoStore } from "../../stores/conferencia";

export default function ListaAnomalias({ demandaId }: { demandaId: number }) {
  const { anomalias, removeAnomalia } = useDevolucaoStore();
  
  const anomaliasPorId = anomalias.filter((item) => item.demandaId === demandaId);
  
  const getTotalCaixasAnomalias = () => 
    anomaliasPorId.reduce((total, item) => total + (item.caixas || 0), 0);
  
  const getTotalUnidadesAnomalias = () => 
    anomaliasPorId.reduce((total, item) => total + (item.unidades || 0), 0);

  const getCorPorNatureza = (natureza: string) => {
    const cores: Record<string, string> = {
      "Qualidade": "red",
      "Quantidade": "orange", 
      "Embalagem": "amber",
      "Documentação": "blue",
      "Validade": "purple",
      "Outros": "gray"
    };
    return cores[natureza] || "gray";
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="h-12 flex flex-col items-center justify-center gap-1 text-xs relative">
          <AlertTriangle className="h-5 w-5" />
          <span>Anomalias</span>
          {anomaliasPorId.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 py-0 text-[10px] leading-5 rounded-full bg-red-600">
              {anomaliasPorId.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="pb-3 border-b">
          <DrawerTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            Anomalias Registradas ({anomaliasPorId.length})
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-3">
          {anomaliasPorId.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhuma anomalia registrada</p>
            </div>
          ) : (
            <div className="space-y-2">
              {anomaliasPorId.map((anomalia) => (
                <Card key={anomalia.id} className="relative py-4 overflow-hidden border-l-2 border-l-red-400">
                  <CardContent className="p-0">
                    <div className="px-3">
                      <div className="flex justify-between items-start mb-2">
                        {/* SKU e Lote */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm truncate">{anomalia.sku}</span>
                            <span className="font-medium text-sm truncate"> | {anomalia.descricao}</span>
                            
                          </div>
                          
                          {/* Natureza e Tipo */}
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              className={`text-[10px] h-4 px-1 bg-${getCorPorNatureza(anomalia.natureza)}-100 text-${getCorPorNatureza(anomalia.natureza)}-800 border-${getCorPorNatureza(anomalia.natureza)}-200`}
                            >
                              {anomalia.natureza}
                            </Badge>
                            <span className="text-xs text-muted-foreground truncate">
                              {anomalia.tipo}
                            </span>
                          </div>
                        </div>

                        {/* Botão remover */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnomalia(anomalia.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2 shrink-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Causa e Quantidades */}
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <span className="text-xs text-muted-foreground">
                            Causa: {anomalia.causa} | Tipo: {anomalia.tipo} | Natureza: {anomalia.natureza}
                          </span>
                        </div>
                        
                        {/* Quantidades */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Box className="h-3 w-3 text-blue-600" />
                            <span>{anomalia.caixas || 0} cx</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3 text-green-600" />
                            <span>{anomalia.unidades || 0} un</span>
                          </div>
                        </div>
                      </div>

                      {/* Fotos e Observações */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Fotos */}
                        <div className="flex items-center gap-1">
                          <Camera className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {anomalia.fotoBase64?.length || 0} foto(s)
                          </span>
                        </div>

                        {/* Observações (se existir) */}
                        {anomalia.observacoes && (
                          <div className="flex-1 ml-2">
                            <span className="text-xs text-muted-foreground truncate block">
                              {anomalia.observacoes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer minimalista */}
        {anomaliasPorId.length > 0 && (
          <div className="border-t p-3 bg-red-50">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-red-800">Total Anomalias:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-red-700">
                  <Box className="h-3 w-3" />
                  <span>{getTotalCaixasAnomalias()}cx</span>
                </div>
                <div className="flex items-center gap-1 text-red-700">
                  <Package className="h-3 w-3" />
                  <span>{getTotalUnidadesAnomalias()}un</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}