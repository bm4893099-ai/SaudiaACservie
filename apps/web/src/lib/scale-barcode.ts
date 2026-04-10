export type ParsedScaleBarcode = {
  prefix: string;
  itemCode: string;
  weightKg: number;
  rawValue: string;
};

export const parseScaleBarcode = (
  barcode: string,
  prefixes: string[] = ['20', '21', '22'],
): ParsedScaleBarcode | null => {
  const value = barcode.trim();

  if (!/^\d{13}$/.test(value)) {
    return null;
  }

  const prefix = value.slice(0, 2);

  if (!prefixes.includes(prefix)) {
    return null;
  }

  const itemCode = value.slice(2, 7);
  const rawValue = value.slice(7, 12);
  const weightKg = Number(rawValue) / 1000;

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return null;
  }

  return {
    prefix,
    itemCode,
    weightKg,
    rawValue,
  };
};
