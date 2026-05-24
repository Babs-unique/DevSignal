import { useState } from 'react'
import { AnalysisLoadingModal } from '../components/AnalysisLoadingModal'
import { NewAnalysisForm } from '../components/NewAnalysisForm'

export const AnalysisPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  return (
    <div className='min-h-screen bg-[#030306] text-white'>
      <header className='flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8'>
        <div>
          <h1 className='text-xl font-bold'>
            {isAnalyzing ? 'Analyzing Resume' : 'Create New Analysis'}
          </h1>
          <p className='mt-1 text-sm text-gray-400'>
            {isAnalyzing
              ? 'Please wait while our AI processes your documents.'
              : 'Upload your resume and paste the job description to get started.'}
          </p>
        </div>
      </header>
      <main className='px-4 py-8 md:px-8'>
        {isAnalyzing ? (
          <AnalysisLoadingModal onCancel={() => setIsAnalyzing(false)} />
        ) : (
          <NewAnalysisForm onStartAnalysis={() => setIsAnalyzing(true)} />
        )}
      </main>
    </div>
  )
}
