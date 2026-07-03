import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code2 } from "lucide-react"
import { Link } from 'react-router-dom'
import { Send, ChevronLeft } from "lucide-react"
import type { FetchBaseQueryError} from "@reduxjs/toolkit/query"
import type { SerializedError } from "@reduxjs/toolkit";

type ResetFormProps = {
  handleSubmit: (e: React.FormEvent) => void
  setEmail: (email: string) => void
  isLoading: boolean
  error: FetchBaseQueryError | SerializedError | undefined
  className?: string
}
export function ResetForm({
  handleSubmit,
  setEmail,
  isLoading,
  error,
  className,
  ...props
}: ResetFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col gap-6 rounded-lg border border-white/10 bg-[#0F0F14] p-8">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-purple-600">
              <Code2 className="h-5 w-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-sm text-gray-400">Enter your email to receive reset link</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Email address</label>
            <Input
              type="email"
              placeholder="name@company.com"
              className="border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Sign Up Button */}
          <Button 
          disabled={isLoading}
          type="submit"
          className="mt-2 w-full bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600">
            Send reset link <Send />
          </Button>
        </form>
      <Link to='/login' className=" text-xs text-gray-500 underline flex items-center gap-1 justify-center">
        <ChevronLeft /> Back to Login
      </Link>
      {error && <p className="text-red-500 text-sm">An error occurred while trying to send an Email</p>}
      </div>
    </div>
  )
}
