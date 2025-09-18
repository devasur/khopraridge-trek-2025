// Admin emails with full access
export const ADMIN_EMAILS = [
  'boni.gopalan@gmail.com'
]

// Initially allowed email addresses for trek participants
export const INITIAL_ALLOWED_EMAILS = [
  'boni.gopalan@gmail.com',
  'georgeck@gmail.com'
]

// Check if email is admin
export const isAdmin = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase().trim())
}

// Check if email is initially allowed (used as fallback)
export const isInitiallyAllowed = (email: string): boolean => {
  return INITIAL_ALLOWED_EMAILS.includes(email.toLowerCase().trim())
}

// Get user role
export const getEmailRole = (email: string): 'admin' | 'leader' | 'participant' => {
  if (isAdmin(email)) return 'admin'

  const leaderEmails = [
    'boni.gopalan@gmail.com',
    'georgeck@gmail.com'
  ]

  return leaderEmails.includes(email.toLowerCase().trim()) ? 'leader' : 'participant'
}

// Dynamic email checking functions (to be used with InstantDB)
export const isEmailAllowedInDB = (allowedEmailsFromDB: any[], email: string): boolean => {
  const normalizedEmail = email.toLowerCase().trim()

  // Always allow admins
  if (isAdmin(normalizedEmail)) return true

  // Check if email exists in database and is active
  const emailRecord = allowedEmailsFromDB.find(
    record => record.email.toLowerCase() === normalizedEmail && record.isActive
  )

  return !!emailRecord
}

export const getEmailRoleFromDB = (allowedEmailsFromDB: any[], email: string): 'admin' | 'leader' | 'participant' => {
  const normalizedEmail = email.toLowerCase().trim()

  // Always return admin for admin emails
  if (isAdmin(normalizedEmail)) return 'admin'

  // Check database for role
  const emailRecord = allowedEmailsFromDB.find(
    record => record.email.toLowerCase() === normalizedEmail && record.isActive
  )

  return emailRecord?.role || 'participant'
}

// Fallback function for when database is not available
export const isEmailAllowed = (email: string): boolean => {
  return isAdmin(email) || isInitiallyAllowed(email)
}