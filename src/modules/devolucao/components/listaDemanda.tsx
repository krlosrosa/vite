import { useState } from "react";
import { demandas } from "@/__mocks__/demandas";
import { CardItemDemanda } from "./cardItemDemanda";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/_shared/components/ui/collapsible";
import { Button } from "@/_shared/components/ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Badge } from "@/_shared/components/ui/badge";

type StatusDemanda = 'andamento' | 'nao_iniciadas';

export default function ListaDemanda() {
  const [openSections, setOpenSections] = useState<Record<StatusDemanda, boolean>>({
    andamento: true,
    nao_iniciadas: false
  });

  const toggleSection = (section: StatusDemanda) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filtrar demandas por status (exemplo - ajuste conforme sua estrutura de dados)
  const demandasEmAndamento = demandas.filter(demanda => 
    demanda.status === 'EM_CONFERENCIA'
  );
  
  const demandasNaoIniciadas = demandas.filter(demanda => 
    demanda.status === 'AGUARDANDO_CONFERENCIA'
  );

  const sections = [
    {
      key: 'andamento' as StatusDemanda,
      title: 'Em andamento',
      demandas: demandasEmAndamento,
      badgeVariant: "default" as const,
      isOpen: openSections.andamento
    },
    {
      key: 'nao_iniciadas' as StatusDemanda,
      title: 'Não iniciadas',
      demandas: demandasNaoIniciadas,
      badgeVariant: "outline" as const,
      isOpen: openSections.nao_iniciadas
    }
  ];

  return (
    <div className="space-y-3 p-2 w-full">
      {sections.map((section) => (
        <Collapsible 
          key={section.key}
          open={section.isOpen}
          onOpenChange={() => toggleSection(section.key)}
          className="w-full border rounded-lg bg-card"
        >
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              className="w-full justify-between p-4 hover:bg-muted/50"
            >
              <div className="flex h-24 items-center gap-2">
                <span className="font-medium text-sm">{section.title}</span>
                <Badge variant={section.badgeVariant}>
                  {section.demandas.length}
                </Badge>
              </div>
              {section.isOpen ? (
                <ChevronUpIcon className="h-4 w-4 text-muted-foreground transition-transform" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground transition-transform" />
              )}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="px-2 pb-3">
            <div className="space-y-2 mt-2">
              {section.demandas.length > 0 ? (
                section.demandas.map((demanda) => (
                  <CardItemDemanda key={demanda.id} demanda={demanda} />
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  Nenhuma demanda {section.title.toLowerCase()}
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}