'use client'

import { useState, useRef } from 'react'
import { dailyShots } from '@/data/documentaryData'
import DailyShotCard from '@/components/DailyShotCard'
import CompactShotCard from '@/components/CompactShotCard'
import MobileLayout from '@/components/MobileLayout'

export default function ShotsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedShot, setSelectedShot] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const highPriorityShots = dailyShots.filter(shot => shot.priority === 'high' && !shot.completed)
  const completedShots = dailyShots.filter(shot => shot.completed)
  const pendingShots = dailyShots.filter(shot => !shot.completed)

  const priorityOrder = { high: 3, medium: 2, low: 1 }
  const sortedShots = [...dailyShots].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  })

  const handleMarkComplete = (shotId: string) => {
    // This would update the shot status in real implementation
    console.log('Marking shot complete:', shotId)
  }

  const handleViewDetails = (shotId: string) => {
    setSelectedShot(shotId)
  }

  const selectedShotData = selectedShot ? dailyShots.find(shot => shot.id === selectedShot) : null

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout
          title="Daily Shot Tracker"
          subtitle={`${pendingShots.length} pending, ${completedShots.length} done`}
          actions={
            highPriorityShots.length > 0 ? (
              <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-2">
                {highPriorityShots.length}
              </span>
            ) : undefined
          }
        >
          <div className="space-y-4">
            {/* Priority Alert - Mobile */}
            {highPriorityShots.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">🔴</span>
                  <span className="font-semibold text-red-800 text-sm">
                    {highPriorityShots.length} High Priority
                  </span>
                </div>
                <div className="text-xs text-red-600">
                  Critical filming days need attention
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{completedShots.length}</div>
                <div className="text-xs text-gray-600">Done</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-yellow-600">{pendingShots.length}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">
                  {dailyShots.reduce((total, shot) => total + shot.shots.length, 0)}
                </div>
                <div className="text-xs text-gray-600">Total Shots</div>
              </div>
            </div>

            {/* Swipeable Shot Cards */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-nepal-blue">Daily Shots</h3>
                <span className="text-sm text-gray-500">{sortedShots.length} days</span>
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
                {sortedShots.map((shot) => (
                  <CompactShotCard
                    key={shot.id}
                    shot={shot}
                    onComplete={handleMarkComplete}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Enhanced scroll indicator */}
              <div className="flex items-center justify-center mt-3 space-x-3">
                <div className="flex space-x-1">
                  {sortedShots.map((_, index) => (
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
                  <span>{currentIndex + 1}/{sortedShots.length}</span>
                  <span>•</span>
                  <span>Swipe to browse</span>
                </div>
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>

      {/* Mobile Shot Details Modal */}
      {selectedShotData && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[90vh] rounded-t-2xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Day {selectedShotData.day}: {selectedShotData.location}
              </h2>
              <button
                onClick={() => setSelectedShot(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <DailyShotCard shot={selectedShotData} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-8">
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
    </>
  )
}