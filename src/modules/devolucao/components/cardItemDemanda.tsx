'use client'
import { Button } from "@/_shared/components/ui/button";
import { Card, CardContent } from "@/_shared/components/ui/card";
import { Badge } from "@/_shared/components/ui/badge";
import { Calendar, Truck, Warehouse, User } from "lucide-react";
import type { DemandaItem } from "../types/demandaItem";
import { cn } from "@/_shared/lib/utils";

interface CardItemDemandaProps {
  demanda: DemandaItem;
  onContinuar?: (demanda: DemandaItem) => void;
  onIniciar?: (demanda: DemandaItem) => void;
}

export function CardItemDemanda({ demanda, onContinuar, onIniciar }: CardItemDemandaProps) {
  const statusConfig = {
    AGUARDANDO_CONFERENCIA: { 
      label: "Aguardando Conferência", 
      color: "text-orange-600 bg-orange-50 border-orange-200" 
    },
    EM_CONFERENCIA: { 
      label: "Em Conferência", 
      color: "text-blue-600 bg-blue-50 border-blue-200" 
    },
    CONCLUIDA: { 
      label: "Concluída", 
      color: "text-green-600 bg-green-50 border-green-200" 
    },
    CANCELADA: { 
      label: "Cancelada", 
      color: "text-red-600 bg-red-50 border-red-200" 
    }
  };

  const currentStatus = statusConfig[demanda.status as keyof typeof statusConfig] || statusConfig.AGUARDANDO_CONFERENCIA;

  const buttonConfig = {
    EM_CONFERENCIA: { label: "Continuar", action: onContinuar },
    AGUARDANDO_CONFERENCIA: { label: "Iniciar Processo", action: onIniciar }
  };

  const currentButton = buttonConfig[demanda.status as keyof typeof buttonConfig];

  const handleAction = () => {
    currentButton?.action?.(demanda);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="w-full p-4 hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/50">
      <CardContent className="p-0 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground truncate">
            Devolução #{demanda.id}
          </h3>
          <Badge variant="outline" className={cn("text-xs whitespace-nowrap", currentStatus.color)}>
            {currentStatus.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Iniciado em {formatDate(demanda.data)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Warehouse className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{demanda.doca}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground font-mono font-medium">{demanda.placa}</span>
            </div>
          </div>

          {demanda.conferenteId && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{demanda.conferenteId}</span>
            </div>
          )}
        </div>

        {currentButton && (
          <Button onClick={handleAction} className="w-full h-10 text-sm font-medium">
            {currentButton.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}