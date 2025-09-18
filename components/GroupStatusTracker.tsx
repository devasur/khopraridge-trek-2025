'use client'

import { db, queries } from '@/lib/instant'

const statusColors = {
  complete: 'bg-green-100 text-green-800',
  partial: 'bg-yellow-100 text-yellow-800',
  missing: 'bg-red-100 text-red-800'
}

const statusIcons = {
  complete: '✅',
  partial: '⚠️',
  missing: '❌'
}

export default function GroupStatusTracker() {
  const { data: trekMembersData, isLoading: membersLoading, error: membersError } = db.useQuery({
    trekMembers: {
      flights: {}
    }
  })
  const { data: flightBookingsData, isLoading: flightsLoading, error: flightsError } = db.useQuery(queries.flightBookings)

  const isLoading = membersLoading || flightsLoading
  const error = membersError || flightsError

  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-6">Member Status Tracker</h2>
        <div className="text-center py-8">
          <div className="text-gray-500">Loading trek members...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-6">Member Status Tracker</h2>
        <div className="text-center py-8">
          <div className="text-red-500">Error loading data: {error.message}</div>
        </div>
      </div>
    )
  }

  const trekMembers = trekMembersData?.trekMembers || []
  const flightBookings = flightBookingsData?.flightBookings || []

  // Data successfully migrated!

  // Helper function to get flights for a specific member
  const getMemberFlights = (member: any) => {
    // Return linked flights from the trek member data
    return member.flights || []
  }

  // Count members by status
  const statusCounts = trekMembers.reduce((acc, member) => {
    acc[member.bookingStatus] = (acc[member.bookingStatus] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-nepal-blue mb-6">Member Status Tracker</h2>

      {/* Status Summary */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-700 mb-2">Status Summary</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>Total Members: <span className="font-semibold">{trekMembers.length}</span></div>
          <div>Complete: <span className="font-semibold text-green-600">{statusCounts.complete || 0}</span></div>
          <div>Partial: <span className="font-semibold text-yellow-600">{statusCounts.partial || 0}</span></div>
          <div>Missing: <span className="font-semibold text-red-600">{statusCounts.missing || 0}</span></div>
        </div>
      </div>

      <div className="space-y-4">
        {trekMembers.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-xl">{statusIcons[member.bookingStatus]}</span>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[member.bookingStatus]}`}>
                  {member.bookingStatus.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Flight Information */}
            <div className="mt-4">
              <div className="font-medium text-gray-700 mb-2">Flight Bookings</div>
              {(() => {
                const memberFlights = getMemberFlights(member);
                return memberFlights.length > 0 ? (
                  <div className="space-y-2">
                    {memberFlights.map((flight, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                        <div>
                          <span className="font-medium">{flight.flightNumber}</span> - {flight.route}
                        </div>
                        <div className="text-gray-600">
                          {flight.departureTime} {flight.arrivalTime && `- ${flight.arrivalTime}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {flight.date ? new Date(flight.date).toLocaleDateString() : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">
                    {member.bookingStatus === 'complete'
                      ? 'Flight data available after fresh migration'
                      : 'No flight bookings yet'}
                  </div>
                );
              })()}
            </div>

            {/* Contact Information */}
            {(member.phone || member.email || member.emergencyContact) && (
              <div className="mt-4">
                <div className="font-medium text-gray-700 mb-2">Contact Information</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {member.phone && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">📱</span>
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">📧</span>
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  {member.emergencyContact && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">🚨</span>
                      <span>{member.emergencyContact}</span>
                      {member.emergencyPhone && (
                        <span className="text-gray-500">({member.emergencyPhone})</span>
                      )}
                    </div>
                  )}
                </div>
                {member.bloodGroup && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">🩸 Blood Group:</span>
                    <span className="font-medium ml-1">{member.bloodGroup}</span>
                  </div>
                )}
              </div>
            )}

            {/* Preparation Checklist */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className={`flex items-center space-x-2 ${member.medicalCertificate ? 'text-green-600' : 'text-red-600'}`}>
                <span>{member.medicalCertificate ? '✅' : '❌'}</span>
                <span>Medical Cert</span>
              </div>
              <div className={`flex items-center space-x-2 ${member.travelInsurance ? 'text-green-600' : 'text-red-600'}`}>
                <span>{member.travelInsurance ? '✅' : '❌'}</span>
                <span>Travel Insurance</span>
              </div>
              <div className={`flex items-center space-x-2 ${member.trekingGear ? 'text-green-600' : 'text-red-600'}`}>
                <span>{member.trekingGear ? '✅' : '❌'}</span>
                <span>Trekking Gear</span>
              </div>
              <div className={`flex items-center space-x-2 ${member.emergencyContactsShared ? 'text-green-600' : 'text-red-600'}`}>
                <span>{member.emergencyContactsShared ? '✅' : '❌'}</span>
                <span>Emergency Contacts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}