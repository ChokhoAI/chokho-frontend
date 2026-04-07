"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTheme } from "next-themes";
import { bins, complaints, routes, vehicles } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

// Fix leaflet icon issue in Next.js
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const truckIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export interface MapProps {
  type: "worker-route" | "admin-routes" | "heatmap";
  routeId?: string;
}

export default function BaseMap({ type, routeId }: MapProps) {
  // Center roughly around Dehradun
  const center: [number, number] = [30.3165, 78.0322];

  // Map box styling based on theme could be done via standard leaflet tiles, but here using basic openstreetmap
  // A dark mode map tile would be better for our theme, like CartoDB Dark Matter
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  if (type === "worker-route") {
    // Show single route
    const route = routes.find(r => r.id === routeId) || routes[0];
    const routeBins = bins.filter(b => route.bins.includes(b.id));
    
    // Create polyline from bin coordinates (simple line connecting them)
    const polylinePositions: [number, number][] = routeBins.map(b => [b.coordinates.lat, b.coordinates.lng]);
    
    return (
      <MapContainer center={routeBins.length > 0 ? [routeBins[0].coordinates.lat, routeBins[0].coordinates.lng] : center} zoom={13} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        <Polyline positions={polylinePositions} color="hsl(var(--primary))" weight={4} opacity={0.7} />
        
        {routeBins.map((bin, index) => (
          <Marker key={bin.id} position={[bin.coordinates.lat, bin.coordinates.lng]} icon={customIcon}>
            <Popup>
              <div className="font-sans">
                <p className="font-semibold text-sm mb-1">{bin.location}</p>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">{bin.id}</span>
                  <span className={`text-[10px] px-1.5 rounded-sm ${bin.fillLevel > 80 ? 'bg-destructive/20 text-destructive' : 'bg-emerald-500/20 text-emerald-500'}`}>
                    {bin.fillLevel}% Full
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

  if (type === "admin-routes") {
    return (
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {/* Draw multiple routes */}
        {routes.filter(r => r.status === "active").map((route, i) => {
          const routeBins = bins.filter(b => route.bins.includes(b.id));
          const polylinePositions: [number, number][] = routeBins.map(b => [b.coordinates.lat, b.coordinates.lng]);
          
          // Use different colors for different routes if possible, or just primary
          const colors = ["#D97706", "#10B981", "#3B82F6"]; // Amber, Emerald, Blue
          const color = colors[i % colors.length];

          return (
            <div key={route.id}>
              <Polyline positions={polylinePositions} color={color} weight={4} opacity={0.7} />
              {routeBins.map((bin) => (
                <CircleMarker key={`${route.id}-${bin.id}`} center={[bin.coordinates.lat, bin.coordinates.lng]} radius={4} color={color} fillColor={color} fillOpacity={0.8}>
                  <Popup>{bin.location}</Popup>
                </CircleMarker>
              ))}
            </div>
          );
        })}

        {/* Vehicles */}
        {vehicles.filter(v => v.type === "truck" || v.type === "mini-truck").slice(0, 3).map((v, i) => (
           <Marker key={v.id} position={[center[0] + (i * 0.01), center[1] + (i * 0.015)]} icon={truckIcon}>
            <Popup className="font-sans text-sm font-semibold">{v.registrationNumber}</Popup>
           </Marker>
        ))}
      </MapContainer>
    );
  }

  if (type === "heatmap") {
    // For heatmap, we'll simulate density using CircleMarkers with varying radius/opacity based on bin full levels and complaints
    return (
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {bins.map((bin) => {
          // Color based on fill level
          let color = "#10B981"; // emerald
          if (bin.fillLevel > 80) color = "#EF4444"; // destructive
          else if (bin.fillLevel > 50) color = "#F59E0B"; // amber

          return (
            <CircleMarker 
              key={bin.id} 
              center={[bin.coordinates.lat, bin.coordinates.lng]} 
              radius={bin.fillLevel > 80 ? 25 : bin.fillLevel > 50 ? 15 : 10} 
              color="transparent" 
              fillColor={color} 
              fillOpacity={0.4}
            >
              <Popup>
                <div className="font-sans">
                  <p className="font-semibold">{bin.location}</p>
                  <p className="text-xs mt-1">Fill Level: {bin.fillLevel}%</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Overlay complaints as smaller solid dots */}
        {complaints.filter(c => c.status !== "resolved").map((c) => (
          <CircleMarker
            key={c.id}
            center={[c.coordinates.lat, c.coordinates.lng]}
            radius={5}
            color="#EF4444"
            fillColor="#EF4444"
            fillOpacity={1}
          >
             <Popup>
                <div className="font-sans">
                  <p className="font-semibold text-sm">{c.title}</p>
                  <Badge variant="destructive" className="mt-1 text-[10px]">{c.priority}</Badge>
                </div>
              </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    );
  }

  return null;
}
