import { useCallback, useEffect, useRef, useState } from "react";

/** @see https://www.prompt-kit.com/docs/response-stream */
export const FADE_DURATION_EXTRA_MS = 50;

export type TextStreamSegment = { text: string; index: number };

export type UseTextStreamFadeOptions = {
  text: string;
  enabled?: boolean;
  speed?: number;
  wordsPerBatch?: number;
  onComplete?: () => void;
  fadeDuration?: number;
  segmentDelay?: number;
  onError?: (error: unknown) => void;
};

export type UseTextStreamFadeResult = {
  segments: TextStreamSegment[];
  isComplete: boolean;
  wordsPerBatch: number;
  getFadeDuration: () => number;
  getSegmentDelay: () => number;
};

export function segmentTextToWords(text: string): TextStreamSegment[] {
  try {
    const segmenter = new Intl.Segmenter(navigator.language, {
      granularity: "word",
    });
    return Array.from(segmenter.segment(text)).map((segment, index) => ({
      text: segment.segment,
      index,
    }));
  } catch {
    return text
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word, index) => ({
        text: word,
        index,
      }));
  }
}

/**
 * Fade-mode streaming — reveals text in batches of words (default 4).
 * @see https://www.prompt-kit.com/docs/response-stream
 */
export function useTextStreamFade({
  text,
  enabled = false,
  speed = 20,
  wordsPerBatch = 4,
  onComplete,
  fadeDuration,
  segmentDelay,
  onError,
}: UseTextStreamFadeOptions): UseTextStreamFadeResult {
  const [segments, setSegments] = useState<TextStreamSegment[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const speedRef = useRef(speed);
  const wordsPerBatchRef = useRef(wordsPerBatch);
  const visibleWordCountRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const fadeDurationRef = useRef(fadeDuration);
  const segmentDelayRef = useRef(segmentDelay);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const allWordsRef = useRef<TextStreamSegment[]>([]);

  useEffect(() => {
    speedRef.current = speed;
    wordsPerBatchRef.current = wordsPerBatch;
    fadeDurationRef.current = fadeDuration;
    segmentDelayRef.current = segmentDelay;
  }, [speed, wordsPerBatch, fadeDuration, segmentDelay]);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const getProcessingDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === "number") {
      return Math.max(0, segmentDelayRef.current);
    }
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    return Math.max(8, Math.round(80 / Math.sqrt(normalizedSpeed)));
  }, []);

  const getFadeDuration = useCallback(() => {
    if (typeof fadeDurationRef.current === "number") {
      return Math.max(10, fadeDurationRef.current);
    }
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    return (
      Math.round(600 / Math.sqrt(normalizedSpeed)) + FADE_DURATION_EXTRA_MS
    );
  }, []);

  const getSegmentDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === "number") {
      return Math.max(0, segmentDelayRef.current);
    }
    const normalizedSpeed = Math.min(100, Math.max(1, speedRef.current));
    return Math.max(4, Math.round(40 / Math.sqrt(normalizedSpeed)));
  }, []);

  const markComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true;
      setIsComplete(true);
    }
  }, []);

  const reset = useCallback(() => {
    visibleWordCountRef.current = 0;
    allWordsRef.current = [];
    setSegments([]);
    setIsComplete(false);
    completedRef.current = false;
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const processString = useCallback(
    (streamText: string) => {
      try {
        allWordsRef.current = segmentTextToWords(streamText);
      } catch (error) {
        onError?.(error);
        allWordsRef.current = segmentTextToWords(streamText);
      }

      const allWords = allWordsRef.current;
      let lastFrameTime = 0;

      const streamContent = (timestamp: number) => {
        const delay = getProcessingDelay();
        if (delay > 0 && timestamp - lastFrameTime < delay) {
          animationRef.current = requestAnimationFrame(streamContent);
          return;
        }
        lastFrameTime = timestamp;

        if (visibleWordCountRef.current >= allWords.length) {
          markComplete();
          return;
        }

        const batch = Math.max(1, wordsPerBatchRef.current);
        visibleWordCountRef.current = Math.min(
          visibleWordCountRef.current + batch,
          allWords.length,
        );
        setSegments(allWords.slice(0, visibleWordCountRef.current));

        if (visibleWordCountRef.current < allWords.length) {
          animationRef.current = requestAnimationFrame(streamContent);
        } else {
          markComplete();
        }
      };

      animationRef.current = requestAnimationFrame(streamContent);
    },
    [getProcessingDelay, markComplete, onError],
  );

  const startStreaming = useCallback(() => {
    reset();
    processString(text);
  }, [reset, processString, text]);

  useEffect(() => {
    if (!enabled) return;
    startStreaming();
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [enabled, startStreaming]);

  return {
    segments,
    isComplete,
    wordsPerBatch: wordsPerBatchRef.current,
    getFadeDuration,
    getSegmentDelay,
  };
}
