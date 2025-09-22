'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { teamRoles, equipmentList, dailyShots, interviewQuestions, technicalStandards } from '@/data/documentaryData'
import MobileLayout from '@/components/MobileLayout'

export default function DocumentaryPage() {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const storyScrollRef = useRef<HTMLDivElement>(null)

  const assignedRoles = teamRoles.filter(role => role.assignee).length
  const completedShots = dailyShots.filter(shot => shot.completed).length
  const completedInterviews = interviewQuestions.filter(interview => interview.completed).length
  const availableEquipment = equipmentList.filter(eq => eq.status === 'available').length

  // Story arc data for swipeable navigation
  const storyArcs = [
    {
      id: 'act1',
      title: 'The Journey Begins',
      days: 'Days 1-3',
      description: 'Introductions, expectations, initial challenges',
      color: 'blue',
      shots: dailyShots.filter(shot => shot.day >= 1 && shot.day <= 3),
      keyMoments: ['Arrival in Pokhara', 'Team Formation', 'Trek Preparation']
    },
    {
      id: 'act2',
      title: 'The Challenge',
      days: 'Days 4-6',
      description: 'Altitude, physical demands, reaching Khopra Ridge',
      color: 'green',
      shots: dailyShots.filter(shot => shot.day >= 4 && shot.day <= 6),
      keyMoments: ['First Ascent', 'Altitude Effects', 'Team Support']
    },
    {
      id: 'act3',
      title: 'The Sacred Lake',
      days: 'Day 7',
      description: 'Ultimate challenge, spiritual transformation',
      color: 'purple',
      shots: dailyShots.filter(shot => shot.day === 7),
      keyMoments: ['Khayar Lake Trek', 'Personal Reflection', 'Achievement']
    },
    {
      id: 'act4',
      title: 'The Return',
      days: 'Days 8-9',
      description: 'Reflection, achievement, lasting bonds',
      color: 'orange',
      shots: dailyShots.filter(shot => shot.day >= 8 && shot.day <= 9),
      keyMoments: ['Descent Journey', 'Final Interviews', 'Group Reflection']
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800'
    }
    return colorMap[color] || 'bg-gray-50 border-gray-200 text-gray-800'
  }

  const quickActionItems = [
    {
      href: '/documentary/roles',
      icon: '👥',
      title: 'Team Roles',
      subtitle: 'Assign responsibilities',
      count: `${assignedRoles}/${teamRoles.length}`,
      status: assignedRoles === teamRoles.length ? 'complete' : 'pending'
    },
    {
      href: '/documentary/shots',
      icon: '📹',
      title: 'Daily Shots',
      subtitle: 'Track filming progress',
      count: `${completedShots}/${dailyShots.length}`,
      status: completedShots === dailyShots.length ? 'complete' : 'pending'
    },
    {
      href: '/documentary/equipment',
      icon: '📷',
      title: 'Equipment',
      subtitle: 'Manage gear',
      count: `${availableEquipment}/${equipmentList.length}`,
      status: availableEquipment === equipmentList.length ? 'complete' : 'pending'
    },
    {
      href: '/interviews',
      icon: '🎤',
      title: 'Interviews',
      subtitle: 'Schedule & track',
      count: `${completedInterviews}/${interviewQuestions.length}`,
      status: completedInterviews === interviewQuestions.length ? 'complete' : 'pending'
    }
  ]

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout
          title="Documentary Hub"
          subtitle="Professional filmmaking coordination"
        >
          <div className="space-y-4">
            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-600">{assignedRoles}/{teamRoles.length}</div>
                <div className="text-xs text-gray-600">Roles</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{completedShots}/{dailyShots.length}</div>
                <div className="text-xs text-gray-600">Shots</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{availableEquipment}/{equipmentList.length}</div>
                <div className="text-xs text-gray-600">Equipment</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-orange-600">{completedInterviews}/{interviewQuestions.length}</div>
                <div className="text-xs text-gray-600">Interviews</div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h3 className="font-semibold text-nepal-blue mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActionItems.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className={`border rounded-lg p-3 text-center active:scale-95 transition-all ${
                      action.status === 'complete'
                        ? 'bg-green-50 border-green-200'
                        : 'bg-white border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-2xl mb-1">{action.icon}</div>
                    <div className="font-medium text-sm text-nepal-blue mb-1">{action.title}</div>
                    <div className="text-xs text-gray-600 mb-1">{action.subtitle}</div>
                    <div className={`text-xs font-medium ${
                      action.status === 'complete' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {action.count}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Swipeable Story Arcs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-nepal-blue">Story Arc</h3>
                <span className="text-sm text-gray-500">{storyArcs.length} acts</span>
              </div>

              <div
                ref={storyScrollRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
                onScroll={(e) => {
                  const container = e.target as HTMLElement
                  const cardWidth = 280 + 16
                  const scrollLeft = container.scrollLeft
                  const newIndex = Math.round(scrollLeft / cardWidth)
                  setCurrentStoryIndex(newIndex)
                }}
              >
                {storyArcs.map((arc, index) => (
                  <div
                    key={arc.id}
                    className={`flex-shrink-0 w-70 border rounded-lg p-4 shadow-sm snap-start ${getColorClasses(arc.color)}`}
                  >
                    <div className="mb-3">
                      <h4 className="font-semibold text-sm mb-1">{arc.title}</h4>
                      <div className="text-xs opacity-75 mb-2">{arc.days}</div>
                      <p className="text-xs leading-tight">{arc.description}</p>
                    </div>

                    {/* Key Moments */}
                    <div className="mb-3">
                      <div className="text-xs font-medium mb-2">Key Moments</div>
                      <div className="space-y-1">
                        {arc.keyMoments.slice(0, 3).map((moment, idx) => (
                          <div key={idx} className="text-xs opacity-75 flex items-start">
                            <span className="mr-1">•</span>
                            <span className="line-clamp-1">{moment}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shots Preview */}
                    <div className="mb-3">
                      <div className="text-xs font-medium mb-2">
                        Planned Shots ({arc.shots.length})
                      </div>
                      <div className="space-y-1">
                        {arc.shots.slice(0, 2).map((shot, idx) => (
                          <Link
                            key={shot.id}
                            href={`/documentary/shots?day=${shot.day}`}
                            className="block text-xs opacity-75 hover:opacity-100 active:scale-95 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="truncate">Day {shot.day}: {shot.location}</span>
                              <span className={`w-2 h-2 rounded-full ${
                                shot.completed ? 'bg-current' : 'bg-gray-300'
                              }`} />
                            </div>
                          </Link>
                        ))}
                        {arc.shots.length > 2 && (
                          <Link
                            href="/documentary/shots"
                            className="text-xs opacity-60 hover:opacity-80 block"
                          >
                            +{arc.shots.length - 2} more days
                          </Link>
                        )}
                      </div>
                    </div>

                    <Link
                      href="/documentary/shots"
                      className="text-xs underline opacity-75 hover:opacity-100"
                    >
                      View All Shots
                    </Link>
                  </div>
                ))}
              </div>

              {/* Story Arc Indicators */}
              <div className="flex items-center justify-center mt-3 space-x-3">
                <div className="flex space-x-1">
                  {storyArcs.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStoryIndex ? 'bg-nepal-blue w-6' : 'bg-gray-300'
                      }`}
                      onClick={() => {
                        const cardWidth = 280 + 16
                        storyScrollRef.current?.scrollTo({
                          left: index * cardWidth,
                          behavior: 'smooth'
                        })
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <span>{currentStoryIndex + 1}/{storyArcs.length}</span>
                  <span>•</span>
                  <span>Swipe acts</span>
                </div>
              </div>
            </div>

            {/* Technical Specs - Compact */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-nepal-blue mb-3">Technical Standards</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Video:</span>
                  <span>{technicalStandards.video.resolution} @ {technicalStandards.video.frameRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Audio:</span>
                  <span>{technicalStandards.audio.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Photos:</span>
                  <span>{technicalStandards.photos.resolution}</span>
                </div>
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🎬 Documentary Production Center</h1>
          <p className="text-gray-600">Professional filmmaking coordination for your Nepal adventure</p>
        </div>

        {/* Production Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card bg-purple-50 border-purple-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{assignedRoles}/{teamRoles.length}</div>
              <div className="text-sm text-gray-600">Roles Assigned</div>
            </div>
          </div>
          <div className="card bg-blue-50 border-blue-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{completedShots}/{dailyShots.length}</div>
              <div className="text-sm text-gray-600">Daily Shots Complete</div>
            </div>
          </div>
          <div className="card bg-green-50 border-green-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{availableEquipment}/{equipmentList.length}</div>
              <div className="text-sm text-gray-600">Equipment Ready</div>
            </div>
          </div>
          <div className="card bg-orange-50 border-orange-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{completedInterviews}/{interviewQuestions.length}</div>
              <div className="text-sm text-gray-600">Interviews Done</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`card hover:shadow-lg transition-shadow text-center ${
                action.status === 'complete' ? 'bg-green-50 border-green-200' : ''
              }`}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <h3 className="font-semibold text-nepal-blue">{action.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{action.subtitle}</p>
              <div className={`text-sm font-medium ${
                action.status === 'complete' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {action.count}
              </div>
            </Link>
          ))}
        </div>

        {/* Story Arc Framework with Shot Links */}
        <div className="card">
          <h2 className="text-xl font-semibold text-nepal-blue mb-4">Documentary Story Arc</h2>
          <div className="space-y-4">
            {storyArcs.map((arc, index) => (
              <div key={arc.id} className={`border-l-4 border-${arc.color}-400 pl-4`}>
                <h3 className={`font-semibold text-${arc.color}-800`}>{arc.title} ({arc.days})</h3>
                <p className="text-sm text-gray-600 mb-2">{arc.description}</p>

                {/* Planned Shots for this arc */}
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Planned Shots ({arc.shots.length} days)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {arc.shots.map((shot) => (
                      <Link
                        key={shot.id}
                        href={`/documentary/shots?day=${shot.day}`}
                        className={`text-xs p-2 rounded border transition-all hover:shadow-sm ${
                          shot.completed
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Day {shot.day}: {shot.location}</span>
                          <span className={`w-2 h-2 rounded-full ${
                            shot.completed ? 'bg-green-500' : 'bg-gray-300'
                          }`} />
                        </div>
                        <div className="text-gray-500 mt-1">
                          {shot.shots.length} shots • {shot.priority} priority
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Standards */}
        <div className="card">
          <h2 className="text-xl font-semibold text-nepal-blue mb-4">Technical Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">📹 Video Standards</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Resolution:</span> {technicalStandards.video.resolution}</div>
                <div><span className="font-medium">Frame Rate:</span> {technicalStandards.video.frameRate}</div>
                <div><span className="font-medium">Format:</span> {technicalStandards.video.format}</div>
                <div><span className="font-medium">Storage:</span> {technicalStandards.video.storage}</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">🎵 Audio Standards</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Format:</span> {technicalStandards.audio.format}</div>
                <div><span className="font-medium">External:</span> {technicalStandards.audio.external}</div>
                <div><span className="font-medium">Backup:</span> {technicalStandards.audio.backup}</div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">📸 Photo Standards</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">Resolution:</span> {technicalStandards.photos.resolution}</div>
                <div><span className="font-medium">Format:</span> {technicalStandards.photos.format}</div>
                <div><span className="font-medium">Backup:</span> {technicalStandards.photos.backup}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Production Checklist */}
        <div className="card bg-yellow-50 border-yellow-200">
          <h2 className="text-xl font-semibold text-yellow-800 mb-4">Pre-Production Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">All team roles assigned</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Equipment inventory completed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Memory cards formatted</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Batteries fully charged</span>
              </label>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Backup storage organized</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Interview questions prepared</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Daily shot lists reviewed</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Team briefing completed</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}