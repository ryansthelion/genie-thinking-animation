import "./TableIcon.css";

type TableIconProps = {
  className?: string;
  "data-node-id"?: string;
};

/** Figma tableIcon — 14×14 container, path inset 6.25% (node 7929:50394 / 3432:7147) */
export function TableIcon({
  className = "",
  "data-node-id": nodeId = "3432:7147",
}: TableIconProps) {
  return (
    <svg
      className={`table-icon ${className}`.trim()}
      width={14}
      height={14}
      viewBox="0 0 12.25 12.25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      data-node-id={nodeId}
      data-name="tableIcon"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.65625C0 0.293813 0.293813 0 0.65625 0H11.5938C11.9562 0 12.25 0.293813 12.25 0.65625V11.5938C12.25 11.9562 11.9562 12.25 11.5938 12.25H0.65625C0.293813 12.25 0 11.9562 0 11.5938V0.65625ZM1.3125 1.3125V3.9375H10.9375V1.3125H1.3125ZM1.3125 10.9375V5.25H3.5V10.9375H1.3125ZM4.8125 10.9375H7.4375V5.25H4.8125V10.9375ZM8.75 5.25V10.9375H10.9375V5.25H8.75Z"
        fill="currentColor"
        data-node-id="I3432:7147;14156:42871"
        data-name="Path"
      />
    </svg>
  );
}
