import { QrCode, ReceiptText, ShoppingCart, Wifi, WifiOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { productCatalog } from '../../data/mock';
import { generateZatcaQR } from '../../lib/generate-zatca-qr';
import { deleteHeldCart, listHeldCarts, saveHeldCart } from '../../lib/indexed-db';
import { parseScaleBarcode } from '../../lib/scale-barcode';
import type { CartItem } from '../../types/erp';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const SALE_QUEUE_STORAGE_KEY = 'vitalblaze-sale-queue';

const queueOfflineSale = (payload: unknown) => {
  const existingItems = JSON.parse(window.localStorage.getItem(SALE_QUEUE_STORAGE_KEY) ?? '[]') as unknown[];
  existingItems.push(payload);
  window.localStorage.setItem(SALE_QUEUE_STORAGE_KEY, JSON.stringify(existingItems));
};

export const POSInterface = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scanInput, setScanInput] = useState('');
  const [cashAmount, setCashAmount] = useState('0');
  const [madaAmount, setMadaAmount] = useState('0');
  const [heldCarts, setHeldCarts] = useState<Array<{ id: string; payload: CartItem[]; updatedAt: number }>>([]);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const syncHeldCarts = async () => {
      const carts = await listHeldCarts<CartItem[]>();
      setHeldCarts(carts);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    void syncHeldCarts();
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const vatAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice * (item.vatRate / 100),
      0,
    );
    const totalAmount = subtotal + vatAmount;
    return { subtotal, vatAmount, totalAmount };
  }, [cartItems]);

  const qatcaQrValue = useMemo(
    () =>
      generateZatcaQR(
        'VITALBLAZE Retail Demo',
        '300123456700003',
        new Date(),
        totals.totalAmount,
        totals.vatAmount,
      ),
    [totals.totalAmount, totals.vatAmount],
  );

  const addProductToCart = (productId: string, quantity = 1, scaleBarcode?: string) => {
    const matchedProduct = productCatalog.find((product) => product.id === productId);

    if (!matchedProduct) {
      return;
    }

    setCartItems((current) => {
      const existingItem = current.find((item) => item.productId === productId && item.scaleBarcode === scaleBarcode);

      if (existingItem) {
        return current.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [
        ...current,
        {
          id: `${productId}-${Date.now()}`,
          productId,
          name: matchedProduct.name.en,
          quantity,
          unitPrice: matchedProduct.sellingPrice,
          vatRate: matchedProduct.vatRate,
          isWeighedItem: matchedProduct.isWeighedItem,
          scaleBarcode,
        },
      ];
    });
  };

  const handleScan = () => {
    const parsedScaleBarcode = parseScaleBarcode(scanInput);

    if (parsedScaleBarcode) {
      const matchedProduct = productCatalog.find(
        (product) =>
          product.scaleBarcodeConfig?.itemCode === parsedScaleBarcode.itemCode && product.isWeighedItem,
      );

      if (matchedProduct) {
        addProductToCart(matchedProduct.id, parsedScaleBarcode.weightKg, scanInput);
        setScanInput('');
        return;
      }
    }

    const directMatch = productCatalog.find(
      (product) => product.barcode === scanInput || product.sku === scanInput,
    );

    if (directMatch) {
      addProductToCart(directMatch.id, 1, scanInput);
      setScanInput('');
    }
  };

  const holdCart = async () => {
    const holdId = `hold-${Date.now()}`;
    await saveHeldCart(holdId, cartItems);
    setHeldCarts(await listHeldCarts<CartItem[]>());
    setCartItems([]);
  };

  const resumeCart = async (id: string, items: CartItem[]) => {
    setCartItems(items);
    await deleteHeldCart(id);
    setHeldCarts(await listHeldCarts<CartItem[]>());
  };

  const completeSale = () => {
    const salePayload = {
      soldAt: new Date().toISOString(),
      items: cartItems,
      payments: [
        { method: 'CASH', amount: Number(cashAmount) || 0 },
        { method: 'MADA', amount: Number(madaAmount) || 0 },
      ],
      totals,
    };

    if (!isOnline) {
      queueOfflineSale(salePayload);
    }

    setCartItems([]);
    setCashAmount('0');
    setMadaAmount('0');
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="rounded-[2rem] p-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Checkout engine</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">POS Interface</h2>
          </div>
          <Badge tone={isOnline ? 'emerald' : 'amber'}>
            {isOnline ? (
              <span className="inline-flex items-center"><Wifi className="me-2 h-4 w-4" />Online</span>
            ) : (
              <span className="inline-flex items-center"><WifiOff className="me-2 h-4 w-4" />Offline queue active</span>
            )}
          </Badge>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-brand-400/40"
            onChange={(event) => setScanInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleScan();
              }
            }}
            placeholder="Scan barcode or weighted EAN-13"
            value={scanInput}
          />
          <Button onClick={handleScan}>Add Scan</Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {productCatalog.map((product) => (
            <button
              className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-start transition hover:-translate-y-1 hover:border-brand-400/30"
              key={product.id}
              onClick={() => addProductToCart(product.id)}
              type="button"
            >
              <div className="flex items-center justify-between">
                <Badge tone={product.isWeighedItem ? 'amber' : 'indigo'}>
                  {product.isWeighedItem ? 'Weighted' : 'Unit'}
                </Badge>
                <span className="text-sm text-slate-400">{product.category}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-white">{product.name.en}</h3>
              <p className="mt-1 text-sm text-slate-400">{product.name.ar}</p>
              <p className="mt-5 text-xl font-semibold text-white">SAR {product.sellingPrice.toFixed(2)}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card className="rounded-[2rem] p-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center">
            <ShoppingCart className="me-3 h-5 w-5 text-brand-200" />
            <div>
              <p className="text-sm text-slate-400">Active cart ticket</p>
              <h3 className="text-xl font-semibold text-white">{cartItems.length} items</h3>
            </div>
          </div>
          <Button onClick={holdCart} variant="secondary">
            Hold Cart
          </Button>
        </div>

        <div className="mt-6 max-h-[320px] space-y-3 overflow-y-auto scrollbar-thin pe-1">
          {cartItems.map((item) => (
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4" key={item.id}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-400">Qty {item.quantity.toFixed(3)} · VAT {item.vatRate}%</p>
                </div>
                <p className="text-sm font-semibold text-white">SAR {(item.quantity * item.unitPrice).toFixed(2)}</p>
              </div>
            </div>
          ))}
          {cartItems.length === 0 ? (
            <div className="rounded-[1.5rem] border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-400">
              Scan products or tap catalog items to begin checkout.
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-slate-300">
            Cash
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none focus:border-brand-400/40"
              onChange={(event) => setCashAmount(event.target.value)}
              value={cashAmount}
            />
          </label>
          <label className="text-sm text-slate-300">
            Mada
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none focus:border-brand-400/40"
              onChange={(event) => setMadaAmount(event.target.value)}
              value={madaAmount}
            />
          </label>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span>SAR {totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-slate-300">
            <span>VAT</span>
            <span>SAR {totals.vatAmount.toFixed(2)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white">
            <span>Total</span>
            <span>SAR {totals.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button onClick={completeSale}>Complete Sale</Button>
          <Button variant="secondary">Refund / Return</Button>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
          <div className="flex items-center text-white">
            <QrCode className="me-3 h-5 w-5 text-brand-200" />
            <span className="font-medium">ZATCA QR preview</span>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <QRCodeSVG bgColor="transparent" fgColor="#e2e8f0" size={112} value={qatcaQrValue} />
            <div className="flex-1 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center text-sm text-slate-400">
                <ReceiptText className="me-2 h-4 w-4" />
                TLV Base64
              </div>
              <p className="mt-3 break-all text-xs leading-6 text-slate-300">{qatcaQrValue}</p>
            </div>
          </div>
        </div>

        {heldCarts.length > 0 ? (
          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Held carts</p>
            <div className="mt-4 grid gap-3">
              {heldCarts.map((heldCart) => (
                <button
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-start text-sm text-slate-200 transition hover:border-brand-400/30"
                  key={heldCart.id}
                  onClick={() => void resumeCart(heldCart.id, heldCart.payload)}
                  type="button"
                >
                  <span>{heldCart.payload.length} items</span>
                  <span className="text-xs text-slate-400">{new Date(heldCart.updatedAt).toLocaleTimeString()}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
};
