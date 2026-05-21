import React, {useState} from 'react'
import {
    ChartLine,
    Plus,
    History,
    Settings,
    ChevronUp,
    Code2
} from 'lucide-react'
import { useNavigate , Link , Outlet } from 'react-router-dom'
import { MobileNavbar } from './MobileNavbar'

export const DashboardLayout = () => {
    const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const openLogoutButton = () => {
        setIsLogoutOpen(
            prev => !prev
        );
    }
    const handleLogout = () => {
        navigate('/')
    }
    const menuItems = [
    { name: 'Dashboard', icon: <ChartLine />, path: '' },
    { name: 'New Analysis', icon: <Plus />, path: 'analysis' },
    { name: 'History', icon: <History />, path: 'history' }
    ]
  return (
    <div className='md:flex h-screen bg-[#000] text-white overflow-hidden'>
        <MobileNavbar openLogoutButton={openLogoutButton} handleLogout={handleLogout} isLogoutOpen={isLogoutOpen} />
        <aside className='w-64 h-screen border-r border-gray-950 md:flex md:flex-col md:justify-between text-white bg-[#0303069a]  hidden'>
            <div className='flex flex-col gap-4'>
               <div className="flex justify-left items-center align-middle border-b border-gray-900 p-4 gap-4">
                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-purple-600">
                           <Code2 className="h-5 w-5 text-white" />
                         </div>
                         <p className="text-lg font-bold text-center">DevSignal</p>
                       </div>
            <nav className='flex flex-col gap-6 p-4'>
                {
                    menuItems.map((item) => {
                        const Icons = item.icon
                        return (
                            <Link to={item.path} key={item.name} className='flex items-center gap-4 text-gray-500 hover:text-white hover:bg-gray-900 hover:border-l-2 hover:border-[#7C3AED]  hover:p-2 hover:rounded-md'>
                                {Icons}
                                {item.name}
                            </Link>
                        )
                    })
                }
                <div>
                    <p className='text-bold text-gray-500 text-sm my-5'>SYSTEM</p>
                    <Link to='settings' className='flex items-center gap-4 text-gray-500 hover:text-gray-700 mt-2 hover:text-white hover:bg-gray-900 hover:border-l-2 hover:border-[#7C3AED]  hover:p-2 hover:rounded-md'>
                        <Settings />
                        Settings
                    </Link>
                </div>
            </nav>
            </div>
            <div className='p-4 border-t border-gray-900 flex justify-between'>
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
                    <div className='flex '>
                    <button className='flex items-center gap-2 text-gray-500 hover:text-gray-700 ' onClick={openLogoutButton}>
                        <ChevronUp />
                    </button>
                    {/* Logout button, initially hidden */}
                    {isLogoutOpen && (
                        <div id="logoutButton" className='mt-2 block left-0'>
                        <button className='w-full text-left text-gray-500 hover:text-gray-700 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded'
                            onClick={handleLogout}
                        >Logout</button>
                        </div>
                    )}
                </div>
                    </div>
                </aside>
                <main className='p-4 flex-1 overflow-y-scroll h-full'>
                    <Outlet />
                </main>     
            </div>
  )
}
