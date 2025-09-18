'use client'

import { useState } from 'react'
import { db, queries } from '@/lib/instant'
import { isAdmin } from '@/lib/allowedUsers'

interface TrekkerAccessManagerProps {
  userEmail: string
}

export default function TrekkerAccessManager({ userEmail }: TrekkerAccessManagerProps) {
  const [editingTrekker, setEditingTrekker] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState('')

  const { data: trekMembersData, isLoading } = db.useQuery(queries.trekMembers)

  // Only show to admins
  if (!isAdmin(userEmail)) {
    return null
  }

  const trekMembers = trekMembersData?.trekMembers || []

  const handleUpdateEmail = async (trekkerId: string, email: string) => {
    if (!email.trim()) {
      alert('Please enter a valid email address')
      return
    }

    try {
      await db.transact(
        db.tx.trekMembers[trekkerId].update({
          email: email.toLowerCase().trim(),
          updatedAt: new Date(),
        })
      )
      setEditingTrekker(null)
      setNewEmail('')
    } catch (error) {
      console.error('Failed to update email:', error)
      alert('Failed to update email. Please try again.')
    }
  }

  const handleToggleAccess = async (trekkerId: string, currentAccess: boolean) => {
    try {
      await db.transact(
        db.tx.trekMembers[trekkerId].update({
          hasAccess: !currentAccess,
          updatedAt: new Date(),
        })
      )
    } catch (error) {
      console.error('Failed to toggle access:', error)
      alert('Failed to toggle access. Please try again.')
    }
  }

  const handleGrantAccessAndAddToAllowed = async (trekker: any) => {
    if (!trekker.email) {
      alert('Please add an email address first')
      return
    }

    try {
      // First grant access to the trekker
      await db.transact(
        db.tx.trekMembers[trekker.id].update({
          hasAccess: true,
          updatedAt: new Date(),
        })
      )

      // Then add their email to allowedEmails
      await db.transact(
        db.tx.allowedEmails[crypto.randomUUID()].update({
          email: trekker.email.toLowerCase().trim(),
          role: 'participant',
          addedBy: userEmail,
          addedAt: new Date(),
          isActive: true,
          notes: `Auto-added for trekker: ${trekker.name}`,
        })
      )

      alert(`Access granted to ${trekker.name} and email added to allowed list!`)
    } catch (error) {
      console.error('Failed to grant full access:', error)
      alert('Failed to grant access. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">🏔️ Trekker Access Management</h2>
        <div className="text-center py-4">
          <div className="text-gray-500">Loading trekkers...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-nepal-blue mb-4">🏔️ Trekker Access Management</h2>

      <div className="mb-4 text-sm text-gray-600">
        <p>Manage email addresses and site access for each trekker. Trekkers need both an email and site access to log in.</p>
      </div>

      <div className="space-y-3">
        {trekMembers.map((trekker) => (
          <div
            key={trekker.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium">{trekker.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  trekker.bookingStatus === 'complete'
                    ? 'bg-green-100 text-green-800'
                    : trekker.bookingStatus === 'partial'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {trekker.bookingStatus}
                </span>
                {trekker.hasAccess && (
                  <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    Has Access
                  </span>
                )}
              </div>

              <div className="mt-2">
                {editingTrekker === trekker.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="px-3 py-1 border border-gray-300 rounded text-sm flex-1"
                      autoFocus
                    />
                    <button
                      onClick={() => handleUpdateEmail(trekker.id, newEmail)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingTrekker(null)
                        setNewEmail('')
                      }}
                      className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      Email: {trekker.email || 'Not set'}
                    </span>
                    <button
                      onClick={() => {
                        setEditingTrekker(trekker.id)
                        setNewEmail(trekker.email || '')
                      }}
                      className="text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      {trekker.email ? 'Edit' : 'Add Email'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              {trekker.email && !trekker.hasAccess && (
                <button
                  onClick={() => handleGrantAccessAndAddToAllowed(trekker)}
                  className="px-3 py-2 bg-nepal-blue text-white rounded text-sm hover:bg-nepal-blue/90"
                >
                  Grant Full Access
                </button>
              )}

              {trekker.hasAccess && (
                <button
                  onClick={() => handleToggleAccess(trekker.id, trekker.hasAccess)}
                  className="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                >
                  Remove Access
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">How Trekker Access Works</h4>
        <ul className="text-sm text-blue-600 space-y-1">
          <li>• <strong>Email</strong>: Each trekker needs an email address</li>
          <li>• <strong>Site Access</strong>: Controls whether they can view personalized data</li>
          <li>• <strong>Grant Full Access</strong>: Gives site access AND adds email to allowed login list</li>
          <li>• <strong>Personal Page</strong>: Shows their specific trek information when logged in</li>
        </ul>
      </div>
    </div>
  )
}