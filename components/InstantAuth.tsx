'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/instant'
import { isEmailAllowed, getEmailRole, isEmailAllowedInDB, getEmailRoleFromDB } from '@/lib/allowedUsers'

interface InstantAuthProps {
  children: React.ReactNode
}

export default function InstantAuth({ children }: InstantAuthProps) {
  const { isLoading, user, error } = db.useAuth()
  const [email, setEmail] = useState('')
  const [sentEmail, setSentEmail] = useState('')
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [authError, setAuthError] = useState('')

  // Query allowed emails from database
  const { data: allowedEmailsData } = db.useQuery({
    allowedEmails: {}
  })

  const allowedEmails = (allowedEmailsData?.allowedEmails || []).filter(email => email.isActive)

  // Check if user is authenticated
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nepal-blue to-nepal-orange">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // If user is authenticated, check if still authorized
  if (user) {
    const userAllowed = allowedEmails.length > 0
      ? isEmailAllowedInDB(allowedEmails, user.email)
      : isEmailAllowed(user.email)

    if (!userAllowed) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nepal-blue to-nepal-orange">
          <div className="max-w-md w-full space-y-8 p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">🏔️ Access Revoked</h1>
              <p className="text-nepal-cream text-lg">Your access has been revoked</p>
              <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-nepal-cream text-sm">
                  Your email ({user.email}) is no longer authorized for trek coordination access.
                  Please contact the trek organizers if you believe this is an error.
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )
    }

    return <>{children}</>
  }

  // Authentication flow
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setAuthError('')

    // Check if email is allowed (use database if available, fallback to static list)
    const emailAllowed = allowedEmails.length > 0
      ? isEmailAllowedInDB(allowedEmails, email)
      : isEmailAllowed(email)

    if (!emailAllowed) {
      setAuthError('This email is not authorized for trek coordination access. Please contact the trek organizers.')
      setIsSubmitting(false)
      return
    }

    try {
      await db.auth.sendMagicCode({ email })
      setSentEmail(email)
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send verification code')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setAuthError('')

    try {
      await db.auth.signInWithMagicCode({ email: sentEmail, code })
    } catch (err: any) {
      setAuthError(err.message || 'Invalid verification code')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignOut = () => {
    db.auth.signOut()
    setSentEmail('')
    setCode('')
    setEmail('')
  }

  // Show email input form
  if (!sentEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nepal-blue to-nepal-orange">
        <div className="max-w-md w-full space-y-8 p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">🏔️ Khopra Trek 2025</h1>
            <p className="text-nepal-cream text-lg">Trek Coordination Access</p>
            <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-nepal-cream text-sm">
                This site contains private trek coordination data including personal information,
                itineraries, and emergency contacts for trek participants.
              </p>
            </div>
          </div>

          <form onSubmit={handleSendCode} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="relative block w-full rounded-lg px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-nepal-orange focus:outline-none focus:ring-nepal-orange disabled:opacity-50"
                placeholder="Enter your email address"
                autoComplete="email"
              />
            </div>

            {authError && (
              <div className="text-red-200 text-sm text-center bg-red-500/20 p-3 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-nepal-orange hover:bg-nepal-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nepal-orange transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-nepal-cream text-xs">
              Authorized access only • Trek Participants
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show code verification form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nepal-blue to-nepal-orange">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🏔️ Khopra Trek 2025</h1>
          <p className="text-nepal-cream text-lg">Verify Your Email</p>
          <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <p className="text-nepal-cream text-sm">
              We've sent a verification code to <strong>{sentEmail}</strong>.
              Please enter the code below to access the trek coordination site.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
          <div>
            <label htmlFor="code" className="sr-only">
              Verification Code
            </label>
            <input
              id="code"
              name="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={isSubmitting}
              className="relative block w-full rounded-lg px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-nepal-orange focus:outline-none focus:ring-nepal-orange disabled:opacity-50 text-center text-2xl tracking-widest"
              placeholder="Enter 6-digit code"
              autoComplete="one-time-code"
              maxLength={6}
            />
          </div>

          {authError && (
            <div className="text-red-200 text-sm text-center bg-red-500/20 p-3 rounded-lg">
              {authError}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setSentEmail('')}
              className="flex-1 py-3 px-4 border border-white/30 text-white text-sm font-medium rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all duration-200"
            >
              Change Email
            </button>
            <button
              type="submit"
              disabled={isSubmitting || code.length !== 6}
              className="flex-1 py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-nepal-orange hover:bg-nepal-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nepal-orange transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Access Site'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={handleSendCode}
            disabled={isSubmitting}
            className="text-nepal-cream text-xs hover:text-white underline disabled:opacity-50"
          >
            Resend verification code
          </button>
        </div>
      </div>
    </div>
  )
}