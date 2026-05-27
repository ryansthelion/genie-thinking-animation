import { useCallback, useEffect, useRef, useState } from "react";
import { ThinkingDrawer } from "../../components/ThinkingDrawer";
import {
  DRAWER_GENIE_DETAILS_DELAY_MS,
  GENIE_SVG_SRC,
  GENIE_SVG_STATIC_SRC,
} from "../../timing";
import "./ThinkingDrawerGenie.css";

type ThinkingDrawerGenieProps = {
  collapsed?: boolean;
  label?: string;
  shimmer?: boolean;
  genieAnimating?: boolean;
  /** Fade out drawer genie and shift label/chevron left after response finishes */
  hideGenie?: boolean;
  showGenie?: boolean;
  /** Resets the label reveal when the prototype cycle restarts */
  genieEntranceKey?: number;
  onToggle?: () => void;
};

/**
 * Version 1 — genie + ThinkingDrawer (reuses shared drawer for working shimmer).
 */
export function ThinkingDrawerGenie({
  collapsed = true,
  label = "Thinking",
  shimmer = true,
  genieAnimating = true,
  hideGenie = false,
  showGenie = true,
  genieEntranceKey = 0,
  onToggle,
}: ThinkingDrawerGenieProps) {
  const [drawerRevealed, setDrawerRevealed] = useState(false);
  const revealTimeoutRef = useRef<number | null>(null);

  const clearRevealTimeout = useCallback(() => {
    if (revealTimeoutRef.current !== null) {
      window.clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
  }, []);

  const scheduleDrawerReveal = useCallback(() => {
    clearRevealTimeout();
    revealTimeoutRef.current = window.setTimeout(() => {
      setDrawerRevealed(true);
      revealTimeoutRef.current = null;
    }, DRAWER_GENIE_DETAILS_DELAY_MS);
  }, [clearRevealTimeout]);

  useEffect(() => {
    if (!showGenie) {
      setDrawerRevealed(false);
      clearRevealTimeout();
      return;
    }

    setDrawerRevealed(false);
    clearRevealTimeout();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scheduleDrawerReveal();
    }

    return clearRevealTimeout;
  }, [showGenie, genieEntranceKey, clearRevealTimeout, scheduleDrawerReveal]);

  const handleGenieAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      if (event.animationName !== "enter-fade-in") return;
      scheduleDrawerReveal();
    },
    [scheduleDrawerReveal],
  );

  if (!showGenie) return null;

  return (
    <div
      className="thinking-drawer-genie-host"
      data-node-id="10272:7449"
      data-name="Drawer"
      data-collapsed={collapsed}
      data-genie-hidden={hideGenie}
    >
      <div className="thinking-drawer-genie__row" data-node-id="10272:7452">
        <div
          key={genieEntranceKey}
          className="thinking-drawer-genie__genie enter-fade-in"
          data-node-id="10272:7467"
          data-name="Option 2 1"
          aria-hidden
          onAnimationEnd={handleGenieAnimationEnd}
        >
          <img
            className="thinking-drawer-genie__genie-img"
            src={genieAnimating ? GENIE_SVG_SRC : GENIE_SVG_STATIC_SRC}
            alt=""
            draggable={false}
          />
        </div>

        <div
          className={`thinking-drawer-genie__drawer-slot ${
            drawerRevealed ? "thinking-drawer-genie__drawer-slot--visible" : ""
          }`}
          aria-hidden={!drawerRevealed}
        >
          {drawerRevealed ? (
            <ThinkingDrawer
              collapsed={collapsed}
              label={label}
              shimmer={shimmer}
              variant="link"
              traceControlsId="thinking-trace-v2"
              onToggle={onToggle}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
