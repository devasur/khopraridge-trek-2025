'use client'

import { useState } from 'react'
import { db } from '@/lib/instant'

export default function InterviewDailyPlans() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [updateStatus, setUpdateStatus] = useState<{[key: string]: string}>({})

  const { data: schedulesData } = db.useQuery({ interviewSchedules: {} })
  const schedules = schedulesData?.interviewSchedules || []

  // Filter schedules for selected date
  const dailySchedules = schedules.filter((schedule: any) =>
    new Date(schedule.scheduledDate).toISOString().split('T')[0] === selectedDate
  )

  // Group by time
  const schedulesByTime = dailySchedules.reduce((acc: any, schedule: any) => {
    const time = schedule.scheduledTime
    if (!acc[time]) acc[time] = []
    acc[time].push(schedule)
    return acc
  }, {})

  const sortedTimes = Object.keys(schedulesByTime).sort()

  const handleStatusUpdate = async (scheduleId: string, newStatus: string) => {
    try {
      const updates: any = {
        status: newStatus,
        updatedAt: new Date(),
      }

      if (newStatus === 'completed') {
        updates.actualEndTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      } else if (newStatus === 'in-progress') {
        updates.actualStartTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      }

      await db.transact([
        db.tx.interviewSchedules[scheduleId].update(updates)
      ])

      alert(`Interview marked as ${newStatus}`)
    } catch (error) {
      alert('Failed to update status')
    }
  }

  const generateWhatsAppBrief = () => {
    const date = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    let message = `📹 DAILY INTERVIEW BRIEF - ${date}\n\n`

    if (dailySchedules.length === 0) {
      message += "No interviews scheduled for today.\n\n"
    } else {
      message += `Total interviews scheduled: ${dailySchedules.length}\n\n`

      sortedTimes.forEach(time => {
        message += `⏰ ${time}\n`
        schedulesByTime[time].forEach((schedule: any) => {
          message += `• ${schedule.intervieweeName} interviewed by ${schedule.interviewerName}\n`
          message += `  Template: ${schedule.templateName}\n`
          message += `  Location: ${schedule.location}\n`
          message += `  Duration: ${schedule.estimatedDuration} min\n`
          message += `  Priority: ${schedule.priority.toUpperCase()}\n\n`
        })
      })
    }

    message += "📝 Instructions:\n"
    message += "• Arrive 10 minutes early\n"
    message += "• Check audio/video equipment\n"
    message += "• Confirm consent before recording\n"
    message += "• Update status in coordination system\n\n"
    message += "Good luck with today's interviews! 🎬"

    navigator.clipboard.writeText(message)
    alert('WhatsApp brief copied to clipboard!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'failed': return 'bg-red-100 text-red-800 border-red-200'
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'confirmed': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Date Selector and Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-nepal-blue">📅 Daily Interview Plans</h2>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue"
            />
            <button
              onClick={generateWhatsAppBrief}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              title="Generate WhatsApp brief for the day"
            >
              📱 WhatsApp Brief
            </button>
          </div>
        </div>

        {/* Daily Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{dailySchedules.length}</div>
            <div className="text-sm text-blue-600">Total Interviews</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {dailySchedules.filter((s: any) => s.status === 'completed').length}
            </div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {dailySchedules.filter((s: any) => s.status === 'in-progress').length}
            </div>
            <div className="text-sm text-yellow-600">In Progress</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">
              {dailySchedules.filter((s: any) => s.status === 'failed').length}
            </div>
            <div className="text-sm text-red-600">Failed</div>
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">
          📋 Schedule for {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </h3>

        {dailySchedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📅</div>
            <p>No interviews scheduled for this date.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTimes.map(time => (
              <div key={time} className="border-l-4 border-nepal-blue pl-4">
                <h4 className="font-semibold text-lg text-nepal-blue mb-2">⏰ {time}</h4>
                <div className="space-y-3">
                  {schedulesByTime[time].map((schedule: any) => (
                    <div
                      key={schedule.id}
                      className={`border rounded-lg p-4 ${getStatusColor(schedule.status)}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(schedule.priority)}`}>
                            {schedule.priority.toUpperCase()}
                          </span>
                          <span className="font-semibold">
                            {schedule.intervieweeName} → {schedule.interviewerName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {schedule.status !== 'completed' && schedule.status !== 'failed' && (
                            <>
                              <button
                                onClick={() => handleStatusUpdate(schedule.id, 'in-progress')}
                                disabled={schedule.status === 'in-progress'}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                              >
                                Start
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(schedule.id, 'completed')}
                                className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(schedule.id, 'failed')}
                                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                              >
                                Failed
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Template:</span> {schedule.templateName}
                        </div>
                        <div>
                          <span className="font-medium">Location:</span> {schedule.location}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {schedule.estimatedDuration} min
                        </div>
                      </div>

                      {schedule.actualStartTime && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Started at:</span> {schedule.actualStartTime}
                          {schedule.actualEndTime && (
                            <span className="ml-4">
                              <span className="font-medium">Ended at:</span> {schedule.actualEndTime}
                            </span>
                          )}
                        </div>
                      )}

                      {schedule.completionNotes && (
                        <div className="mt-2 p-2 bg-white rounded text-sm">
                          <span className="font-medium">Notes:</span> {schedule.completionNotes}
                        </div>
                      )}

                      {schedule.failureReason && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-sm">
                          <span className="font-medium">Failure Reason:</span> {schedule.failureReason}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}