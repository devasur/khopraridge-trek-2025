import { dailyShots } from '@/data/documentaryData'

export default function ProductionProgress() {
  const totalShots = dailyShots.length
  const completedShots = dailyShots.filter(shot => shot.completed).length
  const progressPercentage = totalShots > 0 ? (completedShots / totalShots) * 100 : 0

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-nepal-blue mb-4">Production Progress</h2>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Completion</span>
          <span className="text-sm text-gray-600">{completedShots}/{totalShots} days</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-center mt-2 text-2xl font-bold text-green-600">
          {Math.round(progressPercentage)}%
        </div>
      </div>

      {/* Daily Progress */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-800">Daily Filming Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {dailyShots.map((shot) => (
            <div
              key={shot.id}
              className={`p-3 rounded-lg border-2 ${
                shot.completed
                  ? 'bg-green-50 border-green-200'
                  : shot.priority === 'high'
                  ? 'bg-red-50 border-red-200'
                  : shot.priority === 'medium'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Day {shot.day}</span>
                <span className="text-xl">
                  {shot.completed ? '✅' : shot.priority === 'high' ? '🔴' : shot.priority === 'medium' ? '🟡' : '⚪'}
                </span>
              </div>
              <div className="text-xs text-gray-600 mb-2">{shot.location}</div>
              <div className="text-xs text-gray-500">{shot.shots.length} shots planned</div>
              {shot.notes && (
                <div className="text-xs text-blue-600 mt-1">📝 {shot.notes}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Priority */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-medium text-blue-800 mb-2">Next Priority</h3>
        {(() => {
          const nextShot = dailyShots.find(shot => !shot.completed)
          return nextShot ? (
            <div>
              <div className="font-medium text-sm text-blue-900">
                Day {nextShot.day}: {nextShot.location}
              </div>
              <div className="text-sm text-blue-700 mt-1">
                Focus on: {nextShot.shots.slice(0, 2).join(', ')}
                {nextShot.shots.length > 2 && ` (+${nextShot.shots.length - 2} more)`}
              </div>
            </div>
          ) : (
            <div className="text-green-600 font-medium">🎉 All daily shots completed!</div>
          )
        })()}
      </div>
    </div>
  )
}