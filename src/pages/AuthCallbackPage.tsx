import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/feature/apiSlice';
import { useMeQuery } from '@/feature/authSlice';

export function AuthCallbackPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const oauthError = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');

    // Fetch user profile immediately on landing
    const { 
        data: user, 
        isLoading, 
        isSuccess, 
        isError, 
        error: fetchError 
    } = useMeQuery(undefined, {
        skip: !!oauthError,
    });

    useEffect(() => {
        if (oauthError) {
            console.error('OAuth Error:', oauthError, errorDescription);
            navigate(`/login?error=${oauthError}`);
        }
    }, [oauthError, errorDescription, navigate]);

    useEffect(() => {
        if (isSuccess && user) {
            dispatch(setCredentials(user));
            navigate('/dashboard', { replace: true });
        }else if (isError) {
            navigate('/login');
        }
    }, [isSuccess, user, dispatch, navigate, isError]);
    useEffect(() => {
        if (isError) {
            console.error('Authentication backend check failed:', fetchError);
            navigate('/login?error=auth_failed');
        }
    }, [isError, fetchError, navigate]);

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 selection:bg-purple-500/30 selection:text-purple-200">
            <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
                <div className="relative flex items-center justify-center w-16 h-16">
                    <div className="absolute inset-0 bg-purple-500/10 rounded-full animate-ping opacity-75" />
                    {/* Main Loader Core */}
                    <div className="w-12 h-12 border-4 border-zinc-800 border-t-purple-500 rounded-full animate-spin" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-medium tracking-tight text-zinc-100">
                        Setting up your account
                    </h2>
                    <p className="text-sm text-zinc-400 max-w-[280px] mx-auto">
                        Please wait while we securely complete your identity verification.
                    </p>
                </div>

                {/* Error Banner Backup */}
                {isError && (
                    <div className="w-full p-3.5 bg-red-950/20 border border-red-900/40 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <p className="text-xs font-medium text-red-400">
                            Secure validation failed. Redirecting to login...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
