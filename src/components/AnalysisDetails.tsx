import {
  ArrowLeft,
  Copy,
  FileText,
  Lightbulb,
  Trash2,
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
import { SiReact } from 'react-icons/si'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetAnalysesByIdQuery } from '@/feature/dashboardSlice'
import { useDeleteHistoryByIdMutation, useDuplicateAnalysesByIdMutation} from '@/feature/historySlice'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { DeleteAnalysisModal } from './DeleteAnalysesModal'
import { skipToken } from '@reduxjs/toolkit/query/react'


export const AnalysisDetails = () => {
  const { id } = useParams<{ id: string }>()
  const [ showDeleteModal , setShowDeleteModal ] = useState(false)
  const { data : analysisDetails, isLoading } = useGetAnalysesByIdQuery(id ?? skipToken)
  const [ duplicateAnalysis  , {isLoading: isDuplicating}] = useDuplicateAnalysesByIdMutation()
  const [ deleteAnalysis , {isLoading: isDeleting}] = useDeleteHistoryByIdMutation()

  const navigate = useNavigate();

  console.log(analysisDetails)
  if(isLoading){
        return (<div className="flex items-center justify-center min-h-screen bg-[#030306]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div> )
  }

  const handleDelete = async () => {
    if (!id) return
    try {
      await deleteAnalysis(id).unwrap()
      toast.success('Analysis deleted successfully')
      navigate('/dashboard/history')
      setShowDeleteModal(false)
    } catch (error) {
      toast.error('Failed to delete analysis')
      console.error(error)
    }
  }
  const handleDuplicate = async () => {
    if (!id) return
    try {
      const result = await duplicateAnalysis(id).unwrap()
      toast.success('Analysis duplicated successfully')
      if (result?._id) {
        navigate(`/dashboard/analysis/${result._id}`)
      }
    } catch (error) {
      toast.error('Failed to duplicate analysis')
      console.error(error)
    }
  }
  const radarData = analysisDetails?.radarChartData.map((skill) => ({
    skill: skill.skill,
    userScore: skill.userScore * 10,
    marketExpectedScore: skill.marketExpectedScore * 10,
  }))

  const missingSkills = analysisDetails?.missingSkills.map((skill) => ({
    name: skill.skill,
    tag: skill.importance,
    description: skill.reason,
    className:
      skill.importance === 'Critical'
        ? 'border-red-500/30 bg-red-500/10 text-red-400'
        : skill.importance === 'Important'
        ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
        : skill.importance === 'Recommended'
        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
        : 'border-gray-500/30 bg-gray-500/10 text-gray-400',
    tagClassName:
      skill.importance === 'Critical'
        ? 'border-red-500/30 bg-red-500/10 text-red-400'
        : skill.importance === 'Important'
        ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400'
        : skill.importance === 'Recommended' 
        ? 'border-blue-500/30 bg-blue-500/10 text-blue-400'
        : 'border-gray-500/30 bg-gray-500/10 text-gray-400',
  }))


  const matchScoreGrade = (matchScore: number) => {
    if (matchScore >= 80) return 'Strong Match'
    if (matchScore >= 60) return 'Promising'
    return 'Needs Work'
  }

  return (
    <div className="min-h-screen bg-[#030306] text-white">
      <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <Link to='/dashboard/history'
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">Analysis Detail</h1>
            <p className="mt-1 text-sm text-gray-400">
              Reviewing match for {analysisDetails?.roleTitle ?? 'Role Match'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          onClick={() => setShowDeleteModal(true)}
          disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Delete...' : 'Delete'} 
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition hover:from-indigo-400 hover:to-purple-500"
          onClick={handleDuplicate}
          disabled={isDuplicating}
          >
            <Copy className="h-4 w-4"/>
            {isDuplicating ? 'Duplicating...' : 'Duplicate Analysis'}
          </button>
        </div>
      </header>

      <main className="space-y-6 px-4 py-8 md:px-8">
        <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-sky-400">
              <SiReact className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                {analysisDetails?.roleTitle ?? 'Role Match'}
              </h2>
              <p className="mt-2 font-mono text-sm text-gray-500">
                {analysisDetails?.companyName ?? 'Company Name Not Provided'}
              </p>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 font-mono text-sm text-gray-200">
              <FileText className="h-4 w-4 text-red-400" />
              {analysisDetails?.resumeFileName ?? 'Resume.pdf'}
            </div>
            <p className="mt-3 font-mono text-xs text-gray-500">
              Parsed via DevSignal Engine v2.1
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[357px_1fr]">
          <div className="rounded-2xl border border-white/10 bg-[#09110f] px-6 py-7 shadow-[0_0_70px_rgba(16,185,129,0.06)]">
            <p className="text-sm text-gray-400">Overall Match Score</p>

            <div className={`mx-auto mt-7 flex h-48 w-48 items-center justify-center rounded-full
            ${matchScoreGrade(analysisDetails?.matchScore ?? 0) === 'Strong Match' ? 'shadow-[0_0_42px_rgba(16,185,129,0.18)]' : matchScoreGrade(analysisDetails?.matchScore ?? 0) === 'Promising' ? 'shadow-[0_0_42px_rgba(250,204,21,0.18)]' : 'shadow-[0_0_42px_rgba(239,68,68,0.18)]'}
              `}>
              <div
                className="relative h-48 w-48 rounded-full"
                style={{
                  background:
                    matchScoreGrade(analysisDetails?.matchScore ?? 0) === 'Strong Match'
                    ? `conic-gradient(#10b981 0deg ${(analysisDetails?.matchScore ?? 0) * 3.6}deg, #25272b 295deg 360deg)`
                    : matchScoreGrade(analysisDetails?.matchScore ?? 0) === 'Promising'
                    ? `conic-gradient(
                    #facc15 0deg 295deg, #25272b ${(analysisDetails?.matchScore ?? 0) * 3.6}deg 360deg
                    )`
                    : `conic-gradient(#ef4444 0deg ${(analysisDetails?.matchScore ?? 0) * 3.6}deg, #25272b 0deg 360deg)`
                    ,
                }}
              >
                <div className="absolute inset-4 rounded-full bg-[#09110f]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-5xl font-bold leading-none text-white">
                    {analysisDetails?.matchScore ?? 0}
                    <span className="text-2xl text-gray-500">%</span>
                  </p>
                  <span className={`mt-3 rounded border px-3 py-1 font-mono text-xs 
                  ${matchScoreGrade(analysisDetails?.matchScore ?? 0) === 'Strong Match' ? 'text-emerald-400 border-emerald-500/35 bg-emerald-500/10' : matchScoreGrade(analysisDetails?.matchScore ?? 0) === 'Promising' ? 'text-yellow-400 border-yellow-500/35 bg-yellow-500/10' : 'text-red-400 border-red-500/35 bg-red-500/10'}`}
                >
                    {matchScoreGrade(analysisDetails?.matchScore ?? 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 h-px bg-white/10" />

            <div className="grid grid-cols-2 gap-6 px-4 pt-5 text-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">
                  Required Skills
                </p>
                <p className="mt-2 text-lg font-bold">
                  {(analysisDetails?.missingSkills.length ?? 0)} / {(analysisDetails?.existingSkills.length ?? 0) + (analysisDetails?.missingSkills.length ?? 0)}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500">
                  Experience
                </p>
                <p className="mt-2 text-lg font-bold">5+ Yrs</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-7">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-sm font-medium text-gray-400">
                Skill Alignment Radar
              </h2>
              <div className="flex items-center gap-4 font-mono text-xs text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Your Profile
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gray-700" />
                  Job Req
                </span>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="78%">
                  <PolarGrid stroke="#27272f" radialLines />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: '#a1a1aa', fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    dataKey="marketExpectedScore"
                    stroke="#3f3f46"
                    fill="#3f3f46"
                    fillOpacity={0.05}
                    strokeDasharray="4 4"
                    strokeWidth={2}
                  />
                  <Radar
                    dataKey="userScore"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.18}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-400">
                  <TriangleAlert className="h-4 w-4" />
                </span>
                <h2 className="text-lg font-semibold">Missing Skills</h2>
              </div>
              <span className="rounded border border-white/10 px-3 py-1 font-mono text-xs text-gray-400">
                {analysisDetails?.missingSkills.length} Critical Gaps
              </span>
            </div>

            <div className="space-y-4">
              {missingSkills?.map((skill) => (
                <div
                  key={skill.name}
                  className={`rounded-lg border px-4 py-4 ${skill.className}`}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{skill.name}</p>
                    <span
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase ${skill.tagClassName}`}
                    >
                      {skill.tag}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[386px] overflow-hidden rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h2 className="text-lg font-semibold">Action Plan</h2>
            </div>

            <div className="space-y-4 max-h-[295px]">
              {analysisDetails?.recommendationActions && analysisDetails.recommendationActions.length > 0 ? (
                analysisDetails.recommendationActions.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-xl border border-white/10 bg-[#111116] p-4"
                  >
                    <h3 className="text-sm font-semibold">{action.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-gray-400">
                      {action.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                      <span className="font-bold text-indigo-400">{action.category}</span>
                      <span className={`font-bold
                      ${
                          ['Easy', 'Beginner'].includes(action.difficulty) ? 'text-green-400' :
                          ['Intermediate', 'Medium'].includes(action.difficulty) ? 'text-yellow-400' :
                          ['Hard', 'Advanced'].includes(action.difficulty) ? 'text-red-400' :
                          'text-gray-400'
                          }
                        `}>{action.difficulty}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No action plan available.</p>
              )}
            </div>
          </div>
          {showDeleteModal && (
              <DeleteAnalysisModal
                roleTitle={analysisDetails?.roleTitle}
                isDeleting={isDeleting}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
              />
            )}
        </section>
      </main>
    </div>
  )
}
