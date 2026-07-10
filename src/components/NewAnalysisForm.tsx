import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload, FileText, Shield, WandSparkles } from 'lucide-react'

type NewAnalysisFormProps = {
  file?: File | null
  setFile?: (file: File) => void
  setJobDescription?: (jobDescription: string) => void
  setRoleTitle?: (roleTitle: string) => void
  setCompanyName?: (companyName: string) => void
  setPersonalNotes?: (personalNotes: string) => void
  handleSubmit?: () => void
  jobDescription: string
}

export const NewAnalysisForm = ({ 
  file,
  setFile,
  setJobDescription,
  setRoleTitle,
  setCompanyName,
  setPersonalNotes,
  jobDescription = '',
  handleSubmit

 }: NewAnalysisFormProps) => {
/*   const [selectedFile, setSelectedFile] = useState<File | null>(null) */

  const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0] ?? null;
      if(file && setFile){
        setFile(file)
      }
  }, [setFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
        '.docx',
      ],
    },
  })

  return (
    
    <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-8 shadow-[0_0_70px_rgba(124,58,237,0.06)]">
      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-indigo-500/35 bg-indigo-500/10 text-xs text-indigo-300">
            1
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Upload Resume
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`flex min-h-[232px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center transition py-4 ${
            isDragActive
              ? 'border-indigo-400 bg-indigo-500/10'
              : 'border-white/15 bg-[#0c0c11] hover:border-indigo-400/60'
          }`}
        >
          <input {...getInputProps()} />
          <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-indigo-400 ">
            <CloudUpload className="h-7 w-7" />
          </span>
          <p className="text-md font-semibold text-white text-wrap break-all">
            {file ? file.name : 'Drag & drop your resume here'}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            or click to browse from your computer
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              PDF
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" />
              DOCX
            </span>
            <span>•</span>
            <span>Max 5MB</span>
          </div>
        </div>
      </div>

      <div className="my-8 h-px bg-white/10" />

      <div>
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded border border-indigo-500/35 bg-indigo-500/10 text-xs text-indigo-300">
            2
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
            Job Details
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_335px]">
          <div>
            <label
              className="mb-3 block text-sm font-medium text-gray-300"
              htmlFor="job-description"
            >
              Job Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(event) => setJobDescription?.(event.target.value)}
              placeholder={`Paste the full job description here...

Requirements:
- 5+ years of experience with React
- Strong knowledge of TypeScript
- Experience with AWS...`}
              className="min-h-[240px] w-full resize-y rounded-lg border border-white/10 bg-[#111116] px-4 py-4 font-mono text-sm leading-6 text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-indigo-400/60"
            />
            <div className="mt-3 flex items-center justify-between gap-4 text-xs text-gray-500">
              <p>Minimum 100 characters required for accurate analysis.</p>
              <p>{jobDescription?.length} / 5000</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label
                className="mb-3 block text-sm font-medium text-gray-300"
                htmlFor="target-role"
              >
                Target Role Title (Optional)
              </label>
              <input
                id="target-role"
                type="text"
                placeholder="e.g. Senior Frontend Engineer"
                onChange={(e) => setRoleTitle?.(e.target.value)}
                className="h-[43px] w-full rounded-lg border border-white/10 bg-[#111116] px-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-indigo-400/60"
              />
            </div>

            <div>
              <label
                className="mb-3 block text-sm font-medium text-gray-300"
                htmlFor="company-name"
              >
                Company Name (Optional)
              </label>
              <input
                id="company-name"
                type="text"
                placeholder="e.g. Stripe, Acme Corp"
                onChange={(e) => setCompanyName?.(e.target.value)}
                className="h-[43px] w-full rounded-lg border border-white/10 bg-[#111116] px-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-indigo-400/60"
              />
            </div>

            <div>
              <label
                className="mb-3 block text-sm font-medium text-gray-300"
                htmlFor="personal-notes"
              >
                Personal Notes
              </label>
              <textarea
                id="personal-notes"
                placeholder="Any specific areas you want to focus on?"
                className="min-h-20 w-full resize-none rounded-lg border border-white/10 bg-[#111116] px-4 py-4 text-sm text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-indigo-400/60"
                onChange={(e) => setPersonalNotes?.(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-8 h-px bg-white/10" />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 font-mono text-xs text-gray-500">
          <Shield className="h-4 w-4 text-gray-500" />
          Your data is processed securely and never shared.
        </p>

        <div className="flex justify-end gap-3 flex-wrap">
          <button className="rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/5">
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit }
            className="flex items-center gap-2 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition hover:from-indigo-400 hover:to-purple-500"
          >
            <WandSparkles className="h-4 w-4" />
            Analyze Now
          </button>
        </div>
      </div>
    </section>
  )
}
