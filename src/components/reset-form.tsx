import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code2 } from "lucide-react"
import { Link } from 'react-router-dom'
import { Send, ChevronLeft } from "lucide-react"

export function ResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
        <form className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">Email address</label>
            <Input
              type="email"
              placeholder="name@company.com"
              className="border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500"
            />
          </div>

          {/* Sign Up Button */}
          <Button className="mt-2 w-full bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600">
            Send reset link <Send />
          </Button>
        </form>
      <Link to='/signUp' className=" text-xs text-gray-500 underline flex items-center gap-1 justify-center">
        <ChevronLeft /> Back to Login
      </Link>
      </div>
    </div>
  )
}
