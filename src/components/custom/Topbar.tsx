import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

const MODOS = [
  { key: "aeronautico", label: "Aeronáutico", icon: "mdi:airplane" },
  { key: "ferroviario", label: "Ferroviario", icon: "mdi:train" },
  { key: "maritimo", label: "Marítimo", icon: "mdi:ferry" },
  { key: "automotor", label: "Automotor", icon: "mdi:car" },
];

const TIPOS = [
  { key: "accidente", label: "Accidente", color: "bg-red-500" },
  { key: "incidente grave", label: "Incidente Grave", color: "bg-yellow-400" },
  { key: "incidente", label: "Incidente", color: "bg-green-500" },
];

type Props = {
  selectedModos: string[];
  toggleModo: (modo: string) => void;
};

export function Topbar({ selectedModos, toggleModo }: Props) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-3 backdrop-blur-xl bg-black/20 shadow-sm">
      <div className="relative flex items-center max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src="/assets/logo-white.png" alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Botones con iconos */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3">
          {MODOS.map(({ key, label, icon }) => {
            const selected = selectedModos.includes(key);
            return (
              <Button
                key={key}
                variant="ghost"
                onClick={() => toggleModo(key)}
                className={`flex items-center gap-2 pb-3 text-sm rounded-full transition-all cursor-pointer ${
                  selected
                    ? "bg-indigo-900 hover:bg-indigo-800 hover:text-white text-white shadow-md"
                    : "opacity-40 text-white hover:opacity-80 hover:bg-transparent hover:text-white"
                }`}
              >
                <Icon icon={icon} className="w-4 h-4" />
                {label}
              </Button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="absolute right-4 -top-1.5 flex flex-col text-xs text-white select-none">
          {TIPOS.map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded ${color}`}></span>
              <span className="text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
