import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useDebounce } from 'use-debounce'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  ChevronRight,
  ClipboardList,
  Plus,
  Search,
  Trophy,
} from 'lucide-react'
import {
  useGetHistoryListQuery,
  useGetHistoryMetricsQuery,
  useSearchHistoryQuery,
} from '@/feature/historySlice'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../@/components/ui/pagination'

const getScoreClassName = (score: number) => {
  if (score >= 80) {
    return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
  }

  if (score >= 60) {
    return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
  }

  return 'border-red-500/30 bg-red-500/10 text-red-400'
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))

export const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [scoreFilter, setScoreFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('30')
  const [page, setPage] = useState(1)
  const [debouncedSearchTerm] = useDebounce(searchTerm, 400)

  const shouldSearch = debouncedSearchTerm.trim().length > 0

  const { data: metrics } = useGetHistoryMetricsQuery()
  const { data: historyData, isLoading: isHistoryLoading } = useGetHistoryListQuery(
    { page, limit: 10 },
    { skip: shouldSearch },
  )
  const { data: searchData, isLoading: isSearchLoading } = useSearchHistoryQuery(
    { q: debouncedSearchTerm, score: scoreFilter ? Number(scoreFilter) : undefined, date: Number(dateFilter), page, limit: 10 },
    { skip: !shouldSearch },
  )

  useEffect(() => {
    setPage(1)
  }, [debouncedSearchTerm, scoreFilter, dateFilter])

  const items = useMemo(() => (shouldSearch ? searchData?.analyses ?? [] : historyData?.analyses ?? []), [shouldSearch, searchData, historyData])
  const isLoading = shouldSearch ? isSearchLoading : isHistoryLoading
  const totalCount = shouldSearch ? searchData?.totalCount ?? 0 : historyData?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / 10))

  const analysisMetrics = [
    {
      title: 'Total Analyses',
      icon: ClipboardList,
      value: metrics?.total?.toString() ?? '0',
      metric: metrics ? '+12%' : 'Loading...',
      metricClassName: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
      iconClassName: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300',
    },
    {
      title: 'Average Match Score',
      icon: BarChart3,
      value: metrics?.averageMatchScore ?? '0%',
      metric: 'Last 30 days',
      metricClassName: 'text-gray-500',
      iconClassName: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    },
    {
      title: 'Top Matched Role',
      icon: Trophy,
      value: metrics?.topMatchedRoleName ?? 'No analyses yet',
      metric: metrics?.topMatchedRole ? `${metrics.topMatchedRole}% Match` : 'No data',
      metricClassName: 'text-gray-500',
      iconClassName: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
    },
  ]

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
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-[#09090c] p-4"
              >
                <div className="flex items-start justify-between gap-4 pt-2">
                  <p className="text-sm font-medium text-gray-400">{item.title}</p>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg border ${item.iconClassName}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-2">
                  <p className="text-2xl font-bold leading-none text-white">{item.value}</p>
                  <span className={`rounded-md px-2 py-1 font-mono text-xs ${item.metricClassName}`}>
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
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search job titles or companies..."
                className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] pl-11 pr-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-indigo-500/60"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                value={scoreFilter}
                onChange={(event) => setScoreFilter(event.target.value)}
                className="h-11 min-w-[178px] rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm text-gray-300 outline-none transition focus:border-indigo-500/60"
              >
                <option value="">All Scores</option>
                <option value="60">60%+</option>
                <option value="70">70%+</option>
                <option value="80">80%+</option>
                <option value="90">90%+</option>
              </select>
              <select
                value={dateFilter}
                onChange={(event) => setDateFilter(event.target.value)}
                className="h-11 min-w-[152px] rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm text-gray-300 outline-none transition focus:border-indigo-500/60"
              >
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
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
                {isLoading && (
                  <tr>
                    <td className="px-6 py-8 text-sm text-gray-400" colSpan={5}>
                      Loading your analysis history...
                    </td>
                  </tr>
                )}

                {!isLoading && items.length === 0 && (
                  <tr>
                    <td className="px-6 py-8 text-sm text-gray-400" colSpan={5}>
                      No analyses found yet. Start a new analysis to populate this view.
                    </td>
                  </tr>
                )}

                {!isLoading && items.map((item) => (
                  <tr key={item._id} className="border-b border-white/[0.06] last:border-b-0">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02]">
                          <ClipboardList className="h-5 w-5 text-indigo-400" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-100">{item.roleTitle}</p>
                          <p className="mt-1 text-xs text-gray-500">{item.companyName || 'No company'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full border px-3 py-1 font-mono text-xs ${getScoreClassName(item.matchScore)}`}>
                        {item.matchScore}% Match
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-400">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-500">#{item._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/dashboard/analysis-details/${item._id}`}
                        className="inline-flex items-center gap-3 text-sm text-gray-400 transition hover:text-indigo-300"
                      >
                        View
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm text-gray-500">
              {!isLoading && totalCount > 0 ? `Showing ${items.length} of ${totalCount} entries` : 'No results yet'}
            </p>

            <Pagination className="mx-0 justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                      event.preventDefault()
                      if (page > 1) {
                        setPage((current) => Math.max(1, current - 1))
                      }
                    }}
                    className="border border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault()
                        setPage(pageNumber)
                      }}
                      className={pageNumber === page ? 'border-indigo-500/70 bg-indigo-500/20 text-indigo-200' : 'border border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/[0.04] hover:text-white'}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                      event.preventDefault()
                      if (page < totalPages) {
                        setPage((current) => Math.min(totalPages, current + 1))
                      }
                    }}
                    className="border border-white/10 bg-white/[0.02] text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </div>
  )
}
