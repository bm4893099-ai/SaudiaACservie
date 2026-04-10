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
  const normalizedBarcode = barcode.trim();

  if (!/^\d{13}$/.test(normalizedBarcode)) {
    return null;
  }

  const prefix = normalizedBarcode.slice(0, 2);

  if (!prefixes.includes(prefix)) {
    return null;
  }

  const itemCode = normalizedBarcode.slice(2, 7);
  const embeddedValue = normalizedBarcode.slice(7, 12);
  const weightKg = Number(embeddedValue) / 1000;

  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    return null;
  }

  return {
    prefix,
    itemCode,
    weightKg,
    rawValue: embeddedValue,
  };
};
