"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Melbourne CBD center. Same anchor the original static site used.
const MELBOURNE: [number, number] = [-37.8136, 144.9631]

// Three concentric service zones, in metres. Radii calibrated to Harry's
// suburb anchors so the rings actually contain the places he charges by:
//   Inner (8 km)    — Footscray, Brunswick, Hawthorn, Balaclava. Lowest rate.
//   Outer (32 km)   — Werribee (~30 km W), Dandenong (~30 km SE),
//                     Mickleham (~30 km N). Mid rate.
//   Outer Mel (50 km) — Bacchus Marsh (~50 km NW), Healesville (~55 km E),
//                     Pakenham (~55 km SE). Deliberately stops short of
//                     Geelong (~75 km) and Sorrento (~80 km) so the map
//                     doesn't reveal the full pricing reach.
const zones = [
  { radius: 8000, color: "#F5B742", label: "Inner Suburbs & CBD" },
  { radius: 32000, color: "#F06681", label: "Outer Suburbs" },
  { radius: 50000, color: "#9B4D9E", label: "Outer Melbourne" },
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
        zoom={9}
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
