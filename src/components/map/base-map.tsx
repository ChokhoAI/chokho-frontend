"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { complaints, routes, searchComplaints, getSeverityColor, workerRouteComplaints, vehicles } from "@/lib/mock-data";
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

function severityHex(score: number): string {
  if (score >= 8) return "#EF4444";
  if (score >= 5) return "#F97316";
  return "#FBBF24";
}

export interface MapProps {
  type: "worker-route" | "admin-routes" | "heatmap";
  routeId?: string;
}

export default function BaseMap({ type, routeId }: MapProps) {
  const center: [number, number] = [30.3165, 78.0322];
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  const createColoredPin = (color: string) => {
    return new L.DivIcon({
      className: "bg-transparent",
      html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.4);"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  };

  if (type === "worker-route") {
    const stops = workerRouteComplaints;
    const polylinePositions: [number, number][] = stops.map((s: any) => [s.latitude, s.longitude]);
    
    return (
      <MapContainer center={stops.length > 0 ? [stops[0].latitude, stops[0].longitude] : center} zoom={13} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        <Polyline positions={polylinePositions} color="hsl(var(--primary))" weight={4} opacity={0.7} dashArray="5, 10" />
        
        {stops.map((s: any) => (
          <Marker key={s.id} position={[s.latitude, s.longitude]} icon={createColoredPin(severityHex(s.severityScore))}>
            <Popup>
              <div className="font-sans">
                <p className="font-semibold text-sm mb-1">{s.location}</p>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">ID: {s.id}</span>
                  <span className="text-[10px] px-1.5 rounded-sm" style={{ backgroundColor: severityHex(s.severityScore) + '20', color: severityHex(s.severityScore) }}>
                    Sequence: {s.sequenceNo}
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
      <MapContainer center={center} zoom={13} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {routes.filter(r => r.status === "active").map((route, i: number) => {
          const routeComplaints = (route.stops || [])
            .map((s: any) => complaints.find(c => c.id === s.complaintId))
            .filter((c): c is NonNullable<typeof c> => c !== undefined);

          const polylinePositions: [number, number][] = routeComplaints.map((c: any) => [c.coordinates.lat, c.coordinates.lng]);
          const colors = ["#D97706", "#10B981", "#3B82F6"];
          const color = colors[i % colors.length];

          return (
            <div key={route.id}>
              <Polyline positions={polylinePositions} color={color} weight={4} opacity={0.7} />
              {routeComplaints.map((complaint) => (
                <Marker key={`${route.id}-${complaint.id}`} position={[complaint.coordinates.lat, complaint.coordinates.lng]} icon={createColoredPin(color)}>
                  <Popup>{complaint.location}</Popup>
                </Marker>
              ))}
            </div>
          );
        })}

        {vehicles.filter(v => v.type === "truck" || v.type === "mini-truck").slice(0, 3).map((v, i: number) => (
           <Marker key={v.id} position={[center[0] + (i * 0.01), center[1] + (i * 0.015)]} icon={truckIcon}>
            <Popup className="font-sans text-sm font-semibold">{v.registrationNumber}</Popup>
           </Marker>
        ))}
      </MapContainer>
    );
  }

  if (type === "heatmap") {
    return (
      <MapContainer center={center} zoom={12} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {/* Using workerRouteComplaints for live sample points if complaints doesn't have coords */}
        {workerRouteComplaints.map((s: any) => {
          const color = severityHex(s.severityScore);

          return (
            <Marker 
              key={`heat-${s.id}`} 
              position={[s.latitude, s.longitude]} 
              icon={createColoredPin(color)}
            >
              <Popup>
                <div className="font-sans">
                  <p className="font-semibold">{s.location}</p>
                  <p className="text-xs mt-1">Severity: {s.severityScore}/10</p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    );
  }

  return null;
}
