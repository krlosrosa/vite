"use client"
import { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/_shared/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/_shared/components/ui/form"
import { Skeleton } from "@/_shared/components/ui/skeleton"
import { CheckCircle, ScanLine, Calendar, AlertCircle } from "lucide-react"
import { Button } from "@/_shared/components/ui/button"
import { Card, CardContent } from "@/_shared/components/ui/card"
import { Badge } from "@/_shared/components/ui/badge"

type ConferenciaForm = {
  sku: string
  data: string
  sif: string
  caixa: string
  unidade: string
}

export default function FormularioConferenciaCega() {
  const form = useForm<ConferenciaForm>({
    defaultValues: {
      sku: "",
      data: "",
      sif: "",
      caixa: "",
      unidade: "",
    },
    mode: "onChange",
  })

  const skuRef = useRef<HTMLInputElement | null>(null)
  const sifRef = useRef<HTMLInputElement | null>(null)
  const caixaRef = useRef<HTMLInputElement | null>(null)
  const unidadeRef = useRef<HTMLInputElement | null>(null)
  const [descricaoBanco, setDescricaoBanco] = useState<string>("")
  const [loadingDesc, setLoadingDesc] = useState<boolean>(false)

  // Foco automático no SKU quando o componente carrega
  useEffect(() => {
    skuRef.current?.focus()
  }, [])

  // Simulação de busca de descrição quando o SKU muda
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "sku" && value.sku && value.sku.length >= 3) {
        setLoadingDesc(true)
        // Simula busca no banco
        setTimeout(() => {
          setDescricaoBanco("Produto de exemplo - Lote especial para distribuição")
          setLoadingDesc(false)
        }, 300)
      } else if (name === "sku" && !value.sku) {
        setDescricaoBanco("")
      }
    })
    return () => subscription.unsubscribe()
  }, [form.watch])

  const onSubmit = (data: ConferenciaForm) => {
    console.log("Dados do formulário:", data)
    // Limpar formulário após envio
    form.reset()
    setDescricaoBanco("")
    // Voltar o foco para o SKU
    setTimeout(() => skuRef.current?.focus(), 100)
  }

  const isFormValid = descricaoBanco !== "" && 
    form.getValues("sku") && 
    form.getValues("data") && 
    form.getValues("sif")

  return (
    <div className="from-blue-50 to-white p-3 pb-28">
      <div className="space-y-3 max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* SKU Field - O mais importante */}
            <Card className="shadow-sm py-1 border-blue-100">
              <CardContent className="p-3">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => {
                    const { ref, ...rest } = field
                    return (
                      <FormItem className="space-y-2">
                        <FormLabel className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                          <ScanLine className="h-4 w-4" /> 
                          Código SKU *
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              ref={(el) => {
                                ref(el)
                                skuRef.current = el
                              }}
                              placeholder="Digite ou escaneie o SKU"
                              autoFocus
                              inputMode="numeric"
                              autoComplete="off"
                              enterKeyHint="next"
                              className="h-12 text-base pl-10 border-blue-300 focus:border-blue-500 bg-white"
                              {...rest}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  // Pular para data no mobile (melhor UX)
                                  const dataInput = document.querySelector('input[type="date"]') as HTMLInputElement
                                  dataInput?.focus()
                                }
                              }}
                              onFocus={(e) => e.currentTarget.select()}
                            />
                            <ScanLine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </CardContent>
            </Card>

            {/* Descrição - Aparece apenas quando tem conteúdo */}
            {descricaoBanco && (
              <Card className={`border-2 transition-all py-1 duration-200 shadow-sm ${
                descricaoBanco ? "border-green-200 bg-green-50" : "border-gray-200"
              }`}>
                <CardContent className="p-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      ✓
                    </Badge>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-green-800 mb-1">Produto Encontrado:</p>
                      <p className="text-sm text-gray-800 leading-tight">
                        {descricaoBanco}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading skeleton só aparece quando loading */}
            {loadingDesc && (
              <Card className="border-gray-200 py-1 bg-gray-50">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Campos do Lote - Grid compacto */}
            <Card className="shadow-sm py-1 border-orange-100">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <h3 className="text-sm font-semibold text-orange-700">Dados do Lote</h3>
                </div>
                
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="data"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel className="text-xs font-semibold">Data *</FormLabel>
                        <FormControl>
                          <div className="">
                            <Input 
                              type="date" 
                              className="h-10 text-sm border-orange-200 focus:border-orange-500" 
                              {...field} 
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault()
                                  sifRef.current?.focus()
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sif"
                    render={({ field }) => {
                      const { ref, ...rest } = field
                      return (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-semibold">SIF *</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                ref={(el) => {
                                  ref(el)
                                  sifRef.current = el
                                }}
                                placeholder="SIF"
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                enterKeyHint="next"
                                className="h-10 text-sm border-orange-200 focus:border-orange-500"
                                {...rest}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    caixaRef.current?.focus()
                                  }
                                }}
                                onFocus={(e) => e.currentTarget.select()}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="caixa"
                      render={({ field }) => {
                        const { ref, ...rest } = field
                        return (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-semibold">Caixas</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  ref={(el) => {
                                    ref(el)
                                    caixaRef.current = el
                                  }}
                                  placeholder="0" 
                                  inputMode="numeric" 
                                  className="h-10 text-sm border-orange-200 focus:border-orange-500" 
                                  enterKeyHint="next" 
                                  {...rest}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      unidadeRef.current?.focus()
                                    }
                                  }}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="unidade"
                      render={({ field }) => {
                        const { ref, ...rest } = field
                        return (
                          <FormItem className="space-y-1.5">
                            <FormLabel className="text-xs font-semibold">Unidades</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  ref={(el) => {
                                    ref(el)
                                    unidadeRef.current = el
                                  }}
                                  placeholder="0"
                                  inputMode="numeric"
                                  autoComplete="one-time-code"
                                  enterKeyHint="done"
                                  className="h-10 text-sm border-orange-200 focus:border-orange-500"
                                  {...rest}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault()
                                      if (isFormValid) {
                                        form.handleSubmit(onSubmit)()
                                      }
                                    }
                                  }}
                                  onFocus={(e) => e.currentTarget.select()}
                                />
                              </div>
                            </FormControl>
                          </FormItem>
                        )
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botão para adicionar anomalia - Sutil */}
            <div className="flex justify-center pt-2 pb-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400 hover:text-gray-600 h-auto py-1 px-2 font-normal"
                onClick={() => {
                  // TODO: Implementar lógica para adicionar anomalia
                  console.log("Adicionar anomalia")
                }}
              >
                <AlertCircle className="h-3 w-3 mr-1.5 opacity-70" />
                Adicionar anomalia
              </Button>
            </div>

            {/* Botão Fixo na parte inferior */}
            <div className="bottom-4 left-3 right-3 max-w-md mx-auto">
              <Button 
                type="submit" 
                disabled={!isFormValid}
                className="w-full h-14 text-base font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                size="lg"
              >
                <CheckCircle className="h-5 w-5 mr-2" /> 
                {isFormValid ? "Confirmar" : "Preencha os campos obrigatórios"}
              </Button>
              
              <div className="text-center mt-2">
                <p className="text-xs text-gray-500">
                  * Campos obrigatórios
                </p>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}