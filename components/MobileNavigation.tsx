'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { db } from '@/lib/instant'
import { getEmailRole, isAdmin, getEmailRoleFromDB } from '@/lib/allowedUsers'

interface NavItem {
  href: string
  label: string
  icon: string
  badge?: number
}

const primaryNavItems: NavItem[] = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/personal', label: 'My Trek', icon: '👤' },
  { href: '/group', label: 'Team', icon: '👥' },
  { href: '/interviews', label: 'Production', icon: '🎬' },
]

const secondaryNavItems: NavItem[] = [
  { href: '/route', label: 'Route', icon: '🗺️' },
  { href: '/packing', label: 'Packing', icon: '🎒' },
  { href: '/documentary', label: 'Documentary', icon: '🎬' },
  { href: '/emergency', label: 'Emergency', icon: '🚨' },
]

export default function MobileNavigation() {
  const pathname = usePathname()
  const [showSecondary, setShowSecondary] = useState(false)
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

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Top Bar - Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-nepal-blue">🏔️ Khopra Trek</h1>
            {user?.email && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">{user.email.split('@')[0]}</span>
                {userRole && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
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

          <div className="flex items-center space-x-2">
            {/* Secondary Nav Toggle */}
            <button
              onClick={() => setShowSecondary(!showSecondary)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              title="More"
            >
              <span className="text-lg">⋯</span>
            </button>

            {/* Admin Access */}
            {user && isAdmin(user.email) && (
              <Link
                href="/admin"
                className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                title="Admin"
              >
                <span className="text-sm">⚙️</span>
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600"
              title="Logout"
            >
              <span className="text-sm">🚪</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Dropdown */}
      {showSecondary && (
        <div className="lg:hidden bg-white border-b shadow-sm">
          <div className="grid grid-cols-2 gap-2 p-4">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setShowSecondary(false)}
                className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                  isActiveRoute(item.href)
                    ? 'bg-nepal-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="grid grid-cols-4 gap-0">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-1 transition-colors ${
                isActiveRoute(item.href)
                  ? 'text-nepal-blue bg-nepal-blue/5'
                  : 'text-gray-600'
              }`}
            >
              <div className="relative">
                <span className="text-xl">{item.icon}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium mt-1 leading-none">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Navigation - Top Bar */}
      <div className="hidden lg:block bg-white shadow-sm border-b">
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
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-nepal-blue text-white'
                      : 'text-gray-600 hover:text-nepal-blue hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              ))}

              {/* Admin link */}
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
                  <span className="hidden xl:inline">Admin</span>
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:text-red-600 hover:bg-red-50 ml-2"
                title="Logout"
              >
                <span className="mr-1">🚪</span>
                <span className="hidden xl:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Padding */}
      <div className="lg:hidden h-16"></div>
    </>
  )
}