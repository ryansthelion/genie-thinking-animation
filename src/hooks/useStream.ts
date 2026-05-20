import { useCallback, useEffect, useRef, useState } from "react";

export const TYPEWRITER_SPEED_MS = 5;

export function useStream(onComplete?: () => void) {
  const [parts, setParts] = useState<string[]>([]);
  const [stream, setStream] = useState("");
  const frame = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const streamIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const completedRef = useRef(false);
  onCompleteRef.current = onComplete;

  const addPart = useCallback((part: string) => {
    if (part) {
      setParts((prev) => [...prev, part]);
    }
  }, []);

  const reset = useCallback(() => {
    setParts([]);
    setStream("");
    streamIndexRef.current = 0;
    completedRef.current = false;
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }
    frame.current = null;
    lastTimeRef.current = 0;
    isAnimatingRef.current = false;
  }, []);

  useEffect(() => {
    const fullText = parts.join("");
    if (streamIndexRef.current < fullText.length) {
      completedRef.current = false;
    }

    if (isAnimatingRef.current) return;

    if (streamIndexRef.current >= fullText.length) {
      setStream(fullText);
      if (fullText.length > 0 && !completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    isAnimatingRef.current = true;

    const animate = (time: number) => {
      if (streamIndexRef.current < fullText.length) {
        if (time - lastTimeRef.current > TYPEWRITER_SPEED_MS) {
          streamIndexRef.current += 1;
          setStream(fullText.slice(0, streamIndexRef.current));
          lastTimeRef.current = time;
        }
        frame.current = requestAnimationFrame(animate);
      } else {
        isAnimatingRef.current = false;
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
      }
    };

    frame.current = requestAnimationFrame(animate);

    return () => {
      if (frame.current !== null) {
        cancelAnimationFrame(frame.current);
      }
      isAnimatingRef.current = false;
    };
  }, [parts]);

  return { stream, addPart, reset };
}
