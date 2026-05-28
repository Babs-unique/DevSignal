import { useState } from 'react'
import { BillingSettings } from '../components/BillingSettings'
import { NotificationSettings } from '../components/NotificationSettings'
import { GeneralSettings } from '../components/GeneralSettings'
import { Check } from 'lucide-react'

const settingsNavigation = ['General', 'Billing', 'Notifications'] as const

type SettingsTab = (typeof settingsNavigation)[number]

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('General')

  return (
    <div className="min-h-screen bg-[#030306] text-white">
      <header className="flex flex-col gap-4 border-b border-white/10 px-4 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div>
          <h1 className="text-xl font-bold">Account Settings</h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your profile, preferences, and security
          </p>
        </div>

        <button
          type="button"
          className="flex w-fit items-center gap-2 rounded-md bg-linear-to-br from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.35)] transition-colors duration-300 hover:from-indigo-400 hover:to-purple-500"
        >
          <Check className="h-4 w-4" />
          Save Changes
        </button>
      </header>

      <main className="mx-auto max-w-[980px] space-y-8 px-4 py-8 md:px-8">
        <nav className="flex gap-6 border-b border-white/10">
          {settingsNavigation.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 pb-4 text-sm font-medium transition ${
                activeTab === tab
                  ? 'border-indigo-400 text-indigo-300'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === 'General' && <GeneralSettings />}
        {activeTab === 'Billing' && <BillingSettings />}
        {activeTab === 'Notifications' && <NotificationSettings />}
      </main>
    </div>
  )
}
