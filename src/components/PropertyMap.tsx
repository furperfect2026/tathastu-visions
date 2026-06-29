import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, X } from "lucide-react";
import type { RealtyProject } from "@/lib/realty-data";

interface PropertyMapProps {
  properties: RealtyProject[];
  activePinId: string | null;
  selectedPinId: string | null;
  hoveredPinId: string | null;
  setSelectedPinId: (id: string | null) => void;
  setHoveredPinId: (id: string | null) => void;
  activeProperty: RealtyProject | undefined;
}

const getCoordinates = (p: RealtyProject): [number, number] => {
  const loc = (p.location + " " + p.neighborhood).toLowerCase();
  
  if (loc.includes("hinjewadi")) return [18.5913, 73.7389];
  if (loc.includes("baner")) return [18.5590, 73.7868];
  if (loc.includes("pashan")) return [18.5372, 73.7915];
  if (loc.includes("kothrud")) return [18.5074, 73.8077];
  if (loc.includes("shivajinagar") || loc.includes("central")) return [18.5314, 73.8446];
  if (loc.includes("dhanori")) return [18.5793, 73.8967];
  if (loc.includes("lohegaon")) return [18.5844, 73.9189];
  if (loc.includes("charholi")) return [18.6369, 73.8943];
  if (loc.includes("manjri")) return [18.5147, 73.9739];
  if (loc.includes("hadapsar")) return [18.5089, 73.9260];
  if (loc.includes("kondhwa")) return [18.4771, 73.8907];
  if (loc.includes("kharadi")) return [18.5515, 73.9348];
  if (loc.includes("vimannagar") || loc.includes("viman nagar")) return [18.5679, 73.9143];
  
  return [18.5204, 73.8567];
};

export default function PropertyMap({
  properties,
  activePinId,
  selectedPinId,
  hoveredPinId,
  setSelectedPinId,
  setHoveredPinId,
  activeProperty
}: PropertyMapProps) {
  
  const createCustomIcon = (p: RealtyProject) => {
    const isActive = p.id === activePinId;
    
    const html = `
      <div class="relative flex items-center justify-center h-8 w-8 rounded-full border transition-all ${
        isActive
          ? "bg-gradient-to-r from-amber-200 to-amber-500 border-amber-400 text-slate-900 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
          : "bg-slate-900 border-slate-700 text-amber-500 hover:border-amber-400 hover:scale-105"
      }">
        ${isActive ? '<span class="absolute inset-0 rounded-full bg-amber-400/40 animate-ping pointer-events-none"></span>' : ''}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isActive ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      
      <div class="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 property-map-tooltip">
        <div class="bg-card border border-border shadow-lg rounded-md px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-foreground flex items-center gap-1">
          <span class="text-amber-500 font-semibold">
            ${p.price?.startsWith("₹") ? p.price : p.price?.match(/^[0-9]/) ? `₹${p.price}` : p.price || ''}
          </span>
        </div>
        <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-border"></div>
      </div>
    `;

    return L.divIcon({
      html: html,
      className: `custom-map-pin group ${isActive ? 'active-pin' : ''}`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16]
    });
  };

  return (
    <>
      <MapContainer 
        center={[18.5204, 73.8567]} 
        zoom={11} 
        style={{ height: "100%", width: "100%", zIndex: 1 }}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {properties.map((p) => {
          const coords = getCoordinates(p);
          return (
            <Marker 
              key={p.id} 
              position={coords} 
              icon={createCustomIcon(p)}
              eventHandlers={{
                click: () => setSelectedPinId(p.id === selectedPinId ? null : p.id),
                mouseover: () => setHoveredPinId(p.id),
                mouseout: () => setHoveredPinId(null)
              }}
              zIndexOffset={p.id === activePinId ? 1000 : 0}
            />
          );
        })}
      </MapContainer>
      
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-container {
          background: #05101a;
          font-family: inherit;
        }
        .custom-map-pin {
          background: transparent;
          border: none;
        }
        .property-map-tooltip {
          display: none;
        }
        .custom-map-pin:hover .property-map-tooltip {
          display: block;
        }
      `}} />
    </>
  );
}
