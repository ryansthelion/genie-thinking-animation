import { useEffect, useState } from "react";

/** Simulates network chunks arriving for smooth-stream demos. */
export function useSimulatedChunks(
  fullText: string,
  active: boolean,
  chunkSize = 12,
  intervalMs = 45,
) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) {
      setText("");
      return;
    }

    setText("");
    let index = 0;
    const id = window.setInterval(() => {
      index = Math.min(index + chunkSize, fullText.length);
      setText(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(id);
      }
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [active, fullText, chunkSize, intervalMs]);

  return text;
}
