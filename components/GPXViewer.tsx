'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Note: leaflet-gpx needs to be imported after leaflet
import 'leaflet-gpx'

interface GPXViewerProps {
  gpxFile: string
  height?: string
}

export default function GPXViewer({ gpxFile, height = 'h-96' }: GPXViewerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      center: [28.4, 83.7], // Approximate center of Khopra region
      zoom: 12,
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add GPX track
    try {
      const gpx = new (L as any).GPX(gpxFile, {
        async: true,
        marker_options: {
          startIconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          endIconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        },
        polyline_options: {
          color: '#1e40af',
          weight: 4,
          opacity: 0.8,
        }
      })

      gpx.on('loaded', (e: any) => {
        map.fitBounds(e.target.getBounds())
      })

      gpx.on('error', (e: any) => {
        console.error('GPX loading error:', e)
      })

      gpx.addTo(map)
    } catch (error) {
      console.error('Error loading GPX:', error)
    }

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [gpxFile])

  return (
    <div className={`${height} w-full relative rounded-lg overflow-hidden border border-gray-200`}>
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}