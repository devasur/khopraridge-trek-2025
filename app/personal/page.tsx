'use client'

import { db, queries } from '@/lib/instant'

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
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-2">Welcome, {currentTrekker.name}!</h1>
        <p className="text-gray-600">Your personal trek coordination information</p>
        <div className="mt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            currentTrekker.bookingStatus === 'complete'
              ? 'bg-green-100 text-green-800'
              : currentTrekker.bookingStatus === 'partial'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            Booking Status: {currentTrekker.bookingStatus.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Booking Status Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">📋 Your Trek Preparation Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`text-center p-4 rounded-lg ${currentTrekker.medicalCertificate ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-2xl mb-2">{currentTrekker.medicalCertificate ? '✅' : '❌'}</div>
            <div className="text-sm font-medium">Medical Certificate</div>
          </div>
          <div className={`text-center p-4 rounded-lg ${currentTrekker.travelInsurance ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-2xl mb-2">{currentTrekker.travelInsurance ? '✅' : '❌'}</div>
            <div className="text-sm font-medium">Travel Insurance</div>
          </div>
          <div className={`text-center p-4 rounded-lg ${currentTrekker.trekingGear ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-2xl mb-2">{currentTrekker.trekingGear ? '✅' : '❌'}</div>
            <div className="text-sm font-medium">Trekking Gear</div>
          </div>
          <div className={`text-center p-4 rounded-lg ${currentTrekker.emergencyContactsShared ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-2xl mb-2">{currentTrekker.emergencyContactsShared ? '✅' : '❌'}</div>
            <div className="text-sm font-medium">Emergency Contacts</div>
          </div>
        </div>
      </div>

      {/* Flight Information */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4 flex items-center">
          <span className="mr-2">✈️</span>
          Your Flight Information
        </h2>
        {currentTrekker.flights && currentTrekker.flights.length > 0 ? (
          <div className="space-y-4">
            {currentTrekker.flights.map((flight: any, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-lg">{flight.flightNumber}</div>
                  <div className="text-sm text-gray-600">
                    {flight.date ? new Date(flight.date).toLocaleDateString() : 'Date TBD'}
                  </div>
                </div>
                <div className="text-gray-700 mb-1">{flight.route}</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {flight.departureTime && (
                    <div>
                      <span className="font-medium">Departure:</span> {flight.departureTime}
                    </div>
                  )}
                  {flight.arrivalTime && (
                    <div>
                      <span className="font-medium">Arrival:</span> {flight.arrivalTime}
                    </div>
                  )}
                </div>
                {flight.ticketNumber && (
                  <div className="text-xs text-gray-500 mt-2">
                    Ticket: {flight.ticketNumber}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">🛫</div>
            <p>No flight information available yet.</p>
            <p className="text-sm mt-2">Contact the organizer if you need your flight information.</p>
          </div>
        )}
      </div>

      {/* Trek Period */}
      <div className="card bg-trek-green text-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <span className="mr-2">🏔️</span>
          Trek Period
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">Oct 9-16</div>
            <div className="text-sm opacity-90">Trek Dates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8 Days</div>
            <div className="text-sm opacity-90">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">15,300 ft</div>
            <div className="text-sm opacity-90">Max Altitude</div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4 flex items-center">
          <span className="mr-2">📞</span>
          Your Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Email</div>
            <div className="text-gray-600">{currentTrekker.email || 'Not provided'}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Phone</div>
            <div className="text-gray-600">{currentTrekker.phone || 'Not provided'}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Blood Group</div>
            <div className="text-gray-600">{currentTrekker.bloodGroup || 'Not provided'}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Emergency Contact</div>
            <div className="text-gray-600">{currentTrekker.emergencyContact || 'Not provided'}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="font-medium text-gray-700">Emergency Phone</div>
            <div className="text-gray-600">{currentTrekker.emergencyPhone || 'Not provided'}</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-yellow-50 border-yellow-200">
          <h3 className="font-semibold text-yellow-800 mb-2">Pre-Trek Checklist</h3>
          <div className="space-y-2 text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={currentTrekker.medicalCertificate}
                readOnly
              />
              <span>Medical certificate obtained</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={currentTrekker.travelInsurance}
                readOnly
              />
              <span>Travel insurance confirmed</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={currentTrekker.trekingGear}
                readOnly
              />
              <span>Trekking gear purchased</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={currentTrekker.emergencyContactsShared}
                readOnly
              />
              <span>Emergency contacts shared</span>
            </label>
          </div>
          <div className="mt-3 text-xs text-yellow-700">
            Contact the trek organizer to update your checklist status.
          </div>
        </div>

        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">Important Reminders</h3>
          <div className="space-y-2 text-sm text-blue-700">
            <div>• Keep documents in waterproof cover</div>
            <div>• Download offline maps before trek</div>
            <div>• Inform family of final itinerary</div>
            <div>• Charge all devices before departure</div>
          </div>
        </div>
      </div>
    </div>
  )
}