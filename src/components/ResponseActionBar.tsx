import { useState } from "react";
import { Icon } from "./Icon";
import { ResponseActionIconButton } from "./ResponseActionIconButton";
import "./ResponseActionBar.css";

type Feedback = "up" | "down" | null;

type ResponseActionBarProps = {
  sourceCount?: number;
  className?: string;
};

/** Figma Response Action Bar — node 4542:71275 */
export function ResponseActionBar({
  sourceCount = 4,
  className,
}: ResponseActionBarProps) {
  const [feedback, setFeedback] = useState<Feedback>(null);

  const toggleFeedback = (value: Feedback) => {
    setFeedback((current) => (current === value ? null : value));
  };

  return (
    <div
      className={["response-action-bar", className].filter(Boolean).join(" ")}
      data-node-id="4542:71275"
      data-name="Response Action Bar"
    >
      <div
        className="response-action-bar__actions"
        data-node-id="4542:70963"
        data-name="Response actions"
      >
        <ResponseActionIconButton
          label="Copy response"
          iconSrc="/assets/copy-icon.svg"
          onClick={() => {}}
          data-node-id="I4542:70963;4542:68583"
        />
        <ResponseActionIconButton
          label="Good response"
          iconSrc="/assets/thumbs-up-icon.svg"
          pressed={feedback === "up"}
          onClick={() => toggleFeedback("up")}
          data-node-id="I4542:70963;4542:68584"
        />
        <ResponseActionIconButton
          label="Bad response"
          iconSrc="/assets/thumbs-down-icon.svg"
          pressed={feedback === "down"}
          onClick={() => toggleFeedback("down")}
          data-node-id="I4542:70963;4542:68585"
        />
        <ResponseActionIconButton
          label="Share response"
          iconSrc="/assets/share-icon.svg"
          onClick={() => {}}
          data-node-id="I4542:70963;4542:68586"
        />
      </div>

      <div
        className="response-action-bar__sources"
        data-node-id="4542:70901"
        data-name="Sources"
      >
        <div
          className="response-action-bar__avatars"
          data-node-id="I4542:70901;3032:2194"
          data-name="Avatars"
        >
          <div
            className="response-action-bar__source-avatar"
            data-node-id="I4542:70901;7496:74679"
          >
            <Icon
              className="response-action-bar__source-icon"
              src="/assets/source-table-icon.svg"
              size={16}
            />
          </div>
          <div
            className="response-action-bar__source-avatar"
            data-node-id="I4542:70901;7496:74687"
          >
            <Icon
              className="response-action-bar__source-icon"
              src="/assets/source-dashboard-icon.svg"
              size={16}
            />
          </div>
          <div
            className="response-action-bar__source-avatar response-action-bar__source-avatar--image"
            data-node-id="I4542:70901;7496:74684"
          >
            <img
              className="response-action-bar__source-image"
              src="/assets/source-genie-avatar.png"
              alt=""
            />
          </div>
        </div>
        <span
          className="response-action-bar__source-label"
          data-node-id="I4542:70901;3032:2184"
        >
          {sourceCount} sources
        </span>
      </div>
    </div>
  );
}
