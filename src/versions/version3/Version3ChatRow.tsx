import { GenieResponse } from "../../components/GenieResponse";
import { ThinkingDrawer } from "../../components/ThinkingDrawer";
import { Multisteps } from "../../components/Multisteps";
import { PromptInput } from "../../components/PromptInput";
import { useEffect, useState } from "react";
import { useEntranceKey } from "../../hooks/useEntranceKey";
import { useGenieAfterBubble } from "../../hooks/useGenieAfterBubble";
import { GENIE_SVG_SRC, GENIE_SVG_STATIC_SRC } from "../../timing";
import type { AnimationPhase } from "../shared/animationPhases";
import "../shared/chatRowLayout.css";
import "./Version3ChatRow.css";

type Version3ChatRowProps = {
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

/** Version 3 — genie inline, 8px left of ThinkingDrawer (no thread-bottom icon). */
export function Version3ChatRow({
  phase,
  drawerLabel = "Thinking",
  drawerShimmer = true,
  keepThinkingDrawer = false,
  genieAnimating = true,
  onGenieReveal,
  onResponseStreamComplete,
}: Version3ChatRowProps) {
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
  const showAgentHeader = showGenie;

  return (
    <div className="chat-row" data-version="3" data-node-id="9982:71369">
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
            className={`agent-message ${
              showAgentHeader ? "agent-message--open" : ""
            }`}
            data-node-id="9982:70357"
          >
            <div className="version3-agent-header">
              <div
                key={genieKey}
                className="version3-agent-header__genie enter-from-below"
                data-node-id="9982:71406"
                aria-hidden
              >
                <img
                  src={genieAnimating ? GENIE_SVG_SRC : GENIE_SVG_STATIC_SRC}
                  alt=""
                  className="version3-agent-header__genie-img"
                  draggable={false}
                />
              </div>
              {showThinkingDrawer ? (
                <ThinkingDrawer
                  collapsed={drawerCollapsed}
                  label={drawerLabel}
                  shimmer={drawerShimmer}
                  traceControlsId="thinking-trace-v3"
                  onToggle={
                    canToggleTrace
                      ? () => setTraceExpanded((open) => !open)
                      : undefined
                  }
                />
              ) : null}
            </div>
          </div>
        ) : null}

        {showMultisteps ? (
          <Multisteps
            id="thinking-trace-v3"
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
      </div>

      <PromptInput />
    </div>
  );
}
