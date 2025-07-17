import Map, { Marker, type MapRef } from "react-map-gl/mapbox";
import { useRef, useState } from "react";
import { accidentes } from "@/data/data";
import { AccidentPopup } from "./AccidentPopup";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY;

const getMarkerFilter = (tipo: string) => {
  switch (tipo) {
    case "accidente":
      return "invert(16%) sepia(92%) saturate(7471%) hue-rotate(357deg) brightness(103%) contrast(115%)";
    case "incidente grave":
      return "invert(87%) sepia(67%) saturate(693%) hue-rotate(2deg) brightness(106%) contrast(104%)";
    default:
      return "invert(50%) sepia(67%) saturate(538%) hue-rotate(67deg) brightness(89%) contrast(84%)";
  }
};

export const CustomMap = ({ filterModos }: { filterModos?: string[] }) => {
  const mapRef = useRef<MapRef | null>(null);
  const [selected, setSelected] = useState<{
    lat: number;
    lon: number;
    titulo: string;
    descripcion: string;
    tipo: string;
    modo: "aeronautico" | "ferroviario" | "maritimo" | "automotor";
  } | null>(null);

  const mapStyle = "mapbox://styles/franngl/cmd6f41w800fx01sa08p4d6an";

  return (
    <Map
      mapboxAccessToken={API_KEY}
      initialViewState={{
        longitude: -64.0,
        latitude: -36.0,
        zoom: 3.5,
      }}
      mapStyle={mapStyle}
      ref={mapRef}
      attributionControl={false}
      onClick={() => setSelected(null)}
    >
      {accidentes
        .filter(({ modo }) => !filterModos || filterModos.includes(modo))
        .map(({ coordenadas, titulo, descripcion, tipo, modo }, index) => (
          <Marker
            key={index}
            longitude={coordenadas[1]}
            latitude={coordenadas[0]}
            anchor="bottom"
          >
            <img
              src="/assets/incident.svg"
              alt={tipo}
              title={titulo}
              onClick={(e) => {
                e.stopPropagation();
                setSelected({
                  lat: coordenadas[0],
                  lon: coordenadas[1],
                  titulo,
                  descripcion,
                  tipo,
                  modo: modo as
                    | "aeronautico"
                    | "ferroviario"
                    | "maritimo"
                    | "automotor",
                });
              }}
              style={{
                width: 24,
                height: 24,
                cursor: "pointer",
                transition: "transform 0.2s ease, filter 0.2s ease",
                filter: getMarkerFilter(tipo),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.filter = `${getMarkerFilter(
                  tipo
                )} brightness(1.6) saturate(1.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.filter = getMarkerFilter(tipo);
              }}
            />
          </Marker>
        ))}

      {selected && (
        <AccidentPopup {...selected} onClose={() => setSelected(null)} />
      )}
    </Map>
  );
};
