import { useEffect, useState } from "react";
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
  showGenie = true,
  genieEntranceKey = 0,
  onToggle,
}: ThinkingDrawerGenieProps) {
  const [drawerRevealed, setDrawerRevealed] = useState(false);
  const Tag = onToggle ? "button" : "div";

  useEffect(() => {
    if (!showGenie) {
      setDrawerRevealed(false);
      return;
    }

    setDrawerRevealed(false);
    const id = window.setTimeout(
      () => setDrawerRevealed(true),
      DRAWER_GENIE_DETAILS_DELAY_MS,
    );
    return () => window.clearTimeout(id);
  }, [showGenie, genieEntranceKey]);

  if (!showGenie) return null;

  return (
    <Tag
      type={onToggle ? "button" : undefined}
      className="thinking-drawer-genie-host"
      data-node-id="10272:7449"
      data-name="Drawer"
      data-collapsed={collapsed}
      aria-expanded={onToggle ? !collapsed : undefined}
      aria-controls={onToggle ? "thinking-trace-v2" : undefined}
      onClick={onToggle}
    >
      <div className="thinking-drawer-genie__row" data-node-id="10272:7452">
        <div
          key={genieEntranceKey}
          className="thinking-drawer-genie__genie enter-fade-in"
          data-node-id="10272:7467"
          data-name="Option 2 1"
          aria-hidden
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
              traceControlsId="thinking-trace-v2"
            />
          ) : null}
        </div>
      </div>
    </Tag>
  );
}
