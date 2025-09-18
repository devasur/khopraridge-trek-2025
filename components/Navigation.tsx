'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { db } from '@/lib/instant'
import { getEmailRole, isAdmin, getEmailRoleFromDB } from '@/lib/allowedUsers'

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/personal', label: 'Personal', icon: '👤' },
  { href: '/group', label: 'Group', icon: '👥' },
  { href: '/route', label: 'Route', icon: '🗺️' },
  { href: '/packing', label: 'Packing', icon: '🎒' },
  { href: '/documentary', label: 'Documentary', icon: '🎬' },
  { href: '/interviews', label: 'Interviews', icon: '🎤' },
  { href: '/emergency', label: 'Emergency', icon: '🚨' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { user } = db.useAuth()

  // Query allowed emails for role checking
  const { data: allowedEmailsData } = db.useQuery({
    allowedEmails: {}
  })

  const allowedEmails = (allowedEmailsData?.allowedEmails || []).filter(email => email.isActive)

  const userRole = user
    ? (allowedEmails.length > 0
        ? getEmailRoleFromDB(allowedEmails, user.email)
        : getEmailRole(user.email))
    : null

  const handleLogout = () => {
    db.auth.signOut()
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-nepal-blue">🏔️ Khopra Trek 2025</h1>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Trek Coordination</span>
              {user?.email && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">{user.email}</span>
                  {userRole && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      userRole === 'admin'
                        ? 'bg-red-100 text-red-800'
                        : userRole === 'leader'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {userRole}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-nepal-blue text-white'
                    : 'text-gray-600 hover:text-nepal-blue hover:bg-gray-100'
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}

            {/* Admin link - only show to admins */}
            {user && isAdmin(user.email) && (
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === '/admin'
                    ? 'bg-red-600 text-white'
                    : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                }`}
                title="Administration"
              >
                <span className="mr-1">⚙️</span>
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-red-600 hover:bg-red-50 ml-2"
              title="Logout"
            >
              <span className="mr-1">🚪</span>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}