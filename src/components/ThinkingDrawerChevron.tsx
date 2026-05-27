import "./ThinkingDrawerChevron.css";

type ThinkingDrawerChevronProps = {
  collapsed?: boolean;
};

/** Animated chevron — right (collapsed) ↔ down (expanded) */
export function ThinkingDrawerChevron({
  collapsed = true,
}: ThinkingDrawerChevronProps) {
  return (
    <div
      className="thinking-drawer-chevron"
      data-node-id={collapsed ? "3112:6490" : "3112:6266"}
      data-name={collapsed ? "chevronRightIcon" : "chevronDownIcon"}
      aria-hidden
    >
      <div className="thinking-drawer-chevron__inset">
        <div
          className={`thinking-drawer-chevron__flip ${
            collapsed ? "" : "thinking-drawer-chevron__flip--down"
          }`}
        >
          <img
            className="thinking-drawer-chevron__path"
            src="/assets/chevron-right.svg"
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
