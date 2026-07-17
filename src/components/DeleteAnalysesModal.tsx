import { Trash2, X } from 'lucide-react'

type DeleteAnalysisModalProps = {
onConfirm: () => void
onClose: () => void
isDeleting?: boolean
roleTitle?: string
}

export const DeleteAnalysisModal = ({ 
onConfirm, 
onClose, 
isDeleting = false,
roleTitle 
}: DeleteAnalysisModalProps) => {
return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
    <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#0b0b10] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        
        <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-500/15 text-red-400">
            <Trash2 className="h-5 w-5" />
            </span>
            <div>
            <h2 className="text-xl font-semibold text-white">Delete Analysis</h2>
            <p className="mt-2 text-sm leading-6 text-gray-400">
                Are you sure you want to remove the match evaluation for <span className="text-white font-medium">{roleTitle}</span>? 
                This action is immediate and cannot be undone.
            </p>
            </div>
        </div>
        <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
            disabled={isDeleting}
            aria-label="Close modal"
        >
            <X className="h-4 w-4" />
        </button>
        </div>

        <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
            <p className="font-medium">Important Information:</p>
            <p className="mt-2 text-gray-300">
            Deleting this record will wipe it permanently from your history tracker. 
            The DevSignal parsing intelligence logs for this specific file match will be removed from your dashboard stats.
            </p>
        </div>

        <div className="space-y-2 text-sm text-gray-400">
            <p>Impact details:</p>
            <ul className="list-disc space-y-1 pl-5 text-gray-300">
            <li>The custom resume skill matrix chart profile will be erased.</li>
            <li>Missing core competencies feedback summaries will be lost.</li>
            <li>This specific evaluation token link will become invalid.</li>
            </ul>
        </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
            disabled={isDeleting}
        >
            Cancel
        </button>
        <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-500/70 flex items-center justify-center gap-2"
            disabled={isDeleting}
        >
            {isDeleting && (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
            )}
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
        </button>
        </div>
    </div>
    </div>
)
}
