import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { bakalaKpis, groceryKpis, revenueSeries } from '../../data/mock';
import type { BusinessType } from '../../types/erp';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

type AnalyticsDashboardProps = {
  businessType: BusinessType;
};

const departmentBreakdown = [
  { name: 'Fresh', revenue: 'SAR 26.4K', margin: '24%' },
  { name: 'Grocery', revenue: 'SAR 18.7K', margin: '17%' },
  { name: 'Frozen', revenue: 'SAR 11.3K', margin: '19%' },
];

export const AnalyticsDashboard = ({ businessType }: AnalyticsDashboardProps) => {
  const kpis = businessType === 'GROCERY_STORE' ? groceryKpis : bakalaKpis;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <Card className="rounded-[2rem] p-6" key={kpi.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{kpi.value}</p>
              </div>
              <Badge tone={kpi.tone === 'indigo' ? 'indigo' : kpi.tone === 'emerald' ? 'emerald' : 'slate'}>
                {kpi.growth}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2rem] p-6">
        <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Financial performance</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Daily Revenue vs. Profit</h2>
          </div>
          <Badge tone="emerald">Updated 2 min ago</Badge>
        </div>
        <div className="mt-6 h-[320px]">
          <ResponsiveContainer>
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.55} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="profitGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} />
              <XAxis dataKey="label" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: '#0f172a',
                  border: '1px solid rgba(148,163,184,0.16)',
                  borderRadius: '18px',
                }}
              />
              <Area dataKey="revenue" stroke="#6366f1" fill="url(#revenueGradient)" strokeWidth={3} type="monotone" />
              <Area dataKey="profit" stroke="#10b981" fill="url(#profitGradient)" strokeWidth={3} type="monotone" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {businessType === 'GROCERY_STORE' ? (
        <Card className="rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Department view</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Department-level breakdown</h3>
            </div>
            <Badge tone="indigo">Grocery-only insight</Badge>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {departmentBreakdown.map((department) => (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5" key={department.name}>
                <p className="text-sm text-slate-400">{department.name}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{department.revenue}</p>
                <p className="mt-2 text-sm text-emerald-300">Margin {department.margin}</p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
};
