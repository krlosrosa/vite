import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/components/ui/tabs";
import { useParams, useRouter } from "@tanstack/react-router";
import CheckListDevolucao from "@/modules/devolucao/components/checkList/index";
import { HeaderMobile } from "@/_shared/components/headerMobile";
import { useState } from "react";
import ValidacaoReentrega from "@/modules/devolucao/components/validacaoReentrega";
import ConferenciaCega from "@/modules/devolucao/components/conferenciaCega";
import Anomalia from "@/modules/devolucao/components/anomalia";
import FinalizacaoDemanda from "@/modules/devolucao/components/finalizar";

export default function ProcessoDevolucao() {

  const [currentStep, setCurrentStep] = useState<string>('checklist')

  const { id } = useParams({ from: '/devolucao/$id' });
  const router = useRouter()

  return (
    <div>
      <Tabs defaultValue="checklist" value={currentStep} onValueChange={setCurrentStep}>
        <TabsList hidden={true}>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="reentrega">Reentrega</TabsTrigger>
          <TabsTrigger value="devolucao">Conferencia</TabsTrigger>
          <TabsTrigger value="anomalias">Anomalias</TabsTrigger>
          <TabsTrigger value="finalizacao">Finalização</TabsTrigger>
        </TabsList>
        <TabsContent value="checklist">
          <HeaderMobile
            title="Checklist"
            showBackButton={true}
            backButtonAction={() => router.history.back()}
          />
          <CheckListDevolucao setStep={setCurrentStep} id={id} />
        </TabsContent>
        <TabsContent value="reentrega">
          <HeaderMobile
            title="Reentrega"
            showBackButton={true}
            backButtonAction={() => router.history.back()}
          />
          <ValidacaoReentrega setStep={setCurrentStep} id={id} />
        </TabsContent>
        <TabsContent value="devolucao">
          <ConferenciaCega />
        </TabsContent>
        <TabsContent value="anomalias">
          <Anomalia />
        </TabsContent>
        <TabsContent value="finalizacao">
          <FinalizacaoDemanda onFinalizarDemanda={() => {}} />
        </TabsContent>
      </Tabs>
    </div>
  )
}