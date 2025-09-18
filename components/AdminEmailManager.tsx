'use client'

import { useState } from 'react'
import { db, id } from '@/lib/instant'
import { isAdmin } from '@/lib/allowedUsers'

interface AdminEmailManagerProps {
  userEmail: string
}

export default function AdminEmailManager({ userEmail }: AdminEmailManagerProps) {
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState<'leader' | 'participant'>('participant')
  const [notes, setNotes] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const { data, isLoading } = db.useQuery({
    allowedEmails: {
      $: {
        where: { isActive: true }
      }
    }
  })

  // Only show to admins
  if (!isAdmin(userEmail)) {
    return null
  }

  const allowedEmails = (data?.allowedEmails || []).filter(email => email.isActive)

  const handleAddEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.trim()) return

    setIsAdding(true)

    try {
      // Check if email already exists
      const existingEmail = allowedEmails.find(
        email => email.email.toLowerCase() === newEmail.toLowerCase().trim()
      )

      if (existingEmail) {
        alert('This email is already in the allowed list')
        return
      }

      // Add new email to database
      await db.transact(
        db.tx.allowedEmails[id()].update({
          email: newEmail.toLowerCase().trim(),
          role: newRole,
          addedBy: userEmail,
          addedAt: new Date(),
          isActive: true,
          notes: notes.trim() || undefined,
        })
      )

      // Reset form
      setNewEmail('')
      setNewRole('participant')
      setNotes('')

      alert('Email added successfully!')
    } catch (error) {
      console.error('Failed to add email:', error)
      alert('Failed to add email. Please try again.')
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeactivateEmail = async (emailId: string, email: string) => {
    if (!confirm(`Are you sure you want to remove access for ${email}?`)) return

    try {
      await db.transact(
        db.tx.allowedEmails[emailId].update({
          isActive: false
        })
      )
    } catch (error) {
      console.error('Failed to deactivate email:', error)
      alert('Failed to remove email access. Please try again.')
    }
  }

  const handleReactivateEmail = async (emailId: string) => {
    try {
      await db.transact(
        db.tx.allowedEmails[emailId].update({
          isActive: true
        })
      )
    } catch (error) {
      console.error('Failed to reactivate email:', error)
      alert('Failed to reactivate email. Please try again.')
    }
  }

  const handleCleanupEmails = async () => {
    if (!confirm('Are you sure you want to remove ALL allowed emails except boni.gopalan@gmail.com? This action cannot be undone.')) {
      return
    }

    try {
      // Find all emails that are NOT the admin email
      const emailsToDelete = allowedEmails.filter(email =>
        email.email.toLowerCase() !== 'boni.gopalan@gmail.com'
      )

      if (emailsToDelete.length === 0) {
        alert('No emails to delete. Only admin email exists.')
        return
      }

      // Delete all non-admin emails
      const deleteMutations = emailsToDelete.map(email =>
        db.tx.allowedEmails[email.id].delete()
      )

      await db.transact(deleteMutations)

      alert(`Successfully removed ${emailsToDelete.length} email(s). Only boni.gopalan@gmail.com remains.`)
    } catch (error) {
      console.error('Failed to cleanup emails:', error)
      alert('Failed to cleanup emails. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">🔐 Email Access Management</h2>
        <div className="text-center py-4">
          <div className="text-gray-500">Loading email list...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add New Email */}
      <div className="card">
        <h2 className="text-xl font-semibold text-nepal-blue mb-4">🔐 Add New Email Access</h2>

        <form onSubmit={handleAddEmail} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="participant@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nepal-blue focus:border-nepal-blue"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as 'leader' | 'participant')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nepal-blue focus:border-nepal-blue"
              >
                <option value="participant">Participant</option>
                <option value="leader">Leader</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Trekker #5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-nepal-blue focus:border-nepal-blue"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAdding || !newEmail.trim()}
            className="px-4 py-2 bg-nepal-blue text-white rounded-lg hover:bg-nepal-blue/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Adding...' : 'Add Email Access'}
          </button>
        </form>
      </div>

      {/* Email List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-nepal-blue mb-4">📋 Allowed Email Addresses</h3>

        {allowedEmails.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No emails found. Add the first email above.
          </div>
        ) : (
          <div className="space-y-3">
            {allowedEmails.map((emailRecord) => (
              <div
                key={emailRecord.id}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  emailRecord.isActive
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className={`text-lg ${emailRecord.isActive ? '✅' : '❌'}`}>
                      {emailRecord.isActive ? '✅' : '❌'}
                    </span>
                    <div>
                      <div className="font-medium">{emailRecord.email}</div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          emailRecord.role === 'leader'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {emailRecord.role}
                        </span>
                        <span>Added by: {emailRecord.addedBy}</span>
                        <span>Added: {new Date(emailRecord.addedAt).toLocaleDateString()}</span>
                        {emailRecord.notes && <span>Notes: {emailRecord.notes}</span>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {emailRecord.isActive ? (
                    <button
                      onClick={() => handleDeactivateEmail(emailRecord.id, emailRecord.email)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove Access
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReactivateEmail(emailRecord.id)}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Restore Access
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-medium text-orange-800 mb-2">Database Cleanup</h4>
          <button
            onClick={handleCleanupEmails}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
          >
            Clear All Emails Except Admin
          </button>
          <p className="text-xs text-orange-600 mt-2">
            This will remove all allowed emails except boni.gopalan@gmail.com
          </p>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Admin emails</strong> (always have access): boni.gopalan@gmail.com</p>
          <p><strong>Total active emails:</strong> {allowedEmails.filter(e => e.isActive).length}</p>
        </div>
      </div>
    </div>
  )
}