"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Melbourne CBD center. Same anchor the original static site used.
const MELBOURNE: [number, number] = [-37.8136, 144.9631]

// Three concentric service zones, in metres. Tuned to Harry's actual pricing:
//   Inner (8 km)     — CBD + closest suburbs only, lowest rate.
//   Outer (40 km)    — most of Greater Melbourne metro (Frankston, Werribee,
//                      Eltham, Sunbury, Berwick).
//   Outer Mel (140 km) — reaches Geelong (~75 km), Ballarat (~115 km),
//                      Phillip Island / Cowes (~140 km). Beyond the purple
//                      ring is a custom-quote conversation.
const zones = [
  { radius: 8000, color: "#F5B742", label: "Inner Suburbs & CBD" },
  { radius: 40000, color: "#F06681", label: "Outer Suburbs" },
  { radius: 140000, color: "#9B4D9E", label: "Outer Melbourne" },
] as const

// Leaflet ships its default marker icon as a CSS background image. Webpack /
// Turbopack don't bundle those URLs correctly out of the box, so we point
// the icons at the public CDN copies. This is the standard react-leaflet fix.
const defaultIcon = L.icon({
  iconUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function ZonesMapInner() {
  // Tell Leaflet to use our icon for any default marker created on the map.
  useEffect(() => {
    L.Marker.prototype.options.icon = defaultIcon
  }, [])

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden bg-white"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)", height: "420px" }}
    >
      <MapContainer
        center={MELBOURNE}
        zoom={8}
        scrollWheelZoom={false}
        className="h-full w-full"
        style={{ background: "#dbeafe" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Outer-most first so the inner zones layer on top. */}
        {zones
          .slice()
          .reverse()
          .map((z) => (
            <Circle
              key={z.label}
              center={MELBOURNE}
              radius={z.radius}
              pathOptions={{
                color: z.color,
                weight: 2,
                fillColor: z.color,
                fillOpacity: 0.18,
              }}
            />
          ))}
        <Marker position={MELBOURNE} icon={defaultIcon}>
          <Popup>
            <strong>Melbourne CBD</strong>
            <br />
            Anchor for the three service zones.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
