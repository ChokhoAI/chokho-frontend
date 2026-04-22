"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dehradun Municipal Corporation depot
const DEPOT: [number, number] = [30.3245, 78.0467];

function severityHex(score: number): string {
  if (score >= 8) return "#FF0000"; // Urgent Danger
  if (score >= 5) return "#FF6B00"; // Warning
  return "#FFD600"; // Caution
}

const colors = [
  "#EF4444", "#10B981", "#3B82F6", "#F59E0B", "#8B5CF6", 
  "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1"
];

async function fetchOSRMRoute(coordinates: [number, number][]) {
  if (coordinates.length < 2) return null;
  
  // OSRM expects {lon},{lat}
  const coordsStr = coordinates.map(c => `${c[1]},${c[0]}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.code === "Ok" && data.routes && data.routes.length > 0) {
      // GeoJSON coordinates are [lon, lat], Leaflet needs [lat, lon]
      return data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
    }
  } catch (error) {
    console.error("OSRM Fetch Error:", error);
  }
  return null;
}

const depotIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `
    <div style="display:flex;align-items:center;justify-content:center;">
      <div style="
        width: 22px; height: 22px; border-radius: 4px;
        background: #10B981; border: 2px solid #fff;
        box-shadow: 0 0 12px rgba(16,185,129,0.5), 0 2px 6px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 800; color: #fff;
      ">D</div>
    </div>
  `,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

export interface MapProps {
  type: "worker-route" | "admin-routes" | "heatmap";
  data?: any;
}

export default function BaseMap({ type, data }: MapProps) {
  const [osrmRoutes, setOsrmRoutes] = useState<Record<string, [number, number][]>>({});
  const center: [number, number] = [30.3165, 78.0322];
  const tileUrl = "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  useEffect(() => {
    if (type === "worker-route" && data && data.length > 0) {
      const stops: [number, number][] = data.map((s: any) => [s.latitude, s.longitude]);
      // Depot → stops → Depot
      const fullRoute = [DEPOT, ...stops, DEPOT];
      fetchOSRMRoute(fullRoute).then(route => {
        if (route) setOsrmRoutes({ worker: route });
      });
    } else if (type === "admin-routes" && data && data.length > 0) {
      data.forEach((routeObj: any) => {
        const stops: [number, number][] = (routeObj.stops || []).map((s: any) => [s.latitude, s.longitude]);
        if (stops.length > 0) {
          // Depot → stops → Depot
          const fullRoute = [DEPOT, ...stops, DEPOT];
          fetchOSRMRoute(fullRoute).then(route => {
            if (route) setOsrmRoutes(prev => ({ ...prev, [routeObj.id]: route }));
          });
        }
      });
    }
  }, [type, data]);

  const createColoredPin = (color: string, isHeatmap = false) => {
    return new L.DivIcon({
      className: "bg-transparent",
      html: `
        <div class="heat-marker-container">
          <div class="heat-marker" style="background-color: ${color}; color: ${color};">
            ${isHeatmap ? '<div class="heat-marker-pulse"></div>' : ''}
          </div>
        </div>
      `,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });
  };

  if (type === "worker-route") {
    const stops = data || [];
    const fallback: [number, number][] = [DEPOT, ...stops.map((s: any) => [s.latitude, s.longitude] as [number, number]), DEPOT];
    const polylinePositions = osrmRoutes.worker || fallback;
    
    return (
      <MapContainer center={stops.length > 0 ? [stops[0].latitude, stops[0].longitude] : center} zoom={13} zoomControl={false} attributionControl={false} style={{ height: "100%", width: "100%", zIndex: 1 }}>
        <TileLayer url={tileUrl} attribution={attribution} />
        <Polyline positions={polylinePositions} color="hsl(var(--primary))" weight={5} opacity={0.8} />
        
        {/* Depot Marker */}
        <Marker position={DEPOT} icon={depotIcon}>
          <Popup>
            <div className="font-sans p-2">
              <p className="font-bold text-sm">MCD Office — Depot</p>
              <p className="text-[10px] text-muted-foreground mt-1">Route start & end point</p>
            </div>
          </Popup>
        </Marker>

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
                  <img src={s.imageUrl} alt="Complaint" className="mt-2 w-full h-32 object-cover rounded-md border border-border" />
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
        
        {/* Depot Marker */}
        <Marker position={DEPOT} icon={depotIcon}>
          <Popup>
            <div className="font-sans p-2">
              <p className="font-bold text-sm">MCD Office — Depot</p>
              <p className="text-[10px] text-muted-foreground mt-1">All routes start & return here</p>
            </div>
          </Popup>
        </Marker>

        {routes.map((route: any, i: number) => {
          const fallback: [number, number][] = [DEPOT, ...(route.stops || []).map((s: any) => [s.latitude, s.longitude] as [number, number]), DEPOT];
          const polylinePositions = osrmRoutes[route.id] || fallback;
          const color = colors[i % colors.length];

          return (
            <div key={route.id}>
              <Polyline positions={polylinePositions} color={color} weight={5} opacity={0.8} />
              {(route.stops || []).map((stop: any) => (
                <Marker key={`${route.id}-${stop.id || stop.complaintId}`} position={[stop.latitude, stop.longitude]} icon={createColoredPin(color)}>
                  <Popup>
                    <div className="font-sans p-1">
                      <p className="font-bold text-[10px] uppercase text-muted-foreground mb-1">Route: {route.formattedId || route.id}</p>
                      <p className="text-xs font-semibold">{stop.location || stop.id}</p>
                      <p className="text-[10px] mt-1 text-primary font-medium">Worker: {route.workerName}</p>
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
              icon={createColoredPin(color, true)}
            >
              <Tooltip permanent={false} direction="top" offset={[0, -10]} opacity={1}>
                <div className="w-40 bg-card overflow-hidden">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt="Complaint" className="w-full h-28 object-cover" />
                  ) : (
                    <div className="w-full h-24 bg-muted flex items-center justify-center">
                       <span className="text-[10px] text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
              </Tooltip>
              <Popup>
                <div className="w-64 bg-card">
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt="Complaint" className="w-full h-auto max-h-48 object-contain" />
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs text-muted-foreground">No detailed image available</p>
                    </div>
                  )}
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
