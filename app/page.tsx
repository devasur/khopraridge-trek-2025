import Link from 'next/link'
import StatusCard from '@/components/StatusCard'
import CountdownTimer from '@/components/CountdownTimer'
import TrekMap from '@/components/TrekMap'

export default function Dashboard() {
  return (
    <div className="space-y-8">
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
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-medium">Missing Bookings Alert</p>
              <p className="text-sm text-gray-600">Renjith, Prakash, Soby+Rajesh need flight bookings</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded">
            <span className="text-xl">✈️</span>
            <div>
              <p className="font-medium">Weather Update</p>
              <p className="text-sm text-gray-600">Clear skies forecast for trek dates (Oct 9-16)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded">
            <span className="text-xl">📋</span>
            <div>
              <p className="font-medium">Documentation Ready</p>
              <p className="text-sm text-gray-600">Production guide and equipment list finalized</p>
            </div>
          </div>
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
          <div className="text-center p-4 bg-blue-50 rounded">
            <div className="text-2xl font-bold text-blue-600">48</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded">
            <div className="text-2xl font-bold text-yellow-600">12 kg</div>
            <div className="text-sm text-gray-600">Target Weight</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded">
            <div className="text-2xl font-bold text-green-600">32</div>
            <div className="text-sm text-gray-600">Essential Items</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded">
            <div className="text-2xl font-bold text-purple-600">0%</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
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
  )
}