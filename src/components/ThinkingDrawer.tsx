import { ChevronDownIcon } from "./ChevronDownIcon";
import { ChevronRightIcon } from "./ChevronRightIcon";
import "./ThinkingDrawer.css";

type ThinkingDrawerProps = {
  collapsed?: boolean;
  label?: string;
  shimmer?: boolean;
  /** id for aria-controls when the drawer toggles a trace region */
  traceControlsId?: string;
  /** Link-style control (text + chevron hover) instead of pill button */
  variant?: "default" | "link";
  onToggle?: () => void;
};

export function ThinkingDrawer({
  collapsed = true,
  label = "Thinking",
  shimmer = true,
  traceControlsId = "thinking-trace",
  variant = "default",
  onToggle,
}: ThinkingDrawerProps) {
  const isLink = variant === "link";
  const className = `thinking-drawer${isLink ? " thinking-drawer--link" : ""}`;

  const row = (
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
  );

  if (isLink && onToggle) {
    return (
      <a
        href={`#${traceControlsId}`}
        className={className}
        data-node-id="9982:70358"
        data-collapsed={collapsed}
        data-shimmer={shimmer}
        aria-expanded={!collapsed}
        aria-controls={traceControlsId}
        onClick={(event) => {
          event.preventDefault();
          onToggle();
        }}
      >
        {row}
      </a>
    );
  }

  if (isLink) {
    return (
      <div
        className={className}
        data-node-id="9982:70358"
        data-collapsed={collapsed}
        data-shimmer={shimmer}
      >
        {row}
      </div>
    );
  }

  const Tag = onToggle ? "button" : "div";

  return (
    <Tag
      type={onToggle ? "button" : undefined}
      className={className}
      data-node-id="9982:70358"
      data-collapsed={collapsed}
      data-shimmer={shimmer}
      aria-expanded={onToggle ? !collapsed : undefined}
      aria-controls={onToggle ? traceControlsId : undefined}
      onClick={onToggle}
    >
      {row}
    </Tag>
  );
}
