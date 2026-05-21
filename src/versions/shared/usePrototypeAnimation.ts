import { useCallback, useEffect, useRef, useState } from "react";
import { getPhaseAdvanceMs, THINKING_TRACE_PHASES } from "../../timing";
import type { AnimationPhase } from "./animationPhases";
import { PROTOTYPE_PHASES } from "./animationPhases";

export function usePrototypeAnimation() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [responseStreamComplete, setResponseStreamComplete] = useState(false);
  const phase = PROTOTYPE_PHASES[phaseIndex];
  const thinkingStartedAt = useRef<number | null>(null);
  const [thoughtSeconds, setThoughtSeconds] = useState(12);

  const goNext = useCallback(() => {
    setPhaseIndex((i) => (i + 1) % PROTOTYPE_PHASES.length);
  }, []);

  const advanceFromUserOnly = useCallback(() => {
    setPhaseIndex((i) => (i === 0 ? 1 : i));
  }, []);

  useEffect(() => {
    if (phase === "response" || phase === "user-only") {
      setResponseStreamComplete(false);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "user-only") {
      thinkingStartedAt.current = null;
      return;
    }

    if (
      phase === "thinking-header" &&
      thinkingStartedAt.current === null
    ) {
      thinkingStartedAt.current = Date.now();
    }

    if (phase === "thought-complete" && thinkingStartedAt.current !== null) {
      const elapsedMs = Date.now() - thinkingStartedAt.current;
      setThoughtSeconds(Math.max(1, Math.round(elapsedMs / 1000)));
    }
  }, [phase]);

  useEffect(() => {
    if (!isPlaying || phase === "user-only" || phase === "response") return;
    const id = window.setTimeout(goNext, getPhaseAdvanceMs(phase));
    return () => window.clearTimeout(id);
  }, [isPlaying, goNext, phase]);

  const handleResponseStreamComplete = useCallback(() => {
    setResponseStreamComplete(true);
    setIsPlaying(false);
  }, []);

  const genieAnimating = !responseStreamComplete;

  const handleGenieReveal = useCallback(() => {
    if (!isPlaying || phase !== "user-only") return;
    advanceFromUserOnly();
  }, [isPlaying, phase, advanceFromUserOnly]);

  const showThoughtSummary =
    phase === "thought-complete" ||
    phase === "response" ||
    responseStreamComplete;

  const drawerLabel = showThoughtSummary
    ? `Thought for ${thoughtSeconds}s`
    : "Thinking";

  const drawerShimmer = THINKING_TRACE_PHASES.includes(
    phase as (typeof THINKING_TRACE_PHASES)[number],
  );

  return {
    phase: phase as AnimationPhase,
    drawerLabel,
    drawerShimmer,
    keepThinkingDrawer: showThoughtSummary,
    genieAnimating,
    hideDrawerGenie: showThoughtSummary,
    onGenieReveal: handleGenieReveal,
    onResponseStreamComplete: handleResponseStreamComplete,
  };
}
