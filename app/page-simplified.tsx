import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Compact Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-1">Khopra Ridge Trek 2025</h1>
        <CountdownTimer targetDate="2025-10-06T02:00:00" />
      </div>

      {/* Essential Stats Only - 3 cards max */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-blue-50 border-blue-200 text-center p-4">
          <div className="text-2xl font-bold text-blue-600">23 days</div>
          <div className="text-sm text-gray-600">Until departure</div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200 text-center p-4">
          <div className="text-2xl font-bold text-yellow-600">7/12</div>
          <div className="text-sm text-gray-600">Members ready</div>
        </div>
        <div className="card bg-green-50 border-green-200 text-center p-4">
          <div className="text-2xl font-bold text-green-600">85%</div>
          <div className="text-sm text-gray-600">Preparation complete</div>
        </div>
      </div>

      {/* Streamlined Quick Actions - 4 core areas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/personal" className="card hover:shadow-md transition-shadow text-center p-4">
          <div className="text-3xl mb-2">👤</div>
          <h3 className="font-semibold text-nepal-blue">My Trek</h3>
        </Link>
        <Link href="/group" className="card hover:shadow-md transition-shadow text-center p-4">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="font-semibold text-nepal-blue">Team</h3>
        </Link>
        <Link href="/interviews" className="card hover:shadow-md transition-shadow text-center p-4">
          <div className="text-3xl mb-2">🎬</div>
          <h3 className="font-semibold text-nepal-blue">Production</h3>
        </Link>
        <Link href="/emergency" className="card hover:shadow-md transition-shadow text-center p-4">
          <div className="text-3xl mb-2">🚨</div>
          <h3 className="font-semibold text-nepal-blue">Emergency</h3>
        </Link>
      </div>

      {/* Single Dynamic Alert */}
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-center space-x-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-medium">5 members need flight bookings</p>
            <p className="text-sm text-gray-600">Contact trek organizer for assistance</p>
          </div>
        </div>
      </div>
    </div>
  )
}