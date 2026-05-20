import { ChevronDownIcon } from "./ChevronDownIcon";
import { ChevronRightIcon } from "./ChevronRightIcon";
import "./ThinkingDrawer.css";

type ThinkingDrawerProps = {
  collapsed?: boolean;
  label?: string;
  shimmer?: boolean;
  /** id for aria-controls when the drawer toggles a trace region */
  traceControlsId?: string;
  onToggle?: () => void;
};

export function ThinkingDrawer({
  collapsed = true,
  label = "Thinking",
  shimmer = true,
  traceControlsId = "thinking-trace",
  onToggle,
}: ThinkingDrawerProps) {
  const Tag = onToggle ? "button" : "div";

  return (
    <Tag
      type={onToggle ? "button" : undefined}
      className="thinking-drawer"
      data-node-id="9982:70358"
      data-collapsed={collapsed}
      data-shimmer={shimmer}
      aria-expanded={onToggle ? !collapsed : undefined}
      aria-controls={onToggle ? traceControlsId : undefined}
      onClick={onToggle}
    >
      <div className="thinking-drawer__row" data-node-id="3112:6488">
        {shimmer ? (
          <div className="thinking-drawer__shimmer" data-node-id="3112:6489">
            <span
              className="thinking-drawer__label"
              data-node-id="I3112:6489-3112:6166"
            >
              {label}
            </span>
            <span className="thinking-drawer__shimmer-overlay" aria-hidden />
          </div>
        ) : (
          <span
            className="thinking-drawer__label"
            data-node-id="I3112:6489-3112:6166"
          >
            {label}
          </span>
        )}
        {collapsed ? <ChevronRightIcon /> : <ChevronDownIcon />}
      </div>
    </Tag>
  );
}
