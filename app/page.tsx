import Link from 'next/link'
import StatusCard from '@/components/StatusCard'
import CountdownTimer from '@/components/CountdownTimer'
import TrekMap from '@/components/TrekMap'
import MobileLayout from '@/components/MobileLayout'
import MobileCard, { MobileStatCard } from '@/components/MobileCard'

export default function Dashboard() {
  // Extended stats for mobile view
  const allStats = [
    { value: '23 days', label: 'Until departure', icon: '📅', variant: 'info' as const },
    { value: '12', label: 'Total members', icon: '👥', variant: 'success' as const },
    { value: '7/12', label: 'Complete bookings', icon: '✅', variant: 'warning' as const },
    { value: '5', label: 'Missing bookings', icon: '⚠️', variant: 'error' as const },
    { value: '48', label: 'Packing items', icon: '🎒', variant: 'default' as const },
    { value: '0%', label: 'Packing done', icon: '📦', variant: 'default' as const },
  ]

  const quickActions = [
    { href: '/personal', label: 'My Trek', icon: '👤', description: 'Personal itinerary & status' },
    { href: '/group', label: 'Team', icon: '👥', description: 'Group coordination' },
    { href: '/interviews', label: 'Production', icon: '🎬', description: 'Documentary planning' },
    { href: '/emergency', label: 'Emergency', icon: '🚨', description: 'Emergency contacts' },
    { href: '/route', label: 'Route', icon: '🗺️', description: 'Trek map & waypoints' },
    { href: '/packing', label: 'Packing', icon: '🎒', description: 'Packing checklist' },
    { href: '/documentary', label: 'Documentary', icon: '🎬', description: 'Production center' },
  ]

  const recentUpdates = [
    {
      type: 'warning',
      title: 'Missing Bookings Alert',
      message: 'Renjith, Prakash, Soby+Rajesh need flight bookings',
      icon: '⚠️'
    },
    {
      type: 'info',
      title: 'Weather Update',
      message: 'Clear skies forecast for trek dates (Oct 9-16)',
      icon: '✈️'
    },
    {
      type: 'success',
      title: 'Documentation Ready',
      message: 'Production guide and equipment list finalized',
      icon: '📋'
    }
  ]

  const packingStats = [
    { value: '48', label: 'Total Items', color: 'blue' },
    { value: '12 kg', label: 'Target Weight', color: 'yellow' },
    { value: '32', label: 'Essential Items', color: 'green' },
    { value: '0%', label: 'Completed', color: 'purple' },
  ]

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout>
          <div className="space-y-4">
            {/* Countdown Timer */}
            <MobileCard title="Trek Countdown" icon="⏰" compact>
              <div className="text-center">
                <CountdownTimer targetDate="2025-10-06T02:00:00" />
              </div>
            </MobileCard>

            {/* Essential Stats */}
            <MobileCard title="Trek Status" icon="📊" collapsible defaultExpanded>
              <div className="grid grid-cols-2 gap-3">
                {allStats.map((stat, index) => (
                  <MobileStatCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    variant={stat.variant}
                    size="sm"
                  />
                ))}
              </div>
            </MobileCard>

            {/* Recent Updates */}
            <MobileCard
              title="Latest Updates"
              icon="🔔"
              collapsible
              defaultExpanded
              actions={
                <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-2">
                  {recentUpdates.length}
                </span>
              }
            >
              <div className="space-y-3">
                {recentUpdates.map((update, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-l-4 ${
                      update.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                      update.type === 'info' ? 'bg-blue-50 border-blue-400' :
                      update.type === 'success' ? 'bg-green-50 border-green-400' :
                      'bg-gray-50 border-gray-400'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-lg flex-shrink-0">{update.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900">{update.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{update.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MobileCard>

            {/* Quick Actions */}
            <MobileCard title="Quick Actions" icon="⚡" collapsible defaultExpanded>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all active:scale-95"
                  >
                    <span className="text-2xl mb-2">{action.icon}</span>
                    <span className="font-medium text-sm text-center text-nepal-blue">{action.label}</span>
                    <span className="text-xs text-gray-500 text-center mt-1 leading-tight">{action.description}</span>
                  </Link>
                ))}
              </div>
            </MobileCard>

            {/* Packing Overview */}
            <MobileCard
              title="Packing Overview"
              icon="🎒"
              collapsible
              defaultExpanded={false}
              actions={
                <Link href="/packing" className="text-xs text-blue-600 hover:underline">
                  View →
                </Link>
              }
            >
              <div className="grid grid-cols-2 gap-3">
                {packingStats.map((stat, index) => (
                  <div key={index} className={`text-center p-3 bg-${stat.color}-50 rounded-lg`}>
                    <div className={`text-lg font-bold text-${stat.color}-600`}>{stat.value}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Use the packing list manager to track your gear and optimize weight.
              </p>
            </MobileCard>

            {/* Trek Route Overview */}
            <MobileCard
              title="Trek Route"
              icon="🗺️"
              collapsible
              defaultExpanded={false}
              actions={
                <Link href="/route" className="text-xs text-blue-600 hover:underline">
                  Full Route →
                </Link>
              }
            >
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <TrekMap height="h-48" showElevationProfile={false} />
              </div>
              <p className="text-xs text-gray-600 mt-3">
                Interactive map showing all waypoints from Ghandruk to Khayar Lake.
              </p>
            </MobileCard>
          </div>
        </MobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-nepal-blue mb-2">Khopra Ridge Trek 2025</h1>
          <p className="text-lg text-gray-600">Trek Coordination Hub</p>
          <CountdownTimer targetDate="2025-10-06T02:00:00" />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <StatusCard
            title="Trek Status"
            value="23 days"
            subtitle="Until departure"
            icon="🏔️"
            color="blue"
          />
          <StatusCard
            title="Group Size"
            value="12 members"
            subtitle="Total trekkers"
            icon="👥"
            color="green"
          />
          <StatusCard
            title="Bookings Complete"
            value="7/12"
            subtitle="Full itineraries"
            icon="✈️"
            color="yellow"
          />
          <StatusCard
            title="Missing Bookings"
            value="5 issues"
            subtitle="Need attention"
            icon="⚠️"
            color="red"
          />
          <StatusCard
            title="Packing Ready"
            value="0/48"
            subtitle="Items checked"
            icon="🎒"
            color="yellow"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link href="/personal" className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">👤</div>
              <div>
                <h3 className="text-lg font-semibold text-nepal-blue">Your Itinerary</h3>
                <p className="text-gray-600">Personal timeline and bookings</p>
              </div>
            </div>
          </Link>

          <Link href="/group" className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">👥</div>
              <div>
                <h3 className="text-lg font-semibold text-nepal-blue">Group Status</h3>
                <p className="text-gray-600">Member tracking and coordination</p>
              </div>
            </div>
          </Link>

          <Link href="/documentary" className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎬</div>
              <div>
                <h3 className="text-lg font-semibold text-nepal-blue">Documentary</h3>
                <p className="text-gray-600">Film production center</p>
              </div>
            </div>
          </Link>

          <Link href="/emergency" className="card hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🚨</div>
              <div>
                <h3 className="text-lg font-semibold text-nepal-blue">Emergency Info</h3>
                <p className="text-gray-600">Contacts and protocols</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Updates */}
        <div className="card">
          <h2 className="text-xl font-semibold text-nepal-blue mb-4">Latest Updates</h2>
          <div className="space-y-3">
            {recentUpdates.map((update, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 rounded ${
                update.type === 'warning' ? 'bg-yellow-50' :
                update.type === 'info' ? 'bg-blue-50' :
                update.type === 'success' ? 'bg-green-50' : 'bg-gray-50'
              }`}>
                <span className="text-xl">{update.icon}</span>
                <div>
                  <p className="font-medium">{update.title}</p>
                  <p className="text-sm text-gray-600">{update.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Packing Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-nepal-blue">🎒 Packing Overview</h2>
            <Link
              href="/packing"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Full Packing List →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {packingStats.map((stat, index) => (
              <div key={index} className={`text-center p-4 bg-${stat.color}-50 rounded`}>
                <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Use the packing list manager to track your gear and optimize weight for the trek.
          </div>
        </div>

        {/* Trek Route Overview */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-nepal-blue">🗺️ Trek Route Overview</h2>
            <Link
              href="/route"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Full Route →
            </Link>
          </div>
          <TrekMap height="h-64" showElevationProfile={false} />
          <div className="mt-3 text-sm text-gray-600">
            Interactive map showing all waypoints from Ghandruk to Khayar Lake. Click markers for details.
          </div>
        </div>
      </div>
    </>
  )
}