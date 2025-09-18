import { dailyShots } from '@/data/documentaryData'
import DailyShotCard from '@/components/DailyShotCard'

export default function ShotsPage() {
  const highPriorityShots = dailyShots.filter(shot => shot.priority === 'high' && !shot.completed)
  const completedShots = dailyShots.filter(shot => shot.completed)

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-2">📹 Daily Shot Tracker</h1>
        <p className="text-gray-600">Track and manage filming requirements for each day of the trek</p>
      </div>

      {/* High Priority Alert */}
      {highPriorityShots.length > 0 && (
        <div className="card bg-red-50 border-red-200">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🔴</div>
            <div>
              <h2 className="text-lg font-semibold text-red-800 mb-2">High Priority Shots</h2>
              <p className="text-red-600 text-sm mb-3">
                {highPriorityShots.length} critical filming days need immediate attention
              </p>
              <div className="space-y-2">
                {highPriorityShots.map((shot) => (
                  <div key={shot.id} className="bg-white p-3 rounded border border-red-200">
                    <div className="font-medium text-red-800">
                      Day {shot.day}: {shot.location}
                    </div>
                    <div className="text-sm text-red-600 mt-1">
                      Key shots: {shot.shots.slice(0, 3).join(', ')}
                      {shot.shots.length > 3 && '...'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Daily Shots */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-nepal-blue">Complete Shot List</h2>
        <div className="grid grid-cols-1 gap-6">
          {dailyShots.map((shot) => (
            <DailyShotCard key={shot.id} shot={shot} />
          ))}
        </div>
      </div>

      {/* Filming Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">🎬 Filming Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-blue-800 mb-2">Technical Tips</h3>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Shoot in 1080p/30fps for consistency</li>
              <li>Use external mic for interviews</li>
              <li>Keep shots steady with tripods/gimbals</li>
              <li>Record 10 seconds extra before/after action</li>
              <li>Monitor battery levels constantly</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-blue-800 mb-2">Creative Tips</h3>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Capture genuine emotions and reactions</li>
              <li>Film establishing shots of each location</li>
              <li>Get multiple angles of key moments</li>
              <li>Record natural sound and conversations</li>
              <li>Document both struggles and triumphs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">Production Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedShots.length}</div>
            <div className="text-sm text-gray-600">Days Completed</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {dailyShots.filter(s => s.priority === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {dailyShots.reduce((total, shot) => total + shot.shots.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Shots</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">9</div>
            <div className="text-sm text-gray-600">Trek Days</div>
          </div>
        </div>
      </div>
    </div>
  )
}