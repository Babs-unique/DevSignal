import { Bell, Mail, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'

const notificationGroups = [
  {
    title: 'Analysis Updates',
    description: 'Know when resume scans finish, fail, or need attention.',
    icon: Bell,
    items: [
      { label: 'Analysis completed', enabled: true },
      { label: 'Weekly skill digest', enabled: true },
      { label: 'Low match score alerts', enabled: false },
    ],
  },
  {
    title: 'Career Signals',
    description: 'Receive useful nudges when your target roles shift.',
    icon: Sparkles,
    items: [
      { label: 'New matching role insights', enabled: true },
      { label: 'Missing skill reminders', enabled: true },
      { label: 'Product news and tips', enabled: false },
    ],
  },
]

const Toggle = ({ enabled }: { enabled: boolean }) => (
  <button
    type="button"
    className={`flex h-6 w-11 items-center rounded-full border px-0.5 transition ${
      enabled
        ? 'justify-end border-indigo-400/50 bg-indigo-500/40'
        : 'justify-start border-white/10 bg-white/[0.04]'
    }`}
    aria-pressed={enabled}
  >
    <span className="h-5 w-5 rounded-full bg-white shadow" />
  </button>
)

export const NotificationSettings = () => {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
        <div className="mb-6 flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
            <Bell className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold">Notification Center</h2>
            <p className="mt-2 text-sm text-gray-400">
              Choose what DevSignal sends and where those updates go.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {notificationGroups.map((group) => {
            const Icon = group.icon

            return (
              <div
                key={group.title}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="mb-5 flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-indigo-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold">{group.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-white/10">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between gap-4 py-4"
                    >
                      <p className="text-sm text-gray-300">{item.label}</p>
                      <Toggle enabled={item.enabled} />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#09090c] px-6 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold">Delivery Channels</h2>
          <p className="mt-2 text-sm text-gray-400">
            Control the channels used for important account and analysis
            messages.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ChannelCard
            icon={Mail}
            title="Email"
            description="Primary account updates"
            enabled
          />
          <ChannelCard
            icon={Bell}
            title="In-App"
            description="Dashboard notifications"
            enabled
          />
          <ChannelCard
            icon={ShieldCheck}
            title="Security"
            description="Login and password alerts"
            enabled
          />
        </div>
      </section>
    </div>
  )
}

const ChannelCard = ({
  icon: Icon,
  title,
  description,
  enabled,
}: {
  icon: LucideIcon
  title: string
  description: string
  enabled: boolean
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
    <div className="mb-5 flex items-center justify-between gap-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-indigo-300">
        <Icon className="h-5 w-5" />
      </span>
      <Toggle enabled={enabled} />
    </div>
    <h3 className="text-sm font-semibold">{title}</h3>
    <p className="mt-2 text-xs leading-5 text-gray-500">{description}</p>
  </div>
)
