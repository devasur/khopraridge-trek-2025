'use client'

import { DailyTrekSegment } from '@/data/trekRouteData'

interface CompactRouteCardProps {
  segment: DailyTrekSegment
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'bg-green-100 text-green-800 border-green-200'
    case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'difficult': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getDifficultyIcon = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return '🟢'
    case 'moderate': return '🟡'
    case 'difficult': return '🔴'
    default: return '⚪'
  }
}

export default function CompactRouteCard({ segment }: CompactRouteCardProps) {
  return (
    <div className="flex-shrink-0 w-80 border rounded-lg p-4 bg-white shadow-sm snap-start">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-bold text-nepal-blue">Day {segment.day}</span>
            <span className="text-lg">{getDifficultyIcon(segment.difficulty)}</span>
          </div>
          <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
            {segment.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-1">
            {segment.startPoint} → {segment.endPoint}
          </p>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-blue-50 rounded p-2 text-center">
          <div className="text-sm font-semibold text-blue-600">{segment.distance}</div>
          <div className="text-xs text-gray-500">Distance</div>
        </div>
        <div className="bg-green-50 rounded p-2 text-center">
          <div className="text-sm font-semibold text-green-600">{segment.duration}</div>
          <div className="text-xs text-gray-500">Duration</div>
        </div>
      </div>

      {/* Elevation Info */}
      <div className="flex justify-between mb-4 text-xs">
        <div className="flex items-center space-x-1">
          <span className="text-red-500">↗</span>
          <span className="text-gray-600">+{segment.elevationGain}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-purple-500">↘</span>
          <span className="text-gray-600">-{segment.elevationLoss}</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">🎯 Key Highlights</h4>
        <div className="space-y-1 max-h-16 overflow-y-auto">
          {segment.highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="text-xs text-gray-600 flex items-start">
              <span className="mr-1 text-blue-500">•</span>
              <span className="line-clamp-1">{highlight}</span>
            </div>
          ))}
          {segment.highlights.length > 3 && (
            <div className="text-xs text-gray-400 text-center">
              +{segment.highlights.length - 3} more
            </div>
          )}
        </div>
      </div>

      {/* Challenges Alert */}
      {segment.challenges.length > 0 && (
        <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <span className="text-sm">⚠️</span>
            <span className="text-xs font-medium text-yellow-800">Challenges</span>
          </div>
          <div className="text-xs text-yellow-700 line-clamp-2">
            {segment.challenges.slice(0, 2).join(', ')}
            {segment.challenges.length > 2 && '...'}
          </div>
        </div>
      )}

      {/* Difficulty Badge */}
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(segment.difficulty)}`}>
          {segment.difficulty.toUpperCase()}
        </span>
        <button className="text-xs text-blue-600 hover:underline">
          View Details
        </button>
      </div>
    </div>
  )
}