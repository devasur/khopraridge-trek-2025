'use client'

import { useState } from 'react'
import { db, id } from '@/lib/instant'

interface InterviewSchedule {
  intervieweeName: string
  interviewerName: string
  templateName: string
  scheduledDate: Date
  scheduledTime: string
  location: string
  estimatedDuration: number
  phase: string
  priority: string
}

export default function InterviewScheduler() {
  const [newSchedule, setNewSchedule] = useState<InterviewSchedule>({
    intervieweeName: '',
    interviewerName: '',
    templateName: '',
    scheduledDate: new Date(),
    scheduledTime: '09:00',
    location: '',
    estimatedDuration: 30,
    phase: 'pre-trek',
    priority: 'medium'
  })

  const { data: schedulesData } = db.useQuery({ interviewSchedules: {} })
  const { data: templatesData } = db.useQuery({ interviewTemplates: {} })
  const { data: trekMembersData } = db.useQuery({ trekMembers: {} })

  const schedules = schedulesData?.interviewSchedules || []
  const templates = templatesData?.interviewTemplates || []
  const trekMembers = trekMembersData?.trekMembers || []

  // Common interviewers (directors, team members)
  const interviewers = [
    'Boni (Director)',
    'Simon (Co-Director)',
    'George (Cinematographer)',
    'Deepu (Documentary Assistant)',
    'Self-Interview'
  ]

  const locations = [
    'Hotel Lobby (Pre-Trek)',
    'Base Camp',
    'Trail Location',
    'Rest Stop',
    'Summit',
    'Village',
    'Hotel Room (Post-Trek)'
  ]

  const handleScheduleInterview = async () => {
    if (!newSchedule.intervieweeName || !newSchedule.interviewerName || !newSchedule.templateName) {
      alert('Please fill in all required fields')
      return
    }

    try {
      await db.transact([
        db.tx.interviewSchedules[id()].update({
          ...newSchedule,
          status: 'planned',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      ])

      // Reset form
      setNewSchedule({
        intervieweeName: '',
        interviewerName: '',
        templateName: '',
        scheduledDate: new Date(),
        scheduledTime: '09:00',
        location: '',
        estimatedDuration: 30,
        phase: 'pre-trek',
        priority: 'medium'
      })

      alert('Interview scheduled successfully!')
    } catch (error) {
      alert('Failed to schedule interview')
    }
  }

  return (
    <div className="space-y-6">
      {/* Schedule New Interview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">📅 Schedule New Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Interviewee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interviewee *
            </label>
            <select
              value={newSchedule.intervieweeName}
              onChange={(e) => setNewSchedule({...newSchedule, intervieweeName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            >
              <option value="">Select person to interview</option>
              {trekMembers.map((member) => (
                <option key={member.id} value={member.name}>{member.name}</option>
              ))}
              <option value="Local Guide">Local Guide</option>
              <option value="Tea House Owner">Tea House Owner</option>
              <option value="Porter">Porter</option>
            </select>
          </div>

          {/* Interviewer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interviewer *
            </label>
            <select
              value={newSchedule.interviewerName}
              onChange={(e) => setNewSchedule({...newSchedule, interviewerName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            >
              <option value="">Select interviewer</option>
              {interviewers.map((interviewer) => (
                <option key={interviewer} value={interviewer}>{interviewer}</option>
              ))}
            </select>
          </div>

          {/* Template */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Template *
            </label>
            <select
              value={newSchedule.templateName}
              onChange={(e) => setNewSchedule({...newSchedule, templateName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            >
              <option value="">Select question set</option>
              {templates.map((template) => (
                <option key={template.id} value={template.name}>{template.name}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={newSchedule.scheduledDate.toISOString().split('T')[0]}
              onChange={(e) => setNewSchedule({...newSchedule, scheduledDate: new Date(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="time"
              value={newSchedule.scheduledTime}
              onChange={(e) => setNewSchedule({...newSchedule, scheduledTime: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={newSchedule.location}
              onChange={(e) => setNewSchedule({...newSchedule, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            >
              <option value="">Select location</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={newSchedule.estimatedDuration}
              onChange={(e) => setNewSchedule({...newSchedule, estimatedDuration: parseInt(e.target.value)})}
              min="10"
              max="120"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            />
          </div>

          {/* Phase */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phase
            </label>
            <select
              value={newSchedule.phase}
              onChange={(e) => setNewSchedule({...newSchedule, phase: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            >
              <option value="pre-trek">Pre-Trek</option>
              <option value="during-trek">During Trek</option>
              <option value="post-trek">Post-Trek</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={newSchedule.priority}
              onChange={(e) => setNewSchedule({...newSchedule, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:border-transparent"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleScheduleInterview}
            className="px-6 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90 focus:outline-none focus:ring-2 focus:ring-nepal-blue focus:ring-offset-2"
          >
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Scheduled Interviews Overview */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">📋 Scheduled Interviews ({schedules.length})</h2>

        {schedules.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📅</div>
            <p>No interviews scheduled yet.</p>
            <p className="text-sm mt-2">Use the form above to schedule your first interview.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schedules.map((schedule: any) => (
              <div key={schedule.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.priority === 'high' ? 'bg-red-100 text-red-800' :
                      schedule.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {schedule.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      schedule.status === 'completed' ? 'bg-green-100 text-green-800' :
                      schedule.status === 'failed' ? 'bg-red-100 text-red-800' :
                      schedule.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {schedule.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(schedule.scheduledDate).toLocaleDateString()} at {schedule.scheduledTime}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Interview:</span> {schedule.intervieweeName}
                  </div>
                  <div>
                    <span className="font-medium">By:</span> {schedule.interviewerName}
                  </div>
                  <div>
                    <span className="font-medium">Template:</span> {schedule.templateName}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {schedule.location}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {schedule.estimatedDuration} min
                  </div>
                  <div>
                    <span className="font-medium">Phase:</span> {schedule.phase}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}