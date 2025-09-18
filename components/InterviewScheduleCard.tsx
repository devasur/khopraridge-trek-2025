import { Interview } from '@/data/documentaryData'

interface InterviewScheduleCardProps {
  interview: Interview
}

export default function InterviewScheduleCard({ interview }: InterviewScheduleCardProps) {
  const getScheduleInfo = (id: string) => {
    switch (id) {
      case 'pre-trek':
        return {
          date: 'October 8, 2025',
          timeSlots: ['16:30-17:30', '17:30-18:30', '19:30-20:30'],
          participants: 'All 12 members',
          priority: 'high'
        }
      case 'mid-trek':
        return {
          date: 'October 13, 2025',
          timeSlots: ['Evening at camp', 'After dinner', 'Before sleep'],
          participants: 'Select 6-8 members',
          priority: 'medium'
        }
      case 'post-trek':
        return {
          date: 'October 16-17, 2025',
          timeSlots: ['After return', 'Hotel evening', 'Next morning'],
          participants: 'All available members',
          priority: 'high'
        }
      default:
        return {
          date: 'TBD',
          timeSlots: ['TBD'],
          participants: 'TBD',
          priority: 'low'
        }
    }
  }

  const scheduleInfo = getScheduleInfo(interview.id)
  const priorityColors = {
    high: 'border-red-300 bg-red-50',
    medium: 'border-yellow-300 bg-yellow-50',
    low: 'border-gray-300 bg-gray-50'
  }

  return (
    <div className={`card ${interview.completed ? 'bg-green-50 border-green-300' : priorityColors[scheduleInfo.priority as keyof typeof priorityColors]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">
            {interview.completed ? '✅' : '🎤'}
          </span>
          <div>
            <h3 className="text-lg font-semibold">{interview.subject}</h3>
            <div className="text-sm text-gray-600">
              {interview.duration} • {scheduleInfo.participants}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-sm">{scheduleInfo.date}</div>
          <div className="text-xs text-gray-500">{interview.location}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Time Slots Available:</h4>
          <div className="space-y-1">
            {scheduleInfo.timeSlots.map((slot, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name={`${interview.id}-slot`} className="rounded" />
                <span className="text-sm">{slot}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-2">Assignment:</h4>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-600">Interviewer:</label>
              <select className="w-full text-sm border rounded px-2 py-1 mt-1">
                <option value="">Select interviewer...</option>
                <option value="Boni">Boni (Director)</option>
                <option value="George">George</option>
                <option value="Ann">Ann</option>
                <option value="Roshni">Roshni</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600">Camera Operator:</label>
              <select className="w-full text-sm border rounded px-2 py-1 mt-1">
                <option value="">Select camera op...</option>
                <option value="Tinku">Tinku</option>
                <option value="Deepu">Deepu</option>
                <option value="Simon">Simon</option>
                <option value="Vandana">Vandana</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {interview.questions.length} questions prepared
          </div>
          <div className="flex space-x-2">
            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
              View Questions
            </button>
            <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200">
              Schedule
            </button>
            {interview.completed && (
              <button className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200">
                Review Footage
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}