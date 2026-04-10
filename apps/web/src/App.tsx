import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { productCatalog } from './data/mock';
import { AnalyticsDashboard } from './components/analytics/analytics-dashboard';
import { SuperAdminDashboard } from './components/admin/super-admin-dashboard';
import { InventoryDataTable } from './components/inventory/inventory-data-table';
import { BarcodePrinterModal } from './components/inventory/barcode-printer-modal';
import { LandingPage } from './components/marketing/landing-page';
import { POSInterface } from './components/pos/pos-interface';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Skeleton } from './components/ui/skeleton';
import type { BusinessType, ProductRecord } from './types/erp';

const tabs = [
  { key: 'landing', label: 'Landing' },
  { key: 'tenants', label: 'Tenants' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'pos', label: 'POS' },
  { key: 'analytics', label: 'Analytics' },
] as const;

export default function App() {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['key']>('landing');
  const [selectedProduct, setSelectedProduct] = useState<ProductRecord | null>(null);
  const [businessType, setBusinessType] = useState<BusinessType>('GROCERY_STORE');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);

  const currentView = useMemo(() => {
    if (isLoading) {
      return (
        <div className="grid gap-6">
          <Skeleton className="h-24 w-full rounded-[2rem]" />
          <div className="grid gap-6 lg:grid-cols-3">
            <Skeleton className="h-52 w-full rounded-[2rem]" />
            <Skeleton className="h-52 w-full rounded-[2rem]" />
            <Skeleton className="h-52 w-full rounded-[2rem]" />
          </div>
          <Skeleton className="h-[420px] w-full rounded-[2rem]" />
        </div>
      );
    }

    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'tenants':
        return <SuperAdminDashboard />;
      case 'inventory':
        return (
          <InventoryDataTable
            onSelectProduct={setSelectedProduct}
            products={productCatalog}
          />
        );
      case 'pos':
        return <POSInterface />;
      case 'analytics':
        return <AnalyticsDashboard businessType={businessType} />;
      default:
        return null;
    }
  }, [activeTab, businessType, isLoading]);

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Card className="mb-6 rounded-[2rem] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">VITALBLAZE</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Saudi Retail ERP + POS Experience Lab</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                {tabs.map((tab) => (
                  <button
                    className={`rounded-full px-4 py-2 text-sm ${activeTab === tab.key ? 'bg-brand-500 text-white' : 'text-slate-300'}`}
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  className={`rounded-full px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-brand-500 text-white' : 'text-slate-300'}`}
                  onClick={() => void i18n.changeLanguage('en')}
                  type="button"
                >
                  EN
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-sm ${i18n.language === 'ar' ? 'bg-brand-500 text-white' : 'text-slate-300'}`}
                  onClick={() => void i18n.changeLanguage('ar')}
                  type="button"
                >
                  AR
                </button>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  className={`rounded-full px-4 py-2 text-sm ${businessType === 'BAKALA' ? 'bg-emerald-500 text-white' : 'text-slate-300'}`}
                  onClick={() => setBusinessType('BAKALA')}
                  type="button"
                >
                  Bakala
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-sm ${businessType === 'GROCERY_STORE' ? 'bg-emerald-500 text-white' : 'text-slate-300'}`}
                  onClick={() => setBusinessType('GROCERY_STORE')}
                  type="button"
                >
                  Grocery Store
                </button>
              </div>
              <Button onClick={() => setActiveTab('landing')} variant="secondary">
                Reset View
              </Button>
            </div>
          </div>
        </Card>

        {currentView}
      </div>

      <BarcodePrinterModal onClose={() => setSelectedProduct(null)} product={selectedProduct} />
    </div>
  );
}
