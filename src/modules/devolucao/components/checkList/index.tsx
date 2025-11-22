import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/components/ui/tabs";
import { useState } from "react";
import FotoBauAberto from "./1-fotoBauAberto";
import FotoBauFechado from "./2-fotoBauFechado";
import Temperatura from "./3-temperatura";
import Anomalia from "./4-anomalia";

const steps = [
  'fotoBauAberto',
  'fotoBauFechado',
  'temperatura',
  'anomalia',
] as const

type Step = typeof steps[number]

type CheckListDevolucaoProps = {
  setStep: (step: string) => void
  id: string
}

export default function CheckListDevolucao({ setStep, id }: CheckListDevolucaoProps) {
  console.log(id)
  const [currentStep, setCurrentStep] = useState<Step>('fotoBauAberto')

  return (
    <Tabs defaultValue="fotoBauAberto" value={currentStep} onValueChange={setCurrentStep as (value: string) => void}>
      <TabsList hidden={true} className="grid w-full grid-cols-5">
        {steps.map((step) => (
          <TabsTrigger key={step} value={step}>{step}</TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value="fotoBauAberto">
        <FotoBauAberto setCurrentStep={setCurrentStep as (step: string) => void} id={id}/>
      </TabsContent>
      <TabsContent value="fotoBauFechado">
        <FotoBauFechado setCurrentStep={setCurrentStep as (step: string) => void}/>
      </TabsContent>
      <TabsContent value="temperatura">
        <Temperatura setCurrentStep={setCurrentStep as (step: string) => void}/>
      </TabsContent>
      <TabsContent className="p-4" value="anomalia">
        <Anomalia setStep={setStep} setCurrentStep={setCurrentStep as (step: string) => void}/>
      </TabsContent>
    </Tabs>
  )
}