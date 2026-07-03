import { ResetForm } from "@/components/reset-form"
import { useForgotPasswordMutation } from "@/feature/authSlice"
import { useState } from "react"
import { toast } from "react-toastify"
export default function ResetPasswordPage() {
  const [email , setEmail ] = useState<string>('')
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await forgotPassword({ email }).unwrap()
      toast.success('If an account exists with this email, a reset link has been sent')
      setEmail('')
    } catch (e) {
      console.error('Forgot password error:', e)
      toast.error('Failed to send password reset email')
    }
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-black text-white">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <ResetForm handleSubmit={handleSubmit} setEmail={setEmail}  isLoading={isLoading} error={error}/>
      </div>
    </div>
  )
}