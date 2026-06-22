import { BacklogCard } from "@/components/backlog-card";

type BacklogEntry = {
  title: string;
  whatItDoes: string;
  shouldAccomplish: string;
  acceptanceCriteria: string;
};

type BacklogCategory = {
  id: string;
  title: string;
  entries: BacklogEntry[];
};

const backlogCategories: BacklogCategory[] = [
  {
    id: "internal-facing",
    title: "Internal-facing Operations",
    entries: [
      {
        title: '"Who do I ask?" Agent',
        whatItDoes:
          'Given a prompt like "I need help with a Salesforce permission," returns the correct owner/path instead of a guess.',
        shouldAccomplish:
          "Map a question to the right owner or expert, explain why, and handle cross-system ownership.",
        acceptanceCriteria:
          "For real routing questions, names the correct owner more reliably than asking around.",
      },
      {
        title: "Access & Permissions Agent",
        whatItDoes:
          "Guides employees through role-based permission requests and the expected approval flow.",
        shouldAccomplish:
          "Identify the system and owner, then lay out the request and approval path.",
        acceptanceCriteria:
          "For a real access need, points to the correct system, owner, and approval route.",
      },
      {
        title: "Project Onboarding Agent",
        whatItDoes:
          "Provides new-joiner project context: overview, roster, client contacts, repos, Jira boards, Slack channels, sprint goals, open risks, and first actions.",
        shouldAccomplish:
          'Assemble context across systems and surface the "first 3 things to do."',
        acceptanceCriteria:
          "A new joiner reaches productive context without a senior walkthrough.",
      },
      {
        title: "Client Rules Agent",
        whatItDoes:
          "Answers account-specific policy/tooling questions (LLM usage, time logging, document storage, deployment approvals, escalation paths).",
        shouldAccomplish:
          "Answer per-account questions from playbooks/MSAs and distinguish rules across accounts.",
        acceptanceCriteria:
          "Answers match the actual account rules across several accounts.",
      },
      {
        title: "Status Update Generator",
        whatItDoes:
          "Pulls commits, Jira movement, and meeting signals into a draft weekly manager status update.",
        shouldAccomplish:
          "Aggregate activity and summarize what mattered into a manager-ready draft.",
        acceptanceCriteria: "Draft requires only light editing before sending.",
      },
      {
        title: "PTO Voice Agent (PeopleForce)",
        whatItDoes:
          "Voice-driven PTO request and status handling integrated with PeopleForce.",
        shouldAccomplish:
          "Parse dates/type from speech, confirm, submit, and handle cancel/change.",
        acceptanceCriteria:
          "A spoken request produces a correctly dated PeopleForce entry with no cleanup.",
      },
      {
        title: "Meeting-to-Action Agent",
        whatItDoes:
          "Turns meeting transcripts into decisions, action items, owners, due dates, risks, and follow-up drafts.",
        shouldAccomplish:
          "Extract owned actions and decisions, draft follow-ups, and compare against prior unresolved items.",
        acceptanceCriteria:
          'Extracted actions match what a participant would write down, and ambiguous ownership is marked "unknown — confirm."',
      },
      {
        title: "Project Memory Agent",
        whatItDoes:
          "Maintains a structured memory of project decisions, rationale, risks, dependencies, and client preferences across staff rotations.",
        shouldAccomplish:
          "Index project artifacts, produce handoff briefs, and answer project-history questions with sources.",
        acceptanceCriteria:
          "A handoff brief covers current state, open risks, key decisions, and preferences, and history answers cite sources or mark themselves uncertain.",
      },
      {
        title: "Agent Evaluation Agent",
        whatItDoes:
          "Runs test suites against agent outputs for accuracy, groundedness, policy compliance, and regression.",
        shouldAccomplish:
          "Score outputs, flag failed cases, and produce release recommendations.",
        acceptanceCriteria:
          "Produces pass/fail plus scores and a release recommendation, regression-compares against baseline, and blocks release on critical policy failure.",
      },
      {
        title: "Agent ROI Monitor",
        whatItDoes:
          "Tracks whether each agent saves enough manual effort to justify token, platform, integration, and review costs.",
        shouldAccomplish:
          "Track usage, baseline, run cost, quality, escalation; compute cost-per-task and value-vs-cost; recommend scale/fix/pause/retire.",
        acceptanceCriteria:
          "Computes monthly run cost, time saved, and value-vs-cost, flags low-adoption or negative-ROI agents, and separates ROI from quality concerns.",
      },
    ],
  },
  {
    id: "customer-facing-adlc",
    title: "Customer-facing ADLC / SDLC",
    entries: [
      {
        title: "Engineering-Diagram Agent",
        whatItDoes:
          "Generates architecture and sequence diagrams from contextual system/project information.",
        shouldAccomplish:
          "Produce a correct, readable diagram from a described system.",
        acceptanceCriteria:
          "Diagram reflects the described system without structural correction.",
      },
      {
        title: "Codebase Onboarding Agent",
        whatItDoes:
          "Helps engineers understand a new repo: architecture, setup, key files, services, dependencies, and workflows.",
        shouldAccomplish:
          "Produce a repo overview, setup guide, key flows, first-ticket guidance, and cite files/docs.",
        acceptanceCriteria:
          "Returns architecture, setup, main services, and key commands, cites relevant files, and flags conflicting setup instructions.",
      },
    ],
  },
  {
    id: "retail",
    title: "Retail",
    entries: [
      {
        title: "Shopping Cart Monitor",
        whatItDoes:
          "Reviews abandoned carts, infers why a known shopper dropped off, and triggers a personalized intervention.",
        shouldAccomplish:
          'Detect abandonment, infer likely reason (shipping cost / out-of-stock SKU-color / price), and trigger a fitting action (coupon, "in stock near you", pickup/ship) via email or push.',
        acceptanceCriteria:
          "On test carts with known reasons, infers the right reason and picks a fitting intervention more often than a generic reminder.",
      },
    ],
  },
  {
    id: "marketing-gtm",
    title: "Marketing / GTM Enablement",
    entries: [
      {
        title: '"Ring the Bell" Customer-Win Agent',
        whatItDoes:
          "Creates a finance/tech/business-friendly customer-win summary from a template enriched by the client website.",
        shouldAccomplish:
          "Produce announcement variants and a card from a win input, with no dollar figures.",
        acceptanceCriteria:
          "Publishable with light editing and respects the no-dollar-figures rule.",
      },
    ],
  },
];

export default function EpicsPage() {
  return (
    <main className="page-wrap page-wrap-wide">
      <header className="mb-12 border-b border-[var(--rule)] pb-8 text-center">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
          AI Garage / Backlog
        </p>
        <h1 className="mb-4 font-serif text-5xl leading-tight tracking-[-0.03em] text-[var(--ink)]">
          Agent Backlog
        </h1>
        <p className="mx-auto max-w-[62ch] font-serif text-xl leading-relaxed text-[var(--ink-soft)]">
          Backlog of agents grouped by category. Click any card to view what it
          does, what it should accomplish, and acceptance criteria.
        </p>
      </header>

      <div className="space-y-10">
        {backlogCategories.map((category) => (
          <section key={category.id}>
            <h2 className="mb-5 font-serif text-[30px] tracking-[-0.02em] text-[var(--ink)]">
              {category.title}
            </h2>
            <div className="backlog-cards">
              {category.entries.map((entry) => (
                <BacklogCard
                  key={entry.title}
                  title={entry.title}
                  whatItDoes={entry.whatItDoes}
                  shouldAccomplish={entry.shouldAccomplish}
                  acceptanceCriteria={entry.acceptanceCriteria}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
