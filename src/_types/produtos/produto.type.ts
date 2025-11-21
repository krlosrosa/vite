export interface Produto {
    id?: number;
    codEan?: string;
    codDum?: string;
    sku: string;
    descricao: string;
    shelf: number;
    tipoPeso: string;
    pesoLiquidoCaixa: number;
    pesoLiquidoUnidade: number;
    unPorCaixa: number;
    caixaPorPallet: number;
    segmento: string;
    empresa: string;
    createdAt: string;
    updatedAt: string;
}