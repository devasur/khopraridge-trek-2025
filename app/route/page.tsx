'use client'

import { useState, useRef } from 'react'
import { trekWaypoints, dailyTrekSegments, trekStatistics } from '@/data/trekRouteData'
import TrekMap from '@/components/TrekMap'
import CompactRouteCard from '@/components/CompactRouteCard'
import MobileLayout from '@/components/MobileLayout'

export default function TrekRoutePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const getElevationColor = (elevation: number) => {
    if (elevation > 4000) return 'text-red-600 bg-red-50'
    if (elevation > 3500) return 'text-orange-600 bg-orange-50'
    if (elevation > 3000) return 'text-yellow-600 bg-yellow-50'
    if (elevation > 2500) return 'text-green-600 bg-green-50'
    return 'text-blue-600 bg-blue-50'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'moderate': return 'bg-yellow-100 text-yellow-800'
      case 'difficult': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getWaypointIcon = (type: string) => {
    switch (type) {
      case 'village': return '🏘️'
      case 'camp': return '⛺'
      case 'summit': return '⛰️'
      case 'lake': return '🏔️'
      default: return '📍'
    }
  }

  const difficultyStats = {
    easy: dailyTrekSegments.filter(s => s.difficulty === 'easy').length,
    moderate: dailyTrekSegments.filter(s => s.difficulty === 'moderate').length,
    difficult: dailyTrekSegments.filter(s => s.difficulty === 'difficult').length,
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout
          title="Trek Route"
          subtitle={`${dailyTrekSegments.length} days • ${trekStatistics.totalDistance}`}
        >
          <div className="space-y-4">
            {/* Route Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{trekStatistics.totalDays}</div>
                <div className="text-xs text-gray-600">Total Days</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{trekStatistics.totalDistance}</div>
                <div className="text-xs text-gray-600">Distance</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-red-600">{trekStatistics.highestPoint.elevationFt.toLocaleString()}'</div>
                <div className="text-xs text-gray-600">Highest</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-600">{trekStatistics.totalElevationGain}</div>
                <div className="text-xs text-gray-600">Ascent</div>
              </div>
            </div>

            {/* Difficulty Overview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">Difficulty Breakdown</h3>
              <div className="flex space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <span className="text-green-500">🟢</span>
                  <span>{difficultyStats.easy} Easy</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500">🟡</span>
                  <span>{difficultyStats.moderate} Moderate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-red-500">🔴</span>
                  <span>{difficultyStats.difficult} Difficult</span>
                </div>
              </div>
            </div>

            {/* Interactive Map - Compact */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-nepal-blue mb-3 text-sm">Interactive Map</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <TrekMap height="h-48" showElevationProfile={false} />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Tap waypoints for details. Swipe to zoom and pan.
              </p>
            </div>

            {/* Swipeable Daily Routes */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-nepal-blue">Daily Segments</h3>
                <span className="text-sm text-gray-500">{dailyTrekSegments.length} days</span>
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
                {dailyTrekSegments.map((segment) => (
                  <CompactRouteCard key={segment.day} segment={segment} />
                ))}
              </div>

              {/* Enhanced scroll indicator */}
              <div className="flex items-center justify-center mt-3 space-x-3">
                <div className="flex space-x-1">
                  {dailyTrekSegments.map((_, index) => (
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
                  <span>{currentIndex + 1}/{dailyTrekSegments.length}</span>
                  <span>•</span>
                  <span>Swipe to browse</span>
                </div>
              </div>
            </div>

            {/* Safety Alert - Mobile */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">🚨</span>
                <span className="font-semibold text-red-800 text-sm">Safety Alert</span>
              </div>
              <div className="text-xs text-red-700 space-y-1">
                <div>• Khayar Lake at 15,300ft - altitude risk</div>
                <div>• Monitor symptoms above 11,000ft</div>
                <div>• Stay hydrated: 3-4L water daily</div>
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🗺️ Trek Route & Elevation Profile</h1>
          <p className="text-gray-600">Complete trail guide with waypoints, elevation data, and daily segments</p>
        </div>

      {/* Trek Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{trekStatistics.totalDays}</div>
            <div className="text-sm text-gray-600">Total Days</div>
          </div>
        </div>
        <div className="card bg-green-50 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{trekStatistics.totalDistance}</div>
            <div className="text-sm text-gray-600">Total Distance</div>
          </div>
        </div>
        <div className="card bg-red-50 border-red-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{trekStatistics.highestPoint.elevationFt.toLocaleString()}'</div>
            <div className="text-sm text-gray-600">Highest Point</div>
          </div>
        </div>
        <div className="card bg-purple-50 border-purple-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{trekStatistics.totalElevationGain}</div>
            <div className="text-sm text-gray-600">Total Ascent</div>
          </div>
        </div>
      </div>

      {/* Interactive Trek Map */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">🗺️ Interactive Trek Map</h2>
        <p className="text-gray-600 mb-4">
          Explore the complete Khopra Ridge trek route with OpenStreetMap. Click on waypoints for detailed information.
        </p>
        <TrekMap height="h-[500px]" showElevationProfile={true} />
      </div>

      {/* Elevation Profile Visualization */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">📈 Elevation Profile</h2>
        <div className="space-y-4">
          {trekWaypoints.map((waypoint, index) => (
            <div key={waypoint.id} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-24">
                <span className="text-lg">{getWaypointIcon(waypoint.type)}</span>
                <span className="text-sm font-medium">Day {waypoint.day}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{waypoint.name}</h3>
                  <div className={`px-2 py-1 rounded text-sm font-medium ${getElevationColor(waypoint.elevation)}`}>
                    {waypoint.elevation}m ({waypoint.elevationFt.toLocaleString()}ft)
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full ${getElevationColor(waypoint.elevation).includes('red') ? 'bg-red-500' :
                      getElevationColor(waypoint.elevation).includes('orange') ? 'bg-orange-500' :
                      getElevationColor(waypoint.elevation).includes('yellow') ? 'bg-yellow-500' :
                      getElevationColor(waypoint.elevation).includes('green') ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(waypoint.elevation / trekStatistics.highestPoint.elevation) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">{waypoint.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Trek Segments */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-nepal-blue">📅 Daily Trek Segments</h2>
        <div className="grid grid-cols-1 gap-6">
          {dailyTrekSegments.map((segment) => (
            <div key={segment.day} className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Day {segment.day}: {segment.title}</h3>
                  <p className="text-sm text-gray-600">{segment.startPoint} → {segment.endPoint}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(segment.difficulty)}`}>
                  {segment.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{segment.distance}</div>
                  <div className="text-xs text-gray-500">Distance</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{segment.duration}</div>
                  <div className="text-xs text-gray-500">Duration</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-red-600">↗ {segment.elevationGain}</div>
                  <div className="text-xs text-gray-500">Elevation Gain</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-purple-600">↘ {segment.elevationLoss}</div>
                  <div className="text-xs text-gray-500">Elevation Loss</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">🎯 Highlights</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {segment.highlights.map((highlight, index) => (
                      <li key={index}>• {highlight}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">💧 Water Sources</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {segment.waterSources.map((source, index) => (
                      <li key={index}>• {source}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">⚠️ Challenges</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {segment.challenges.map((challenge, index) => (
                      <li key={index}>• {challenge}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded">
                <h4 className="font-medium text-gray-800 mb-2">📸 Photography Opportunities</h4>
                <div className="flex flex-wrap gap-2">
                  {segment.photography.map((photo, index) => (
                    <span key={index} className="px-2 py-1 bg-white rounded text-xs text-gray-600 border">
                      {photo}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Safety Information */}
      <div className="card bg-red-50 border-red-200">
        <h2 className="text-xl font-semibold text-red-800 mb-4">🚨 Critical Safety & Navigation Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-red-800 mb-3">High Altitude Considerations</h3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Khayar Lake at 15,300ft - monitor for altitude sickness symptoms</li>
              <li>Acclimatization crucial above 11,000ft</li>
              <li>Descend immediately if severe symptoms occur</li>
              <li>Carry altitude sickness medication</li>
              <li>Stay hydrated - 3-4L water daily</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-red-800 mb-3">Navigation & Weather</h3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              <li>Muldai Top junction critical - right to lake, left to ridge</li>
              <li>No water sources 3 hours into Khayar Lake trek</li>
              <li>Weather changes rapidly above tree line</li>
              <li>Early start essential for Day 7 (Khayar Lake)</li>
              <li>Always travel with group - no solo hiking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Route Planning Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">🗺️ Navigation Tools</h3>
          <div className="space-y-2 text-sm">
            <button className="w-full text-left p-2 bg-white rounded border hover:shadow-sm">
              📱 Download Offline Maps (Maps.me)
            </button>
            <button className="w-full text-left p-2 bg-white rounded border hover:shadow-sm">
              🧭 GPS Coordinates Export
            </button>
            <button className="w-full text-left p-2 bg-white rounded border hover:shadow-sm">
              📋 Daily Waypoint Checklist
            </button>
            <button className="w-full text-left p-2 bg-white rounded border hover:shadow-sm">
              ⏰ Timing Calculator
            </button>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">📊 Progress Tracking</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Daily Progress</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">0/9 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Waypoints Reached</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">0/{trekWaypoints.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Elevation Gained</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">0 ft</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}