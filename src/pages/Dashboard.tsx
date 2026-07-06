import { WandSparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardSkillInsights } from '../components/DashboardSkillInsights'
import { RecentAnalysisHistory } from '../components/RecentAnalysisHistory'
import { Stats } from '../components/stats'
import { useGetDashboardQuery } from '@/feature/dashboardSlice'
import { useGetSettingsQuery } from '@/feature/settingsSlice'

export const Dashboard = () => {
  const { data, isLoading } = useGetDashboardQuery()
  const { data: profile } = useGetSettingsQuery()
  const firstName = profile?.name?.split(' ')[0] ?? 'there'
  const hasDashboardData = Boolean(data?.latestMetric || data?.analyses?.length)
  const showEmptyState = !isLoading && !hasDashboardData

  return (
    <div className="min-h-screen bg-[#030306] text-white">
      <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <h1 className="text-xl font-bold">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-400">
            {showEmptyState
              ? `Welcome, ${firstName}. You're ready to begin your first analysis.`
              : `Welcome back, ${firstName}. Here's your latest skill analysis.`}
          </p>
        </div>
        <div>
          <Link
            to="/dashboard/analysis"
            className="flex items-center gap-2 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-colors duration-300 hover:from-indigo-400 hover:to-purple-500"
          >
            <WandSparkles className="h-4 w-4" /> Start New Analysis
          </Link>
        </div>
      </header>

      <main className="space-y-8 px-4 py-8 md:px-8">
        {showEmptyState ? (
          <section className="rounded-3xl border border-dashed border-indigo-500/40 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent px-6 py-12 text-center shadow-[0_0_60px_rgba(124,58,237,0.08)] sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/15">
              <WandSparkles className="h-7 w-7 text-indigo-300" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white">Start your first analysis</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-400">
              There is not enough data yet to display your dashboard insights. Create your first analysis to see your match score, skill gaps, and recommendations here.
            </p>
            <Link
              to="/dashboard/analysis"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-gray-100"
            >
              <WandSparkles className="h-4 w-4" /> Start New Analysis
            </Link>
          </section>
        ) : (
          <>
            <Stats data={data} isLoading={isLoading} />
            <DashboardSkillInsights data={data} isLoading={isLoading} />
            <RecentAnalysisHistory data={data} isLoading={isLoading} />
          </>
        )}
      </main>
    </div>
  )
}
