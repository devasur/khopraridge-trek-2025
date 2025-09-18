'use client'

import { db, queries } from '@/lib/instant'
import GroupStatusTracker from '@/components/GroupStatusTracker'
import MissingBookingsAlert from '@/components/MissingBookingsAlert'

export default function GroupPage() {
  const { data: trekMembersData, isLoading } = db.useQuery(queries.trekMembers)
  const trekMembers = trekMembersData?.trekMembers || []

  const completeMembers = trekMembers.filter(m => m.bookingStatus === 'complete').length
  const partialMembers = trekMembers.filter(m => m.bookingStatus === 'partial').length
  const missingMembers = trekMembers.filter(m => m.bookingStatus === 'missing').length

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">Group Coordination</h1>
          <p className="text-gray-600">Loading trek member data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-2">Group Coordination</h1>
        <p className="text-gray-600">Track all {trekMembers.length} members&apos; travel status and coordination needs</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{completeMembers}</div>
            <div className="text-sm text-gray-600">Complete Itineraries</div>
          </div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{partialMembers}</div>
            <div className="text-sm text-gray-600">Partial Bookings</div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{missingMembers}</div>
            <div className="text-sm text-gray-600">Missing Bookings</div>
          </div>
        </div>
      </div>

      {/* No Data Message */}
      {trekMembers.length === 0 && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center p-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">No Trek Members Found</h3>
            <p className="text-blue-600 mb-4">
              No trek member data is currently in the database. Run the data migration to populate the system with trek member information.
            </p>
            <p className="text-sm text-blue-500">
              Go to Admin → Data Migration to import trek member data from the planning files.
            </p>
          </div>
        </div>
      )}

      {/* Missing Bookings Alert */}
      {(partialMembers > 0 || missingMembers > 0) && <MissingBookingsAlert />}

      {/* Group Status Tracker */}
      <GroupStatusTracker />

      {/* Coordination Notes */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">Leadership Notes</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800">Group Assembly Point</h3>
            <p className="text-sm text-blue-600">Hotel Top&Top, Pokhara - October 8, 4:00 PM</p>
            <p className="text-xs text-blue-500">All members must arrive by this time for trek briefing</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-800">Return Coordination</h3>
            <p className="text-sm text-green-600">All members on U4 608 flight Oct 17, 10:45 AM</p>
            <p className="text-xs text-green-500">Single group flight back to Kathmandu</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-medium text-orange-800">Kathmandu Layovers</h3>
            <p className="text-sm text-orange-600">Multiple groups need 1-2 night stays</p>
            <p className="text-xs text-orange-500">Coordinate shared transportation and accommodation</p>
          </div>
        </div>
      </div>
    </div>
  )
}