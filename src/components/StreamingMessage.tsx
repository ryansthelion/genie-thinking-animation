import { memo, useEffect, useRef } from "react";
import { useStream } from "../hooks/useStream";

type StreamingMessageProps = {
  text: string;
  animate?: boolean;
  className?: string;
  onComplete?: () => void;
};

export const StreamingMessage = memo(function StreamingMessage({
  text,
  animate = false,
  className,
  onComplete,
}: StreamingMessageProps) {
  const contentRef = useRef("");
  const { stream, addPart, reset } = useStream(onComplete);

  useEffect(() => {
    if (!animate) {
      if (text) {
        contentRef.current = text;
      }
      reset();
      return;
    }

    if (!text) return;

    if (contentRef.current !== text) {
      const delta = text.slice(contentRef.current.length);
      if (delta) {
        addPart(delta);
      }
      contentRef.current = text;
    }
  }, [text, animate, addPart, reset]);

  if (!animate) {
    return (
      <span className={className}>{text || contentRef.current}</span>
    );
  }

  return <span className={className}>{stream || ""}</span>;
});
