'use client'

import { useState } from 'react'
// import { migrateData } from '@/scripts/migrate-data'

export default function DataMigration() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleMigration = async () => {
    setIsRunning(true)
    setResult(null)

    try {
      const migrationResult = { success: false, error: 'Migration not available in production build' }
      setResult(migrationResult)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Migration failed'
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-nepal-blue mb-4">Data Migration</h2>

      <div className="space-y-4">
        <p className="text-gray-600">
          This will migrate all existing trek data from static files to InstantDB.
          This should only be run once when setting up the database.
        </p>

        <button
          onClick={handleMigration}
          disabled={isRunning}
          className="px-4 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isRunning ? 'Migrating Data...' : 'Run Data Migration'}
        </button>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {result.success ? (
              <div>
                <h3 className="font-semibold text-green-800 mb-2">✅ Migration Successful!</h3>
                <div className="text-sm text-green-700">
                  <p>Migrated data:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Trek Members: {result.migrated.trekMembers}</li>
                    <li>Accommodations: {result.migrated.accommodations}</li>
                    <li>Packing Items: {result.migrated.packingItems}</li>
                    <li>Route Waypoints: {result.migrated.waypoints}</li>
                    <li>Documentary Equipment: {result.migrated.equipment}</li>
                    <li>Interview Subjects: {result.migrated.interviews}</li>
                    <li>Documentary Shots: {result.migrated.shots}</li>
                    <li>Emergency Contacts: {result.migrated.emergencyContacts}</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-red-800 mb-2">❌ Migration Failed</h3>
                <p className="text-sm text-red-700">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}