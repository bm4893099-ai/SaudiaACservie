import JsBarcode from 'jsbarcode';
import { useEffect, useRef } from 'react';
import type { ProductRecord } from '../../types/erp';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

type BarcodePrinterModalProps = {
  product: ProductRecord | null;
  onClose: () => void;
};

export const BarcodePrinterModal = ({ product, onClose }: BarcodePrinterModalProps) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!product || !barcodeRef.current) {
      return;
    }

    JsBarcode(barcodeRef.current, product.barcode || product.sku, {
      displayValue: true,
      margin: 0,
      height: 52,
      width: 1.8,
      background: 'transparent',
      lineColor: '#0f172a',
      fontSize: 12,
    });
  }, [product]);

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-2xl rounded-[2rem] bg-white p-0 text-slate-900 shadow-2xl shadow-slate-950/50">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-sm text-slate-500">Print layout preview</p>
            <h2 className="text-xl font-semibold text-slate-950">Barcode Printer Modal</h2>
          </div>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </div>
        <div className="grid gap-6 p-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50 p-6">
            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">Shelf / sticker label</p>
                  <h3 className="mt-2 text-xl font-semibold">{product.name.en}</h3>
                  <p className="mt-1 text-sm text-slate-500">{product.name.ar}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-700">
                  {product.isWeighedItem ? 'Weighted' : 'Standard'}
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    SAR {product.sellingPrice.toFixed(2)}
                    <span className="ms-2 text-sm font-normal text-slate-500">
                      / {product.isWeighedItem ? 'kg' : 'unit'}
                    </span>
                  </p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Packed date</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-4 py-5">
                <svg ref={barcodeRef} className="w-full" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Print metadata</p>
              <div className="mt-4 grid gap-3">
                {[
                  ['SKU', product.sku],
                  ['Barcode', product.barcode],
                  ['VAT Rate', `${product.vatRate}%`],
                  ['Price per Kg', product.isWeighedItem ? `SAR ${product.sellingPrice.toFixed(2)}` : 'N/A'],
                ].map(([label, value]) => (
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm" key={label}>
                    <span className="text-sm text-slate-500">{label}</span>
                    <span className="text-sm font-medium text-slate-950">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => window.print()}>
                Print Labels
              </Button>
              <Button className="flex-1" onClick={onClose} variant="secondary">
                Back to Inventory
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
