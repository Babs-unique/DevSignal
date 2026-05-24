import { useState } from 'react'
import {
  AlertTriangle,
  Check,
  Download,
  Globe,
  Mail,
  Trash2,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { BillingSettings } from '../components/BillingSettings'
import { NotificationSettings } from '../components/NotificationSettings'

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

const GeneralSettings = () => (
  <div className="space-y-8">
    <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
      <div className="mb-7">
        <h2 className="text-lg font-bold">Profile Information</h2>
        <p className="mt-2 text-sm text-gray-400">
          Update your personal details and public profile.
        </p>
      </div>

      <div className="flex flex-col gap-7 md:flex-row md:items-start">
        <div className="flex w-28 shrink-0 flex-col items-center gap-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-indigo-500/30 to-purple-500/20 text-2xl font-bold">
            AD
          </div>
          <button type="button" className="text-xs font-medium text-indigo-400">
            Change Avatar
          </button>
        </div>

        <div className="grid flex-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-gray-300">First Name</span>
            <input
              type="text"
              defaultValue="Alex"
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition focus:border-indigo-500/60"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-300">Last Name</span>
            <input
              type="text"
              defaultValue="Developer"
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition focus:border-indigo-500/60"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-300">
              Email Address
            </span>
            <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm">
              <Mail className="h-4 w-4 text-gray-500" />
              alex@devsignal.io
            </div>
            <p className="mt-2 font-mono text-xs text-gray-600">
              Contact support to change your primary email.
            </p>
          </label>
          <label className="block sm:col-span-2">
            <span className="text-sm font-medium text-gray-300">
              Current Role
            </span>
            <input
              type="text"
              defaultValue="Senior Frontend Engineer"
              className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition focus:border-indigo-500/60"
            />
          </label>
        </div>
      </div>
    </section>

    <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Appearance & Preferences</h2>
        <p className="mt-2 text-sm text-gray-400">
          Customize how DevSignal looks and behaves.
        </p>
      </div>

      <div className="divide-y divide-white/10">
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold">Accent Color</h3>
            <p className="mt-1 text-sm text-gray-500">
              Choose your primary brand color across the app.
            </p>
          </div>
          <div className="flex gap-3">
            <span className="h-8 w-8 rounded-full bg-blue-500" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 ring-2 ring-white">
              <Check className="h-4 w-4" />
            </span>
            <span className="h-8 w-8 rounded-full bg-purple-500" />
          </div>
        </div>

        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold">Data Retention</h3>
            <p className="mt-1 text-sm text-gray-500">
              How long we store your parsed resume data.
            </p>
          </div>
          <select className="h-10 rounded-lg border border-white/10 bg-[#0f0f14] px-4 text-sm outline-none">
            <option>90 Days</option>
            <option>60 Days</option>
            <option>30 Days</option>
          </select>
        </div>

        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold">Export Account Data</h3>
            <p className="mt-1 text-sm text-gray-500">
              Download a JSON copy of your analysis history.
            </p>
          </div>
          <button className="flex w-fit items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/[0.04]">
            <Download className="h-4 w-4" />
            Export JSON
          </button>
        </div>
      </div>
    </section>

    <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold">Connected Accounts</h2>
        <p className="mt-2 text-sm text-gray-400">
          Manage external integrations for easier login and data syncing.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
              <SiGithub className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">GitHub</p>
              <p className="mt-1 font-mono text-xs text-gray-500">
                Connected as @alexdev
              </p>
            </div>
          </div>

          <button className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/[0.04]">
            Disconnect
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold">Google</p>
              <p className="mt-1 font-mono text-xs text-gray-500">
                Not connected
              </p>
            </div>
          </div>

          <button className="rounded-lg border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500/20">
            Connect
          </button>
        </div>
      </div>
    </section>

    <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
      <div className="mb-7">
        <h2 className="text-lg font-bold">Security</h2>
        <p className="mt-2 text-sm text-gray-400">
          Update your password and secure your account.
        </p>
      </div>

      <div className="max-w-[460px] space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-gray-300">
            Current Password
          </span>
          <input
            type="password"
            defaultValue="password"
            className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition focus:border-indigo-500/60"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-300">New Password</span>
          <input
            type="password"
            defaultValue="password"
            className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition focus:border-indigo-500/60"
          />
          <p className="mt-2 text-xs text-gray-500">
            Must be at least 8 characters long.
          </p>
        </label>
        <button className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/[0.04]">
          Update Password
        </button>
      </div>
    </section>

    <section className="rounded-2xl border border-red-500/30 bg-red-500/10 px-6 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10">
          <Trash2 className="h-4 w-4" />
          Delete Account
        </button>
      </div>
    </section>
  </div>
)
