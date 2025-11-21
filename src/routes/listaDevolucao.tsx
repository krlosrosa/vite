import { HeaderMobile } from "@/_shared/components/headerMobile";
import ListaDemanda from "@/modules/devolucao/components/listaDemanda";

export default function Devolucao() {
  return (
    <div>
      <HeaderMobile
        title="Devolução"
      />
      <ListaDemanda />
    </div>
  )
}