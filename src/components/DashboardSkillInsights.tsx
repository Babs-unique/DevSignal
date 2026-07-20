import { GraduationCap, ListChecks, PenTool } from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import type { DashboardResponse } from '@/feature/dashboardSlice'

type SkillInsightsType = {
  data: DashboardResponse | undefined
  isLoading: boolean
}

const getStepIcon = (category: string) => {
  const normalized = category.toLowerCase()

  if (normalized.includes('resume') || normalized.includes('summary')) {
    return PenTool
  }

  if (normalized.includes('skill') || normalized.includes('learning')) {
    return GraduationCap
  }

  return ListChecks
}

const getStepIconClassName = (category: string) => {
  const normalized = category.toLowerCase()

  if (normalized.includes('resume') || normalized.includes('summary')) {
    return 'bg-indigo-500/10 text-indigo-400'
  }

  if (normalized.includes('skill') || normalized.includes('learning')) {
    return 'bg-purple-500/10 text-purple-400'
  }

  return 'bg-blue-500/10 text-blue-400'
}

const getStepIconStyle = (category: string) => {
  const normalized = category.toLowerCase()

  if (normalized.includes('resume') || normalized.includes('summary')) {
    return { transform: 'rotate(180deg)' }
  }

  return undefined
}

export const DashboardSkillInsights = ({ data, isLoading }: SkillInsightsType) => {

  const radarData = (data?.latestMetric?.radarChartData ?? []).map((item) => ({
    skill: item.skill,
    profile: item.userScore * 10,
    required: item.marketExpectedScore * 10,
  }))

  const recommendations = data?.latestMetric?.recommendationActions ?? []

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_357px]">
      <div className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Skill Distribution Radar
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Your Profile
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-600" />
              Job Req
            </span>
          </div>
        </div>

        <div className="h-[90%] w-full m-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Loading skill insights...
            </div>
          ) : radarData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#27272f" radialLines />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={{ fill: '#71717a', fontSize: 12 }}
                  tickCount={6}
                  axisLine={false}
                />
                <Radar
                  dataKey="required"
                  stroke="#4b5563"
                  fill="#4b5563"
                  fillOpacity={0.08}
                  strokeDasharray="7 7"
                  strokeWidth={2}
                />
                <Radar
                  dataKey="profile"
                  stroke="#6f79ff"
                  fill="#6f79ff"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              No skill insights yet. Run a new analysis to populate this view.
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
        <p className="mb-7 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
          Actionable Next Steps
        </p>

        <div className="space-y-4">
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading recommendations...</p>
          ) : recommendations.length > 0 ? (
            recommendations.map((step) => {
              const Icon = getStepIcon(step.category)

              return (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.01] p-4"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${getStepIconClassName(step.category)}`}
                  >
                    <Icon className="h-4 w-4" style={getStepIconStyle(step.category)} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-gray-100">{step.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })
          ) : (
            <p className="text-sm text-gray-400">No recommendations available yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
