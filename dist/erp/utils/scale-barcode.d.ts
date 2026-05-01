export type ParsedScaleBarcode = {
    prefix: string;
    itemCode: string;
    weightKg: number;
    rawValue: string;
};
export declare const parseScaleBarcode: (barcode: string, prefixes?: string[]) => ParsedScaleBarcode | null;
