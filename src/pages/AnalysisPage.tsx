import { useState } from 'react'
import { AnalysisLoadingModal } from '../components/AnalysisLoadingModal'
import { NewAnalysisForm } from '../components/NewAnalysisForm'
import { AnalysisResult } from '@/components/AnalysisResult'
import { toast } from 'react-toastify'
import { useAnalysesMutation } from '@/feature/analysisSlice'
import type { MutationActionCreatorResult } from '@reduxjs/toolkit/query'


export const AnalysisPage = () => {
  const [ analysesData , setAnalysesData ] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [file , setFile] = useState<File | null>(null)
  const [ jobDescription , setJobDescription ] = useState('')
  const [ roleTitle , setRoleTitle ] = useState('')
  const [ companyName , setCompanyName ] = useState('')
  const [ personalNotes , setPersonalNotes ] = useState('')
  const [ newAnalysisData , {isLoading , error , reset} ] = useAnalysesMutation()
  type AnalysisRequest = ReturnType<typeof newAnalysisData>
  const [analysisRequest, setAnalysisRequest] = useState<MutationActionCreatorResult<AnalysisRequest> | null>(null)

  console.log(analysesData)
  const handleSubmit = async () => {
    if(!file || !jobDescription || !roleTitle){
      toast.error('Please fill all the fields')
      return
    }
    const formData = new FormData()
    formData.append('resume', file!)
    formData.append('jobDescription', jobDescription)
    formData.append('roleTitle', roleTitle)
    formData.append('companyName', companyName)
    formData.append('personalNotes', personalNotes)
    try {
      const result = await newAnalysisData(formData).unwrap()

      setAnalysesData(result)
      toast.success('Analysis created successfully')
      return result;
    } catch (error) {
      console.error('Error creating analysis:', error)
      toast.error('Failed to create analysis')
    }
  }
  const handleNewAnalysis = () => {
  reset();

  setAnalysesData(null);
  setFile(null);
  setJobDescription('');
  setRoleTitle('');
  setCompanyName('');
  setPersonalNotes('');
};
const handleCancelAnalysis = () => {
  if(analysisRequest){
    analysisRequest?.abort()
  }
  setAnalysisRequest(null)
  setAnalysesData(null)

}
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
        {isLoading && <AnalysisLoadingModal  onCancel={handleCancelAnalysis}/>}
        { analysesData && !isLoading ? (
          <AnalysisResult 
            data={analysesData} 
            onNewAnalysis={handleNewAnalysis}
          />
        ) : (
          <NewAnalysisForm 
            file={file}
            setFile={setFile}
            setJobDescription={setJobDescription}
            setRoleTitle={setRoleTitle}
            setCompanyName={setCompanyName}
            setPersonalNotes={setPersonalNotes}
            handleSubmit={handleSubmit}
            jobDescription={jobDescription}
          />
        )}
      </main>
    </div>
  )
}
