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
  const [step, setStep] = useState(1)
  const [newSchedule, setNewSchedule] = useState<InterviewSchedule>({
    intervieweeName: '',
    interviewerName: '',
    templateName: '',
    scheduledDate: new Date(),
    scheduledTime: '09:00',
    location: '',
    estimatedDuration: 30,
    phase: 'during-trek',
    priority: 'medium'
  })

  const { data: schedulesData } = db.useQuery({ interviewSchedules: {} })
  const { data: templatesData } = db.useQuery({ interviewTemplates: {} })
  const { data: trekMembersData } = db.useQuery({ trekMembers: {} })

  const schedules = schedulesData?.interviewSchedules || []
  const templates = templatesData?.interviewTemplates || []
  const trekMembers = trekMembersData?.trekMembers || []

  // Simplified data with smart categorization
  const interviewees = [
    // Trek members first
    ...trekMembers.map((member: any) => ({
      name: member.name,
      type: 'member',
      icon: '👤',
      suggestedTemplate: 'Personal Journey',
      suggestedDuration: 20
    })),
    // Local contacts
    { name: 'Local Guide', type: 'local', icon: '🏔️', suggestedTemplate: 'Local Insights', suggestedDuration: 15 },
    { name: 'Tea House Owner', type: 'local', icon: '🏠', suggestedTemplate: 'Local Culture', suggestedDuration: 10 },
    { name: 'Porter', type: 'local', icon: '🎒', suggestedTemplate: 'Trek Logistics', suggestedDuration: 10 },
  ]

  const interviewers = [
    { name: 'Boni (Director)', icon: '🎬', available: true },
    { name: 'Simon (Co-Director)', icon: '🎥', available: true },
    { name: 'George (Cinematographer)', icon: '📹', available: false },
    { name: 'Deepu (Assistant)', icon: '📝', available: true },
  ]

  const quickTemplates = [
    { name: 'Personal Journey', icon: '✨', duration: 20, questions: 8, type: 'personal' },
    { name: 'Group Dynamics', icon: '👥', duration: 15, questions: 6, type: 'group' },
    { name: 'Technical Insights', icon: '⛰️', duration: 10, questions: 5, type: 'technical' },
    { name: 'Local Culture', icon: '🏕️', duration: 10, questions: 4, type: 'local' },
  ]

  const timeSlots = [
    { time: '06:00', label: 'Early Morning', icon: '🌅', ideal: 'Quiet reflection time' },
    { time: '09:00', label: 'Morning', icon: '☀️', ideal: 'Fresh energy, good lighting' },
    { time: '12:00', label: 'Lunch Break', icon: '🍽️', ideal: 'Relaxed, informal setting' },
    { time: '17:00', label: 'Evening', icon: '🌄', ideal: 'End-of-day reflection' },
    { time: '19:00', label: 'After Dinner', icon: '🌙', ideal: 'Deep conversations' },
  ]

  const locations = [
    { name: 'Rest Stop', icon: '🪑', ideal: 'Quick check-ins' },
    { name: 'Tea House', icon: '☕', ideal: 'Comfortable conversations' },
    { name: 'Scenic Viewpoint', icon: '🏔️', ideal: 'Inspirational backdrop' },
    { name: 'Camp Area', icon: '⛺', ideal: 'Team discussions' },
  ]

  const handleScheduleInterview = async () => {
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
        phase: 'during-trek',
        priority: 'medium'
      })
      setStep(1)

      alert('Interview scheduled successfully!')
    } catch (error) {
      alert('Failed to schedule interview')
    }
  }

  const nextStep = () => setStep(Math.min(4, step + 1))
  const prevStep = () => setStep(Math.max(1, step - 1))

  const isStepComplete = (stepNum: number) => {
    switch (stepNum) {
      case 1: return newSchedule.intervieweeName !== ''
      case 2: return newSchedule.templateName !== ''
      case 3: return newSchedule.scheduledTime !== '' && newSchedule.location !== ''
      case 4: return newSchedule.interviewerName !== ''
      default: return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Quick Schedule New Interview */}
      <div className="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-nepal-blue">🎤 Quick Schedule</h2>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  step === num
                    ? 'bg-nepal-blue text-white'
                    : step > num
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step > num ? '✓' : num}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Who to Interview */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Who would you like to interview?</h3>
              <p className="text-sm text-gray-600">Choose from team members or local contacts</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interviewees.map((person) => (
                <button
                  key={person.name}
                  onClick={() => {
                    setNewSchedule({
                      ...newSchedule,
                      intervieweeName: person.name,
                      templateName: person.suggestedTemplate,
                      estimatedDuration: person.suggestedDuration
                    })
                    nextStep()
                  }}
                  className={`p-3 border rounded-lg text-center hover:shadow-sm transition-all active:scale-95 ${
                    newSchedule.intervieweeName === person.name
                      ? 'border-nepal-blue bg-nepal-blue text-white'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{person.icon}</div>
                  <div className="font-medium text-sm">{person.name}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {person.type === 'member' ? 'Team Member' : 'Local Contact'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Interview Type */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">What type of interview?</h3>
              <p className="text-sm text-gray-600">Pre-selected based on your choice: <span className="font-medium">{newSchedule.intervieweeName}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickTemplates.map((template) => (
                <button
                  key={template.name}
                  onClick={() => {
                    setNewSchedule({
                      ...newSchedule,
                      templateName: template.name,
                      estimatedDuration: template.duration
                    })
                    nextStep()
                  }}
                  className={`p-4 border rounded-lg text-left hover:shadow-sm transition-all active:scale-95 ${
                    newSchedule.templateName === template.name
                      ? 'border-nepal-blue bg-nepal-blue text-white'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-xl">{template.icon}</span>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm opacity-75">{template.duration} min • {template.questions} questions</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: When & Where */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">When and where?</h3>
              <p className="text-sm text-gray-600">Pick the best time and location for the conversation</p>
            </div>

            <div className="space-y-4">
              {/* Quick Time Slots */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">⏰ Best Time</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setNewSchedule({...newSchedule, scheduledTime: slot.time})}
                      className={`p-2 border rounded text-left text-sm transition-all active:scale-95 ${
                        newSchedule.scheduledTime === slot.time
                          ? 'border-nepal-blue bg-nepal-blue text-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{slot.icon}</span>
                        <div>
                          <div className="font-medium">{slot.label}</div>
                          <div className="text-xs opacity-75">{slot.ideal}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Locations */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">📍 Best Location</h4>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc.name}
                      onClick={() => {
                        setNewSchedule({...newSchedule, location: loc.name})
                        nextStep()
                      }}
                      className={`p-3 border rounded text-left text-sm transition-all active:scale-95 ${
                        newSchedule.location === loc.name
                          ? 'border-nepal-blue bg-nepal-blue text-white'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{loc.icon}</span>
                        <div>
                          <div className="font-medium">{loc.name}</div>
                          <div className="text-xs opacity-75">{loc.ideal}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Who's Interviewing */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Who's conducting the interview?</h3>
              <p className="text-sm text-gray-600">Choose an available interviewer</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interviewers.map((interviewer) => (
                <button
                  key={interviewer.name}
                  onClick={() => setNewSchedule({...newSchedule, interviewerName: interviewer.name})}
                  disabled={!interviewer.available}
                  className={`p-3 border rounded-lg text-center transition-all ${
                    !interviewer.available
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : newSchedule.interviewerName === interviewer.name
                      ? 'border-nepal-blue bg-nepal-blue text-white'
                      : 'border-gray-200 bg-white hover:border-gray-300 active:scale-95'
                  }`}
                >
                  <div className="text-2xl mb-1">{interviewer.icon}</div>
                  <div className="font-medium text-sm">{interviewer.name}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {interviewer.available ? '✅ Available' : '❌ Busy'}
                  </div>
                </button>
              ))}
            </div>

            {/* Summary & Confirm */}
            {newSchedule.interviewerName && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">📋 Interview Summary</h4>
                <div className="text-sm space-y-1 text-green-700">
                  <div><strong>Who:</strong> {newSchedule.intervieweeName}</div>
                  <div><strong>Type:</strong> {newSchedule.templateName} ({newSchedule.estimatedDuration} min)</div>
                  <div><strong>When:</strong> {newSchedule.scheduledTime}</div>
                  <div><strong>Where:</strong> {newSchedule.location}</div>
                  <div><strong>Interviewer:</strong> {newSchedule.interviewerName}</div>
                </div>
                <button
                  onClick={handleScheduleInterview}
                  className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✅ Schedule Interview
                </button>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg transition-colors ${
              step === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-nepal-blue hover:bg-nepal-blue/5'
            }`}
          >
            ← Back
          </button>

          <div className="text-sm text-gray-500">
            Step {step} of 4
          </div>

          {step < 4 && (
            <button
              onClick={nextStep}
              disabled={!isStepComplete(step)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !isStepComplete(step)
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'bg-nepal-blue text-white hover:bg-nepal-blue/90'
              }`}
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card bg-blue-50 border-blue-200 text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{schedules.length}</div>
          <div className="text-xs text-gray-600">Scheduled</div>
        </div>
        <div className="card bg-green-50 border-green-200 text-center p-4">
          <div className="text-2xl font-bold text-green-600">
            {schedules.filter((s: any) => s.status === 'completed').length}
          </div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
        <div className="card bg-yellow-50 border-yellow-200 text-center p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {schedules.filter((s: any) => s.status === 'planned').length}
          </div>
          <div className="text-xs text-gray-600">Pending</div>
        </div>
      </div>

      {/* Recent Schedules - Compact */}
      {schedules.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-nepal-blue mb-3">📋 Recent Schedules</h3>
          <div className="space-y-2">
            {schedules.slice(0, 3).map((schedule: any) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                <div className="flex items-center space-x-3">
                  <span className={`w-2 h-2 rounded-full ${
                    schedule.status === 'completed' ? 'bg-green-500' :
                    schedule.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
                  }`} />
                  <div>
                    <div className="font-medium text-sm">{schedule.intervieweeName}</div>
                    <div className="text-xs text-gray-600">{schedule.templateName}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(schedule.scheduledDate).toLocaleDateString()}
                </div>
              </div>
            ))}
            {schedules.length > 3 && (
              <div className="text-center text-sm text-gray-500 py-2">
                +{schedules.length - 3} more interviews
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}