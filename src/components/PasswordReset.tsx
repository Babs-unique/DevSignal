import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, Lock } from 'lucide-react'
import { toast } from 'react-toastify'
import { useResetPasswordMutation } from '@/feature/authSlice'

export const PasswordReset = () => {
const [searchParams] = useSearchParams()
const token = searchParams.get('token') ?? ''
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [resetPassword, { isLoading }] = useResetPasswordMutation()
const navigate = useNavigate()

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault()

if (!token) {
    toast.error('Reset token is missing. Open the reset link from your email.')
    return
}

if (!newPassword || !confirmPassword) {
    toast.error('Please enter both password fields.')
    return
}

if (newPassword !== confirmPassword) {
    toast.error('Passwords do not match.')
    return
}

try {
    await resetPassword({ token, newPassword, confirmPassword }).unwrap()
    toast.success('Password reset successful. Please login with your new password.')
    navigate('/login')
} catch (error) {
    console.error('Reset password error', error)
    toast.error('Failed to reset password. Please try again.')
}
}

return (
<div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-black p-6 md:p-10 text-white'>
    <div className='w-full max-w-md rounded-3xl border border-white/10 bg-[#0F0F14] p-8 shadow-xl'>
    <div className='flex flex-col gap-5 text-center'>
        <div className='flex justify-center'>
        <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-purple-500 to-purple-600'>
            <Lock className='h-6 w-6 text-white' />
        </div>
        </div>
        <div>
        <h1 className='text-3xl font-bold'>Reset Password</h1>
        <p className='mt-2 text-sm text-gray-400'>Set a new password for your account.</p>
        </div>
    </div>

    <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
        <label htmlFor='newPassword' className='text-sm text-gray-300'>New Password</label>
        <Input
            id='newPassword'
            type='password'
            placeholder='Enter new password'
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className='border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500'
        />
        </div>

        <div className='flex flex-col gap-2'>
        <label htmlFor='confirmPassword' className='text-sm text-gray-300'>Confirm Password</label>
        <Input
            id='confirmPassword'
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className='border-gray-700 bg-[#1A1A23] text-white placeholder:text-gray-500'
        />
        </div>

        <Button
        type='submit'
        className='mt-4 w-full bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600'
        disabled={isLoading}
        >
        Reset password
        </Button>
    </form>

    <div className='mt-6 text-center text-sm text-gray-400'>
        <p>Remembered your password?</p>
        <Link to='/login' className='text-purple-400 hover:text-purple-300'>
        <span className='inline-flex items-center gap-1'>
            <ChevronLeft size={16} /> Back to login
        </span>
        </Link>
    </div>
    </div>
</div>
)
}
