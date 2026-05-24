import {
  WandSparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardSkillInsights } from '../components/DashboardSkillInsights'
import { RecentAnalysisHistory } from '../components/RecentAnalysisHistory'
import { Stats } from '../components/stats'

export const Dashboard = () => {
  return (
    <div className='min-h-screen bg-[#030306] text-white'>
      <header className='flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8'>
        <div>
          <h1 className='text-xl font-bold'>Dashboard Overview</h1>
          <p className='mt-1 text-sm text-gray-400'>Welcome back, Alex. Here's your latest skill analysis.</p>
        </div>
        <div>
          <Link to='/dashboard/analysis' className='flex items-center gap-2 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-colors duration-300 hover:from-indigo-400 hover:to-purple-500'>
            <WandSparkles className='h-4 w-4' /> Start New Analysis
          </Link>
        </div>
      </header>
      <main className='space-y-8 px-4 py-8 md:px-8'>
        <Stats />
        <DashboardSkillInsights />
        <RecentAnalysisHistory />
      </main>
    </div>
  )
}
