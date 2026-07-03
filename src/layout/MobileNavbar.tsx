import { useState } from "react";
import { Menu,
            X , 
        Code2,
        ChartLine,
        Plus,
        History,
        Settings,
        ChevronUp
    } from "lucide-react";
import {Link } from 'react-router-dom'

interface ButtonProps {
    openLogoutButton: () => void;
    handleLogout: () => void;
    isLogoutOpen: boolean;
    userName?: string;
    avatarUrl?: string | null;
} 

export const MobileNavbar = ({ openLogoutButton, handleLogout, isLogoutOpen, userName = 'User', avatarUrl }: ButtonProps ) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = [
      { name: 'Dashboard', icon: <ChartLine />, path: '' },
      { name: 'New Analysis', icon: <Plus />, path: 'analysis' },
      { name: 'History', icon: <History />, path: 'history' }
  ]

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-black text-white md:hidden">
        {/* Logo */}
         <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-purple-500 to-purple-600">
              <Code2 className="h-5 w-5 text-white" />
            </div>
          </div>
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden"
        >
          <Menu size={30} />
        </button>
      </nav>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[260px] bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        
        {/* Top Section */}
        <div className="flex items-center justify-between p-5 border-b bg-black text-white border-gray-900">
          <h2 className="text-lg font-bold">
            DevSignal
          </h2>

          <button onClick={() => setIsOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col p-5 gap-6 text-lg font-medium bg-black text-white h-full ">
         {
                    menuItems.map((item) => {
                        const Icons = item.icon
                        return (
                            <Link to={item.path} key={item.name} className='flex items-center gap-4 text-gray-500 hover:text-white hover:bg-gray-900 hover:border-l-2 hover:border-[#7C3AED] hover:p-2 hover:rounded-md'
                                  onClick={() => setIsOpen(false)}>
                                {Icons}
                                {item.name}
                            </Link>
                        )
                    })
                }
                <div>
                    <p className='text-bold text-gray-500 text-sm my-5'>SYSTEM</p>
                    <Link to='settings' className='flex items-center gap-4 text-gray-500 hover:text-gray-700 mt-2 hover:text-white hover:bg-gray-900 hover:border-l-2 hover:border-[#7C3AED] hover:p-2 hover:rounded-md'
                          onClick={() => setIsOpen(false)}>
                        <Settings />
                        Settings
                    </Link>
                </div>
               <div className='p-4 border-t border-gray-900 mt-auto'>
                    <div className='flex items-center justify-between gap-4'>
                        <div className='flex items-center gap-2'>
                            <img src={avatarUrl || 'https://avatars.githubusercontent.com/u/12345678?v=4'} alt='User Avatar' className='w-8 h-8 rounded-full' />
                            <div className='flex flex-col'>
                                <span className='text-sm text-gray-200'>{userName}</span>
                                <span className='text-xs text-gray-500'>Pro plan</span>
                            </div>
                        </div>
                        <button className='flex items-center gap-2 text-gray-400 hover:text-white transition' onClick={openLogoutButton}>
                            <ChevronUp className={`${isLogoutOpen ? 'rotate-180' : ''} transition-transform`} />
                        </button>
                    </div>
                    {isLogoutOpen && (
                        <button className='mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-left text-white hover:bg-red-700 transition' onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                </div>
        </div>
      </div>
    </>
  );
}