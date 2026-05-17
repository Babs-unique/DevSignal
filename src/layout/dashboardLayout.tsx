import React, {useState} from 'react'
import {
    ChartLine,
    Plus,
    History,
    Settings,
    ChevronUp
} from 'lucide-react'
import { useNavigate , Link , Outlet } from 'react-router-dom'

export const dashboardLayout = () => {
    const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const openLogoutButton = () => {
        setIsLogoutOpen(
            prev => !prev
        );
    }
    const handleLogout = () => {
        navigate('/');
        
    }
    const menuItems = [
    { name: 'Dashboard', icon: <ChartLine /> },
    { name: 'New Analysis', icon: <Plus /> },
    { name: 'History', icon: <History /> },
    { name: 'Settings', icon: <Settings /> },
    ]
  return (
    <div>
        <aside>
            <nav className='flex flex-col gap-4 p-4'>
                <a href="#" className='flex items-center gap-2 text-gray-500 hover:text-gray-700'>
                    <ChartLine />
                    Dashboard
                </a>
                <a href="#" className='flex items-center gap-2 text-gray-500 hover:text-gray-700'>
                    <Plus />
                    New Analysis
                </a>
                <a href="#" className='flex items-center gap-2 text-gray-500 hover:text-gray-700'>
                    <History />
                    History
                </a>
                <p className='mt-6 text-gray-500'>SYSTEM</p>
                <a href="#" className='flex items-center gap-2 text-gray-500 hover:text-gray-700'>
                    <Settings />
                    Settings
                </a>
            </nav>
            <div className='p-4 border-t border-gray-200'>
                {/*User profile and logout*/}
                <div>
                    <div className='flex items-center gap-2'>
                        <img src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="User Avatar" className='w-8 h-8 rounded-full' />
                        <div className='flex flex-col'>
                            <span className='text-sm text-gray-700'>John Doe</span>
                            <span>Pro plan</span>
                        </div>
                    </div>
                </div>
                    <div className='mt-4'>
                    <button className='flex items-center gap-2 text-gray-500 hover:text-gray-700 ' onClick={openLogoutButton}>
                        <ChevronUp />
                    </button>
                    {/* Logout button, initially hidden */}
                    {isLogoutOpen && (
                        <div id="logoutButton" className='hidden mt-2'>
                           `` <button className='w-full text-left text-gray-500 hover:text-gray-700'
                            onClick={handleLogout}
                           >Logout</button>
                        </div>
                    )}
                </div>
                    </div>
                </aside>
                <main>
                    <Outlet />
                </main>     
            </div>
  )
}
