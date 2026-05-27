import { useCallback, useEffect, useRef, useState } from "react";
import { Citation } from "./Citation";
import { Citations } from "./Citations";
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

type GenieResponseProps = {
  active: boolean;
  onStreamComplete?: () => void;
};

export function GenieResponse({ active, onStreamComplete }: GenieResponseProps) {
  const streamCompleteCalled = useRef(false);
  const [showActionBar, setShowActionBar] = useState(false);

  const finishReveal = useCallback(() => {
    if (streamCompleteCalled.current) return;
    streamCompleteCalled.current = true;
    setShowActionBar(true);
    onStreamComplete?.();
  }, [onStreamComplete]);

  const handleRevealAnimationEnd = useCallback(
    (event: React.AnimationEvent<HTMLElement>) => {
      if (event.target !== event.currentTarget) return;
      if (event.animationName !== "genie-response-reveal") return;
      finishReveal();
    },
    [finishReveal],
  );

  useEffect(() => {
    if (!active) {
      streamCompleteCalled.current = false;
      setShowActionBar(false);
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishReveal();
    }
  }, [active, finishReveal]);

  if (!active) return null;

  return (
    <article
      className="genie-response genie-response--reveal"
      data-node-id="3976:11114"
      onAnimationEnd={handleRevealAnimationEnd}
    >
      <section className="genie-response__section" data-node-id="3976:11148">
        <h1 className="genie-response__title" data-node-id="3976:11117">
          Top Vibe Coding Users at Databricks
        </h1>
        <p className="genie-response__body" data-node-id="3976:11115">
          {INTRO}
        </p>
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
      </section>

      <section className="genie-response__section" data-node-id="3976:11149">
        <h2 className="genie-response__heading" data-node-id="3976:11145">
          By Session Count (Most Frequent Users)
        </h2>
        <p className="genie-response__body" data-node-id="3976:11147">
          {SESSION_SECTION}
        </p>
      </section>

      <section className="genie-response__section" data-node-id="3976:11155">
        <h3 className="genie-response__subheading" data-node-id="3976:11156">
          {TOP5_HEADING}
        </h3>
        <ol className="genie-response__list" data-node-id="3976:11157">
          {TOP_USERS.map((user) => (
            <li key={user.email} className="genie-response__list-item">
              <a
                className="genie-response__link"
                href={`mailto:${user.email}`}
              >
                {user.email}
              </a>
              {` — ${user.sessions} sessions (${user.average})`}
            </li>
          ))}
        </ol>
      </section>

      <div className="genie-response__post-chart">
        <div className="genie-response__viz" data-node-id="3976:11162">
          <img
            className="genie-response__chart"
            src="/assets/response-chart.png"
            alt="Bar chart of sessions by user"
            data-node-id="3976:11160"
          />
        </div>
        {showActionBar ? (
          <ResponseActionBar className="enter-fade-in" />
        ) : null}
      </div>
    </article>
  );
}
