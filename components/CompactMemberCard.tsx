'use client'

interface Member {
  id: string
  name: string
  bookingStatus: string
  phone?: string
  email?: string
  emergencyContact?: string
  emergencyPhone?: string
  bloodGroup?: string
  medicalCertificate?: boolean
  travelInsurance?: boolean
  trekingGear?: boolean
  emergencyContactsShared?: boolean
  flights?: any[]
}

interface CompactMemberCardProps {
  member: Member
  onViewDetails?: (memberId: string) => void
}

const statusColors: Record<string, string> = {
  complete: 'bg-green-100 text-green-800 border-green-200',
  partial: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  missing: 'bg-red-100 text-red-800 border-red-200'
}

const statusIcons: Record<string, string> = {
  complete: '✅',
  partial: '⚠️',
  missing: '❌'
}

export default function CompactMemberCard({ member, onViewDetails }: CompactMemberCardProps) {
  const completedItems = [
    member.medicalCertificate,
    member.travelInsurance,
    member.trekingGear,
    member.emergencyContactsShared
  ].filter(Boolean).length

  const totalItems = 4

  return (
    <div className={`flex-shrink-0 w-80 border rounded-lg p-4 shadow-sm snap-start ${statusColors[member.bookingStatus] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">
            {statusIcons[member.bookingStatus] || '❓'}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm leading-tight mb-1 truncate">
              {member.name}
            </h3>
            <div className="text-xs text-gray-500">
              {member.bookingStatus.toUpperCase()} • {completedItems}/{totalItems} ready
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-600">Preparation</span>
          <span className="text-xs text-gray-500">{completedItems}/{totalItems}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${(completedItems / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* Key Items Checklist - Compact */}
      <div className="mb-4">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className={`flex items-center space-x-1 ${member.medicalCertificate ? 'text-green-600' : 'text-red-600'}`}>
            <span>{member.medicalCertificate ? '✅' : '❌'}</span>
            <span className="truncate">Medical</span>
          </div>
          <div className={`flex items-center space-x-1 ${member.travelInsurance ? 'text-green-600' : 'text-red-600'}`}>
            <span>{member.travelInsurance ? '✅' : '❌'}</span>
            <span className="truncate">Insurance</span>
          </div>
          <div className={`flex items-center space-x-1 ${member.trekingGear ? 'text-green-600' : 'text-red-600'}`}>
            <span>{member.trekingGear ? '✅' : '❌'}</span>
            <span className="truncate">Gear</span>
          </div>
          <div className={`flex items-center space-x-1 ${member.emergencyContactsShared ? 'text-green-600' : 'text-red-600'}`}>
            <span>{member.emergencyContactsShared ? '✅' : '❌'}</span>
            <span className="truncate">Emergency</span>
          </div>
        </div>
      </div>

      {/* Quick Contact */}
      {(member.phone || member.email) && (
        <div className="mb-4 p-2 bg-white bg-opacity-50 rounded border">
          <div className="text-xs text-gray-600 mb-1">Quick Contact</div>
          <div className="space-y-1">
            {member.phone && (
              <div className="flex items-center space-x-1 text-xs">
                <span>📱</span>
                <span className="truncate">{member.phone}</span>
              </div>
            )}
            {member.email && (
              <div className="flex items-center space-x-1 text-xs">
                <span>📧</span>
                <span className="truncate">{member.email}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flight Status */}
      <div className="mb-4 p-2 bg-white bg-opacity-50 rounded border">
        <div className="text-xs text-gray-600 mb-1">Flights</div>
        <div className="text-xs">
          {member.flights && member.flights.length > 0 ? (
            <span className="text-green-600">✅ {member.flights.length} booked</span>
          ) : (
            <span className="text-gray-500">No flights yet</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded-full border ${statusColors[member.bookingStatus] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
          {member.bookingStatus.toUpperCase()}
        </span>
        <button
          onClick={() => onViewDetails?.(member.id)}
          className="text-blue-600 hover:underline active:scale-95 transition-transform"
        >
          View Details
        </button>
      </div>
    </div>
  )
}