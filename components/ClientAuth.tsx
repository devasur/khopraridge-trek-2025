'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CORRECT_PASSWORD = 'roamingsouls96'
const AUTH_KEY = 'trek-auth-session'

interface ClientAuthProps {
  children: React.ReactNode
}

export default function ClientAuth({ children }: ClientAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const authSession = localStorage.getItem(AUTH_KEY)
    if (authSession) {
      const session = JSON.parse(authSession)
      // Check if session is still valid (7 days)
      if (session.expires > Date.now()) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password === CORRECT_PASSWORD) {
      // Create session that expires in 7 days
      const session = {
        authenticated: true,
        expires: Date.now() + (7 * 24 * 60 * 60 * 1000)
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(session))
      setIsAuthenticated(true)
    } else {
      setError('Invalid password')
      // Add delay to prevent brute force
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    setPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY)
    setIsAuthenticated(false)
    router.refresh()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-nepal-blue to-nepal-orange">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
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

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">
                Access Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="relative block w-full rounded-lg px-3 py-4 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-nepal-orange focus:outline-none focus:ring-nepal-orange"
                placeholder="Enter access password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="text-red-200 text-sm text-center bg-red-500/20 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-white bg-nepal-orange hover:bg-nepal-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nepal-orange transition-all duration-200"
            >
              Access Trek Site
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

  return (
    <div>
      {/* Add logout functionality to navigation */}
      <div className="hidden logout-handler" onClick={handleLogout}></div>
      {children}
    </div>
  )
}