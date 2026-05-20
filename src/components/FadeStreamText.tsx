import { memo, useCallback, useMemo, useRef } from "react";
import {
  segmentTextToWords,
  useTextStreamFade,
} from "../hooks/useTextStream";
import "../response-stream-fade.css";

type FadeStreamTextProps = {
  text: string;
  streaming?: boolean;
  speed?: number;
  wordsPerBatch?: number;
  fadeDuration?: number;
  segmentDelay?: number;
  className?: string;
  onComplete?: () => void;
};

/**
 * Fade-mode text stream (prompt-kit Response Stream).
 * @see https://www.prompt-kit.com/docs/response-stream
 */
export const FadeStreamText = memo(function FadeStreamText({
  text,
  streaming = false,
  speed = 50,
  wordsPerBatch = 4,
  fadeDuration,
  segmentDelay,
  className,
  onComplete,
}: FadeStreamTextProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const { segments, isComplete, wordsPerBatch: batchSize, getFadeDuration, getSegmentDelay } =
    useTextStreamFade({
      text,
      enabled: streaming,
      speed,
      wordsPerBatch,
      fadeDuration,
      segmentDelay,
    });

  const displaySegments = useMemo(
    () => (streaming ? segments : segmentTextToWords(text)),
    [streaming, segments, text],
  );

  const latestBatchStart = Math.max(0, displaySegments.length - batchSize);

  const handleLastSegmentAnimationEnd = useCallback(() => {
    if (isComplete) {
      onCompleteRef.current?.();
    }
  }, [isComplete]);

  const fadeMs = getFadeDuration();
  const staggerMs = getSegmentDelay();

  return (
    <span
      className={["response-stream-fade", className].filter(Boolean).join(" ")}
      style={
        {
          "--response-stream-fade-duration": `${fadeMs}ms`,
        } as React.CSSProperties
      }
      aria-live="polite"
      aria-atomic="false"
    >
      {displaySegments.map((segment, idx) => {
        const isWhitespace = /^\s+$/.test(segment.text);
        const isLastSegment = idx === displaySegments.length - 1;
        const isInLatestBatch = streaming && idx >= latestBatchStart;

        return (
          <span
            key={`${segment.index}-${idx}`}
            className={[
              "response-stream-fade__segment",
              streaming && isInLatestBatch ? "" : "response-stream-fade__segment--settled",
              isWhitespace ? "response-stream-fade__segment--space" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={
              isInLatestBatch
                ? {
                    animationDelay: `${(idx - latestBatchStart) * staggerMs}ms`,
                    animationDuration: `${fadeMs}ms`,
                  }
                : undefined
            }
            onAnimationEnd={
              streaming && isLastSegment
                ? handleLastSegmentAnimationEnd
                : undefined
            }
          >
            {segment.text}
          </span>
        );
      })}
    </span>
  );
});
