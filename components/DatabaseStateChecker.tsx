'use client'

import { db } from '@/lib/instant'

export default function DatabaseStateChecker() {
  const { data: trekMembersData } = db.useQuery({ trekMembers: {} })
  const { data: accommodationsData } = db.useQuery({ accommodations: {} })
  const { data: packingItemsData } = db.useQuery({ packingItems: {} })
  const { data: waypointsData } = db.useQuery({ routeWaypoints: {} })
  const { data: equipmentData } = db.useQuery({ documentaryEquipment: {} })
  const { data: interviewsData } = db.useQuery({ interviewSubjects: {} })
  const { data: shotsData } = db.useQuery({ documentaryShots: {} })
  const { data: emergencyContactsData } = db.useQuery({ emergencyContacts: {} })
  const { data: allowedEmailsData } = db.useQuery({ allowedEmails: {} })

  const trekMembers = trekMembersData?.trekMembers || []
  const accommodations = accommodationsData?.accommodations || []
  const packingItems = packingItemsData?.packingItems || []
  const waypoints = waypointsData?.routeWaypoints || []
  const equipment = equipmentData?.documentaryEquipment || []
  const interviews = interviewsData?.interviewSubjects || []
  const shots = shotsData?.documentaryShots || []
  const emergencyContacts = emergencyContactsData?.emergencyContacts || []
  const allowedEmails = allowedEmailsData?.allowedEmails || []

  const hasData = trekMembers.length > 0 || accommodations.length > 0 ||
                  packingItems.length > 0 || waypoints.length > 0 ||
                  equipment.length > 0 || interviews.length > 0 ||
                  shots.length > 0 || emergencyContacts.length > 0 ||
                  allowedEmails.length > 0

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-nepal-blue mb-4">📊 Current Database State</h2>

      <div className="space-y-4">
        {!hasData ? (
          <div className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-center">
              🗄️ Database appears to be empty. Ready for initial migration.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Current Data Counts:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div>Trek Members: <span className="font-mono">{trekMembers.length}</span></div>
                <div>Accommodations: <span className="font-mono">{accommodations.length}</span></div>
                <div>Packing Items: <span className="font-mono">{packingItems.length}</span></div>
                <div>Route Waypoints: <span className="font-mono">{waypoints.length}</span></div>
                <div>Equipment: <span className="font-mono">{equipment.length}</span></div>
                <div>Interviews: <span className="font-mono">{interviews.length}</span></div>
                <div>Documentary Shots: <span className="font-mono">{shots.length}</span></div>
                <div>Emergency Contacts: <span className="font-mono">{emergencyContacts.length}</span></div>
                <div>Allowed Emails: <span className="font-mono">{allowedEmails.length}</span></div>
              </div>
            </div>

            {trekMembers.length > 0 && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <h3 className="font-medium text-yellow-800 mb-2">Trek Members Preview:</h3>
                <div className="space-y-1 text-sm">
                  {trekMembers.slice(0, 5).map((member: any, index: number) => (
                    <div key={index} className="font-mono text-xs">
                      {member.name} - {member.email || 'No email'} - Access: {member.hasAccess ? '✅' : '❌'}
                    </div>
                  ))}
                  {trekMembers.length > 5 && (
                    <div className="text-gray-600 text-xs">... and {trekMembers.length - 5} more</div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-medium text-amber-800 mb-2">⚠️ Data Migration Recommendations:</h3>
          <div className="text-sm text-amber-700 space-y-1">
            {!hasData ? (
              <>
                <p>✅ Database is clean - safe to run initial migration</p>
                <p>• All email mappings and emergency contact data are ready</p>
                <p>• Indu has been added as a new trek member</p>
                <p>• Run migration to populate all entities</p>
              </>
            ) : (
              <>
                <p>⚠️ Database contains existing data</p>
                <p>• Running migration will ADD data (duplicates possible)</p>
                <p>• Consider clearing data first for clean migration</p>
                <p>• Or modify migration to update existing records</p>
              </>
            )}
          </div>
        </div>

        {hasData && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-medium text-red-800 mb-2">🚨 Warning</h3>
            <p className="text-sm text-red-700">
              InstantDB doesn't provide built-in data clearing. To start fresh, you would need to:
            </p>
            <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
              <li>Delete individual records through the admin interface</li>
              <li>Or implement a custom clear function</li>
              <li>Or create a new InstantDB app for testing</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}