import { GraduationCap, ListChecks, PenTool } from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'

const skillData = [
  { skill: 'React/Vue', profile: 86, required: 82 },
  { skill: 'Node.js', profile: 72, required: 64 },
  { skill: 'CSS/Tailwind', profile: 88, required: 78 },
  { skill: 'AWS/Cloud', profile: 40, required: 62 },
  { skill: 'TypeScript', profile: 80, required: 88 },
  { skill: 'Docker', profile: 36, required: 48 },
]

const nextSteps = [
  {
    title: 'Rewrite Summary Section',
    description:
      'Incorporate more leadership keywords like "mentored", "architected", and...',
    icon: PenTool,
    iconStyle: { transform: 'rotate(180deg)' },
    iconClassName: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    title: 'Take AWS Course',
    description:
      'Your target role requires AWS experience. Complete a basic...',
    icon: GraduationCap,
    iconClassName: 'bg-purple-500/10 text-purple-400',
  },
  {
    title: 'Quantify Achievements',
    description:
      'Add metrics to 3 bullet points in your recent experience section.',
    icon: ListChecks,
    iconClassName: 'bg-blue-500/10 text-blue-400',
  },
]

export const DashboardSkillInsights = () => {
  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_357px]">
      <article className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
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

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData} outerRadius="75%">
              <PolarGrid stroke="#27272f" radialLines />
              <PolarAngleAxis
                dataKey="skill"
                tick={{ fill: '#a1a1aa', fontSize: 12 }}
              />
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
        </div>
      </article>

      <article className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
        <p className="mb-7 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
          Actionable Next Steps
        </p>

        <div className="space-y-4">
          {nextSteps.map((step) => {
            const Icon = step.icon

            return (
              <div
                key={step.title}
                className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.01] p-4"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${step.iconClassName}`}
                >
                  <Icon className="h-4 w-4" style={step.iconStyle} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-gray-100">
                    {step.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </article>
    </section>
  )
}
