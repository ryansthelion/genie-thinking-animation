import { Icon } from "./Icon";
import "./ResponseActionIconButton.css";

type ResponseActionIconButtonProps = {
  label: string;
  iconSrc: string;
  pressed?: boolean;
  onClick?: () => void;
  "data-node-id"?: string;
};

/** Du Bois 4. buttonIcon — Small (24×24), Figma node 7676:59205 */
export function ResponseActionIconButton({
  label,
  iconSrc,
  pressed = false,
  onClick,
  "data-node-id": nodeId,
}: ResponseActionIconButtonProps) {
  return (
    <button
      type="button"
      className={`response-action-icon-button ${pressed ? "response-action-icon-button--pressed" : ""}`}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      data-node-id={nodeId}
    >
      <Icon src={iconSrc} size={16} alt="" />
    </button>
  );
}
