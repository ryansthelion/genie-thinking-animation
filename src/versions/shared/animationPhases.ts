export type AnimationPhase =
  | "user-only"
  | "genie"
  | "thinking-header"
  | "trace-pulse"
  | "trace-title"
  | "trace-description"
  | "trace-tool"
  | "thought-complete"
  | "response";

export const PROTOTYPE_PHASES: AnimationPhase[] = [
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
