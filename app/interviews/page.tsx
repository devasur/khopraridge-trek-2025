'use client'

import { useState, useRef } from 'react'
import { db } from '@/lib/instant'
import { isAdmin } from '@/lib/allowedUsers'
import InterviewScheduler from '@/components/InterviewScheduler'
import InterviewDailyPlans from '@/components/InterviewDailyPlans'
import InterviewDirectorDashboard from '@/components/InterviewDirectorDashboard'
import InterviewTemplates from '@/components/InterviewTemplates'
import MobileLayout from '@/components/MobileLayout'

type TabType = 'dashboard' | 'scheduler' | 'daily-plans' | 'templates'

export default function InterviewsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('daily-plans')
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const { user, isLoading } = db.useAuth()

  // Interview categories data for swipeable navigation
  const { data: schedulesData } = db.useQuery({ interviewSchedules: {} })
  const { data: templatesData } = db.useQuery({ interviewTemplates: {} })

  const schedules = schedulesData?.interviewSchedules || []
  const templates = templatesData?.interviewTemplates || []

  const stats = {
    total: schedules.length,
    completed: schedules.filter((s: any) => s.status === 'completed').length,
    pending: schedules.filter((s: any) => ['planned', 'confirmed'].includes(s.status)).length,
    templates: templates.length
  }

  // Interview categories for swipeable navigation
  const interviewCategories = [
    {
      id: 'personal',
      title: 'Personal Stories',
      icon: '👤',
      description: 'Individual experiences and motivations',
      color: 'blue',
      interviews: schedules.filter((s: any) => s.category === 'personal' || s.type === 'personal'),
      keyQuestions: ['What drove you to join this trek?', 'How has this journey changed you?', 'What was your biggest fear?']
    },
    {
      id: 'group',
      title: 'Group Dynamics',
      icon: '👥',
      description: 'Team interactions and relationships',
      color: 'green',
      interviews: schedules.filter((s: any) => s.category === 'group' || s.type === 'group'),
      keyQuestions: ['How has the team supported each other?', 'What group challenges emerged?', 'Best team moments?']
    },
    {
      id: 'technical',
      title: 'Technical Insights',
      icon: '⛰️',
      description: 'Trek logistics and challenges',
      color: 'purple',
      interviews: schedules.filter((s: any) => s.category === 'technical' || s.type === 'technical'),
      keyQuestions: ['Altitude effects experienced?', 'Gear that proved essential?', 'Navigation challenges?']
    },
    {
      id: 'reflection',
      title: 'Reflections',
      icon: '✨',
      description: 'Deep thoughts and transformations',
      color: 'orange',
      interviews: schedules.filter((s: any) => s.category === 'reflection' || s.type === 'reflection'),
      keyQuestions: ['Life lessons learned?', 'How will this impact your future?', 'What would you tell others?']
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

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🎬 Interview Management</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🎬 Interview Management</h1>
          <p className="text-red-600">Please log in to access interview management.</p>
        </div>
      </div>
    )
  }

  const userIsAdmin = isAdmin(user.email)

  const tabs = [
    {
      id: 'daily-plans' as TabType,
      name: 'Today',
      icon: '📅',
      description: 'Today\'s interviews and plans',
      adminOnly: false
    },
    {
      id: 'scheduler' as TabType,
      name: 'Schedule',
      icon: '📋',
      description: 'Plan new interviews',
      adminOnly: true
    },
    {
      id: 'templates' as TabType,
      name: 'Templates',
      icon: '📝',
      description: 'Question templates for different interview types',
      adminOnly: true
    },
    {
      id: 'dashboard' as TabType,
      name: 'Overview',
      icon: '🎬',
      description: 'Production progress',
      adminOnly: true
    }
  ]

  const availableTabs = userIsAdmin ? tabs : tabs.filter(tab => !tab.adminOnly)

  const quickActionItems = availableTabs.map(tab => ({
    id: tab.id,
    icon: tab.icon,
    title: tab.name,
    subtitle: tab.description,
    count: tab.id === 'daily-plans' ? `${stats.pending}` :
           tab.id === 'templates' ? `${stats.templates}` :
           tab.id === 'dashboard' ? `${stats.completed}/${stats.total}` : '',
    status: tab.id === 'daily-plans' && stats.pending > 0 ? 'pending' : 'ready',
    onClick: () => setActiveTab(tab.id)
  }))

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileLayout
          title="Interview Hub"
          subtitle="Documentary production coordination"
          actions={
            !userIsAdmin ? (
              <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                Limited
              </span>
            ) : undefined
          }
        >
          <div className="space-y-4">
            {/* Compact Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-blue-600">{stats.total}</div>
                <div className="text-xs text-gray-600">Total</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-green-600">{stats.completed}</div>
                <div className="text-xs text-gray-600">Done</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-xs text-gray-600">Pending</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-purple-600">{stats.templates}</div>
                <div className="text-xs text-gray-600">Templates</div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div>
              <h3 className="font-semibold text-nepal-blue mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActionItems.map((action, index) => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    className={`border rounded-lg p-3 text-center active:scale-95 transition-all ${
                      activeTab === action.id
                        ? 'bg-nepal-blue text-white border-nepal-blue'
                        : action.status === 'pending'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-white border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-2xl mb-1">{action.icon}</div>
                    <div className={`font-medium text-sm mb-1 ${
                      activeTab === action.id ? 'text-white' : 'text-nepal-blue'
                    }`}>
                      {action.title}
                    </div>
                    <div className={`text-xs mb-1 ${
                      activeTab === action.id ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {action.subtitle}
                    </div>
                    {action.count && (
                      <div className={`text-xs font-medium ${
                        activeTab === action.id ? 'text-blue-200' :
                        action.status === 'pending' ? 'text-yellow-600' : 'text-gray-500'
                      }`}>
                        {action.count}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Swipeable Interview Categories */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-nepal-blue">Interview Types</h3>
                <span className="text-sm text-gray-500">{interviewCategories.length} categories</span>
              </div>

              <div
                ref={categoryScrollRef}
                className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
                onScroll={(e) => {
                  const container = e.target as HTMLElement
                  const cardWidth = 280 + 16
                  const scrollLeft = container.scrollLeft
                  const newIndex = Math.round(scrollLeft / cardWidth)
                  setCurrentCategoryIndex(newIndex)
                }}
              >
                {interviewCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`flex-shrink-0 w-70 border rounded-lg p-4 shadow-sm snap-start ${getColorClasses(category.color)}`}
                  >
                    <div className="mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl">{category.icon}</span>
                        <h4 className="font-semibold text-sm">{category.title}</h4>
                      </div>
                      <p className="text-xs leading-tight opacity-75">{category.description}</p>
                    </div>

                    {/* Interview Count */}
                    <div className="mb-3 p-2 bg-white bg-opacity-50 rounded border">
                      <div className="text-xs font-medium mb-1">Planned Interviews</div>
                      <div className="text-sm font-bold">
                        {category.interviews.length} scheduled
                      </div>
                    </div>

                    {/* Key Questions Preview */}
                    <div className="mb-3">
                      <div className="text-xs font-medium mb-2">Sample Questions</div>
                      <div className="space-y-1">
                        {category.keyQuestions.slice(0, 2).map((question, idx) => (
                          <div key={idx} className="text-xs opacity-75 flex items-start">
                            <span className="mr-1">•</span>
                            <span className="line-clamp-2">{question}</span>
                          </div>
                        ))}
                        {category.keyQuestions.length > 2 && (
                          <div className="text-xs opacity-60">
                            +{category.keyQuestions.length - 2} more questions
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('templates')}
                      className="text-xs underline opacity-75 hover:opacity-100"
                    >
                      View Templates
                    </button>
                  </div>
                ))}
              </div>

              {/* Category Indicators */}
              <div className="flex items-center justify-center mt-3 space-x-3">
                <div className="flex space-x-1">
                  {interviewCategories.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentCategoryIndex ? 'bg-nepal-blue w-6' : 'bg-gray-300'
                      }`}
                      onClick={() => {
                        const cardWidth = 280 + 16
                        categoryScrollRef.current?.scrollTo({
                          left: index * cardWidth,
                          behavior: 'smooth'
                        })
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <span>{currentCategoryIndex + 1}/{interviewCategories.length}</span>
                  <span>•</span>
                  <span>Swipe types</span>
                </div>
              </div>
            </div>

            {/* Active Tab Content */}
            <div className="mt-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                {activeTab === 'daily-plans' && <InterviewDailyPlans />}
                {activeTab === 'scheduler' && <InterviewScheduler />}
                {activeTab === 'templates' && <InterviewTemplates />}
                {activeTab === 'dashboard' && <InterviewDirectorDashboard />}
              </div>
            </div>
          </div>
        </MobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🎬 Interview Management</h1>
          <p className="text-gray-600">
            Comprehensive interview scheduling and tracking for documentary production
          </p>
          {!userIsAdmin && (
            <div className="mt-2 text-sm text-yellow-600">
              Limited access - contact admin for full interview management features
            </div>
          )}
        </div>

        {/* System Overview Cards */}
        <InterviewSystemOverview />

        {/* Interview Categories Overview */}
        <div className="card">
          <h2 className="text-xl font-semibold text-nepal-blue mb-4">Interview Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {interviewCategories.map((category, index) => (
              <div
                key={category.id}
                className={`p-4 rounded-lg border ${getColorClasses(category.color)}`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <p className="text-sm opacity-75 mb-3">{category.description}</p>
                <div className="text-sm font-medium mb-2">
                  {category.interviews.length} scheduled
                </div>
                <div className="space-y-1">
                  {category.keyQuestions.slice(0, 1).map((question, idx) => (
                    <div key={idx} className="text-xs opacity-75">
                      • {question}
                    </div>
                  ))}
                  {category.keyQuestions.length > 1 && (
                    <div className="text-xs opacity-60">
                      +{category.keyQuestions.length - 1} more questions
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-nepal-blue text-white'
                    : 'text-gray-600 hover:text-nepal-blue hover:bg-nepal-blue/5'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Description */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              {availableTabs.find(tab => tab.id === activeTab)?.description}
            </p>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'daily-plans' && <InterviewDailyPlans />}
            {activeTab === 'scheduler' && <InterviewScheduler />}
            {activeTab === 'templates' && <InterviewTemplates />}
            {activeTab === 'dashboard' && <InterviewDirectorDashboard />}
          </div>
        </div>
      </div>
    </>
  )
}

// System Overview Component
function InterviewSystemOverview() {
  const { data: schedulesData } = db.useQuery({ interviewSchedules: {} })
  const { data: templatesData } = db.useQuery({ interviewTemplates: {} })

  const schedules = schedulesData?.interviewSchedules || []
  const templates = templatesData?.interviewTemplates || []

  const stats = {
    total: schedules.length,
    completed: schedules.filter((s: any) => s.status === 'completed').length,
    pending: schedules.filter((s: any) => ['planned', 'confirmed'].includes(s.status)).length,
    templates: templates.length
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-blue-600">Total Interviews</div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-green-600">Completed</div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-yellow-50 to-yellow-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-sm text-yellow-600">Pending</div>
        </div>
      </div>

      <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{completionRate}%</div>
          <div className="text-sm text-purple-600">Completion Rate</div>
        </div>
      </div>
    </div>
  )
}