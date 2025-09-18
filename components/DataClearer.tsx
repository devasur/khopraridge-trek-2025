'use client'

import { useState } from 'react'
import { db } from '@/lib/instant'

export default function DataClearer() {
  const [isClearing, setIsClearing] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [confirmText, setConfirmText] = useState('')

  // Query all data to get record IDs for deletion
  const { data: trekMembersData } = db.useQuery({ trekMembers: {} })
  const { data: accommodationsData } = db.useQuery({ accommodations: {} })
  const { data: packingItemsData } = db.useQuery({ packingItems: {} })
  const { data: waypointsData } = db.useQuery({ routeWaypoints: {} })
  const { data: equipmentData } = db.useQuery({ documentaryEquipment: {} })
  const { data: interviewsData } = db.useQuery({ interviewSubjects: {} })
  const { data: shotsData } = db.useQuery({ documentaryShots: {} })
  const { data: emergencyContactsData } = db.useQuery({ emergencyContacts: {} })
  const { data: allowedEmailsData } = db.useQuery({ allowedEmails: {} })
  const { data: flightBookingsData } = db.useQuery({ flightBookings: {} })
  const { data: packingProgressData } = db.useQuery({ packingProgress: {} })
  const { data: weatherUpdatesData } = db.useQuery({ weatherUpdates: {} })
  const { data: userProgressData } = db.useQuery({ userProgress: {} })

  const handleClearData = async () => {
    if (confirmText !== 'CLEAR ALL DATA') {
      alert('Please type "CLEAR ALL DATA" to confirm')
      return
    }

    setIsClearing(true)
    setResult(null)

    try {
      console.log('⚠️ Clearing all data from InstantDB...')

      // Collect all records from all entities
      const allDeletions = []

      // Trek Members
      const trekMembers = trekMembersData?.trekMembers || []
      trekMembers.forEach((record: any) => {
        allDeletions.push(db.tx.trekMembers[record.id].delete())
      })

      // Flight Bookings
      const flightBookings = flightBookingsData?.flightBookings || []
      flightBookings.forEach((record: any) => {
        allDeletions.push(db.tx.flightBookings[record.id].delete())
      })

      // Accommodations
      const accommodations = accommodationsData?.accommodations || []
      accommodations.forEach((record: any) => {
        allDeletions.push(db.tx.accommodations[record.id].delete())
      })

      // Packing Items
      const packingItems = packingItemsData?.packingItems || []
      packingItems.forEach((record: any) => {
        allDeletions.push(db.tx.packingItems[record.id].delete())
      })

      // Packing Progress
      const packingProgress = packingProgressData?.packingProgress || []
      packingProgress.forEach((record: any) => {
        allDeletions.push(db.tx.packingProgress[record.id].delete())
      })

      // Route Waypoints
      const waypoints = waypointsData?.routeWaypoints || []
      waypoints.forEach((record: any) => {
        allDeletions.push(db.tx.routeWaypoints[record.id].delete())
      })

      // Documentary Equipment
      const equipment = equipmentData?.documentaryEquipment || []
      equipment.forEach((record: any) => {
        allDeletions.push(db.tx.documentaryEquipment[record.id].delete())
      })

      // Interview Subjects
      const interviews = interviewsData?.interviewSubjects || []
      interviews.forEach((record: any) => {
        allDeletions.push(db.tx.interviewSubjects[record.id].delete())
      })

      // Documentary Shots
      const shots = shotsData?.documentaryShots || []
      shots.forEach((record: any) => {
        allDeletions.push(db.tx.documentaryShots[record.id].delete())
      })

      // Emergency Contacts
      const emergencyContacts = emergencyContactsData?.emergencyContacts || []
      emergencyContacts.forEach((record: any) => {
        allDeletions.push(db.tx.emergencyContacts[record.id].delete())
      })

      // Weather Updates
      const weatherUpdates = weatherUpdatesData?.weatherUpdates || []
      weatherUpdates.forEach((record: any) => {
        allDeletions.push(db.tx.weatherUpdates[record.id].delete())
      })

      // User Progress
      const userProgress = userProgressData?.userProgress || []
      userProgress.forEach((record: any) => {
        allDeletions.push(db.tx.userProgress[record.id].delete())
      })

      // Allowed Emails
      const allowedEmails = allowedEmailsData?.allowedEmails || []
      allowedEmails.forEach((record: any) => {
        allDeletions.push(db.tx.allowedEmails[record.id].delete())
      })

      if (allDeletions.length === 0) {
        setResult({
          success: true,
          message: 'Database was already empty - no data to clear'
        })
        return
      }

      console.log(`Deleting ${allDeletions.length} records...`)

      // Execute all deletions in batches to avoid overwhelming the API
      const batchSize = 50
      for (let i = 0; i < allDeletions.length; i += batchSize) {
        const batch = allDeletions.slice(i, i + batchSize)
        await db.transact(batch)
        console.log(`Deleted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allDeletions.length / batchSize)}`)
      }

      console.log('✅ All data cleared successfully!')
      setResult({
        success: true,
        message: `Successfully deleted ${allDeletions.length} records from the database`
      })

    } catch (error) {
      console.error('❌ Error clearing data:', error)
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Clear operation failed'
      })
    } finally {
      setIsClearing(false)
      setConfirmText('')
    }
  }

  return (
    <div className="card border-2 border-red-200 bg-red-50">
      <h2 className="text-xl font-semibold text-red-700 mb-4">🚨 Clear All Data</h2>

      <div className="space-y-4">
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">⚠️ DANGER ZONE</h3>
          <p className="text-sm text-red-700 mb-2">
            This will permanently delete ALL data from the database including:
          </p>
          <ul className="text-sm text-red-700 list-disc list-inside">
            <li>All trek members and their personal information</li>
            <li>Flight bookings, accommodations, packing items</li>
            <li>Route waypoints, equipment, interviews, shots</li>
            <li>Emergency contacts and weather updates</li>
            <li>User progress and allowed emails</li>
          </ul>
          <p className="text-sm text-red-700 mt-2 font-semibold">
            This action cannot be undone!
          </p>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-red-700">
              Type "CLEAR ALL DATA" to confirm:
            </span>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="CLEAR ALL DATA"
              className="mt-1 block w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
              disabled={isClearing}
            />
          </label>

          <button
            onClick={handleClearData}
            disabled={isClearing || confirmText !== 'CLEAR ALL DATA'}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isClearing ? 'Clearing All Data...' : 'Clear All Data'}
          </button>
        </div>

        {result && (
          <div className={`p-4 rounded-lg ${
            result.success ? 'bg-green-50 border border-green-200' : 'bg-red-100 border border-red-300'
          }`}>
            {result.success ? (
              <div>
                <h3 className="font-semibold text-green-800 mb-2">✅ Data Cleared Successfully!</h3>
                <p className="text-sm text-green-700">{result.message}</p>
                <p className="text-sm text-green-700 mt-2">
                  Database is now empty and ready for fresh migration.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-semibold text-red-800 mb-2">❌ Clear Operation Failed</h3>
                <p className="text-sm text-red-700">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}