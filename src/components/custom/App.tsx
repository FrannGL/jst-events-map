import Map, { Marker, type MapRef } from "react-map-gl/mapbox";
import { useRef, useState } from "react";
import { accidentes } from "@/data/data";
import { AccidentPopup } from "./AccidentPopup";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY;

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
            <div
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
              title={titulo}
              className={`w-5 h-5 rounded-full cursor-pointer
                ${
                  tipo === "accidente"
                    ? "bg-red-500"
                    : tipo === "incidente grave"
                    ? "bg-yellow-400"
                    : "bg-green-500"
                }
              `}
            />
          </Marker>
        ))}

      {selected && (
        <AccidentPopup {...selected} onClose={() => setSelected(null)} />
      )}
    </Map>
  );
};
