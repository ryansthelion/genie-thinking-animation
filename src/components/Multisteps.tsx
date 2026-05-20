import { AnimationDotPulsing } from "./AnimationDotPulsing";
import { Icon } from "./Icon";
import "./Multisteps.css";

type MultistepsProps = {
  id?: string;
  entranceKey?: number;
  titleEntranceKey?: number;
  descriptionEntranceKey?: number;
  toolEntranceKey?: number;
  showTitle?: boolean;
  showDescription?: boolean;
  showToolCall?: boolean;
  pulsingDot?: boolean;
  showStatusLine?: boolean;
};

export function Multisteps({
  id,
  entranceKey = 0,
  titleEntranceKey = 0,
  descriptionEntranceKey = 0,
  toolEntranceKey = 0,
  showTitle = false,
  showDescription = false,
  showToolCall = false,
  pulsingDot = true,
  showStatusLine = false,
}: MultistepsProps) {
  return (
    <div
      id={id}
      key={entranceKey}
      className="multisteps enter-from-below"
      data-node-id="9982:70367"
    >
      <div className="multisteps__fade-top" aria-hidden />
      <div className="multisteps__step">
        <div
          className={`multisteps__status ${showStatusLine ? "multisteps__status--line" : ""}`}
          data-node-id="496:10949"
        >
          <AnimationDotPulsing pulsing={pulsingDot} />
        </div>
        <div className="multisteps__text">
          {showTitle ? (
            <p
              key={titleEntranceKey}
              className="multisteps__title enter-from-below"
              data-node-id="3942:7977"
            >
              Understanding the question
            </p>
          ) : null}
          {showDescription || showToolCall ? (
            <div className="multisteps__description">
              {showDescription ? (
                <p
                  key={descriptionEntranceKey}
                  className="multisteps__body enter-from-below"
                  data-node-id="9982:70456"
                >
                  I’ll help you find which Databricks engineers are using vibe
                  coding the most. Let me search for relevant data assets.
                </p>
              ) : null}
              {showToolCall ? (
                <div
                  key={toolEntranceKey}
                  className="tool-call enter-from-below"
                  data-node-id="9982:70460"
                >
                  <Icon
                    className="tool-call__icon"
                    src="/assets/search-icon.svg"
                    size={14}
                  />
                  <p className="tool-call__query">
                    Searching “vibe coding engineer Databricks usage metrics”
                  </p>
                  <p className="tool-call__meta">35 results</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="multisteps__fade-bottom" aria-hidden />
    </div>
  );
}
