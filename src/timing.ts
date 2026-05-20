/** Matches --enter-from-below-duration in enter-animation.css */
export const BUBBLE_ENTRANCE_MS = 450;
export const GENIE_AFTER_BUBBLE_MS = 200;

/** Genie-only before label + chevron fade in (Version 1 ThinkingDrawerGenie) */
export const DRAWER_GENIE_DETAILS_DELAY_MS = 40;
export const AUTO_ADVANCE_MS = 2000;

/** Delay before auto-advancing from each phase to the next. */
export const PHASE_ADVANCE_MS = {
  genie: 2000,
  "thinking-header": 1000,
  "trace-pulse": 500,
  "trace-title": 500,
  /** Collapsed drawer visible before response streams in */
  "thought-complete": 800,
} as const;

/** Phases where the thinking trace timer is running */
export const THINKING_TRACE_PHASES = [
  "thinking-header",
  "trace-pulse",
  "trace-title",
  "trace-description",
  "trace-tool",
] as const;

export function getPhaseAdvanceMs(phase: string): number {
  return phase in PHASE_ADVANCE_MS
    ? PHASE_ADVANCE_MS[phase as keyof typeof PHASE_ADVANCE_MS]
    : AUTO_ADVANCE_MS;
}

/** Must match total cycle in public/assets/genie-animation-spinning.svg */
export const GENIE_SVG_MOTION_MS = 1600;
export const GENIE_SVG_LOOP_PAUSE_MS = 400;
export const GENIE_SVG_CYCLE_MS = GENIE_SVG_MOTION_MS + GENIE_SVG_LOOP_PAUSE_MS;
export const GENIE_SVG_SRC = `/assets/genie-animation-spinning.svg?v=${GENIE_SVG_CYCLE_MS}`;
export const GENIE_SVG_STATIC_SRC = "/assets/genie-static.svg";
