import Link from 'next/link'
import { teamRoles, equipmentList, dailyShots, interviewQuestions, technicalStandards } from '@/data/documentaryData'
import RoleAssignmentCard from '@/components/RoleAssignmentCard'
import ProductionProgress from '@/components/ProductionProgress'

export default function DocumentaryPage() {
  const assignedRoles = teamRoles.filter(role => role.assignee).length
  const completedShots = dailyShots.filter(shot => shot.completed).length
  const completedInterviews = interviewQuestions.filter(interview => interview.completed).length
  const availableEquipment = equipmentList.filter(eq => eq.status === 'available').length

  return (
    <div className="space-y-8">
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
        <Link href="/documentary/roles" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="font-semibold text-nepal-blue">Team Roles</h3>
          <p className="text-sm text-gray-600">Assign production responsibilities</p>
        </Link>

        <Link href="/documentary/shots" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-3xl mb-2">📹</div>
          <h3 className="font-semibold text-nepal-blue">Daily Shots</h3>
          <p className="text-sm text-gray-600">Track filming progress</p>
        </Link>

        <Link href="/documentary/equipment" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-3xl mb-2">📷</div>
          <h3 className="font-semibold text-nepal-blue">Equipment</h3>
          <p className="text-sm text-gray-600">Manage gear and batteries</p>
        </Link>

        <Link href="/interviews" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-3xl mb-2">🎤</div>
          <h3 className="font-semibold text-nepal-blue">Interview Management</h3>
          <p className="text-sm text-gray-600">Comprehensive scheduling & tracking</p>
        </Link>
      </div>

      {/* Production Progress */}
      <ProductionProgress />

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

      {/* Story Arc Framework */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">Documentary Story Arc</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-400 pl-4">
            <h3 className="font-semibold text-blue-800">Act 1: The Journey Begins (Days 1-3)</h3>
            <p className="text-sm text-gray-600">Introductions, expectations, initial challenges, group dynamics forming</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <h3 className="font-semibold text-green-800">Act 2: The Challenge (Days 4-6)</h3>
            <p className="text-sm text-gray-600">Altitude, physical demands, team support, reaching Khopra Ridge</p>
          </div>
          <div className="border-l-4 border-purple-400 pl-4">
            <h3 className="font-semibold text-purple-800">Act 3: The Sacred Lake (Day 7)</h3>
            <p className="text-sm text-gray-600">Ultimate challenge, spiritual moment, personal transformation</p>
          </div>
          <div className="border-l-4 border-orange-400 pl-4">
            <h3 className="font-semibold text-orange-800">Act 4: The Return (Days 8-9)</h3>
            <p className="text-sm text-gray-600">Reflection, achievement, changed perspectives, lasting bonds</p>
          </div>
        </div>
      </div>
    </div>
  )
}