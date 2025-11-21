"use client"
import { Badge } from "@/_shared/components/ui/badge"
import { Button } from "@/_shared/components/ui/button"
import { ListChecks } from "lucide-react"
import ItensAnomalia from "./listaAnomalias"
export default function BottomMenu() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-20">
      <div className="mx-auto max-w-md p-3">
        <div className="rounded-2xl border bg-card/90 backdrop-blur shadow-lg px-3 py-3 grid grid-cols-4 gap-3">
          {/* Itens conferidos sheet */}
          <div className="relative">
          <Button variant="ghost" className="h-12 flex flex-col items-center justify-center gap-1 text-xs">
          <div className="relative">
            <ListChecks className="h-5 w-5" />
            <Badge className="absolute -top-2 -right-2 h-5 min-w-5 px-1 py-0 text-[10px] leading-5 rounded-full">
              {2}
            </Badge>
          </div>
          Itens
        </Button>
          </div>
          {/* Anomalias sheet */}
          <ItensAnomalia/>

          {/* Finalizar demanda */}
          <Button className="col-span-2 h-12 text-sm shadow-md">Finalizar</Button>
        </div>
      </div>
    </div>
  )
}