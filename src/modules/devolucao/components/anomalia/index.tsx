import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { Textarea } from "@/_shared/components/ui/textarea";
import { Card, CardContent } from "@/_shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_shared/components/ui/select";
import { Camera, Save, X } from "lucide-react";
import { useState } from "react";

type FotoItem = {
  id: string;
  nome: string;
};

export default function Anomalia() {
  const [anomalia, setAnomalia] = useState({
    natureza: "",
    tipo: "",
    causa: "",
    quantidadeCaixas: 0,
    quantidadeUnidades: 0,
    observacoes: "",
    fotos: [] as FotoItem[]
  });

  // Dados pré-definidos para seleção
  const naturezasAnomalia = [
    "Qualidade",
    "Quantidade", 
    "Embalagem",
    "Documentação",
    "Validade",
    "Outros"
  ];

  const tiposAnomalia = {
    "Qualidade": ["Produto avariado", "Produto contaminado", "Produto alterado", "Outro"],
    "Quantidade": ["Falta de produto", "Excesso de produto", "Divergência no lote", "Outro"],
    "Embalagem": ["Embalagem danificada", "Embalagem inadequada", "Rótulo incorreto", "Outro"],
    "Documentação": ["Nota fiscal incorreta", "Lote divergente", "Data incorreta", "Outro"],
    "Validade": ["Produto vencido", "Produto próximo do vencimento", "Data incorreta", "Outro"],
    "Outros": ["Outros"]
  };

  const causasAnomalia = [
    "Transporte",
    "Armazenamento",
    "Processo interno",
    "Fornecedor",
    "Cliente",
    "Outros"
  ];

  const handleInputChange = (campo: string, valor: any) => {
    setAnomalia(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleAdicionarFoto = () => {
    // Simulação de upload de foto
    const novaFoto: FotoItem = {
      id: `foto-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      nome: `foto-${Date.now()}.jpg`
    };
    setAnomalia(prev => ({
      ...prev,
      fotos: [...prev.fotos, novaFoto]
    }));
  };

  const handleRemoverFoto = (id: string) => {
    setAnomalia(prev => ({
      ...prev,
      fotos: prev.fotos.filter(foto => foto.id !== id)
    }));
  };

  const handleSalvar = () => {
    console.log("Anomalia registrada:", anomalia);
  };

  const getTiposDisponiveis = () => {
    return anomalia.natureza ? tiposAnomalia[anomalia.natureza as keyof typeof tiposAnomalia] || [] : [];
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Registro de Anomalia</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Preencha as informações da anomalia identificada
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Natureza da Anomalia */}
            <div className="space-y-3">
              <Label htmlFor="natureza" className="text-sm font-medium">
                Natureza da Anomalia *
              </Label>
              <Select value={anomalia.natureza} onValueChange={(value) => handleInputChange("natureza", value)}>
                <SelectTrigger id="natureza" className="h-10 w-full">
                  <SelectValue placeholder="Selecione a natureza" />
                </SelectTrigger>
                <SelectContent>
                  {naturezasAnomalia.map((natureza) => (
                    <SelectItem key={natureza} value={natureza}>
                      {natureza}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tipo de Anomalia */}
            <div className="space-y-3">
              <Label htmlFor="tipo" className="text-sm font-medium">
                Tipo de Anomalia *
              </Label>
              <Select 
                value={anomalia.tipo} 
                onValueChange={(value) => handleInputChange("tipo", value)}
                disabled={!anomalia.natureza}
              >
                <SelectTrigger id="tipo" className="h-10 w-full">
                  <SelectValue placeholder={anomalia.natureza ? "Selecione o tipo" : "Selecione primeiro a natureza"} />
                </SelectTrigger>
                <SelectContent>
                  {getTiposDisponiveis().map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Causa */}
            <div className="space-y-3">
              <Label htmlFor="causa" className="text-sm font-medium">
                Causa da Anomalia *
              </Label>
              <Select value={anomalia.causa} onValueChange={(value) => handleInputChange("causa", value)}>
                <SelectTrigger id="causa" className="h-10 w-full">
                  <SelectValue placeholder="Selecione a causa" />
                </SelectTrigger>
                <SelectContent>
                  {causasAnomalia.map((causa) => (
                    <SelectItem key={causa} value={causa}>
                      {causa}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantidades */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="quantidadeCaixas" className="text-sm font-medium">
                  Qtd. Caixas
                </Label>
                <Input
                  id="quantidadeCaixas"
                  type="number"
                  min="0"
                  value={anomalia.quantidadeCaixas}
                  onChange={(e) => handleInputChange("quantidadeCaixas", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="h-10"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="quantidadeUnidades" className="text-sm font-medium">
                  Qtd. Unidades
                </Label>
                <Input
                  id="quantidadeUnidades"
                  type="number"
                  min="0"
                  value={anomalia.quantidadeUnidades}
                  onChange={(e) => handleInputChange("quantidadeUnidades", parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="h-10"
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-3">
              <Label htmlFor="observacoes" className="text-sm font-medium">
                Observações
              </Label>
              <Textarea
                id="observacoes"
                value={anomalia.observacoes}
                onChange={(e) => handleInputChange("observacoes", e.target.value)}
                placeholder="Descreva detalhes adicionais sobre a anomalia..."
                className="min-h-24 resize-none"
              />
            </div>

            {/* Fotos */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Fotos da Anomalia
              </Label>
              
              {/* Grid de Fotos */}
              <div className="grid grid-cols-3 gap-3">
                {anomalia.fotos.map((foto, index) => (
                  <div key={foto.id} className="relative">
                    <div className="aspect-square bg-muted rounded-md border flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Foto {index + 1}</span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      onClick={() => handleRemoverFoto(foto.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                
                {/* Botão para adicionar foto */}
                {anomalia.fotos.length < 6 && (
                  <button
                    onClick={handleAdicionarFoto}
                    className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-md flex flex-col items-center justify-center gap-2 hover:border-muted-foreground/50 transition-colors"
                  >
                    <Camera className="h-6 w-6 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Adicionar</span>
                  </button>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground">
                {anomalia.fotos.length}/6 fotos adicionadas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12">
            Cancelar
          </Button>
          <Button onClick={handleSalvar} className="flex-1 h-12 gap-2">
            <Save className="h-4 w-4" />
            Registrar Anomalia
          </Button>
        </div>
      </div>
    </div>
  );
}