import type { LayerProps } from "react-map-gl/mapbox";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "accidents",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#FF3B30",
      10,
      "#FF9500",
      20,
      "#007AFF",
    ],
    "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 20, 25],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "accidents",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
  paint: {
    "text-color": "#fff",
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "accidents",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": [
      "match",
      ["get", "tipo"],
      "accidente",
      "rgba(255, 59, 48, 1)",
      "incidente grave",
      "rgba(255, 255, 0, 1)",
      "incidente",
      "rgba(50, 205, 50, 1)",
      "rgba(0, 255, 0, 1)",
    ],
    "circle-radius": 8,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#000",
  },
};
