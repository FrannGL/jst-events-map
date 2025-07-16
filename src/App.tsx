import { useState } from "react";
import { CustomMap } from "./components/custom/App";
import { Topbar } from "./components/custom/Topbar";

export default function App() {
  const [selectedModos, setSelectedModos] = useState<string[]>([
    "aeronautico",
    "ferroviario",
    "maritimo",
    "automotor",
  ]);

  const toggleModo = (modo: string) => {
    setSelectedModos((prev) =>
      prev.includes(modo) ? prev.filter((m) => m !== modo) : [...prev, modo]
    );
  };

  return (
    <div className="w-screen h-screen relative">
      <Topbar selectedModos={selectedModos} toggleModo={toggleModo} />
      <div className="w-screen h-screen">
        <CustomMap filterModos={selectedModos} />
      </div>
    </div>
  );
}
