'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TrekWaypoint } from '@/data/trekRouteData'

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapComponentProps {
  waypoints: TrekWaypoint[]
  selectedDay?: number
}

const getMarkerIcon = (waypoint: TrekWaypoint, isSelected: boolean = false) => {
  const iconSize: [number, number] = [25, 41]
  const iconAnchor: [number, number] = [12, 41]
  const popupAnchor: [number, number] = [1, -34]

  let iconUrl = ''

  switch (waypoint.type) {
    case 'village':
      iconUrl = isSelected
        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
      break
    case 'camp':
      iconUrl = isSelected
        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png'
      break
    case 'summit':
      iconUrl = isSelected
        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png'
      break
    case 'lake':
      iconUrl = isSelected
        ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
        : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png'
      break
    default:
      iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png'
  }

  return new L.Icon({
    iconUrl,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize,
    iconAnchor,
    popupAnchor,
    shadowSize: [41, 41]
  })
}

export default function MapComponent({ waypoints, selectedDay }: MapComponentProps) {
  // Calculate bounds to fit all waypoints
  const validWaypoints = waypoints.filter(w => w.latitude && w.longitude)

  if (validWaypoints.length === 0) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">No valid coordinates found</div>
      </div>
    )
  }

  const center: [number, number] = [
    validWaypoints.reduce((sum, w) => sum + w.latitude, 0) / validWaypoints.length,
    validWaypoints.reduce((sum, w) => sum + w.longitude, 0) / validWaypoints.length
  ]

  // Create path coordinates for the trek route
  const pathCoordinates: [number, number][] = validWaypoints
    .sort((a, b) => a.day - b.day)
    .map(w => [w.latitude, w.longitude])

  return (
    <MapContainer
      center={center}
      zoom={11}
      className="h-full w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Trek route polyline */}
      <Polyline
        positions={pathCoordinates}
        color="#1e40af"
        weight={4}
        opacity={0.8}
        dashArray="5, 10"
      />

      {/* Waypoint markers */}
      {validWaypoints.map((waypoint) => {
        const isSelected = selectedDay === waypoint.day

        return (
          <Marker
            key={waypoint.id}
            position={[waypoint.latitude, waypoint.longitude]}
            icon={getMarkerIcon(waypoint, isSelected)}
          >
            <Popup>
              <div className="min-w-48">
                <h3 className="font-semibold text-nepal-blue mb-2">
                  Day {waypoint.day}: {waypoint.name}
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Elevation:</span>
                    <span>{waypoint.elevation}m ({waypoint.elevationFt}ft)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="capitalize">{waypoint.type}</span>
                  </div>
                  {waypoint.duration && (
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{waypoint.duration}</span>
                    </div>
                  )}
                  {waypoint.distance && (
                    <div className="flex justify-between">
                      <span className="font-medium">Distance:</span>
                      <span>{waypoint.distance}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">Difficulty:</span>
                    <span className={`px-1 rounded text-xs ${
                      waypoint.difficulty === 'difficult' ? 'bg-red-100 text-red-800' :
                      waypoint.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {waypoint.difficulty}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600">{waypoint.description}</p>
                {waypoint.highlights.length > 0 && (
                  <div className="mt-2">
                    <div className="font-medium text-xs text-gray-700 mb-1">Highlights:</div>
                    <ul className="text-xs text-gray-600 space-y-0.5">
                      {waypoint.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}