import { AlertTriangle, RotateCcw } from 'lucide-react'

type AnalysisErrorProps = {
  message?: string
  onRetry?: () => void
}

export const AnalysisError = ({ message, onRetry }: AnalysisErrorProps) => {
  return (
    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-white shadow-[0_0_24px_rgba(220,38,38,0.15)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/15 text-red-300">
            <AlertTriangle className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-white">Analysis Failed</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-300">
              {message ?? 'Something went wrong while creating your analysis. Please try again.'}
            </p>
          </div>
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" />
            Retry analysis
          </button>
        )}
      </div>
    </div>
  )
}
