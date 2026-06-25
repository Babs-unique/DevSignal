import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginForm } from '@/components/login-form';
import { useLoginMutation } from '@/feature/authSlice';
import { setCredentials } from '@/feature/apiSlice';
import type { TurnstileInstance } from '@marsidev/react-turnstile';
import { useTogglePassword } from '@/utils/togglePassword';
import { toast } from 'react-toastify';
import { useGetGithubAuthUrlQuery } from '@/feature/githubOauthSlice';
import { useGetGoogleAuthUrlQuery } from '@/feature/googleOauthSlice';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance>(null);
  const { isHidden, togglePassword } = useTogglePassword();
  const [login, { isLoading }] = useLoginMutation();
  
  const { data: githubAuthData, isLoading: isGithubLoading, error: githubError } = useGetGithubAuthUrlQuery();
  const { data: googleAuthData, isLoading: isGoogleLoading, error: googleError } = useGetGoogleAuthUrlQuery();
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userData = await login({ email, password, token }).unwrap();
      if (userData) {
        setEmail('');
        setPassword('');
        setToken('');
      }
      toast.success('Login successful');
      dispatch(setCredentials(userData));
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 2000);
    } catch (e) {
      console.error('Error logging in:', e);
      toast.error('Login failed');
    }
  };

  const [searchParams] = useSearchParams();
  const errorParam = searchParams.get('error');
  const [showError, setShowError] = useState(!!errorParam);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleOauthLogin = (provider: 'google' | 'github') => {
    const authData = provider === 'google' ? googleAuthData : githubAuthData;
    if (authData?.authUrl) {
      window.location.href = authData.authUrl;
    } else {
      toast.error(`${provider} login is not available right now.`);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-black text-white">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm 
          setEmail={setEmail} 
          setPassword={setPassword} 
          token={token} 
          setToken={setToken} 
          handleLogin={handleLogin} 
          isLoading={isLoading} 
          turnstileRef={turnstileRef} 
          togglePassword={togglePassword} 
          isHidden={isHidden}
          oauthLogin={handleOauthLogin} 
          isLoadingUrl={isGithubLoading || isGoogleLoading} 
          urlError={githubError || googleError} 
          showError={showError} 
          errorParam={errorParam} 
        />
      </div>
    </div>
  );
}
