import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import type { DashboardResponse } from '@/feature/dashboardSlice'

type statsType = {
  data: DashboardResponse | undefined
  isLoading: boolean
}

const getScoreLabel = (score: number) => {
  if (score >= 85) return 'Excellent'
  if (score >= 70) return 'Strong'
  if (score >= 50) return 'Needs Work'
  return 'Improving'
}

export const Stats = ({ data, isLoading }: statsType) => {
  const latestMetric = data?.latestMetric
  const overallScore = latestMetric?.matchScore ?? 0
  const missingSkills = latestMetric?.missingSkills ?? []
  const analysisSummary = latestMetric?.analysisSummary
  const keywordAnalysis = latestMetric?.keywordAnalysis

  const summaryCards = [
    {
      title: 'Keywords Matched',
      value: `${keywordAnalysis?.matchedKeywords?.length ?? 0}/${(keywordAnalysis?.matchedKeywords?.length ?? 0) + (keywordAnalysis?.missingKeywords?.length ?? 0)}`,
      valueClassName: 'text-white',
    },
    {
      title: 'Market Readiness',
      value: analysisSummary?.marketReadiness ?? 'Pending',
      valueClassName: 'text-cyan-400',
    },
    {
      title: 'Hiring Likelihood',
      value: analysisSummary?.hiringLikelihood ?? 'Pending',
      valueClassName: 'text-emerald-400',
    },
    {
      title: 'Overall Assessment',
      value: analysisSummary?.overallAssessment ?? 'Pending',
      valueClassName: 'text-yellow-400',
    },
  ]

  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(300px,357px)_1fr]">
      <div className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6 shadow-[0_0_60px_rgba(124,58,237,0.08)]">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Overall Match Score
          </p>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            {isLoading ? 'Loading' : getScoreLabel(overallScore)}
          </span>
        </div>

        <div className="mx-auto h-40 w-40 sm:h-44 sm:w-44">
          <CircularProgressbar
            value={overallScore}
            text={`${overallScore}%`}
            strokeWidth={8}
            styles={buildStyles({
              pathColor: '#8b5cf6',
              trailColor: '#24212d',
              textColor: '#ffffff',
              textSize: '30px',
              pathTransitionDuration: 0.5,
            })}
          />
        </div>

        <p className="mx-auto mt-7 max-w-[250px] text-center text-sm leading-6 text-gray-400 ">
          {latestMetric ? `Based on your latest resume versus ${latestMetric.roleTitle || 'the selected role'}.` : 'Run a new analysis to see your latest match score.'}
        </p>
      </div>

      <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6 lg:grid-cols-[1fr_1px_0.95fr]">
        <div className="flex min-h-[252px] flex-col">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Top Missing Skills
          </p>

          <div className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-gray-400">Loading missing skills...</p>
            ) : missingSkills.length > 0 ? (
              missingSkills.slice(0, 3).map((skill) => (
                <div key={skill.skill} className="grid grid-cols-[1fr_auto] items-center gap-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-200">{skill.skill}</p>
                    <p className="mt-1 text-xs text-gray-500">{skill.category}</p>
                  </div>
                  <p className="text-right font-mono text-xs text-gray-500">{skill.importance}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">No missing skills recorded yet.</p>
            )}
          </div>

          <button className="mt-auto w-fit pt-8 text-sm font-medium text-indigo-400 transition hover:text-indigo-300">
            View Full Gap Analysis <span aria-hidden="true">-&gt;</span>
          </button>
        </div>

        <div className="hidden bg-white/10 lg:block" />

        <div>
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Analysis Summary
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {summaryCards.map((item) => (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.01] p-4">
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className={`mt-2 text-xl font-bold ${item.valueClassName}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
