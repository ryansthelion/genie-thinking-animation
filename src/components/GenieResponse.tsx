import { useCallback, useEffect, useRef, useState } from "react";
import { Citation } from "./Citation";
import { Citations } from "./Citations";
import { FadeStreamText } from "./FadeStreamText";
import { ResponseActionBar } from "./ResponseActionBar";
import "./GenieResponse.css";

const INTRO =
  "Based on the analysis of Claude Code (vibe coding) usage data, here are the engineers using vibe coding the most across different metrics:";

const SESSION_SECTION =
  "The top users by number of sessions show who is launching vibe coding most frequently:";

const TOP5_HEADING = "Top 5";

const TOP_USERS = [
  {
    email: "maya.chen@novaspark.io",
    sessions: "8,222",
    average: "2,741 sessions/day average",
  },
  {
    email: "david.okonkwo@novaspark.io",
    sessions: "7,335",
    average: "386 sessions/day average",
  },
  {
    email: "sarah.lindberg@novaspark.io",
    sessions: "881",
    average: "31 sessions/day average",
  },
  {
    email: "elena.vasquez@novaspark.io",
    sessions: "671",
    average: "27 sessions/day average",
  },
  {
    email: "marcus.weber@novaspark.io",
    sessions: "663",
    average: "41 sessions/day average",
  },
] as const;

type StreamStep =
  | "intro"
  | "session"
  | "top5-heading"
  | "list-0"
  | "list-1"
  | "list-2"
  | "list-3"
  | "list-4"
  | "chart";

const STREAM_SPEED = 50;
const WORDS_PER_BATCH = 3;

type GenieResponseProps = {
  active: boolean;
  onStreamComplete?: () => void;
};

function formatUserLine(user: (typeof TOP_USERS)[number]) {
  return `${user.email} — ${user.sessions} sessions (${user.average})`;
}

function listStepIndex(step: StreamStep): number | null {
  if (!step.startsWith("list-")) return null;
  return Number(step.slice(5));
}

function stepOrder(step: StreamStep): number {
  const order: StreamStep[] = [
    "intro",
    "session",
    "top5-heading",
    "list-0",
    "list-1",
    "list-2",
    "list-3",
    "list-4",
    "chart",
  ];
  return order.indexOf(step);
}

function isAtOrPast(step: StreamStep, target: StreamStep) {
  return stepOrder(step) >= stepOrder(target);
}

export function GenieResponse({ active, onStreamComplete }: GenieResponseProps) {
  const [step, setStep] = useState<StreamStep>("intro");
  const streamCompleteCalled = useRef(false);
  const [showActionBar, setShowActionBar] = useState(false);

  const handleIntroComplete = useCallback(() => {
    if (step === "intro") {
      setStep("session");
    }
  }, [step]);

  const handleSessionComplete = useCallback(() => {
    if (step === "session") {
      setStep("top5-heading");
    }
  }, [step]);

  const handleTop5HeadingComplete = useCallback(() => {
    if (step === "top5-heading") {
      setStep("list-0");
    }
  }, [step]);

  const handleListItemComplete = useCallback(
    (index: number) => {
      const expected = `list-${index}` as StreamStep;
      if (step !== expected) return;
      if (index < TOP_USERS.length - 1) {
        setStep(`list-${index + 1}` as StreamStep);
      } else {
        setStep("chart");
      }
    },
    [step],
  );

  const handleChartAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) return;
      if (step !== "chart" || event.animationName !== "enter-fade-in") return;
      if (streamCompleteCalled.current) return;
      streamCompleteCalled.current = true;
      setShowActionBar(true);
      onStreamComplete?.();
    },
    [step, onStreamComplete],
  );

  useEffect(() => {
    if (!active) {
      setStep("intro");
      streamCompleteCalled.current = false;
      setShowActionBar(false);
    }
  }, [active]);

  if (!active) return null;

  const showTop5Section = isAtOrPast(step, "top5-heading");
  const currentListIndex = listStepIndex(step);
  const showChart = step === "chart";

  return (
    <article
      className="genie-response enter-from-below"
      data-node-id="3976:11114"
    >
      <section className="genie-response__section" data-node-id="3976:11148">
        <h1 className="genie-response__title" data-node-id="3976:11117">
          Top Vibe Coding Users at Databricks
        </h1>
        <p className="genie-response__body" data-node-id="3976:11115">
          <FadeStreamText
            key="intro"
            text={INTRO}
            streaming={step === "intro"}
            speed={STREAM_SPEED}
            wordsPerBatch={WORDS_PER_BATCH}
            onComplete={handleIntroComplete}
          />
        </p>
        {step !== "intro" ? (
          <Citations data-node-id="3976:11143">
            <Citation
              type="icon"
              label="llm_agent_top_users"
              data-node-id="3976:11123"
            />
            <Citation
              type="logo"
              label="AI Devtools Dashboard"
              logoSrc="/assets/source-dashboard-icon.svg"
              logoAlt=""
              data-node-id="3976:11129"
            />
          </Citations>
        ) : null}
      </section>

      {step !== "intro" ? (
        <section className="genie-response__section" data-node-id="3976:11149">
          <h2 className="genie-response__heading" data-node-id="3976:11145">
            By Session Count (Most Frequent Users)
          </h2>
          <p className="genie-response__body" data-node-id="3976:11147">
            <FadeStreamText
              key="session"
              text={SESSION_SECTION}
              streaming={step === "session"}
              speed={STREAM_SPEED}
            wordsPerBatch={WORDS_PER_BATCH}
              onComplete={handleSessionComplete}
            />
          </p>
        </section>
      ) : null}

      {showTop5Section ? (
        <section className="genie-response__section" data-node-id="3976:11155">
          <h3 className="genie-response__subheading" data-node-id="3976:11156">
            {step === "top5-heading" ? (
              <FadeStreamText
                key="top5-heading"
                text={TOP5_HEADING}
                streaming
                speed={STREAM_SPEED}
            wordsPerBatch={WORDS_PER_BATCH}
                onComplete={handleTop5HeadingComplete}
              />
            ) : (
              TOP5_HEADING
            )}
          </h3>
          <ol className="genie-response__list" data-node-id="3976:11157">
            {TOP_USERS.map((user, index) => {
              const isStreaming = currentListIndex === index;
              const isVisible =
                currentListIndex !== null && index <= currentListIndex;

              if (!isVisible && step !== "chart") return null;

              return (
                <li key={user.email} className="genie-response__list-item">
                  {isStreaming ? (
                    <FadeStreamText
                      key={`list-${index}`}
                      text={formatUserLine(user)}
                      streaming
                      speed={STREAM_SPEED}
            wordsPerBatch={WORDS_PER_BATCH}
                      onComplete={() => handleListItemComplete(index)}
                    />
                  ) : (
                    <>
                      <a
                        className="genie-response__link"
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                      {` — ${user.sessions} sessions (${user.average})`}
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ) : null}

      {showChart || showActionBar ? (
        <div className="genie-response__post-chart">
          {showChart ? (
            <div
              className="genie-response__viz enter-fade-in"
              data-node-id="3976:11162"
              onAnimationEnd={handleChartAnimationEnd}
            >
              <img
                className="genie-response__chart"
                src="/assets/response-chart.png"
                alt="Bar chart of sessions by user"
                data-node-id="3976:11160"
              />
            </div>
          ) : null}
          {showActionBar ? (
            <ResponseActionBar className="enter-fade-in" />
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
