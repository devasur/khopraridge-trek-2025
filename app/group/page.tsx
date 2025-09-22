'use client'

import { useState, useRef } from 'react'
import { db, queries } from '@/lib/instant'
import GroupStatusTracker from '@/components/GroupStatusTracker'
import MissingBookingsAlert from '@/components/MissingBookingsAlert'
import MobileLayout from '@/components/MobileLayout'
import MobileCard, { MobileStatCard } from '@/components/MobileCard'
import CompactMemberCard from '@/components/CompactMemberCard'

export default function GroupPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { data: trekMembersData, isLoading } = db.useQuery(queries.trekMembers)
  const trekMembers = trekMembersData?.trekMembers || []

  const completeMembers = trekMembers.filter(m => m.bookingStatus === 'complete').length
  const partialMembers = trekMembers.filter(m => m.bookingStatus === 'partial').length
  const missingMembers = trekMembers.filter(m => m.bookingStatus === 'missing').length

  // Sort members by status priority (missing > partial > complete)
  const statusPriority: Record<string, number> = { missing: 3, partial: 2, complete: 1 }
  const sortedMembers = [...trekMembers].sort((a, b) => {
    return (statusPriority[b.bookingStatus] || 0) - (statusPriority[a.bookingStatus] || 0)
  })

  const handleViewMemberDetails = (memberId: string) => {
    setSelectedMember(memberId)
  }

  const selectedMemberData = selectedMember ? trekMembers.find(member => member.id === selectedMember) : null

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

  const stats = [
    { value: completeMembers, label: 'Ready', icon: '✅', variant: 'success' as const },
    { value: partialMembers, label: 'Partial', icon: '⚠️', variant: 'warning' as const },
    { value: missingMembers, label: 'Missing', icon: '❌', variant: 'error' as const },
  ]

  const keyDates = [
    {
      title: 'Assembly',
      date: 'Oct 8, 4:00 PM',
      location: 'Hotel Top&Top',
      type: 'assembly',
      icon: '🏨'
    },
    {
      title: 'Return Flight',
      date: 'Oct 17, 10:45 AM',
      location: 'U4 608',
      type: 'departure',
      icon: '✈️'
    }
  ]

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout
          title="Team Status"
          subtitle={`${trekMembers.length} members`}
        >
          <div className="space-y-4">
            {/* Team Stats */}
            <MobileCard title="Team Overview" icon="👥" compact>
              <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
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

            {/* Alerts */}
            {(partialMembers > 0 || missingMembers > 0) && (
              <MobileCard
                title="Booking Alerts"
                icon="⚠️"
                variant="warning"
                collapsible
                defaultExpanded
              >
                <MissingBookingsAlert />
              </MobileCard>
            )}

            {/* Key Coordination */}
            <MobileCard title="Key Dates" icon="📅" collapsible defaultExpanded>
              <div className="space-y-3">
                {keyDates.map((date, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      date.type === 'assembly' ? 'bg-blue-50' : 'bg-green-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{date.icon}</span>
                      <div>
                        <div className={`font-medium ${
                          date.type === 'assembly' ? 'text-blue-800' : 'text-green-800'
                        }`}>
                          {date.title}
                        </div>
                        <div className={`text-sm ${
                          date.type === 'assembly' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {date.date}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm ${
                      date.type === 'assembly' ? 'text-blue-500' : 'text-green-500'
                    }`}>
                      {date.location}
                    </div>
                  </div>
                ))}
              </div>
            </MobileCard>

            {/* Swipeable Member Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-nepal-blue">Team Members</h3>
                <span className="text-sm text-gray-500">{sortedMembers.length} members</span>
              </div>

              <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
                onScroll={(e) => {
                  const container = e.target as HTMLElement
                  const cardWidth = 320 + 16
                  const scrollLeft = container.scrollLeft
                  const newIndex = Math.round(scrollLeft / cardWidth)
                  setCurrentIndex(newIndex)
                }}
              >
                {sortedMembers.map((member) => (
                  <CompactMemberCard
                    key={member.id}
                    member={member}
                    onViewDetails={handleViewMemberDetails}
                  />
                ))}
              </div>

              {/* Enhanced scroll indicator */}
              <div className="flex items-center justify-center mt-3 space-x-3">
                <div className="flex space-x-1">
                  {sortedMembers.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-nepal-blue w-6' : 'bg-gray-300'
                      }`}
                      onClick={() => {
                        const cardWidth = 320 + 16
                        scrollRef.current?.scrollTo({
                          left: index * cardWidth,
                          behavior: 'smooth'
                        })
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <span>{currentIndex + 1}/{sortedMembers.length}</span>
                  <span>•</span>
                  <span>Swipe to browse</span>
                </div>
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>

      {/* Mobile Member Details Modal */}
      {selectedMemberData && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[90vh] rounded-t-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {selectedMemberData.name}
              </h2>
              <button
                onClick={() => setSelectedMember(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              {/* Use the individual member card component from GroupStatusTracker */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {selectedMemberData.bookingStatus === 'complete' ? '✅' :
                       selectedMemberData.bookingStatus === 'partial' ? '⚠️' : '❌'}
                    </span>
                    <h3 className="font-semibold text-lg">{selectedMemberData.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMemberData.bookingStatus === 'complete' ? 'bg-green-100 text-green-800' :
                      selectedMemberData.bookingStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedMemberData.bookingStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Flight Information */}
                <div className="mt-4">
                  <div className="font-medium text-gray-700 mb-2">Flight Bookings</div>
                  {(selectedMemberData as any).flights && (selectedMemberData as any).flights.length > 0 ? (
                    <div className="space-y-2">
                      {(selectedMemberData as any).flights.map((flight: any, index: number) => (
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
                      {selectedMemberData.bookingStatus === 'complete'
                        ? 'Flight data available after fresh migration'
                        : 'No flight bookings yet'}
                    </div>
                  )}
                </div>

                {/* Contact Information */}
                {(selectedMemberData.phone || selectedMemberData.email || selectedMemberData.emergencyContact) && (
                  <div className="mt-4">
                    <div className="font-medium text-gray-700 mb-2">Contact Information</div>
                    <div className="grid grid-cols-1 gap-4 text-sm">
                      {selectedMemberData.phone && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">📱</span>
                          <span>{selectedMemberData.phone}</span>
                        </div>
                      )}
                      {selectedMemberData.email && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">📧</span>
                          <span className="truncate">{selectedMemberData.email}</span>
                        </div>
                      )}
                      {selectedMemberData.emergencyContact && (
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500">🚨</span>
                          <span>{selectedMemberData.emergencyContact}</span>
                          {selectedMemberData.emergencyPhone && (
                            <span className="text-gray-500">({selectedMemberData.emergencyPhone})</span>
                          )}
                        </div>
                      )}
                    </div>
                    {selectedMemberData.bloodGroup && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-500">🩸 Blood Group:</span>
                        <span className="font-medium ml-1">{selectedMemberData.bloodGroup}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Preparation Checklist */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div className={`flex items-center space-x-2 ${selectedMemberData.medicalCertificate ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{selectedMemberData.medicalCertificate ? '✅' : '❌'}</span>
                    <span>Medical Certificate</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${selectedMemberData.travelInsurance ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{selectedMemberData.travelInsurance ? '✅' : '❌'}</span>
                    <span>Travel Insurance</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${selectedMemberData.trekingGear ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{selectedMemberData.trekingGear ? '✅' : '❌'}</span>
                    <span>Trekking Gear</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${selectedMemberData.emergencyContactsShared ? 'text-green-600' : 'text-red-600'}`}>
                    <span>{selectedMemberData.emergencyContactsShared ? '✅' : '❌'}</span>
                    <span>Emergency Contacts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-1">Team Status</h1>
          <p className="text-gray-600">{trekMembers.length} members</p>
        </div>

        {/* Compact Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card bg-green-50 border-green-200 text-center p-4">
            <div className="text-2xl font-bold text-green-600">{completeMembers}</div>
            <div className="text-xs text-gray-600">Ready</div>
          </div>
          <div className="card bg-yellow-50 border-yellow-200 text-center p-4">
            <div className="text-2xl font-bold text-yellow-600">{partialMembers}</div>
            <div className="text-xs text-gray-600">Partial</div>
          </div>
          <div className="card bg-red-50 border-red-200 text-center p-4">
            <div className="text-2xl font-bold text-red-600">{missingMembers}</div>
            <div className="text-xs text-gray-600">Missing</div>
          </div>
        </div>

        {/* Missing Bookings Alert */}
        {(partialMembers > 0 || missingMembers > 0) && <MissingBookingsAlert />}

        {/* Group Status Tracker */}
        <GroupStatusTracker />

        {/* Key Dates Only */}
        <div className="card">
          <h2 className="text-lg font-semibold text-nepal-blue mb-3">Key Coordination</h2>
          <div className="space-y-3">
            {keyDates.map((date, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  date.type === 'assembly' ? 'bg-blue-50' : 'bg-green-50'
                }`}
              >
                <div>
                  <div className={`font-medium ${
                    date.type === 'assembly' ? 'text-blue-800' : 'text-green-800'
                  }`}>
                    {date.title}
                  </div>
                  <div className={`text-sm ${
                    date.type === 'assembly' ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {date.date}
                  </div>
                </div>
                <div className={`text-sm ${
                  date.type === 'assembly' ? 'text-blue-500' : 'text-green-500'
                }`}>
                  {date.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}