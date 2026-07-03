import type { DashboardResponse } from '@/feature/dashboardSlice'
import { Link } from 'react-router-dom'

type AnalysesHistoryTypes = {
  data: DashboardResponse | undefined
  isLoading: boolean
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

const getStatusLabel = (score: number) => {
  if (score >= 80) return 'Strong Match'
  if (score >= 60) return 'Promising'
  return 'Needs Work'
}

const getStatusClassName = (score: number) => {
  if (score >= 80) return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  if (score >= 60) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
  return 'border-red-500/30 bg-red-500/10 text-red-400'
}

export const RecentAnalysisHistory = ({ data, isLoading }: AnalysesHistoryTypes) => {
  const recentAnalyses = data?.analyses?.slice(0, 5) ?? []

  return (
    <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#09090c]">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
          Recent Analysis History
        </p>
        <Link to="/dashboard/history" className="text-sm text-gray-400 transition hover:text-white">
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
            {isLoading ? (
              <tr>
                <td className="px-6 py-5 text-sm text-gray-400" colSpan={5}>
                  Loading recent analyses...
                </td>
              </tr>
            ) : recentAnalyses.length > 0 ? (
              recentAnalyses.map((item) => (
                <tr key={item._id} className="border-t border-white/[0.06]">
                  <td className="px-6 py-5">
                    <p className="text-sm font-semibold text-gray-100">{item.roleTitle}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.companyName || 'No company provided'}</p>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-400">{formatDate(item.createdAt)}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-indigo-500"
                          style={{ width: `${item.matchScore}%` }}
                        />
                      </span>
                      <span className="text-xs text-gray-300">{item.matchScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`rounded-md border px-3 py-1 text-xs ${getStatusClassName(item.matchScore)}`}>
                      {getStatusLabel(item.matchScore)}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Link
                      to={`/dashboard/analysis-details/${item._id}`}
                      className="text-sm text-gray-500 transition hover:text-indigo-300"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-5 text-sm text-gray-400" colSpan={5}>
                  No analyses available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
