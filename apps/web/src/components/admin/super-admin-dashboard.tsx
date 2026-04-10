import { Building2, Mail, MapPinned, Shield, Store, UserCog } from 'lucide-react';
import { useMemo, useState } from 'react';
import { initialTenantFormValues } from '../../data/mock';
import { getBusinessTypeFeatures } from '../../lib/business-type';
import type { TenantFormValues } from '../../types/erp';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const steps = ['Business profile', 'National address', 'Admin access'];

const fieldClassName =
  'mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-400/40';

const featureLabels: Record<string, string> = {
  wholesaleProcurement: 'Wholesale procurement',
  scaleIntegration: 'Scale integration',
  labelPrinting: 'Label printing',
  departmentAnalytics: 'Department analytics',
  advancedInventory: 'Advanced inventory',
};

export const SuperAdminDashboard = () => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<TenantFormValues>(initialTenantFormValues);
  const [submittedTenant, setSubmittedTenant] = useState<TenantFormValues | null>(null);

  const features = useMemo(
    () => getBusinessTypeFeatures(formValues.businessType),
    [formValues.businessType],
  );

  const handleFieldChange = <T extends keyof TenantFormValues>(key: T, value: TenantFormValues[T]) => {
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  const handleAddressChange = (
    key: keyof TenantFormValues['nationalAddress'],
    value: string,
  ) => {
    setFormValues((current) => ({
      ...current,
      nationalAddress: {
        ...current.nationalAddress,
        [key]: value,
      },
    }));
  };

  const submitTenant = () => {
    setSubmittedTenant(formValues);
    setStep(0);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Control plane</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Super Admin Dashboard</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
              Provision bakalas and full grocery stores from one tenant factory with feature gating based on business type.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="emerald">Tenant-ready</Badge>
            <Badge tone="indigo">ZATCA-aware</Badge>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {steps.map((label, index) => (
            <button
              key={label}
              className={`rounded-full px-4 py-2 text-sm ${step === index ? 'bg-brand-500 text-white' : 'border border-white/10 bg-white/5 text-slate-300'}`}
              onClick={() => setStep(index)}
              type="button"
            >
              {index + 1}. {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6">
          {step === 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                Store Name
                <input
                  className={fieldClassName}
                  onChange={(event) => handleFieldChange('storeName', event.target.value)}
                  value={formValues.storeName}
                />
              </label>
              <label className="text-sm text-slate-300">
                Logo URL
                <input
                  className={fieldClassName}
                  onChange={(event) => handleFieldChange('logoUrl', event.target.value)}
                  value={formValues.logoUrl}
                />
              </label>
              <label className="text-sm text-slate-300">
                CR Number
                <input
                  className={fieldClassName}
                  onChange={(event) => handleFieldChange('crNumber', event.target.value)}
                  value={formValues.crNumber}
                />
              </label>
              <label className="text-sm text-slate-300">
                VAT Number
                <input
                  className={fieldClassName}
                  maxLength={15}
                  onChange={(event) => handleFieldChange('vatNumber', event.target.value)}
                  value={formValues.vatNumber}
                />
              </label>
              <label className="text-sm text-slate-300 md:col-span-2">
                Business Type
                <select
                  className={fieldClassName}
                  onChange={(event) => handleFieldChange('businessType', event.target.value as TenantFormValues['businessType'])}
                  value={formValues.businessType}
                >
                  <option value="BAKALA">Bakala</option>
                  <option value="GROCERY_STORE">Grocery Store</option>
                </select>
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {(
                [
                  ['buildingNumber', 'Building Number'],
                  ['street', 'Street'],
                  ['district', 'District'],
                  ['city', 'City'],
                  ['postalCode', 'Postal Code'],
                  ['additionalNumber', 'Additional Number'],
                  ['unitNumber', 'Unit Number'],
                ] as Array<[keyof TenantFormValues['nationalAddress'], string]>
              ).map(([key, label]) => (
                <label className="text-sm text-slate-300" key={key}>
                  {label}
                  <input
                    className={fieldClassName}
                    onChange={(event) => handleAddressChange(key, event.target.value)}
                    value={formValues.nationalAddress[key]}
                  />
                </label>
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-5 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                Admin Email
                <input
                  className={fieldClassName}
                  onChange={(event) => handleFieldChange('adminEmail', event.target.value)}
                  value={formValues.adminEmail}
                />
              </label>
              <label className="text-sm text-slate-300">
                Temporary Password
                <input
                  className={fieldClassName}
                  onChange={(event) => handleFieldChange('adminPassword', event.target.value)}
                  type="password"
                  value={formValues.adminPassword}
                />
              </label>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button disabled={step === 0} onClick={() => setStep((current) => current - 1)} variant="ghost">
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((current) => current + 1)}>Continue</Button>
          ) : (
            <Button onClick={submitTenant}>Create Tenant</Button>
          )}
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-brand-500/15 p-3 text-brand-100">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Generated tenant suite</p>
              <h3 className="text-xl font-semibold text-white">{formValues.businessType === 'BAKALA' ? 'Lean Bakala Workspace' : 'Full Grocery Workspace'}</h3>
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {Object.entries(features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="text-sm text-slate-200">{featureLabels[key]}</span>
                <Badge tone={value ? 'emerald' : 'slate'}>{value ? 'Enabled' : 'Hidden'}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[2rem] p-6">
          <h3 className="text-xl font-semibold text-white">Provisioning snapshot</h3>
          <div className="mt-5 grid gap-3">
            {[
              [Building2, formValues.storeName],
              [MapPinned, `${formValues.nationalAddress.city}, ${formValues.nationalAddress.district}`],
              [Mail, formValues.adminEmail],
              [Shield, formValues.vatNumber],
              [UserCog, formValues.businessType],
            ].map(([Icon, value], index) => {
              const Component = Icon as typeof Building2;
              return (
                <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3" key={`${value}-${index}`}>
                  <Component className="me-3 h-4 w-4 text-brand-200" />
                  <span className="text-sm text-slate-200">{value}</span>
                </div>
              );
            })}
          </div>
          {submittedTenant ? (
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              Tenant workspace for {submittedTenant.storeName} is ready for API submission.
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
};
