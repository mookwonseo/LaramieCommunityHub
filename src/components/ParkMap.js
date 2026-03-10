'use client'

import { useEffect, useRef } from 'react'

export default function ParkMap({ parks, center, zoom = 13, selectedPark }) {
    const mapRef = useRef(null)
    const instanceRef = useRef(null)

    useEffect(() => {
        if (instanceRef.current) return // already initialized

        const L = require('leaflet')
        require('leaflet/dist/leaflet.css')

        // Fix default marker icon paths broken by webpack
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        })

        const map = L.map(mapRef.current).setView(center, zoom)
        instanceRef.current = map

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map)

        parks.forEach(park => {
            const marker = L.marker([park.lat, park.lng])
                .addTo(map)
                .bindPopup(`<strong>${park.name}</strong><br/><span style="font-size:0.85rem;color:#555">${park.description}</span>`)
            // Store marker reference on the park object for later lookup
            park._marker = marker
        })

        return () => {
            map.remove()
            instanceRef.current = null
        }
    }, [])

    // Fly to selected park when a card is clicked
    useEffect(() => {
        const map = instanceRef.current
        if (!map || !selectedPark) return
        map.flyTo([selectedPark.lat, selectedPark.lng], 16, { duration: 1 })
        // Open this park's marker popup
        const park = parks.find(p => p.name === selectedPark.name)
        if (park?._marker) park._marker.openPopup()
    }, [selectedPark])

    return <div ref={mapRef} style={{ height: '480px', width: '100%', borderRadius: '12px', zIndex: 0 }} />
}
