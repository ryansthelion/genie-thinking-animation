import { Icon } from "./Icon";
import "./PromptInput.css";

export function PromptInput() {
  return (
    <>
      <div className="prompt-input__box-outer" data-node-id="9982:71373">
        <div className="prompt-input__box" data-node-id="I9982:71373;5505:1330">
          <div className="prompt-input__bar" data-node-id="I9982:71373;5505:1331">
            <p className="prompt-input__placeholder" data-node-id="I9982:71373;5505:1333">
              @ for references, / for commands
            </p>
            <div className="prompt-input__spacer" />
          </div>
          <div className="prompt-input__actions" data-node-id="I9982:71373;5505:1334">
            <div className="prompt-input__lhs" data-node-id="I9982:71373;5505:1335">
              <button
                type="button"
                className="icon-button"
                aria-label="Add"
                data-node-id="I9982:71373;5505:4269"
              >
                <Icon
                  src="/assets/plus-icon.svg"
                  size={16}
                  data-node-id="I9982:71373;5505:4269;2742:12394"
                />
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label="Mention"
                data-node-id="I9982:71373;5505:4272"
              >
                <Icon
                  src="/assets/at-icon.svg"
                  size={16}
                  data-node-id="I9982:71373;5505:4272;2742:12394"
                />
              </button>
            </div>
            <div className="prompt-input__spacer" />
            <div className="prompt-input__rhs" data-node-id="I9982:71373;5505:1339">
              <button
                type="button"
                className="icon-button icon-button--submit"
                aria-label="Submit"
                data-node-id="I9982:71373;5538:449"
              >
                <Icon
                  src="/assets/arrow-up-icon.svg"
                  size={16}
                  data-node-id="I9982:71373;5538:449;5538:289"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="prompt-input__hint" data-node-id="9982:71374">
        Always review the accuracy of responses.
      </p>
    </>
  );
}
