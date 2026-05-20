import { useEffect, useRef, useState } from "react";
import {
  BUBBLE_ENTRANCE_MS,
  GENIE_AFTER_BUBBLE_MS,
} from "../timing";

/**
 * Reveal genie only after bubble enter-from-below finishes + gap.
 * Calls onReveal when ready (use to advance from user-only → genie).
 */
export function useGenieAfterBubble(
  phase: string,
  bubbleKey: number,
  onReveal?: () => void,
) {
  const [genieVisible, setGenieVisible] = useState(false);
  const revealedRef = useRef(false);
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(() => {
    if (phase !== "user-only") {
      setGenieVisible(true);
      revealedRef.current = true;
      return;
    }

    setGenieVisible(false);
    revealedRef.current = false;
  }, [phase]);

  useEffect(() => {
    if (phase !== "user-only") return;

    let gapTimerId: number | undefined;

    const reveal = () => {
      if (revealedRef.current) return;
      revealedRef.current = true;
      setGenieVisible(true);
      onRevealRef.current?.();
    };

    const scheduleRevealAfterGap = () => {
      gapTimerId = window.setTimeout(reveal, GENIE_AFTER_BUBBLE_MS);
    };

    const fallbackId = window.setTimeout(
      reveal,
      BUBBLE_ENTRANCE_MS + GENIE_AFTER_BUBBLE_MS,
    );

    const bubble = document.querySelector<HTMLElement>(
      ".user-message__bubble.enter-from-below",
    );
    if (!bubble) {
      return () => {
        window.clearTimeout(fallbackId);
        if (gapTimerId !== undefined) window.clearTimeout(gapTimerId);
      };
    }

    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target !== bubble || event.animationName !== "enter-from-below") {
        return;
      }
      window.clearTimeout(fallbackId);
      scheduleRevealAfterGap();
    };

    bubble.addEventListener("animationend", onAnimationEnd);

    return () => {
      window.clearTimeout(fallbackId);
      if (gapTimerId !== undefined) window.clearTimeout(gapTimerId);
      bubble.removeEventListener("animationend", onAnimationEnd);
    };
  }, [phase, bubbleKey]);

  return genieVisible;
}
