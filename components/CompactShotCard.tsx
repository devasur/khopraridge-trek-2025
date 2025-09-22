'use client'

import { DailyShot } from '@/data/documentaryData'

interface CompactShotCardProps {
  shot: DailyShot
  onComplete?: (shotId: string) => void
  onViewDetails?: (shotId: string) => void
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

export default function CompactShotCard({ shot, onComplete, onViewDetails }: CompactShotCardProps) {
  return (
    <div className={`flex-shrink-0 w-80 border rounded-lg p-4 shadow-sm snap-start ${
      shot.completed ? 'bg-green-50 border-green-300' : priorityColors[shot.priority]
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <span className="text-xl flex-shrink-0">
            {shot.completed ? '✅' : priorityIcons[shot.priority]}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm leading-tight mb-1 truncate">
              Day {shot.day}: {shot.location}
            </h3>
            <div className="text-xs text-gray-500">
              {shot.shots.length} shots • {shot.priority.toUpperCase()}
            </div>
          </div>
        </div>
        <button
          onClick={() => onComplete?.(shot.id)}
          className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-medium transition-all active:scale-95 ${
            shot.completed
              ? 'bg-green-200 text-green-800'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {shot.completed ? '✓' : 'Mark'}
        </button>
      </div>

      {/* Shot List - Compact */}
      <div className="mb-4">
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {shot.shots.slice(0, 4).map((shotDescription, index) => (
            <div
              key={index}
              className="flex items-start space-x-2 text-xs"
            >
              <input
                type="checkbox"
                defaultChecked={shot.completed}
                className="rounded mt-0.5 flex-shrink-0"
                style={{ transform: 'scale(0.8)' }}
              />
              <span className="text-gray-700 leading-tight line-clamp-2">{shotDescription}</span>
            </div>
          ))}
          {shot.shots.length > 4 && (
            <div className="text-xs text-gray-400 text-center">
              +{shot.shots.length - 4} more shots
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      {shot.notes && (
        <div className="mb-3 p-2 bg-blue-50 rounded border border-blue-200">
          <div className="text-xs text-blue-700 line-clamp-2">{shot.notes}</div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <span className={`px-2 py-1 rounded-full ${
          shot.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
        }`}>
          {shot.completed ? 'Complete' : 'Pending'}
        </span>
        <button
          onClick={() => onViewDetails?.(shot.id)}
          className="text-blue-600 hover:underline active:scale-95 transition-transform"
        >
          View Details
        </button>
      </div>
    </div>
  )
}