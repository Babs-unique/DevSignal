import { useState, useRef } from 'react'
import { SignupForm } from "@/components/signup-form"
import { useRegisterMutation } from "@/feature/authSlice"
import type { TurnstileInstance } from "@marsidev/react-turnstile"
import { useTogglePassword } from "@/utils/togglePassword"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
export const SignupPage = () => {
  const [email , setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [ confirmPassword , setConfirmPassword ] = useState<string>("")
  const [token , setToken ] = useState<string>("")

  const turnstileRef = useRef<TurnstileInstance>(null);
  const { isHidden, togglePassword } = useTogglePassword();
  const [ register , {isLoading}]= useRegisterMutation()
  const navigate = useNavigate();
  const handleRegister = async () => {
     /*  e.preventDefault() */
      try{
          const userData = await register({email, password, confirmPassword, token}).unwrap()
          if(userData){
            setEmail('')
            setPassword('');
            setConfirmPassword('')
            setToken('')
          }
          toast.success('Register successful')
          setTimeout(() => {
              navigate("/login", { replace: true });
          }, 2000);
      }catch(e){
          console.error('Error creating account:', e);
          toast.error('Error creating account')
      }
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-black text-white">
      <div className="flex w-full max-w-sm flex-col gap-6">
        < SignupForm
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          setToken={setToken}
          handleRegister={handleRegister}
          isLoading={isLoading}
          isHidden={isHidden}
          togglePassword={togglePassword}
          turnstileRef={turnstileRef}
          token={token}
        />
      </div>
    </div>
  )
}
