import { Badge } from "@/_shared/components/ui/badge";
import { Button } from "@/_shared/components/ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle } from "@/_shared/components/ui/drawer";
import { Card, CardContent } from "@/_shared/components/ui/card";
import { ListChecks, Package, Box, Trash2 } from "lucide-react";
import { useDevolucaoStore } from "../../stores/conferencia";

export default function ListaItensConferidos({demandaId}: {demandaId: number}) {
  const { conferencias, removeConferencia } = useDevolucaoStore();
  
  const conferenciaPorId = conferencias.filter((item) => item.demandaId === demandaId);
  const getTotalCaixas = () => conferenciaPorId.reduce((total, item) => total + (item.quantidadeCaixas || 0), 0);
  const getTotalUnidades = () => conferenciaPorId.reduce((total, item) => total + (item.quantidadeUnidades || 0), 0);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="h-12 flex flex-col items-center justify-center gap-1 text-xs relative">
          <ListChecks className="h-5 w-5" />
          <span>Itens</span>
          {conferenciaPorId.length > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 py-0 text-[10px] leading-5 rounded-full bg-blue-600">
              {conferenciaPorId.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="pb-3 border-b">
          <DrawerTitle className="flex items-center gap-2 text-base">
            <ListChecks className="h-4 w-4 text-blue-600" />
            Itens Conferidos ({conferenciaPorId.length})
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto p-3">
          {conferenciaPorId.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-10 w-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum item conferido</p>
            </div>
          ) : (
            <div className="space-y-2">
              {conferenciaPorId.map((item) => (
                <Card key={item.id} className="relative py-4 overflow-hidden border-l-2 border-l-blue-400">
                  <CardContent className="">
                    <div className="flex justify-between items-center">
                      {/* Informações principais */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm truncate">{item.sku}</span>
                          <span className="font-medium text-sm truncate"> | {item.descricao}</span>
                        </div>
                        
                        {/* Quantidades compactas */}
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div>
                            <Badge variant="outline" className="text-[10px] h-4 px-1">
                              {item.fabricacao}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Box className="h-3 w-3 text-blue-600" />
                            <span>{item.quantidadeCaixas || 0} cx</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Package className="h-3 w-3 text-green-600" />
                            <span>{item.quantidadeUnidades || 0} un</span>
                          </div>
                        </div>
                      </div>

                      {/* Botão remover */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => item.id && removeConferencia(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2 shrink"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer minimalista */}
        {conferenciaPorId.length > 0 && (
          <div className="border-t p-3 bg-muted/30">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Total:</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-blue-700">
                  <Box className="h-3 w-3" />
                  <span>{getTotalCaixas()}cx</span>
                </div>
                <div className="flex items-center gap-1 text-green-700">
                  <Package className="h-3 w-3" />
                  <span>{getTotalUnidades()}un</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}