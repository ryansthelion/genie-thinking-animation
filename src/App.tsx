import { useCallback, useEffect, useRef, useState } from "react";
import { ChatRow, type AnimationPhase } from "./components/ChatRow";
import { getPhaseAdvanceMs, THINKING_TRACE_PHASES } from "./timing";
import "./App.css";

const PHASES: AnimationPhase[] = [
  "user-only",
  "genie",
  "thinking-header",
  "trace-pulse",
  "trace-title",
  "trace-description",
  "trace-tool",
  "thought-complete",
  "response",
];

export default function App() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [responseStreamComplete, setResponseStreamComplete] = useState(false);
  const phase = PHASES[phaseIndex];
  const thinkingStartedAt = useRef<number | null>(null);
  const [thoughtSeconds, setThoughtSeconds] = useState(12);

  const goNext = useCallback(() => {
    setPhaseIndex((i) => (i + 1) % PHASES.length);
  }, []);

  const advanceFromUserOnly = useCallback(() => {
    setPhaseIndex((i) => (i === 0 ? 1 : i));
  }, []);

  useEffect(() => {
    if (phase === "response") {
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

  return (
    <ChatRow
      phase={phase}
      drawerLabel={drawerLabel}
      drawerShimmer={drawerShimmer}
      keepThinkingDrawer={showThoughtSummary}
      genieAnimating={genieAnimating}
      onGenieReveal={handleGenieReveal}
      onResponseStreamComplete={handleResponseStreamComplete}
    />
  );
}
