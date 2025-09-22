'use client'

import { db, queries } from '@/lib/instant'
import MobileLayout from '@/components/MobileLayout'
import MobileCard, { MobileStatCard } from '@/components/MobileCard'

export default function PersonalPage() {
  const { user, isLoading: authLoading } = db.useAuth()
  const { data: currentTrekkerData, isLoading: trekkerLoading } = db.useQuery(
    user?.email ? queries.currentTrekker(user.email) : null
  )

  const isLoading = authLoading || trekkerLoading
  const currentTrekker = currentTrekkerData?.trekMembers?.[0]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">Your Personal Itinerary</h1>
          <p className="text-gray-600">Loading your trek information...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">Your Personal Itinerary</h1>
          <p className="text-red-600">Please log in to view your personal information.</p>
        </div>
      </div>
    )
  }

  if (!currentTrekker) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">Your Personal Itinerary</h1>
          <p className="text-yellow-600">No trek information found for your email address.</p>
          <p className="text-sm text-gray-600 mt-2">Contact the trek organizer to add your details.</p>
        </div>
      </div>
    )
  }

  if (!currentTrekker.hasAccess) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">Access Restricted</h1>
          <p className="text-red-600">You don't have access to view personal trek information yet.</p>
          <p className="text-sm text-gray-600 mt-2">Contact the trek organizer to grant you access.</p>
        </div>
      </div>
    )
  }
  const preparationItems = [
    {
      key: 'medicalCertificate',
      label: 'Medical',
      icon: '🏥',
      completed: currentTrekker.medicalCertificate
    },
    {
      key: 'travelInsurance',
      label: 'Insurance',
      icon: '🛡️',
      completed: currentTrekker.travelInsurance
    },
    {
      key: 'trekingGear',
      label: 'Gear',
      icon: '🎒',
      completed: currentTrekker.trekingGear
    },
    {
      key: 'emergencyContactsShared',
      label: 'Emergency',
      icon: '📞',
      completed: currentTrekker.emergencyContactsShared
    }
  ]

  const trekDetails = [
    { label: 'Trek Dates', value: 'Oct 9-16', icon: '📅' },
    { label: 'Duration', value: '8 Days', icon: '⏱️' },
    { label: 'Max Altitude', value: '15,300 ft', icon: '🏔️' }
  ]

  const contactDetails = [
    { label: 'Phone', value: currentTrekker.phone || 'Not provided' },
    { label: 'Blood Group', value: currentTrekker.bloodGroup || 'Not provided' },
    { label: 'Emergency Contact', value: currentTrekker.emergencyContact || 'Not provided' }
  ]

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout
          title={currentTrekker.name}
          subtitle={`Status: ${currentTrekker.bookingStatus.toUpperCase()}`}
          actions={
            <span className={`px-2 py-1 rounded-full text-xs ${
              currentTrekker.bookingStatus === 'complete'
                ? 'bg-green-100 text-green-800'
                : currentTrekker.bookingStatus === 'partial'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {currentTrekker.bookingStatus}
            </span>
          }
        >
          <div className="space-y-4">
            {/* Preparation Status */}
            <MobileCard title="Preparation Status" icon="📋" compact>
              <div className="grid grid-cols-2 gap-3">
                {preparationItems.map((item) => (
                  <MobileStatCard
                    key={item.key}
                    value={item.completed ? '✅' : '❌'}
                    label={item.label}
                    icon={item.icon}
                    variant={item.completed ? 'success' : 'error'}
                    size="sm"
                  />
                ))}
              </div>
            </MobileCard>

            {/* Trek Overview */}
            <MobileCard
              title="Khopra Ridge Trek"
              icon="🏔️"
              variant="info"
              compact
            >
              <div className="grid grid-cols-3 gap-3">
                {trekDetails.map((detail, index) => (
                  <div key={index} className="text-center">
                    <div className="text-lg font-bold text-blue-800">{detail.value}</div>
                    <div className="text-xs text-blue-600">{detail.label}</div>
                  </div>
                ))}
              </div>
            </MobileCard>

            {/* Flight Information */}
            {currentTrekker.flights && currentTrekker.flights.length > 0 && (
              <MobileCard
                title="Your Flights"
                icon="✈️"
                collapsible
                defaultExpanded
              >
                <div className="space-y-3">
                  {currentTrekker.flights.map((flight: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold text-sm">{flight.flightNumber}</div>
                        <div className="text-xs text-gray-600">
                          {flight.date ? new Date(flight.date).toLocaleDateString() : 'TBD'}
                        </div>
                      </div>
                      <div className="text-xs text-gray-700 mb-1">{flight.route}</div>
                      {flight.departureTime && (
                        <div className="text-xs text-gray-600">Departure: {flight.departureTime}</div>
                      )}
                    </div>
                  ))}
                </div>
              </MobileCard>
            )}

            {/* Personal Details */}
            <MobileCard
              title="Your Details"
              icon="📋"
              collapsible
              defaultExpanded={false}
            >
              <div className="space-y-3">
                {contactDetails.map((detail, index) => (
                  <div
                    key={index}
                    className={`flex justify-between py-2 ${
                      index < contactDetails.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-700">{detail.label}</span>
                    <span className="text-sm text-gray-600 text-right">{detail.value}</span>
                  </div>
                ))}
              </div>
            </MobileCard>
          </div>
        </MobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-1">{currentTrekker.name}</h1>
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            currentTrekker.bookingStatus === 'complete'
              ? 'bg-green-100 text-green-800'
              : currentTrekker.bookingStatus === 'partial'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {currentTrekker.bookingStatus.toUpperCase()}
          </span>
        </div>

        {/* Compact Preparation Status */}
        <div className="card">
          <h2 className="text-lg font-semibold text-nepal-blue mb-3">Preparation Status</h2>
          <div className="grid grid-cols-2 gap-3">
            {preparationItems.map((item) => (
              <div
                key={item.key}
                className={`text-center p-3 rounded-lg ${item.completed ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <div className="text-xl mb-1">{item.completed ? '✅' : '❌'}</div>
                <div className="text-xs font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trek Overview */}
        <div className="card bg-trek-green text-white">
          <h2 className="text-lg font-semibold mb-3">🏔️ Khopra Ridge Trek</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {trekDetails.map((detail, index) => (
              <div key={index}>
                <div className="text-xl font-bold">{detail.value}</div>
                <div className="text-xs opacity-90">{detail.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Flight Information - Simplified */}
        {currentTrekker.flights && currentTrekker.flights.length > 0 && (
          <div className="card">
            <h2 className="text-lg font-semibold text-nepal-blue mb-3">✈️ Your Flights</h2>
            <div className="space-y-3">
              {currentTrekker.flights.map((flight: any, index: number) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{flight.flightNumber}</div>
                    <div className="text-sm text-gray-600">
                      {flight.date ? new Date(flight.date).toLocaleDateString() : 'TBD'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-700">{flight.route}</div>
                  {flight.departureTime && (
                    <div className="text-xs text-gray-600">Departure: {flight.departureTime}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Essential Contacts */}
        <div className="card">
          <h2 className="text-lg font-semibold text-nepal-blue mb-3">📞 Your Details</h2>
          <div className="grid grid-cols-1 gap-3">
            {contactDetails.map((detail, index) => (
              <div
                key={index}
                className={`flex justify-between py-2 ${
                  index < contactDetails.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <span className="text-sm font-medium text-gray-700">{detail.label}</span>
                <span className="text-sm text-gray-600">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}