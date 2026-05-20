import "./AnimationDotPulsing.css";

type AnimationDotPulsingProps = {
  pulsing?: boolean;
};

/** Du Bois .animation/Dot Pulsing — Figma 2006:5955 (parent set 2006:6042) */
export function AnimationDotPulsing({ pulsing = true }: AnimationDotPulsingProps) {
  return (
    <div
      className={`animation-dot-pulsing ${pulsing ? "animation-dot-pulsing--active" : ""}`}
      data-node-id="2006:5955"
      data-name=".animation/Dot Pulsing"
    >
      <div className="animation-dot-pulsing__path-wrap" data-node-id="2006:5948" data-name="Path">
        <img
          className="animation-dot-pulsing__path"
          src="/assets/status-dot.svg"
          alt=""
          draggable={false}
        />
      </div>
    </div>
  );
}
