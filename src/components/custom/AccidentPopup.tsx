import { Popup } from "react-map-gl/mapbox";
import type { FC } from "react";
import { Plane, Ship, TrainFront, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // ruta típica del badge en shadcn-ui
import { cn } from "@/lib/utils"; // función para concatenar clases (shadcn-ui pattern)

type Props = {
  lat: number;
  lon: number;
  titulo: string;
  descripcion: string;
  tipo: string;
  modo: "aeronautico" | "ferroviario" | "maritimo" | "automotor";
  onClose: () => void;
};

export const AccidentPopup: FC<Props> = ({
  lat,
  lon,
  titulo,
  descripcion,
  tipo,
  modo,
  onClose,
}) => {
  const renderModoBadge = () => {
    const baseClasses = "inline-flex items-center gap-1";

    switch (modo) {
      case "aeronautico":
        return (
          <Badge className={cn(baseClasses, "bg-blue-100 text-blue-800")}>
            <Plane className="w-4 h-4" />
            Aeronáutico
          </Badge>
        );
      case "ferroviario":
        return (
          <Badge className={cn(baseClasses, "bg-purple-100 text-purple-800")}>
            <TrainFront className="w-4 h-4" />
            Ferroviario
          </Badge>
        );
      case "maritimo":
        return (
          <Badge className={cn(baseClasses, "bg-sky-100 text-sky-800")}>
            <Ship className="w-4 h-4" />
            Marítimo
          </Badge>
        );
      case "automotor":
        return (
          <Badge className={cn(baseClasses, "bg-amber-100 text-amber-800")}>
            <Car className="w-4 h-4" />
            Automotor
          </Badge>
        );
      default:
        return null;
    }
  };

  const tipoColorClasses = () => {
    switch (tipo.toLowerCase()) {
      case "accidente":
        return "bg-red-100 text-red-800";
      case "incidente grave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <Popup
      longitude={lon}
      latitude={lat}
      anchor="top"
      onClose={onClose}
      closeOnClick={false}
      closeButton={false}
    >
      <div className="relative bg-white rounded-md shadow-md border border-gray-200 px-3 py-2 max-w-xs text-sm">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700 text-sm w-5 h-5 flex items-center justify-center bg-white rounded-full shadow cursor-pointer outline-none border-none focus:outline-none focus:ring-0"
          aria-label="Cerrar"
        >
          ×
        </button>

        <h3 className="font-semibold text-gray-900 mb-1">{titulo}</h3>
        <p className="text-gray-700 mb-2">{descripcion}</p>

        <div className="flex items-center justify-between">
          <Badge
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded",
              tipoColorClasses()
            )}
          >
            {tipo}
          </Badge>
          {renderModoBadge()}
        </div>
      </div>
    </Popup>
  );
};
