import { Check, CreditCard, Zap } from 'lucide-react'

const billingFeatures = [
  'Unlimited resume analysis',
  'Priority skill recommendations',
  'Exportable analysis history',
  'Advanced job match scoring',
]

const invoiceHistory = [
  { date: 'Oct 24, 2023', plan: 'Pro Plan', amount: '$19.00', status: 'Paid' },
  { date: 'Sep 24, 2023', plan: 'Pro Plan', amount: '$19.00', status: 'Paid' },
  { date: 'Aug 24, 2023', plan: 'Pro Plan', amount: '$19.00', status: 'Paid' },
]

export const BillingSettings = () => {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#09090c]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="px-6 py-7">
            <div className="mb-8 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                <Zap className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold">Pro Plan</h2>
                <p className="text-sm text-gray-400">
                  Built for active job matching.
                </p>
              </div>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-5xl font-bold">$19</p>
              <p className="pb-2 text-sm text-gray-500">/ month</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {billingFeatures.map((feature) => (
                <p
                  key={feature}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <Check className="h-4 w-4 text-emerald-400" />
                  {feature}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.02] px-6 py-7 lg:border-l lg:border-t-0">
            <h3 className="text-sm font-semibold text-gray-300">
              Payment Method
            </h3>
            <div className="mt-4 rounded-xl border border-white/10 bg-[#0f0f14] p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#111116]">
                    <CreditCard className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Visa ending in 4242</p>
                    <p className="mt-1 text-xs text-gray-500">Expires 08/27</p>
                  </div>
                </div>
                <button className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/[0.04]">
                  Edit
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm font-semibold text-emerald-300">
                Next billing date
              </p>
              <p className="mt-1 text-sm text-gray-400">November 24, 2023</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold">Invoice History</h2>
            <p className="mt-2 text-sm text-gray-400">
              Download receipts for your previous DevSignal payments.
            </p>
          </div>
          <button className="w-fit rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/[0.04]">
            Download All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.22em] text-gray-500">
                <th className="py-4 font-semibold">Date</th>
                <th className="py-4 font-semibold">Plan</th>
                <th className="py-4 font-semibold">Amount</th>
                <th className="py-4 font-semibold">Status</th>
                <th className="py-4 text-right font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {invoiceHistory.map((invoice) => (
                <tr
                  key={invoice.date}
                  className="border-b border-white/[0.06] last:border-b-0"
                >
                  <td className="py-4 font-mono text-sm text-gray-400">
                    {invoice.date}
                  </td>
                  <td className="py-4 text-sm text-gray-200">{invoice.plan}</td>
                  <td className="py-4 font-mono text-sm text-gray-300">
                    {invoice.amount}
                  </td>
                  <td className="py-4">
                    <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-sm text-indigo-400 transition hover:text-indigo-300">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
