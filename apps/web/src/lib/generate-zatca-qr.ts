const encoder = new TextEncoder();

const encodeTag = (tag: number, value: string) => {
  const bytes = encoder.encode(value);
  const buffer = new Uint8Array(bytes.length + 2);
  buffer[0] = tag;
  buffer[1] = bytes.length;
  buffer.set(bytes, 2);
  return buffer;
};

const combine = (parts: Uint8Array[]) => {
  const totalLength = parts.reduce((sum, part) => sum + part.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;

  parts.forEach((part) => {
    result.set(part, offset);
    offset += part.length;
  });

  return result;
};

const bytesToBase64 = (bytes: Uint8Array) => {
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return window.btoa(binary);
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

  const normalizedTimestamp = timestamp instanceof Date ? timestamp.toISOString() : new Date(timestamp).toISOString();
  const normalizedTotal = Number(total).toFixed(2);
  const normalizedVatAmount = Number(vatAmount).toFixed(2);

  return bytesToBase64(
    combine([
      encodeTag(1, sellerName.trim()),
      encodeTag(2, vatNumber),
      encodeTag(3, normalizedTimestamp),
      encodeTag(4, normalizedTotal),
      encodeTag(5, normalizedVatAmount),
    ]),
  );
};
