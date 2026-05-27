import { PromptInput } from "./PromptInput";
import "./PromptSection.css";

export function PromptSection() {
  return (
    <section className="prompt-section" aria-label="Prompt">
      <div className="prompt-section__inner">
        <PromptInput />
      </div>
    </section>
  );
}
