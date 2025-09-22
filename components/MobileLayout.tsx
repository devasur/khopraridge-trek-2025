'use client'

import { ReactNode, useState } from 'react'

interface MobileLayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  actions?: ReactNode
  tabs?: Array<{
    id: string
    label: string
    icon: string
    content: ReactNode
    badge?: number
  }>
  defaultTab?: string
}

export default function MobileLayout({
  children,
  title,
  subtitle,
  actions,
  tabs,
  defaultTab
}: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs?.[0]?.id || '')

  if (tabs && tabs.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        {(title || subtitle || actions) && (
          <div className="bg-white border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                {title && <h1 className="text-xl font-bold text-nepal-blue">{title}</h1>}
                {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center space-x-2">{actions}</div>}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white border-b">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-nepal-blue text-nepal-blue bg-nepal-blue/5'
                    : 'border-transparent text-gray-600 hover:text-nepal-blue'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium whitespace-nowrap">{tab.label}</span>
                {tab.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-2">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {tabs.find(tab => tab.id === activeTab)?.content}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {(title || subtitle || actions) && (
        <div className="bg-white border-b px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              {title && <h1 className="text-xl font-bold text-nepal-blue">{title}</h1>}
              {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}