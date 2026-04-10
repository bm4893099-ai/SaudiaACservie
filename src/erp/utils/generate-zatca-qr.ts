const textEncoder = new TextEncoder();

const encodeTlvTag = (tag: number, value: string) => {
  const valueBytes = textEncoder.encode(value);
  const bytes = new Uint8Array(2 + valueBytes.length);

  bytes[0] = tag;
  bytes[1] = valueBytes.length;
  bytes.set(valueBytes, 2);

  return bytes;
};

const concatBytes = (chunks: Uint8Array[]) => {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const buffer = new Uint8Array(totalLength);
  let offset = 0;

  chunks.forEach((chunk) => {
    buffer.set(chunk, offset);
    offset += chunk.length;
  });

  return buffer;
};

const toBase64 = (bytes: Uint8Array) => Buffer.from(bytes).toString('base64');

const normalizeMonetaryValue = (value: number | string) => {
  const numericValue = typeof value === 'string' ? Number(value) : value;

  if (!Number.isFinite(numericValue)) {
    throw new TypeError('Invalid monetary value supplied to generateZatcaQR');
  }

  return numericValue.toFixed(2);
};

const normalizeTimestamp = (value: string | Date) => {
  const timestamp = value instanceof Date ? value.toISOString() : new Date(value).toISOString();

  if (Number.isNaN(Date.parse(timestamp))) {
    throw new TypeError('Invalid timestamp supplied to generateZatcaQR');
  }

  return timestamp;
};

export const generateZatcaQR = (
  sellerName: string,
  vatNumber: string,
  timestamp: string | Date,
  total: number | string,
  vatAmount: number | string,
) => {
  if (!sellerName.trim()) {
    throw new TypeError('sellerName is required');
  }

  if (!/^\d{15}$/.test(vatNumber)) {
    throw new TypeError('vatNumber must be a 15 digit string');
  }

  const tlvBytes = concatBytes([
    encodeTlvTag(1, sellerName.trim()),
    encodeTlvTag(2, vatNumber),
    encodeTlvTag(3, normalizeTimestamp(timestamp)),
    encodeTlvTag(4, normalizeMonetaryValue(total)),
    encodeTlvTag(5, normalizeMonetaryValue(vatAmount)),
  ]);

  return toBase64(tlvBytes);
};
