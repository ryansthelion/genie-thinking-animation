/** Matches --enter-from-below-duration in enter-animation.css */
export const BUBBLE_ENTRANCE_MS = 450;
export const GENIE_AFTER_BUBBLE_MS = 200;

/** Matches --enter-fade-in-duration in enter-animation.css / ThinkingDrawerGenie.css */
export const ENTER_FADE_IN_MS = 250;

/** Gap after genie entrance before label + chevron (Version 1 ThinkingDrawerGenie) */
export const DRAWER_GENIE_DETAILS_DELAY_MS = 100;

/** Drawer slot max-width transition (ThinkingDrawerGenie.css) */
export const DRAWER_SLOT_REVEAL_MS = ENTER_FADE_IN_MS;

/** Gap after drawer label/chevron visible before Multisteps enters */
export const THINKING_DRAWER_TO_MULTISTEPS_DELAY_MS = 20;

/** Version 1: genie fade → label reveal → pause before trace */
export const THINKING_DRAWER_SETTLE_MS =
  ENTER_FADE_IN_MS + DRAWER_GENIE_DETAILS_DELAY_MS + DRAWER_SLOT_REVEAL_MS;

export const AUTO_ADVANCE_MS = 2000;

/** Delay before auto-advancing from each phase to the next. */
export const PHASE_ADVANCE_MS = {
  genie: 2000,
  "thinking-header":
    THINKING_DRAWER_SETTLE_MS + THINKING_DRAWER_TO_MULTISTEPS_DELAY_MS,
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
