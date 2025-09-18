'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { trekWaypoints } from '@/data/trekRouteData'

// Dynamic import to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Loading interactive map...</div>
  </div>
})

interface TrekMapProps {
  height?: string
  showElevationProfile?: boolean
  selectedDay?: number
}

export default function TrekMap({
  height = 'h-96',
  showElevationProfile = true,
  selectedDay
}: TrekMapProps) {
  return (
    <div className="space-y-4">
      <div className={`${height} relative rounded-lg overflow-hidden border border-gray-200`}>
        <MapComponent waypoints={trekWaypoints} selectedDay={selectedDay} />
      </div>

      {showElevationProfile && (
        <div className="card">
          <h3 className="font-semibold text-nepal-blue mb-3">🏔️ Elevation Profile</h3>
          <div className="flex items-end space-x-1 h-32">
            {trekWaypoints.map((waypoint, index) => (
              <div key={waypoint.id} className="flex-1 flex flex-col justify-end">
                <div
                  className={`w-full rounded-t transition-colors duration-200 ${
                    selectedDay === waypoint.day
                      ? 'bg-nepal-blue'
                      : waypoint.elevation > 4000 ? 'bg-red-400' :
                        waypoint.elevation > 3500 ? 'bg-orange-400' :
                        waypoint.elevation > 3000 ? 'bg-yellow-400' :
                        waypoint.elevation > 2500 ? 'bg-green-400' : 'bg-blue-400'
                  }`}
                  style={{
                    height: `${(waypoint.elevation / Math.max(...trekWaypoints.map(w => w.elevation))) * 100}%`
                  }}
                  title={`${waypoint.name}: ${waypoint.elevation}m`}
                />
                <div className="text-xs text-center mt-1 text-gray-600">
                  D{waypoint.day}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{Math.min(...trekWaypoints.map(w => w.elevation))}m</span>
            <span>{Math.max(...trekWaypoints.map(w => w.elevation))}m</span>
          </div>
        </div>
      )}
    </div>
  )
}