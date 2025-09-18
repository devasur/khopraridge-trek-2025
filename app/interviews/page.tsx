'use client'

import { useState } from 'react'
import { db } from '@/lib/instant'
import { isAdmin } from '@/lib/allowedUsers'
import InterviewScheduler from '@/components/InterviewScheduler'
import InterviewDailyPlans from '@/components/InterviewDailyPlans'
import InterviewDirectorDashboard from '@/components/InterviewDirectorDashboard'
import InterviewTemplates from '@/components/InterviewTemplates'

type TabType = 'dashboard' | 'scheduler' | 'daily-plans' | 'templates'

export default function InterviewsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const { user, isLoading } = db.useAuth()

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
      id: 'dashboard' as TabType,
      name: 'Director Dashboard',
      icon: '🎬',
      description: 'Coverage tracking & analysis',
      adminOnly: true
    },
    {
      id: 'daily-plans' as TabType,
      name: 'Daily Plans',
      icon: '📅',
      description: 'Day-by-day execution',
      adminOnly: false
    },
    {
      id: 'scheduler' as TabType,
      name: 'Scheduler',
      icon: '📋',
      description: 'Schedule new interviews',
      adminOnly: true
    },
    {
      id: 'templates' as TabType,
      name: 'Templates',
      icon: '📝',
      description: 'Question templates',
      adminOnly: true
    }
  ]

  const availableTabs = userIsAdmin ? tabs : tabs.filter(tab => !tab.adminOnly)

  return (
    <div className="space-y-8">
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
        <div className="min-h-[500px]">
          {activeTab === 'dashboard' && <InterviewDirectorDashboard />}
          {activeTab === 'daily-plans' && <InterviewDailyPlans />}
          {activeTab === 'scheduler' && <InterviewScheduler />}
          {activeTab === 'templates' && <InterviewTemplates />}
        </div>
      </div>

      {/* Quick Help */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Quick Guide</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Director Dashboard:</strong> Overview of all interview coverage and progress</p>
          <p><strong>Daily Plans:</strong> View and manage interviews by day, generate WhatsApp briefs</p>
          <p><strong>Scheduler:</strong> Plan new interviews with specific templates and participants</p>
          <p><strong>Templates:</strong> Create and manage question sets for different interview types</p>
        </div>
      </div>
    </div>
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