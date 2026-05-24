import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FaAmazon } from 'react-icons/fa'
import { SiDocker, SiMongodb } from 'react-icons/si'

const skills = [
  {
    name: 'AWS CloudFront',
    logo: <FaAmazon size={16} />,
    priority: 'High Priority',
    accent: 'border-amber-500/35 bg-amber-500/10 text-amber-400',
  },
  {
    name: 'Docker Swarm',
    logo: <SiDocker size={16} />,
    priority: 'Medium',
    accent: 'border-blue-500/35 bg-blue-500/10 text-blue-400',
  },
  {
    name: 'MongoDB Aggregations',
    logo: <SiMongodb size={16} />,
    priority: 'Low',
    accent: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-400',
  },
]

const analysis = [
  {
    title: 'Keywords Matched',
    value: (
      <>
        <span>42</span>
        <span className="text-base font-medium text-gray-500">/50</span>
      </>
    ),
    valueClassName: 'text-white',
  },
  {
    title: 'Experience Level',
    value: 'Match',
    valueClassName: 'text-white',
  },
  {
    title: 'Format Score',
    value: '95%',
    valueClassName: 'text-emerald-400',
  },
  {
    title: 'Impact Words',
    value: 'Needs Work',
    valueClassName: 'text-yellow-400',
  },
]

export const Stats = () => {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(300px,357px)_1fr]">
      <div className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6 shadow-[0_0_60px_rgba(124,58,237,0.08)]">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Overall Match Score
          </p>
          <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
            Excellent
          </span>
        </div>

        <div className="mx-auto h-40 w-40 sm:h-44 sm:w-44">
          <CircularProgressbar
            value={87}
            text="87%"
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

        <p className="mx-auto mt-7 max-w-[250px] text-center text-sm leading-6 text-gray-400">
          Based on your latest resume vs. Senior Frontend Developer role.
        </p>
      </div>

      <div className="grid gap-6 rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6 lg:grid-cols-[1fr_1px_0.95fr]">
        <div className="flex min-h-[252px] flex-col">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Top Missing Skills
          </p>

          <div className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="grid grid-cols-[1fr_auto] items-center gap-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border ${skill.accent}`}
                  >
                    {skill.logo}
                  </span>
                  <p className="truncate text-sm font-medium text-gray-200">
                    {skill.name}
                  </p>
                </div>
                <p className="text-right font-mono text-xs text-gray-500">
                  {skill.priority}
                </p>
              </div>
            ))}
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
            {analysis.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.01] p-4"
              >
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className={`mt-2 text-xl font-bold ${item.valueClassName}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
