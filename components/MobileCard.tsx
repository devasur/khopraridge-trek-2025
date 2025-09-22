'use client'

import { ReactNode, useState } from 'react'

interface MobileCardProps {
  title: string
  subtitle?: string
  icon?: string
  children: ReactNode
  collapsible?: boolean
  defaultExpanded?: boolean
  actions?: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  compact?: boolean
}

export default function MobileCard({
  title,
  subtitle,
  icon,
  children,
  collapsible = false,
  defaultExpanded = true,
  actions,
  variant = 'default',
  compact = false
}: MobileCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  return (
    <div className={`rounded-lg border shadow-sm ${getVariantStyles()}`}>
      {/* Header */}
      <div
        className={`flex items-center justify-between ${
          compact ? 'p-3' : 'p-4'
        } ${collapsible ? 'cursor-pointer' : ''}`}
        onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {icon && <span className="text-xl flex-shrink-0">{icon}</span>}
          <div className="min-w-0 flex-1">
            <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-base'} truncate`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'} truncate`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {actions}
          {collapsible && (
            <span className={`text-gray-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}>
              ▼
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {(!collapsible || isExpanded) && (
        <div className={`border-t border-gray-200 ${compact ? 'p-3' : 'p-4'}`}>
          {children}
        </div>
      )}
    </div>
  )
}

// Stat Card Component for Mobile
interface MobileStatCardProps {
  value: string | number
  label: string
  icon?: string
  change?: {
    value: string
    positive: boolean
  }
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

export function MobileStatCard({
  value,
  label,
  icon,
  change,
  variant = 'default',
  size = 'md'
}: MobileStatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-600'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-600'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-600'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-600'
      default:
        return 'bg-white border-gray-200 text-gray-900'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'p-3'
      case 'lg':
        return 'p-5'
      default:
        return 'p-4'
    }
  }

  const getValueSize = () => {
    switch (size) {
      case 'sm':
        return 'text-lg'
      case 'lg':
        return 'text-3xl'
      default:
        return 'text-2xl'
    }
  }

  return (
    <div className={`rounded-lg border shadow-sm ${getVariantStyles()} ${getSizeStyles()}`}>
      <div className="text-center">
        {icon && <div className="text-2xl mb-2">{icon}</div>}
        <div className={`font-bold ${getValueSize()}`}>{value}</div>
        <div className={`text-sm mt-1 ${variant === 'default' ? 'text-gray-600' : 'opacity-80'}`}>
          {label}
        </div>
        {change && (
          <div className={`text-xs mt-1 ${change.positive ? 'text-green-600' : 'text-red-600'}`}>
            {change.positive ? '↗' : '↘'} {change.value}
          </div>
        )}
      </div>
    </div>
  )
}