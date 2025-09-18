'use client'

import { db } from '@/lib/instant'
import { isAdmin } from '@/lib/allowedUsers'
import AdminEmailManager from '@/components/AdminEmailManager'
import TrekkerAccessManager from '@/components/TrekkerAccessManager'
import DataMigration from '@/components/DataMigration'
import DatabaseStateChecker from '@/components/DatabaseStateChecker'
import DataClearer from '@/components/DataClearer'

export default function AdminPage() {
  const { user, isLoading } = db.useAuth()

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🔐 Administration</h1>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🔐 Administration</h1>
          <div className="text-red-500">Please log in to access admin features.</div>
        </div>
      </div>
    )
  }

  if (!isAdmin(user.email)) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-nepal-blue mb-2">🔐 Administration</h1>
          <div className="text-red-500">Access denied. Admin privileges required.</div>
          <div className="text-gray-600 mt-2">
            Current user: {user.email}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-nepal-blue mb-2">🔐 Administration</h1>
        <p className="text-gray-600">Trek coordination system administration</p>
        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
          Admin: {user.email}
        </div>
      </div>

      {/* Database State Check */}
      <DatabaseStateChecker />

      {/* Trekker Access Management */}
      <TrekkerAccessManager userEmail={user.email} />

      {/* Email Access Management */}
      <AdminEmailManager userEmail={user.email} />

      {/* Data Migration */}
      <DataMigration />

      {/* Data Clearer */}
      <DataClearer />

      {/* System Info */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">📊 System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium">InstantDB App ID</div>
            <div className="text-gray-600 font-mono">b824ac46-3f04-48e4-9573-bcc970bbb0ce</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium">Environment</div>
            <div className="text-gray-600">{process.env.NODE_ENV || 'development'}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="font-medium">Last Updated</div>
            <div className="text-gray-600">{new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}