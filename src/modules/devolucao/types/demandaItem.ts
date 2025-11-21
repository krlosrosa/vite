export const ListaDemandasZodDtoItemStatus = {
  AGUARDANDO_LIBERACAO: 'AGUARDANDO_LIBERACAO',
  AGUARDANDO_CONFERENCIA: 'AGUARDANDO_CONFERENCIA',
  EM_CONFERENCIA: 'EM_CONFERENCIA',
  CONFERENCIA_FINALIZADA: 'CONFERENCIA_FINALIZADA',
  FINALIZADO: 'FINALIZADO',
  CANCELADO: 'CANCELADO',
} as const;

export type ListaDemandasZodDtoItemStatus = typeof ListaDemandasZodDtoItemStatus[keyof typeof ListaDemandasZodDtoItemStatus];

export interface DemandaItem {
  id: number;
  placa: string;
  motorista: string;
  data: string;
  conferenteId?: string;
  doca?: string;
  status: ListaDemandasZodDtoItemStatus;
  transportadora: string;
  cargaSegregada: boolean;
  retornoPalete: boolean;
  quantidadePaletes: number;
}
