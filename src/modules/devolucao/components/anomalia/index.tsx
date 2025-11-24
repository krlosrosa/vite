import { Button } from "@/_shared/components/ui/button";
import { Input } from "@/_shared/components/ui/input";
import { Label } from "@/_shared/components/ui/label";
import { Textarea } from "@/_shared/components/ui/textarea";
import { Card, CardContent } from "@/_shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/_shared/components/ui/select";
import { AlertTriangle, Camera, Save, X, Image } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDevolucaoStore } from "../../stores/conferencia";
import { Sheet, SheetTrigger, SheetContent } from "@/_shared/components/ui/sheet";

type FotoItem = {
  id: string;
  nome: string;
  base64: string;
};

type AnomaliaProps = {
  demandaId: number;
}

export default function Anomalia({ demandaId }: AnomaliaProps) {
  const {
    itemSelecionado,
    loteSelecionado,
    descricaoSelecionada,
    addAnomalia,
  } = useDevolucaoStore();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    console.log("Item selecionado:", itemSelecionado);
    console.log("Lote selecionado:", loteSelecionado);
    console.log("Descrição selecionada:", descricaoSelecionada);
  }, [itemSelecionado, loteSelecionado]);

  // Função para converter arquivo para base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  // Função para capturar foto da câmera
  const handleCapturarCamera = async () => {
    try {
      // Verifica se a API de câmera está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("A câmera não está disponível neste dispositivo");
        return;
      }

      // Cria um elemento de vídeo temporário
      const video = document.createElement('video');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Usa a câmera traseira
      });
      
      video.srcObject = stream;
      await video.play();

      // Cria um canvas para capturar a foto
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Aguarda um momento para a câmera focar
      await new Promise(resolve => setTimeout(resolve, 1000));

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);

      // Para a stream da câmera
      stream.getTracks().forEach(track => track.stop());

      // Adiciona a foto ao estado
      const novaFoto: FotoItem = {
        id: `foto-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        nome: `camera-${Date.now()}.jpg`,
        base64: base64
      };

      setAnomalia(prev => ({
        ...prev,
        fotos: [...prev.fotos, novaFoto]
      }));

    } catch (error) {
      console.error("Erro ao capturar foto:", error);
      alert("Erro ao acessar a câmera. Verifique as permissões.");
    }
  };

  // Função para selecionar foto da galeria
  const handleSelecionarGaleria = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Verifica se é uma imagem
    if (!file.type.startsWith('image/')) {
      alert("Por favor, selecione apenas imagens.");
      return;
    }

    // Verifica o tamanho do arquivo (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB.");
      return;
    }

    try {
      const base64 = await fileToBase64(file);
      
      const novaFoto: FotoItem = {
        id: `foto-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        nome: file.name,
        base64: base64
      };

      setAnomalia(prev => ({
        ...prev,
        fotos: [...prev.fotos, novaFoto]
      }));

      // Limpa o input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      alert("Erro ao processar a imagem selecionada.");
    }
  };

  const handleInputChange = (campo: string, valor: any) => {
    setAnomalia(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleRemoverFoto = (id: string) => {
    setAnomalia(prev => ({
      ...prev,
      fotos: prev.fotos.filter(foto => foto.id !== id)
    }));
  };

  const handleSalvar = () => {
    if (!itemSelecionado || !loteSelecionado) {
      alert("Nenhum produto ou lote selecionado. Volte para a conferência e selecione um item primeiro.");
      return;
    }

    if (!anomalia.natureza || !anomalia.tipo || !anomalia.causa) {
      alert("Preencha todos os campos obrigatórios: Natureza, Tipo e Causa.");
      return;
    }

    const novaAnomalia = {
      id: Date.now(),
      demandaId: Number(demandaId),
      sku: itemSelecionado,
      descricao: descricaoSelecionada || "",
      lote: loteSelecionado,
      natureza: anomalia.natureza,
      tipo: anomalia.tipo,
      causa: anomalia.causa,
      caixas: anomalia.quantidadeCaixas,
      unidades: anomalia.quantidadeUnidades,
      observacoes: anomalia.observacoes,
      fotoBase64: anomalia.fotos.map(foto => foto.base64),
    };

    addAnomalia(novaAnomalia);

    console.log("Anomalia registrada:", novaAnomalia);

    // Reset do formulário após salvar
    setAnomalia({
      natureza: "",
      tipo: "",
      causa: "",
      quantidadeCaixas: 0,
      quantidadeUnidades: 0,
      observacoes: "",
      fotos: []
    });
    setOpen(false);
  };

  const getTiposDisponiveis = () => {
    return anomalia.natureza ? tiposAnomalia[anomalia.natureza as keyof typeof tiposAnomalia] || [] : [];
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-8 px-3 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          Anomalia
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header fixo */}
          <div className="p-4 border-b bg-background sticky top-0 z-10">
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-900">Registro de Anomalia</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Preencha as informações da anomalia identificada
              </p>
            </div>
          </div>

          {/* Conteúdo com scroll */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Informações do Produto e Lote */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <Label className="text-xs text-blue-600 font-medium">Produto Selecionado</Label>
                    <p className="font-medium text-blue-900 truncate">
                      {itemSelecionado || "Nenhum produto selecionado"}
                    </p>
                    <p className="font-medium text-blue-900 text-xs line-clamp-2">
                      {descricaoSelecionada || "Nenhuma descrição selecionada"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-blue-600 font-medium">Lote Selecionado</Label>
                    <p className="font-medium text-blue-900">
                      {loteSelecionado || "Nenhum lote selecionado"}
                    </p>
                  </div>
                </div>
                {(!itemSelecionado || !loteSelecionado) && (
                  <p className="text-xs text-amber-600 mt-2">
                    ⚠️ Volte para a conferência e selecione um produto e lote primeiro
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                {/* Natureza da Anomalia */}
                <div className="space-y-2">
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
                <div className="space-y-2">
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
                <div className="space-y-2">
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
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
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

                  <div className="space-y-2">
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
                <div className="space-y-2">
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
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Fotos da Anomalia
                  </Label>

                  {/* Grid de Fotos */}
                  <div className="grid grid-cols-3 gap-2">
                    {anomalia.fotos.map((foto, index) => (
                      <div key={foto.id} className="relative">
                        <div className="aspect-square bg-muted rounded-md border flex items-center justify-center overflow-hidden">
                          <img 
                            src={foto.base64} 
                            alt={`Foto ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute -top-1 -right-1 h-5 w-5 p-0 rounded-full"
                          onClick={() => handleRemoverFoto(foto.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}

                    {/* Botões para adicionar foto */}
                    {anomalia.fotos.length < 6 && (
                      <>
                        <button
                          onClick={handleCapturarCamera}
                          className="aspect-square border-2 border-dashed border-blue-300 rounded-md flex flex-col items-center justify-center gap-1 hover:border-blue-400 transition-colors bg-blue-50"
                        >
                          <Camera className="h-5 w-5 text-blue-600" />
                          <span className="text-xs text-blue-600">Câmera</span>
                        </button>
                        
                        <button
                          onClick={handleSelecionarGaleria}
                          className="aspect-square border-2 border-dashed border-green-300 rounded-md flex flex-col items-center justify-center gap-1 hover:border-green-400 transition-colors bg-green-50"
                        >
                          <Image className="h-5 w-5 text-green-600" />
                          <span className="text-xs text-green-600">Galeria</span>
                        </button>

                        {/* Input hidden para seleção de arquivo */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileSelect}
                          accept="image/*"
                          className="hidden"
                        />
                      </>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {anomalia.fotos.length}/6 fotos adicionadas
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer fixo */}
          <div className="p-4 border-t bg-background sticky bottom-0">
            <div className="flex gap-3">
              <Button onClick={() => setOpen(false)} variant="outline" className="flex-1 h-12">
                Cancelar
              </Button>
              <Button
                onClick={handleSalvar}
                className="flex-1 h-12 gap-2"
                disabled={!itemSelecionado || !loteSelecionado || !anomalia.natureza || !anomalia.tipo || !anomalia.causa}
              >
                <Save className="h-4 w-4" />
                Registrar Anomalia
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}