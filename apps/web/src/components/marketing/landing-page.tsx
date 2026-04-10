import { Check, Cloud, CreditCard, Globe2, ShieldCheck, Store, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const featureCards = [
  {
    title: 'ZATCA Compliance',
    description: 'Phase 1 and Phase 2 invoice readiness with QR-ready receipts and tax-safe retail workflows.',
    icon: ShieldCheck,
  },
  {
    title: 'Multi-Tenant Cloud',
    description: 'Provision bakalas and superstores from one control plane with secure tenant isolation.',
    icon: Cloud,
  },
  {
    title: 'Offline POS',
    description: 'Keep checkout moving with resilient local holds, offline queues, and rapid resume flows.',
    icon: CreditCard,
  },
  {
    title: 'Smart Inventory',
    description: 'Expiry tracking, weighed items, GRNs, reorder alerts, and premium merchandising controls.',
    icon: Zap,
  },
];

const plans = {
  monthly: [
    {
      name: 'Bakala Plan',
      price: 'SAR 299',
      subtitle: 'Fast launch for neighborhood convenience stores.',
      highlight: false,
      features: ['Fast POS', 'Inventory basics', 'ZATCA QR receipts', 'Store admin controls'],
    },
    {
      name: 'Superstore Plan',
      price: 'SAR 899',
      subtitle: 'Advanced control for grocery operators with scale and label workflows.',
      highlight: true,
      features: ['Multi-register POS', 'Scale integration', 'Label printing', 'Department analytics'],
    },
  ],
  yearly: [
    {
      name: 'Bakala Plan',
      price: 'SAR 2,988',
      subtitle: 'Twelve months of reliable retail operations with priority onboarding.',
      highlight: false,
      features: ['Fast POS', 'Inventory basics', 'ZATCA QR receipts', 'Priority support'],
    },
    {
      name: 'Superstore Plan',
      price: 'SAR 8,988',
      subtitle: 'Enterprise-ready grocery workflows with savings on annual billing.',
      highlight: true,
      features: ['Multi-register POS', 'Scale integration', 'Label printing', 'Department analytics'],
    },
  ],
};

export const LandingPage = () => {
  const { i18n, t } = useTranslation();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const activePlans = useMemo(() => plans[billingCycle], [billingCycle]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80">
      <div className="absolute inset-0 bg-hero-grid bg-hero-grid opacity-60" />
      <div className="relative px-6 py-8 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-16">
          <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-start">
              <div className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-100">
                <Globe2 className="me-2 h-4 w-4" />
                Saudi retail ERP + POS platform
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {t('heroTitle')}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  {t('heroSubtitle')}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button>{t('startTrial')}</Button>
                <Button variant="secondary">{t('viewDemo')}</Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {['Built for ZATCA', 'RTL + LTR native', 'Ready for Dammam to Riyadh'].map((item) => (
                  <Card key={item} className="rounded-2xl p-4">
                    <p className="text-sm text-slate-200">{item}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-brand-500/30 blur-3xl" />
              <Card className="animate-float overflow-hidden rounded-[2rem] p-0 shadow-glow">
                <div className="border-b border-white/10 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Live dashboard</p>
                      <h2 className="text-lg font-semibold text-white">VITALBLAZE Command Center</h2>
                    </div>
                    <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
                      99.98% uptime
                    </div>
                  </div>
                </div>
                <div className="grid gap-4 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="rounded-2xl bg-white/5 p-5">
                      <p className="text-sm text-slate-400">Daily revenue</p>
                      <p className="mt-3 text-3xl font-semibold text-white">SAR 86.2K</p>
                      <p className="mt-2 text-sm text-emerald-300">+14.6% WoW</p>
                    </Card>
                    <Card className="rounded-2xl bg-white/5 p-5">
                      <p className="text-sm text-slate-400">Queued offline orders</p>
                      <p className="mt-3 text-3xl font-semibold text-white">12</p>
                      <p className="mt-2 text-sm text-slate-300">Syncing automatically</p>
                    </Card>
                  </div>
                  <Card className="rounded-2xl bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Tenant overview</p>
                        <p className="mt-1 text-xl font-semibold text-white">Bakala + Grocery orchestration</p>
                      </div>
                      <Store className="h-8 w-8 text-brand-200" />
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      {[
                        ['Active tenants', '42'],
                        ['ZATCA-ready receipts', '1.8M'],
                        ['Scale stations', '126'],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-sm text-slate-400">{label}</p>
                          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </Card>
              <div className="absolute -end-6 -top-6 rounded-full border border-brand-400/30 bg-brand-500/20 px-4 py-2 text-xs text-brand-50 shadow-lg shadow-brand-500/30 animate-pulseGlow">
                {i18n.dir() === 'rtl' ? 'جاهز للفوترة الإلكترونية' : 'E-Invoicing Ready'}
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="max-w-2xl text-start">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Core capabilities</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Purpose-built for Saudi retail complexity</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              {featureCards.map(({ title, description, icon: Icon }) => (
                <Card key={title} className="group rounded-[1.75rem] p-6 transition duration-200 hover:-translate-y-1 hover:border-brand-400/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-100 transition group-hover:bg-brand-500/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col gap-4 text-start sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Pricing</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">High-conversion plans for every retail format</h2>
              </div>
              <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  className={`rounded-full px-4 py-2 text-sm ${billingCycle === 'monthly' ? 'bg-brand-500 text-white' : 'text-slate-300'}`}
                  onClick={() => setBillingCycle('monthly')}
                  type="button"
                >
                  {t('monthly')}
                </button>
                <button
                  className={`rounded-full px-4 py-2 text-sm ${billingCycle === 'yearly' ? 'bg-brand-500 text-white' : 'text-slate-300'}`}
                  onClick={() => setBillingCycle('yearly')}
                  type="button"
                >
                  {t('yearly')}
                </button>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {activePlans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`rounded-[1.75rem] p-8 ${plan.highlight ? 'border-brand-400/40 shadow-glow' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{plan.subtitle}</p>
                    </div>
                    {plan.highlight ? (
                      <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-100">Most popular</div>
                    ) : null}
                  </div>
                  <div className="mt-8 flex items-end gap-2">
                    <span className="text-4xl font-semibold text-white">{plan.price}</span>
                    <span className="pb-1 text-sm text-slate-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-slate-200">
                        <Check className="me-3 h-4 w-4 text-emerald-300" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 w-full">Deploy {plan.name}</Button>
                </Card>
              ))}
            </div>
          </section>

          <footer className="flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-slate-900/60 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center text-lg font-semibold text-white">
                <Zap className="me-2 h-5 w-5 text-brand-200" />
                VITALBLAZE
              </div>
              <p className="mt-3 text-sm text-slate-400">Dammam, KSA · hello@vitalblaze.sa · +966 13 555 0101</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <a href="#" className="transition hover:text-white">
                Platform
              </a>
              <a href="#" className="transition hover:text-white">
                Pricing
              </a>
              <a href="#" className="transition hover:text-white">
                Compliance
              </a>
              <a href="#" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
