import {
  Bookmark,
  Box,
  Check,
  Database,
  Edit,
  GitBranch,
  Map,
  Plus,
  Server,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react'
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts'
import { SiJavascript, SiReact, SiTailwindcss } from 'react-icons/si'

const skillGapData = [
  { skill: 'React', yourSkills: 88, required: 82 },
  { skill: 'TypeScript', yourSkills: 82, required: 74 },
  { skill: 'Tailwind', yourSkills: 70, required: 62 },
  { skill: 'GraphQL', yourSkills: 42, required: 72 },
  { skill: 'Node.js', yourSkills: 38, required: 58 },
  { skill: 'Git', yourSkills: 86, required: 70 },
]

const skillsYouHave = [
  {
    name: 'React.js',
    level: 'Advanced',
    icon: <SiReact className="h-4 w-4 text-sky-400" />,
  },
  {
    name: 'TypeScript',
    level: 'Advanced',
    icon: <SiJavascript className="h-4 w-4 text-yellow-400" />,
  },
  {
    name: 'Tailwind CSS',
    level: 'Intermediate',
    icon: <SiTailwindcss className="h-4 w-4 text-cyan-400" />,
  },
  {
    name: 'Git / CI/CD',
    level: 'Advanced',
    icon: <GitBranch className="h-4 w-4 text-orange-400" />,
  },
]

const missingSkills = [
  {
    name: 'GraphQL',
    level: 'Required',
    icon: <Database className="h-4 w-4 text-gray-400" />,
    badgeClassName: 'bg-yellow-500/10 text-yellow-400',
  },
  {
    name: 'Next.js App Router',
    level: 'Preferred',
    icon: <Box className="h-4 w-4 text-gray-400" />,
    badgeClassName: 'bg-yellow-500/10 text-yellow-400',
  },
  {
    name: 'Node.js (Basic)',
    level: 'Critical Gap',
    icon: <Server className="h-4 w-4 text-gray-400" />,
    badgeClassName: 'bg-red-500/10 text-red-400',
  },
]

const recommendedActions = [
  {
    title: 'Add Node.js experience to resume',
    description:
      'The job description heavily emphasizes full-stack understanding. Even basic Node.js experience should be highlighted.',
    action: "Action: Update 'Experience' section",
    impact: 'High Impact',
    active: true,
  },
  {
    title: 'Highlight Next.js App Router projects',
    description:
      'You listed React, but modern roles look for Next.js specifics. Mention any migration or new builds using the App Router.',
    action: "Action: Add to 'Projects'",
    impact: 'Medium Impact',
    active: false,
  },
]

export const AnalysisResult = () => {
  return (
    <div className="min-h-screen bg-[#030306] text-white">
      <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <h1 className="text-xl font-bold">Analysis Results</h1>
          <p className="mt-1 text-sm text-gray-400">
            Senior Frontend Engineer Role Match
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/5">
            <Bookmark className="h-4 w-4 fill-gray-200" />
            Save
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-white/5">
            <Edit className="h-4 w-4" />
            Edit & Re-run
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition hover:from-indigo-400 hover:to-purple-500">
            <Plus className="h-4 w-4" />
            New Analysis
          </button>
        </div>
      </header>

      <main className="space-y-8 px-4 py-8 md:px-8">
        <section className="grid gap-6 xl:grid-cols-[357px_1fr]">
          <article className="relative rounded-2xl border border-white/10 bg-[#09090c] px-6 py-7">
            <span className="absolute right-5 top-5 flex items-center gap-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              High Match
            </span>

            <div className="mt-10 text-center">
              <h2 className="text-lg font-semibold text-gray-200">
                Overall Match Score
              </h2>

              <div className="mx-auto mt-7 h-[126px] w-[210px] overflow-hidden">
                <div
                  className="relative h-[210px] w-[210px] rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 270deg, #6366f1 0deg, #7c3aed 147deg, #23232b 147deg, #23232b 180deg, transparent 180deg)',
                  }}
                >
                  <div className="absolute left-4 top-4 h-[178px] w-[178px] rounded-full bg-[#09090c]" />
                  <p className="absolute left-0 right-0 top-[58px] text-center text-5xl font-bold leading-none text-white">
                    82<span className="text-2xl text-gray-500">%</span>
                  </p>
                </div>
              </div>

              <p className="mx-auto mt-8 max-w-[255px] text-sm leading-6 text-gray-400">
                Your profile strongly aligns with the core requirements for this
                role.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-7">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-gray-100">
                Skill Gap Analysis
              </h2>
              <div className="flex items-center gap-4 font-mono text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-indigo-500" />
                  Your Skills
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded border border-gray-600 bg-gray-700/30" />
                  Required
                </span>
              </div>
            </div>

            <div className="h-[255px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillGapData} outerRadius="76%">
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
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.08}
                    strokeDasharray="7 7"
                    strokeWidth={2}
                  />
                  <Radar
                    dataKey="yourSkills"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Check className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-gray-100">
                  Skills You Have
                </h2>
              </div>
              <p className="font-mono text-sm text-gray-500">12 matches</p>
            </div>

            <div className="space-y-3">
              {skillsYouHave.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.01] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {skill.icon}
                    <p className="truncate text-sm font-semibold text-gray-100">
                      {skill.name}
                    </p>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-400">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                  <TriangleAlert className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold text-gray-100">
                  Skills You're Missing
                </h2>
              </div>
              <p className="font-mono text-sm text-gray-500">3 gaps</p>
            </div>

            <div className="space-y-3">
              {missingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.01] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {skill.icon}
                    <p className="truncate text-sm font-semibold text-gray-100">
                      {skill.name}
                    </p>
                  </div>
                  <span
                    className={`rounded px-2.5 py-1 font-mono text-xs ${skill.badgeClassName}`}
                  >
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-7">
          <div className="mb-8 flex items-start gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
              <Map className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-gray-100">
                Recommended Actions
              </h2>
              <p className="mt-1 text-sm text-gray-400">
                Personalized roadmap to improve your match score to 95%+
              </p>
            </div>
          </div>

          <div className="relative space-y-8 pl-12 before:absolute before:bottom-0 before:left-4 before:top-1 before:w-px before:bg-white/10">
            {recommendedActions.map((action) => (
              <div key={action.title} className="relative">
                <span
                  className={`absolute -left-[47px] top-1 flex h-8 w-8 items-center justify-center rounded-full border ${
                    action.active
                      ? 'border-indigo-500/30 bg-indigo-500/10'
                      : 'border-white/10 bg-[#111116]'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      action.active ? 'bg-indigo-500' : 'bg-gray-600'
                    }`}
                  />
                </span>

                <div className="rounded-xl border border-white/10 bg-white/[0.01] px-5 py-5">
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-semibold text-gray-100">
                      {action.title}
                    </h3>
                    <span className="w-fit rounded bg-white/10 px-2.5 py-1 font-mono text-xs text-gray-500">
                      {action.impact}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-gray-400">
                    {action.description}
                  </p>
                  <span className="mt-4 inline-flex rounded border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 font-mono text-xs text-indigo-300">
                    {action.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
