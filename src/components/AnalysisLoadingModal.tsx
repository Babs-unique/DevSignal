import { Check, Cpu, X } from 'lucide-react'
import { useEffect, useState} from 'react'

const INITIAL_STEPS = [
  {
    id: 1,
    title: 'Parsing resume structure',
    description: 'Extracted resume sections and profile data.',
    status: 'active',
  },
  {
    id: 2,
    title: 'Extracting skills',
    description: 'Identified technical and soft skills.',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Comparing to job description',
    description: 'Running semantic similarity matching...',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Generating recommendations',
    description: 'Waiting for comparison results.',
    status: 'pending',
  },
]

type AnalysisLoadingModalProps = {
  onCancel?: () => void
}

export const AnalysisLoadingModal = ({ onCancel }: AnalysisLoadingModalProps) => {

  const [analysisSteps, setAnalysisSteps] = useState(INITIAL_STEPS);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      setAnalysisSteps((prevSteps) => {
        const updatedSteps = prevSteps.map((step) => {
          if (step.id === count) {
            return { ...step, status: 'done' };
          }
          if (step.id === count + 1) {
            return { ...step, status: 'active' };
          } else if (step.id <= count) {
            return { ...step, status: 'done' };
          } else {
            return step;
          }
        });
        return updatedSteps;
      });
      count++;
      if (count >= INITIAL_STEPS.length) {
        clearInterval(interval);
      }
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); 
  },[])
  
  return (
    <section className="mx-auto flex min-h-[calc(100vh-170px)] w-full max-w-[720px] items-center justify-center px-4 py-8">
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10] px-6 py-10 shadow-[0_0_100px_rgba(99,102,241,0.08)] sm:px-12 sm:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_48%)]" />

        <div className="relative mx-auto flex max-w-[520px] flex-col items-center text-center">
          <div className="relative mb-10 flex h-32 w-32 items-center justify-center">
            <span className="absolute h-28 w-28 animate-spin rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-500" />
            <span className="absolute h-24 w-24 animate-[spin_1.8s_linear_infinite_reverse] rounded-full border-2 border-transparent border-b-purple-400 border-l-purple-400" />
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-[0_0_35px_rgba(124,58,237,0.45)]">
              <Cpu className="h-7 w-7" />
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white">Analyzing Match</h2>
          <p className="mt-3 font-mono text-sm text-gray-400">
            Estimated time remaining: ~15s
          </p>

          <div className="mt-10 w-full space-y-6 text-left">
            {analysisSteps.map((step) => (
              <div
                key={step.title}
                className={`flex gap-4 ${
                  step.status === 'pending' ? 'opacity-40' : ''
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                    step.status === 'done'
                      ? 'border-indigo-400/40 bg-indigo-500/20 text-indigo-200'
                      : step.status === 'active'
                        ? 'border-indigo-400 text-indigo-300'
                        : 'border-white/15 bg-white/[0.03] text-gray-500'
                  }`}
                >
                  {step.status === 'done' && <Check className="h-4 w-4" />}
                  {step.status === 'active' && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                  )}
                  {step.status === 'pending' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-500" />
                  )}
                </span>

                <div>
                  <h3
                    className={`font-mono text-sm font-semibold ${
                      step.status === 'active'
                        ? 'text-indigo-300'
                        : 'text-gray-100'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 h-px w-full bg-white/10" />

          <button
            type="button"
            onClick={onCancel}
            className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-gray-200 transition hover:bg-white/5"
          >
            <X className="h-4 w-4" />
            Cancel Analysis
          </button>
        </div>
      </div>
    </section>
  )
}
