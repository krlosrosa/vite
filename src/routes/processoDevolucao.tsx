import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/_shared/components/ui/tabs";
import { useParams, useRouter } from "@tanstack/react-router";
import CheckListDevolucao from "@/modules/devolucao/components/checkList/index";
import { HeaderMobile } from "@/_shared/components/headerMobile";
import { useState } from "react";

export default function ProcessoDevolucao() {

  const [currentStep, setCurrentStep] = useState<string>('checklist')

  const { id } = useParams({ from: '/devolucao/$id' });
  const router = useRouter()

  return (
    <div>
      <Tabs defaultValue="checklist" value={currentStep} onValueChange={setCurrentStep}>
        <TabsList>
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
          <p>Reentrega</p>
        </TabsContent>
        <TabsContent value="devolucao">
          <p>Conferencia</p>
        </TabsContent>
        <TabsContent value="anomalias">
          <p>Anomalias</p>
        </TabsContent>
        <TabsContent value="finalizacao">
          <p>Finalização</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}