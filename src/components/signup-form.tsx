import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code2, Eye, EyeOff, Check, X } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify'
import Turnstile from "./security/turnStile"
import type { TurnstileInstance } from "@marsidev/react-turnstile"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import type { SerializedError } from '@reduxjs/toolkit';

type SignupFormProps = {  
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  handleRegister: () => void
  setToken: (token: string) => void
  setConfirmPassword: (password: string) => void
  token: string
  isLoading: boolean
  className?: string
  isHidden: boolean
  turnstileRef: React.RefObject<TurnstileInstance | null >
  togglePassword: () => void
  oauthSignUp: ( provider: "google" | "github") => void
  isLoadingUrl: boolean
  urlError: FetchBaseQueryError| SerializedError | undefined
  showError: boolean
  errorParam?: string | null
}

export function SignupForm({
  setEmail,
  setPassword,
  handleRegister,
  setConfirmPassword,
  setToken,
  token,
  isLoading,
  isHidden,
  turnstileRef,
  togglePassword,
  oauthSignUp,
  isLoadingUrl,
  urlError,
  showError,
  errorParam,
  className,
  ...props
}: React.ComponentProps<"div"> & SignupFormProps) {
  
  const [pwdValue, setPwdValue] = useState("")
  const [confirmPwdValue, setConfirmPwdValue] = useState("")
  const [emailValue , setEmailValue] = useState("")

  const validations = {
    length: pwdValue.length >= 8,
    uppercase: /[A-Z]/.test(pwdValue),
    lowercase: /[a-z]/.test(pwdValue),
    number: /[0-9]/.test(pwdValue),
  }

  const isPasswordValid = Object.values(validations).every(Boolean)
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      toast.error('Please verify you are not a robot')
      return
    }

    if (!isPasswordValid) {
      toast.error('Password does not meet requirements')
      return
    }

    if (pwdValue !== confirmPwdValue) {
      toast.error('Passwords do not match')
      return
    }

    handleRegister()
  }

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
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-sm text-gray-400">Join DevSignal to analyze your skills</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm text-gray-300" htmlFor='email'>Email address</label>
            <Input
              type="email"
              id="email"
              placeholder="name@company.com"
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailValue(e.target.value)
              }}
              required
              className="border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500"
            />
              {emailValue.length > 0 && !isEmailValid && (
                <span className="text-xs text-red-500 mt-1">Please enter a valid email address.</span>
              )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm text-gray-300" htmlFor='password'>Password</label>
            <div className="relative">
              <Input
                type={isHidden ? "password" : "text"}
                id="password"
                placeholder="••••••••"
                required
                onChange={(e) => {
                  setPwdValue(e.target.value)
                  setPassword(e.target.value)
                }}
                className="border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500 pr-10"
              />
              <button 
                type="button" 
                onClick={togglePassword} 
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {isHidden ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>
          {pwdValue.length > 0 && (
            <div className="text-xs space-y-1 bg-[#14141B] p-3 rounded border border-gray-800">
              <p className="text-gray-400 mb-1 font-medium">Password requirements:</p>
              <div className={cn("flex items-center gap-1.5", validations.length ? "text-emerald-400" : "text-gray-500")}>
                {validations.length ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} At least 8 characters
              </div>
              <div className={cn("flex items-center gap-1.5", validations.uppercase ? "text-emerald-400" : "text-gray-500")}>
                {validations.uppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} At least one uppercase letter
              </div>
              <div className={cn("flex items-center gap-1.5", validations.lowercase ? "text-emerald-400" : "text-gray-500")}>
                {validations.lowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} At least one lowercase letter
              </div>
              <div className={cn("flex items-center gap-1.5", validations.number ? "text-emerald-400" : "text-gray-500")}>
                {validations.number ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} At least one number
              </div>
            </div>
          )}

          {/* Confirm Password */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-sm text-gray-300" htmlFor="confirm-password">Confirm Password</label>
            <div className="relative">
              <Input
                type={isHidden ? "password" : "text"}
                placeholder="••••••••"
                id="confirm-password"
                required
                onChange={(e) => {
                  setConfirmPwdValue(e.target.value)
                  setConfirmPassword(e.target.value)
                }}
                className="border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500 pr-10"
              />
              <button 
                type="button" 
                onClick={togglePassword} 
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {isHidden ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Sign Up Button */}
          <Button 
            className="mt-2 w-full bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            type="submit"
            disabled={isLoading || !isPasswordValid || pwdValue !== confirmPwdValue || !isEmailValid}
          >
            { isLoading ? 'Loading...' : 'Sign Up →' }
          </Button>
        </form>

         <Turnstile
          ref={turnstileRef}
          onVerify={setToken} />

        {/* Divider */}
        <div className="relative flex items-center gap-4">
          <div className="flex-1 border-t border-gray-700" />
          <span className="text-xs uppercase text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-1 border-t border-gray-700" />
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-3">
          <Button variant="outline" className="border-gray-700 bg-[#1A1A23] text-white hover:bg-[#23232D]"
          onClick={()=> oauthSignUp('github')}
          disabled={isLoadingUrl}
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
                {isLoadingUrl? 'Loading...' : 'Github'}
          </Button>
          <Button variant="outline" className="border-gray-700 bg-[#1A1A23] text-white hover:bg-[#23232D]"
          onClick={() => oauthSignUp('google')}
          disabled={isLoadingUrl}
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
            </svg>
              {isLoadingUrl ? 'Loading...' : 'Google'}
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 underline">
            Log in
          </Link>
        </div>
      </div>
          {showError && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg">
            <p className="text-red-400 text-sm">
              {errorParam === 'invalid_params'
                ? 'Invalid authentication parameters. Please try again.'
                : errorParam === 'exchange_failed'
                ? 'Failed to complete authentication. Please try again.'
                : 'Authentication was cancelled. Please try again.'}
            </p>
          </div>
        )}
        {urlError && (
          <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded">
            <p className="text-red-400 text-xs">
              Failed to load authentication. Please refresh and try again.
            </p>
          </div>
        )}

      {/* Terms */}
      <p className="text-center text-xs text-gray-500">
        By clicking "Sign Up", you agree to DevSignal's{" "}
        <a href="#" className="underline hover:text-gray-400">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline hover:text-gray-400">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  )
}
