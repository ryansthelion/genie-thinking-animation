import "./Icon.css";

type IconProps = {
  src: string;
  alt?: string;
  size?: number;
  className?: string;
  "data-node-id"?: string;
};

export function Icon({
  src,
  alt = "",
  size = 16,
  className = "",
  "data-node-id": nodeId,
}: IconProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`icon ${className}`.trim()}
      data-node-id={nodeId}
      draggable={false}
    />
  );
}
