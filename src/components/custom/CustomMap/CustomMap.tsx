import { useMemo, useRef, useState, useCallback } from "react";

import Map, { Source, Layer, type MapRef } from "react-map-gl/mapbox";
import type { FeatureCollection, Feature, Point } from "geojson";
import type { MapMouseEvent } from "mapbox-gl";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { accidentes } from "@/data/data";
import { AccidentPopup } from "../AccidentPopup";

const API_KEY = import.meta.env.VITE_MAPBOX_KEY;

export const CustomMap = ({ filterModos }: { filterModos?: string[] }) => {
  const mapRef = useRef<MapRef>(null);
  const [selectedAccident, setSelectedAccident] =
    useState<Feature<Point> | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const geojson = useMemo<FeatureCollection>(
    () => ({
      type: "FeatureCollection",
      features: accidentes
        .filter(({ modo }) => !filterModos || filterModos.includes(modo))
        .map((accidente) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [accidente.coordenadas[1], accidente.coordenadas[0]],
          },
          properties: { ...accidente },
        })),
    }),
    [filterModos]
  );

  const handleClick = useCallback(
    (e: MapMouseEvent) => {
      if (!mapReady || !mapRef.current) return;

      const features = e.target.queryRenderedFeatures(e.point, {
        layers: ["unclustered-point"],
      });

      const clicked = features.find((f) => f.layer?.id === "unclustered-point");

      setSelectedAccident(clicked as Feature<Point> | null);
    },
    [mapReady]
  );

  const handleMouseMove = useCallback((e: MapMouseEvent) => {
    if (!mapRef.current) return;

    const features = e.target.queryRenderedFeatures(e.point, {
      layers: ["unclustered-point"],
    });

    const canvas = mapRef.current.getMap().getCanvas();
    canvas.style.cursor = features.length > 0 ? "pointer" : "";
  }, []);

  return (
    <Map
      mapboxAccessToken={API_KEY}
      initialViewState={{
        longitude: -64.0,
        latitude: -36.0,
        zoom: 3.5,
      }}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      ref={mapRef}
      onLoad={() => {
        setMapReady(true);
        const map = mapRef.current?.getMap();

        if (map && !map.getTerrain()) {
          map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

          map.setLight({
            anchor: "viewport",
            intensity: 0.6,
          });
        }
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {mapReady && (
        <>
          <Source
            id="mapbox-dem"
            type="raster-dem"
            url="mapbox://mapbox.terrain-rgb"
            tileSize={512}
            maxzoom={14}
          />
          <Source
            id="accidents"
            type="geojson"
            data={geojson}
            cluster={true}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            <Layer {...clusterLayer} />
            <Layer {...clusterCountLayer} />
            <Layer {...unclusteredPointLayer} />
          </Source>
        </>
      )}

      {selectedAccident && (
        <AccidentPopup
          lat={selectedAccident.geometry.coordinates[1]}
          lon={selectedAccident.geometry.coordinates[0]}
          titulo={selectedAccident.properties?.titulo ?? ""}
          descripcion={selectedAccident.properties?.descripcion ?? ""}
          tipo={selectedAccident.properties?.tipo ?? ""}
          modo={selectedAccident.properties?.modo ?? "automotor"}
          onClose={() => setSelectedAccident(null)}
        />
      )}
    </Map>
  );
};
