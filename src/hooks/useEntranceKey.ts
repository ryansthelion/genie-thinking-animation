import { useEffect, useRef, useState } from "react";

/** Bump key when `phase` enters `entrancePhase` so enter-from-below replays. */
export function useEntranceKey(phase: string, entrancePhase: string): number {
  const [key, setKey] = useState(0);
  const prevPhaseRef = useRef(phase);

  useEffect(() => {
    if (phase === entrancePhase && prevPhaseRef.current !== entrancePhase) {
      setKey((k) => k + 1);
    }
    prevPhaseRef.current = phase;
  }, [phase, entrancePhase]);

  return key;
}
