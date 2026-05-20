import { TableIcon } from "./TableIcon";
import "./Citation.css";

export type CitationType = "icon" | "logo" | "none";

export type CitationProps = {
  label: string;
  type?: CitationType;
  logoSrc?: string;
  logoAlt?: string;
  selected?: boolean;
  onClick?: () => void;
  "data-node-id"?: string;
};

/** Figma Source (Citations) — node 3432:6835 et al. */
export function Citation({
  label,
  type = "icon",
  logoSrc,
  logoAlt = "",
  selected = false,
  onClick,
  "data-node-id": nodeId,
}: CitationProps) {
  return (
    <button
      type="button"
      className={`citation citation--${type}${selected ? " citation--selected" : ""}`}
      data-node-id={nodeId}
      data-type={type}
      data-state={selected ? "selected" : "default"}
      aria-pressed={selected}
      onClick={onClick}
    >
      {type === "icon" ? (
        <TableIcon className="citation__icon" />
      ) : null}
      {type === "logo" && logoSrc ? (
        <span className="citation__logo" data-name="[image]">
          <img
            className="citation__logo-img"
            src={logoSrc}
            alt={logoAlt}
            width={14}
            height={14}
            draggable={false}
          />
        </span>
      ) : null}
      <span className="citation__label">{label}</span>
    </button>
  );
}
