import { trekMembers } from '@/data/groupData'

export default function MissingBookingsAlert() {
  const membersWithIssues = trekMembers.filter(m => m.status !== 'complete')

  return (
    <div className="card bg-red-50 border-red-200">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">🚨</div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Urgent: Missing Bookings</h2>
          <p className="text-red-600 text-sm mb-4">
            {membersWithIssues.length} members need immediate attention for booking completion
          </p>

          <div className="space-y-3">
            {membersWithIssues.map((member) => (
              <div key={member.id} className="bg-white p-3 rounded border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-red-800">{member.name}</div>
                  <div className="text-xs text-red-600">
                    {member.status === 'missing' ? 'NO BOOKINGS' : 'PARTIAL'}
                  </div>
                </div>
                <div className="text-sm text-red-600 mt-1">
                  • {member.missingItems.join(' • ')}
                </div>
                {member.id === 'renjith' && (
                  <div className="text-xs text-red-500 mt-1">
                    ⚠️ Early arrival (Oct 2) - needs 6 nights accommodation in Kathmandu
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
            <div className="font-medium text-yellow-800 text-sm">Action Required:</div>
            <div className="text-yellow-700 text-sm mt-1">
              Contact these members immediately to complete bookings before trek departure (23 days)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}