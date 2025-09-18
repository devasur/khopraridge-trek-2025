'use client'

import { useState } from 'react'
import { db } from '@/lib/instant'

export default function InterviewDirectorDashboard() {
  const { data: schedulesData } = db.useQuery({ interviewSchedules: {} })
  const { data: storyArcData } = db.useQuery({ storyArcElements: {} })
  const { data: templatesData } = db.useQuery({ interviewTemplates: {} })
  const { data: trekMembersData } = db.useQuery({ trekMembers: {} })

  const schedules = schedulesData?.interviewSchedules || []
  const storyElements = storyArcData?.storyArcElements || []
  const templates = templatesData?.interviewTemplates || []
  const trekMembers = trekMembersData?.trekMembers || []

  // Calculate coverage statistics
  const totalScheduled = schedules.length
  const completed = schedules.filter((s: any) => s.status === 'completed').length
  const failed = schedules.filter((s: any) => s.status === 'failed').length
  const pending = schedules.filter((s: any) => ['planned', 'confirmed'].includes(s.status)).length
  const inProgress = schedules.filter((s: any) => s.status === 'in-progress').length

  // Coverage by phase
  const phaseStats = {
    'pre-trek': schedules.filter((s: any) => s.phase === 'pre-trek'),
    'during-trek': schedules.filter((s: any) => s.phase === 'during-trek'),
    'post-trek': schedules.filter((s: any) => s.phase === 'post-trek')
  }

  // Coverage by person
  const personCoverage = trekMembers.map((member: any) => {
    const memberInterviews = schedules.filter((s: any) => s.intervieweeName === member.name)
    return {
      name: member.name,
      total: memberInterviews.length,
      completed: memberInterviews.filter((s: any) => s.status === 'completed').length,
      pending: memberInterviews.filter((s: any) => ['planned', 'confirmed'].includes(s.status)).length,
      coverage: memberInterviews.length > 0 ? Math.round((memberInterviews.filter((s: any) => s.status === 'completed').length / memberInterviews.length) * 100) : 0
    }
  })

  // Template usage analysis
  const templateUsage = templates.map((template: any) => {
    const usageCount = schedules.filter((s: any) => s.templateName === template.name).length
    const completedCount = schedules.filter((s: any) => s.templateName === template.name && s.status === 'completed').length
    return {
      name: template.name,
      scheduled: usageCount,
      completed: completedCount,
      completionRate: usageCount > 0 ? Math.round((completedCount / usageCount) * 100) : 0
    }
  })

  // Recent activity
  const recentActivities = schedules
    .filter((s: any) => ['completed', 'failed'].includes(s.status))
    .sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  // Upcoming priorities
  const upcomingHighPriority = schedules
    .filter((s: any) => s.priority === 'high' && ['planned', 'confirmed'].includes(s.status))
    .sort((a: any, b: any) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime())
    .slice(0, 5)

  const generateCoverageReport = () => {
    let report = "📊 INTERVIEW COVERAGE REPORT\n"
    report += `Generated: ${new Date().toLocaleDateString()}\n\n`

    report += "📈 OVERALL STATISTICS\n"
    report += `Total Interviews: ${totalScheduled}\n`
    report += `Completed: ${completed} (${Math.round((completed/totalScheduled)*100)}%)\n`
    report += `Failed: ${failed}\n`
    report += `Pending: ${pending}\n`
    report += `In Progress: ${inProgress}\n\n`

    report += "📅 PHASE BREAKDOWN\n"
    Object.entries(phaseStats).forEach(([phase, interviews]) => {
      const phaseCompleted = (interviews as any[]).filter(s => s.status === 'completed').length
      report += `${phase}: ${phaseCompleted}/${(interviews as any[]).length} completed\n`
    })
    report += "\n"

    report += "👥 PERSON COVERAGE\n"
    personCoverage.forEach(person => {
      report += `${person.name}: ${person.completed}/${person.total} (${person.coverage}%)\n`
    })
    report += "\n"

    report += "📝 TEMPLATE USAGE\n"
    templateUsage.forEach(template => {
      report += `${template.name}: ${template.completed}/${template.scheduled} (${template.completionRate}%)\n`
    })

    navigator.clipboard.writeText(report)
    alert('Coverage report copied to clipboard!')
  }

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-nepal-blue">🎬 Director Dashboard</h2>
          <button
            onClick={generateCoverageReport}
            className="px-4 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90"
          >
            📊 Generate Report
          </button>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{totalScheduled}</div>
            <div className="text-sm text-blue-600">Total</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{completed}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-yellow-600">{pending}</div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{inProgress}</div>
            <div className="text-sm text-orange-600">In Progress</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-red-600">{failed}</div>
            <div className="text-sm text-red-600">Failed</div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Completion Rate</span>
            <span className="text-sm font-medium">{Math.round((completed/totalScheduled)*100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completed/totalScheduled)*100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Phase Coverage */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">📅 Coverage by Phase</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(phaseStats).map(([phase, interviews]) => {
            const phaseCompleted = (interviews as any[]).filter(s => s.status === 'completed').length
            const phaseTotal = (interviews as any[]).length
            const phaseRate = phaseTotal > 0 ? Math.round((phaseCompleted/phaseTotal)*100) : 0

            return (
              <div key={phase} className="border rounded-lg p-4">
                <h4 className="font-medium capitalize mb-2">{phase.replace('-', ' ')}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{phaseCompleted}/{phaseTotal} completed</span>
                  <span className="text-sm font-medium">{phaseRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-nepal-blue h-2 rounded-full"
                    style={{ width: `${phaseRate}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Person Coverage */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">👥 Individual Coverage</h3>
        <div className="space-y-3">
          {personCoverage.map(person => (
            <div key={person.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{person.name}</span>
                <span className="text-sm text-gray-600">
                  {person.completed}/{person.total} interviews
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      person.coverage >= 80 ? 'bg-green-600' :
                      person.coverage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${person.coverage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-10">{person.coverage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template Usage */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">📝 Template Usage Analysis</h3>
        <div className="space-y-3">
          {templateUsage.map(template => (
            <div key={template.name} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{template.name}</span>
                <span className="text-sm text-gray-600">
                  {template.completed}/{template.scheduled} completed
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      template.completionRate >= 80 ? 'bg-green-600' :
                      template.completionRate >= 50 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${template.completionRate}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-10">{template.completionRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-nepal-blue mb-4">🕒 Recent Activity</h3>
          {recentActivities.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {recentActivities.map((activity: any) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{activity.intervieweeName}</div>
                    <div className="text-sm text-gray-600">{activity.templateName}</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      activity.status === 'completed' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {activity.status.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(activity.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming High Priority */}
        <div className="card">
          <h3 className="text-lg font-semibold text-nepal-blue mb-4">🔴 High Priority Upcoming</h3>
          {upcomingHighPriority.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No high priority interviews pending</p>
          ) : (
            <div className="space-y-3">
              {upcomingHighPriority.map((interview: any) => (
                <div key={interview.id} className="flex items-center justify-between p-3 border-l-4 border-red-500 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium">{interview.intervieweeName}</div>
                    <div className="text-sm text-gray-600">{interview.templateName}</div>
                    <div className="text-sm text-gray-600">{interview.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {new Date(interview.scheduledDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-600">{interview.scheduledTime}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}