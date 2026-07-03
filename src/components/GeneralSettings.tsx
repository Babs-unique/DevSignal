import {
  AlertTriangle,
  Check,
  Download,
  Globe,
  Mail,
  Trash2,
} from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { useTheme } from '@/hooks/useTheme'
import type { Theme } from '@/contexts/ThemeContext'
import type { UserProfile } from '@/feature/settingsSlice'

type ThemeColorOption = {
  name: string
  value: Theme
  color: string
}

type GeneralSettingsProps = {
  user?: UserProfile | null
  isLoading?: boolean
  onDelete?: () => void
  isDeleting?: boolean
}

export const GeneralSettings = ({ user, isLoading, onDelete, isDeleting }: GeneralSettingsProps) => {
  const { theme, changeTheme } = useTheme()
  const themesColors: ThemeColorOption[] = [
    {
      name: 'Blue',
      value: 'blue',
      color: 'bg-blue-500',
    },
    {
      name: 'Indigo',
      value: 'indigo',
      color: 'bg-indigo-500',
    },
    {
      name: 'Purple',
      value: 'purple',
      color: 'bg-purple-500',
    },
  ]

  const [firstName = 'User', lastName = ''] = (user?.name ?? 'User').split(' ')

  return (
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
            <div className="theme-soft-bg theme-border flex h-20 w-20 items-center justify-center rounded-full border text-2xl font-bold">
              {isLoading ? '...' : (firstName[0] ?? 'U').toUpperCase()}
            </div>
            <button type="button" className="theme-text text-xs font-medium">
              Change Avatar
            </button>
          </div>

          <div className="grid flex-1 gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-300">First Name</span>
              <input
                type="text"
                defaultValue={firstName}
                className="theme-focus mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-300">Last Name</span>
              <input
                type="text"
                defaultValue={lastName}
                className="theme-focus mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-gray-300">Email Address</span>
              <div className="mt-2 flex h-11 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm">
                <Mail className="h-4 w-4 text-gray-500" />
                {user?.email ?? 'Loading...'}
              </div>
              <p className="mt-2 font-mono text-xs text-gray-600">
                Contact support to change your primary email.
              </p>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-gray-300">Current Role</span>
              <input
                type="text"
                defaultValue="Senior Frontend Engineer"
                className="theme-focus mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition"
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
              {themesColors.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  aria-label={`Use ${item.name} accent color`}
                  onClick={() => changeTheme(item.value)}
                  className={`h-10 w-10 rounded-full border-2 transition ${item.color} ${theme === item.value ? 'border-white' : 'border-transparent'}`}
                >
                  {theme === item.value && <Check className="m-auto h-6 w-6 text-white" />}
                </button>
              ))}
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
                  {user?.githubId ? `Connected as @${user.githubId}` : 'Not connected'}
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
                  {user?.googleId ? `Connected as ${user.googleId}` : 'Not connected'}
                </p>
              </div>
            </div>

            <button className="theme-soft-bg theme-border theme-text rounded-lg border px-4 py-2 text-xs font-semibold transition hover:brightness-125">
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
            <span className="text-sm font-medium text-gray-300">Current Password</span>
            <input
              type="password"
              defaultValue="password"
              className="theme-focus mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-300">New Password</span>
            <input
              type="password"
              defaultValue="password"
              className="theme-focus mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-4 text-sm outline-none transition"
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
          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="flex w-fit items-center gap-2 rounded-lg border border-red-500/40 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      </section>
    </div>
  )
}
