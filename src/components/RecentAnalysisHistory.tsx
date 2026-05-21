import { Link } from 'react-router-dom'
const history = [
  {
    role: 'Senior Frontend Eng',
    company: 'Stripe',
    date: 'Oct 24, 2023',
    score: 87,
  },
  {
    role: 'Fullstack Developer',
    company: 'Linear',
    date: 'Oct 20, 2023',
    score: 62,
  },
  {
    role: 'React Native Dev',
    company: 'Acme Corp',
    date: 'Oct 15, 2023',
    score: 34,
  },
]

export const RecentAnalysisHistory = () => {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#09090c]">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
          Recent Analysis History
        </p>
        <Link to='/dashboard/history' className="text-sm text-gray-400 transition hover:text-white">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
              <th className="px-6 py-5 font-semibold">Role Target</th>
              <th className="px-6 py-5 font-semibold">Date</th>
              <th className="px-6 py-5 font-semibold">Match Score</th>
              <th className="px-6 py-5 font-semibold">Status</th>
              <th className="px-6 py-5 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr
                key={`${item.role}-${item.date}`}
                className="border-t border-white/[0.06]"
              >
                <td className="px-6 py-5">
                  <p className="text-sm font-semibold text-gray-100">
                    {item.role}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{item.company}</p>
                </td>
                <td className="px-6 py-5 text-sm text-gray-400">{item.date}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                      <span
                        className="block h-full rounded-full bg-gray-500"
                        style={{ width: `${item.score}%` }}
                      />
                    </span>
                    <span className="text-xs text-gray-300">{item.score}%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Complete
                  </span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    className="text-sm text-gray-500 transition hover:text-indigo-300"
                    aria-label={`View ${item.role} analysis`}
                  >
                    ...
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
