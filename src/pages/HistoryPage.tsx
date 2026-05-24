import { Link } from 'react-router-dom'
import {
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Plus,
  Search,
  Trophy,
} from 'lucide-react'
import { FaAws } from 'react-icons/fa'
import { SiJavascript, SiPython, SiReact, SiVuedotjs } from 'react-icons/si'

const analysisMetrics = [
  {
    title: 'Total Analyses',
    icon: ClipboardList,
    value: '24',
    metric: '+12%',
    metricClassName: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    iconClassName: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
  },
  {
    title: 'Average Match Score',
    icon: BarChart3,
    value: '76%',
    metric: 'Last 30 days',
    metricClassName: 'text-gray-500',
    iconClassName: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  },
  {
    title: 'Top Matched Role',
    icon: Trophy,
    value: 'Frontend Engineer',
    metric: '92% Match Score',
    metricClassName: 'text-gray-500',
    iconClassName: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  },
]

const historyItems = [
  {
    title: 'Senior Frontend Engineer',
    company: 'TechCorp Inc.',
    score: 82,
    date: 'Oct 24, 2023',
    jobId: '#REQ-8921',
    icon: SiReact,
    iconClassName: 'text-sky-400',
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupX',
    score: 65,
    date: 'Oct 20, 2023',
    jobId: '#REQ-7742',
    icon: SiJavascript,
    iconClassName: 'text-emerald-400',
  },
  {
    title: 'Cloud Architect',
    company: 'Enterprise Solutions',
    score: 42,
    date: 'Oct 15, 2023',
    jobId: '#REQ-9910',
    icon: FaAws,
    iconClassName: 'text-orange-400',
  },
  {
    title: 'UI Engineer',
    company: 'Design Co.',
    score: 88,
    date: 'Oct 10, 2023',
    jobId: '#REQ-3321',
    icon: SiVuedotjs,
    iconClassName: 'text-emerald-400',
  },
  {
    title: 'Backend Developer',
    company: 'Data Systems',
    score: 71,
    date: 'Oct 05, 2023',
    jobId: '#REQ-1102',
    icon: SiPython,
    iconClassName: 'text-blue-400',
  },
]

const getScoreClassName = (score: number) => {
  if (score >= 80) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  }

  if (score >= 60) {
    return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
  }

  return 'border-red-500/30 bg-red-500/10 text-red-400'
}

export const HistoryPage = () => {
  return (
    <div className="min-h-screen bg-[#030306] text-white">
      <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <h1 className="text-xl font-bold">Analysis History</h1>
          <p className="mt-1 text-sm text-gray-400">
            Review your past resume and job description matches
          </p>
        </div>

        <Link
          to="/dashboard/analysis"
          className="flex w-fit items-center gap-2 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-colors duration-300 hover:from-indigo-400 hover:to-purple-500"
        >
          <Plus className="h-4 w-4" />
          New Analysis
        </Link>
      </header>

      <main className="space-y-6 px-4 py-8 md:px-8">
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {analysisMetrics.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#09090c] p-4 flex flex-col h-full"
              >
                <div className="flex items-start justify-between gap-4 pt-2">
                  <p className="text-sm font-medium text-gray-400">
                    {item.title}
                  </p>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg border ${item.iconClassName}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <p className="text-2xl font-bold leading-none text-white">
                    {item.value}
                  </p>
                  <span
                    className={`rounded-md px-2 py-1 font-mono text-xs ${item.metricClassName}`}
                  >
                    {item.metric}
                  </span>
                </div>
              </div>
            )
          })}
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#09090c] px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-[385px]">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="search"
                placeholder="Search job titles or companies..."
                className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] pl-11 pr-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-indigo-500/60"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="flex h-11 min-w-[178px] items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm text-gray-300 transition hover:bg-white/[0.04]">
                All Scores
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              <button className="flex h-11 min-w-[152px] items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm text-gray-300 transition hover:bg-white/[0.04]">
                Last 30 Days
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#09090c]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.22em] text-gray-500">
                  <th className="px-6 py-5 font-semibold">Job Title & Company</th>
                  <th className="px-6 py-5 font-semibold">Match Score</th>
                  <th className="px-6 py-5 font-semibold">Date Analyzed</th>
                  <th className="px-6 py-5 font-semibold">Job ID</th>
                  <th className="px-6 py-5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {historyItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <tr
                      key={item.jobId}
                      className="border-b border-white/[0.06] last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
                            <Icon className={`h-5 w-5 ${item.iconClassName}`} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-100">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {item.company}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full border px-3 py-1 font-mono text-xs ${getScoreClassName(
                            item.score,
                          )}`}
                        >
                          {item.score}% Match
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-400">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-gray-500">
                        {item.jobId}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to="/dashboard/analysis-details"
                          className="inline-flex items-center gap-3 text-sm text-gray-400 transition hover:text-indigo-300"
                        >
                          View
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm text-gray-500">
              Showing 1 to 5 of 24 entries
            </p>

            <div className="flex items-center gap-2">
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-gray-600"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="h-8 min-w-8 rounded-md border border-indigo-500/70 bg-indigo-500/20 px-3 font-mono text-sm text-indigo-200">
                1
              </button>
              <button className="h-8 min-w-8 rounded-md border border-white/10 px-3 font-mono text-sm text-gray-400 transition hover:bg-white/[0.04]">
                2
              </button>
              <button className="h-8 min-w-8 rounded-md border border-white/10 px-3 font-mono text-sm text-gray-400 transition hover:bg-white/[0.04]">
                3
              </button>
              <span className="px-1 font-mono text-sm text-gray-500">...</span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-gray-400 transition hover:bg-white/[0.04] hover:text-white"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
