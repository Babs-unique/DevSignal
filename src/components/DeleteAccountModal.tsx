import { AlertTriangle, X } from 'lucide-react'

type DeleteAccountModalProps = {
  onConfirm: () => void
  onClose: () => void
  isDeleting?: boolean
}

export const DeleteAccountModal = ({ onConfirm, onClose, isDeleting }: DeleteAccountModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-[#0b0b10] p-6 shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-3xl bg-red-500/15 text-red-300">
              <AlertTriangle className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-white">Delete Account</h2>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                This will schedule your account for permanent deletion in 30 days. During that time,
                you will still have access, but your account will be marked for removal.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
            <p className="font-medium">Important:</p>
            <p className="mt-2 text-gray-300">
              Once deletion is requested, your refresh and access tokens are revoked. You will be signed out and must contact support if you want to restore your account before the 30-day removal window ends.
            </p>
          </div>

          <div className="space-y-2 text-sm text-gray-400">
            <p>Deletion details:</p>
            <ul className="list-disc space-y-1 pl-5 text-gray-300">
              <li>Account will be permanently deleted after 30 days.</li>
              <li>Your data is retained only for recovery during that period.</li>
              <li>All active sessions and tokens are invalidated immediately.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-500/70"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Confirm Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
