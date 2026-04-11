"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

function severityHex(score: number): string {
  if (score >= 8) return "#EF4444";
  if (score >= 5) return "#F97316";
  return "#FBBF24";
}

const colors = [
  "#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#8B5CF6", 
  "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
];

export interface MapProps {
  type: "worker-route" | "admin-routes" | "heatmap";
  data?: any;
}

export default function BaseMap({ type, data }: MapProps) {
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
    const stops = data || [];
    const polylinePositions: [number, number][] = stops.map((s: any) => [s.latitude, s.longitude]);
    
    return (
      <MapContainer center={stops.length > 0 ? [stops[0].latitude, stops[0].longitude] : center} zoom={13} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        <Polyline positions={polylinePositions} color="hsl(var(--primary))" weight={4} opacity={0.7} dashArray="5, 10" />
        
        {stops.map((s: any) => (
          <Marker key={s.id || s.complaintId} position={[s.latitude, s.longitude]} icon={createColoredPin(severityHex(s.severityScore))}>
            <Popup>
              <div className="font-sans">
                <p className="font-semibold text-sm mb-1">{s.location || s.area}</p>
                <div className="flex gap-2">
                  <span className="text-xs text-muted-foreground">ID: {s.id || s.complaintId}</span>
                  <span className="text-[10px] px-1.5 rounded-sm" style={{ backgroundColor: severityHex(s.severityScore) + '20', color: severityHex(s.severityScore) }}>
                    Sequence: {s.sequenceNo}
                  </span>
                </div>
                {s.imageUrl && (
                  <img src={s.imageUrl} alt="Complaint" className="mt-2 w-full h-24 object-cover rounded-md" />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  }

  if (type === "admin-routes") {
    const routes = data || [];
    return (
      <MapContainer center={center} zoom={13} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {routes.map((route: any, i: number) => {
          const polylinePositions: [number, number][] = (route.stops || []).map((s: any) => [s.latitude, s.longitude]);
          const color = colors[i % colors.length];

          return (
            <div key={route.id}>
              <Polyline positions={polylinePositions} color={color} weight={4} opacity={0.7} />
              {(route.stops || []).map((stop: any) => (
                <Marker key={`${route.id}-${stop.id || stop.complaintId}`} position={[stop.latitude, stop.longitude]} icon={createColoredPin(color)}>
                  <Popup>
                    <div className="font-sans p-1">
                      <p className="font-bold text-xs uppercase text-muted-foreground mb-1">Route: {route.formattedId}</p>
                      <p className="text-sm font-semibold">{stop.id || stop.complaintId}</p>
                      <p className="text-[10px] mt-1">Worker: {route.workerName}</p>
                      <p className="text-[10px]">Vehicle: {route.vehicleNo}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </div>
          );
        })}
      </MapContainer>
    );
  }

  if (type === "heatmap") {
    const complaints = data || [];
    return (
      <MapContainer center={center} zoom={12} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        
        {complaints.map((s: any, i: number) => {
          const color = severityHex(s.severityScore);

          return (
            <Marker 
              key={`heat-${i}`} 
              position={[s.latitude, s.longitude]} 
              icon={createColoredPin(color)}
            >
              <Tooltip permanent={false} direction="top" offset={[0, -10]} opacity={1}>
                <div className="font-sans w-32">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt="Complaint" className="w-full h-20 object-cover rounded-md mb-2 shadow-sm border border-border" />
                  ) : (
                    <div className="w-full h-20 bg-muted rounded-md flex items-center justify-center mb-2">
                       <span className="text-[10px] text-muted-foreground">No image</span>
                    </div>
                  )}
                  <p className="text-[10px] font-bold text-center leading-tight">Severity: {s.severityScore}/10</p>
                  <p className="text-[9px] text-muted-foreground text-center mt-0.5">{s.complaintStatus}</p>
                </div>
              </Tooltip>
              <Popup>
                <div className="font-sans">
                  <p className="font-semibold">Complaint Point</p>
                  <p className="text-xs mt-1">Status: {s.complaintStatus}</p>
                  <p className="text-xs">Severity Score: {s.severityScore}</p>
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
