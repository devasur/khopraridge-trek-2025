import { DailyShot } from '@/data/documentaryData'

interface DailyShotCardProps {
  shot: DailyShot
}

const priorityColors = {
  high: 'border-red-300 bg-red-50',
  medium: 'border-yellow-300 bg-yellow-50',
  low: 'border-gray-300 bg-gray-50'
}

const priorityIcons = {
  high: '🔴',
  medium: '🟡',
  low: '⚪'
}

export default function DailyShotCard({ shot }: DailyShotCardProps) {
  return (
    <div className={`card ${shot.completed ? 'bg-green-50 border-green-300' : priorityColors[shot.priority]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">
            {shot.completed ? '✅' : priorityIcons[shot.priority]}
          </span>
          <div>
            <h3 className="text-lg font-semibold">Day {shot.day}: {shot.location}</h3>
            <div className="text-sm text-gray-600">
              {shot.shots.length} shots • {shot.priority.toUpperCase()} priority
            </div>
          </div>
        </div>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            shot.completed
              ? 'bg-green-200 text-green-800'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {shot.completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Required Shots:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {shot.shots.map((shotDescription, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 p-2 bg-white rounded border"
              >
                <input
                  type="checkbox"
                  defaultChecked={shot.completed}
                  className="rounded"
                />
                <span className="text-sm">{shotDescription}</span>
              </div>
            ))}
          </div>
        </div>

        {shot.notes && (
          <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
            <div className="font-medium text-blue-800 text-sm">📝 Notes:</div>
            <div className="text-blue-700 text-sm mt-1">{shot.notes}</div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-gray-500">
            Status: {shot.completed ? 'Complete' : 'Pending'}
          </div>
          <button className="text-blue-600 hover:underline">
            Add notes
          </button>
        </div>
      </div>
    </div>
  )
}