import { useState,useRef } from "react"
import { LoginForm } from "@/components/login-form"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useLoginMutation } from "@/feature/authSlice"
import { setCredentials } from "@/feature/apiSlice"
import type { TurnstileInstance } from "@marsidev/react-turnstile"


export default function LoginPage() {
  const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [token , setToken ] = useState<string>("")

    const turnstileRef = useRef<TurnstileInstance>(null);
  
    const [ login , {isLoading}]= useLoginMutation()
  
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try{
          const userData = await login({email, password, token}).unwrap()
          if(userData){
            setEmail('')
            setPassword('');
            setToken('')
          }
  
          dispatch(setCredentials(userData))
          setTimeout(() => {
              navigate("/Dashboard", { replace: true });
          }, 2000);
      }catch(e){
          console.error('Error logging in:', e);
      }
    }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-black text-white">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm 
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          token={token}
          setToken={setToken}
          handleLogin={handleLogin}
          isLoading={isLoading}
          turnstileRef={turnstileRef}
        />
      </div>
    </div>
  )
}
