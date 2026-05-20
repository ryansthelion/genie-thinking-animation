import { GenieResponse } from "./GenieResponse";
import { ThinkingDrawer } from "./ThinkingDrawer";
import { Multisteps } from "./Multisteps";
import { PromptInput } from "./PromptInput";
import { useEffect, useState } from "react";
import { useEntranceKey } from "../hooks/useEntranceKey";
import { useGenieAfterBubble } from "../hooks/useGenieAfterBubble";
import { GENIE_SVG_SRC, GENIE_SVG_STATIC_SRC } from "../timing";
import "./ChatRow.css";

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

type ChatRowProps = {
  phase: AnimationPhase;
  drawerLabel?: string;
  drawerShimmer?: boolean;
  keepThinkingDrawer?: boolean;
  genieAnimating?: boolean;
  onGenieReveal?: () => void;
  onResponseStreamComplete?: () => void;
};

const USER_MESSAGE =
  "Which engineers at Databricks are using vibe coding the most (by whatever metric)?";

export function ChatRow({
  phase,
  drawerLabel = "Thinking",
  drawerShimmer = true,
  keepThinkingDrawer = false,
  genieAnimating = true,
  onGenieReveal,
  onResponseStreamComplete,
}: ChatRowProps) {
  const bubbleKey = useEntranceKey(phase, "user-only");
  const genieKey = useEntranceKey(phase, "genie");
  const genieVisible = useGenieAfterBubble(phase, bubbleKey, onGenieReveal);
  const traceKey = useEntranceKey(phase, "trace-pulse");
  const titleKey = useEntranceKey(phase, "trace-title");
  const descriptionKey = useEntranceKey(phase, "trace-description");
  const toolKey = useEntranceKey(phase, "trace-tool");

  const showGenie = phase === "user-only" ? genieVisible : true;
  const showDrawer =
    phase === "thinking-header" ||
    phase === "trace-pulse" ||
    phase === "trace-title" ||
    phase === "trace-description" ||
    phase === "trace-tool" ||
    phase === "thought-complete" ||
    phase === "response";
  const traceAnimating =
    phase === "trace-pulse" ||
    phase === "trace-title" ||
    phase === "trace-description" ||
    phase === "trace-tool";
  const hasTraceContent =
    traceAnimating ||
    phase === "thought-complete" ||
    phase === "response";
  const showResponse = phase === "response";

  const [drawerPinned, setDrawerPinned] = useState(false);
  const [traceExpanded, setTraceExpanded] = useState(false);

  useEffect(() => {
    if (phase === "thought-complete") {
      setTraceExpanded(false);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "user-only") {
      setTraceExpanded(false);
    }
  }, [phase]);

  const showMultistepsLive = traceAnimating;
  const showMultistepsExpanded =
    hasTraceContent && traceExpanded && !traceAnimating;
  const showMultisteps = showMultistepsLive || showMultistepsExpanded;
  const drawerCollapsed = !traceExpanded;
  const canToggleTrace = hasTraceContent;
  useEffect(() => {
    if (showDrawer) {
      setDrawerPinned(true);
    }
    if (phase === "user-only") {
      setDrawerPinned(false);
    }
  }, [showDrawer, phase]);

  const showThinkingDrawer = drawerPinned || keepThinkingDrawer || showDrawer;

  return (
    <div className="chat-row" data-node-id="9982:71369">
      <div className="chat-row__thread" data-node-id="9982:71370">
        <div className="message-container" data-node-id="9982:71371">
          <div className="user-message" data-node-id="I9982:71371;4490:42766">
            <div className="user-message__menu" data-node-id="I9982:71371;4490:42766;4490:42722" />
            <div
              key={bubbleKey}
              className="user-message__bubble enter-from-below"
              data-node-id="I9982:71371;4490:42766;4501:110788"
            >
              <p data-node-id="I9982:71371;4490:42766;4490:42705">{USER_MESSAGE}</p>
            </div>
          </div>
        </div>

        {showGenie ? (
          <div
            className={`agent-message ${showThinkingDrawer ? "agent-message--open" : ""}`}
            data-node-id="9982:70357"
          >
            {showThinkingDrawer ? (
              <ThinkingDrawer
                collapsed={drawerCollapsed}
                label={drawerLabel}
                shimmer={drawerShimmer}
                onToggle={
                  canToggleTrace
                    ? () => setTraceExpanded((open) => !open)
                    : undefined
                }
              />
            ) : null}
          </div>
        ) : null}

        {showMultisteps ? (
          <Multisteps
            id="thinking-trace"
            entranceKey={showMultistepsExpanded ? traceKey + 1000 : traceKey}
            titleEntranceKey={showMultistepsExpanded ? titleKey + 1000 : titleKey}
            descriptionEntranceKey={
              showMultistepsExpanded ? descriptionKey + 1000 : descriptionKey
            }
            toolEntranceKey={showMultistepsExpanded ? toolKey + 1000 : toolKey}
            pulsingDot={showMultistepsLive && phase === "trace-pulse"}
            showStatusLine={
              showMultistepsExpanded ||
              phase === "trace-description" ||
              phase === "trace-tool"
            }
            showTitle={
              showMultistepsExpanded ||
              phase === "trace-title" ||
              phase === "trace-description" ||
              phase === "trace-tool"
            }
            showDescription={
              showMultistepsExpanded ||
              phase === "trace-description" ||
              phase === "trace-tool"
            }
            showToolCall={showMultistepsExpanded || phase === "trace-tool"}
          />
        ) : null}

        <GenieResponse
          active={showResponse}
          onStreamComplete={onResponseStreamComplete}
        />

        {showGenie ? (
          <>
            <div
              key={genieKey}
              className={`genie-icon enter-from-below ${
                showThinkingDrawer && !showResponse
                  ? "genie-icon--offset"
                  : ""
              } ${showResponse ? "genie-icon--after-response" : ""}`}
              data-node-id="9982:71406"
            >
              <img
                src={genieAnimating ? GENIE_SVG_SRC : GENIE_SVG_STATIC_SRC}
                alt=""
                className="genie-icon__img"
              />
            </div>
            <div className="chat-row__thread-spacer" aria-hidden />
          </>
        ) : null}
      </div>

      <PromptInput />
    </div>
  );
}
