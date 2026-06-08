export type AgentStatus = "shipped" | "in_build" | "scoped";
export type AgentExperience = "try_agent" | "guided_tour";
export type AgentFunction =
  | "Internal"
  | "Quality Engineering"
  | "Development / ADLC"
  | "Marketing"
  | "Retail & Vertical";
export type AgentTeam =
  | "Internal"
  | "Web Development"
  | "QE"
  | "Mobile"
  | "Full Stack";
export type AgentAudience = "internal" | "external";
export type AgentVertical =
  | "Cross-functional"
  | "Retail"
  | "Financial Services"
  | "Healthcare";

export type LaunchType = "open_url" | "guided_tour" | "unavailable";

export type AgentLaunch = {
  launchType: LaunchType;
  launchUrl?: string;
  availabilityReason?: string;
};

export type AgentLibraryEntry = {
  id: string;
  title: string;
  summary: string;
  featured: boolean;
  team: AgentTeam;
  audience: AgentAudience;
  function: AgentFunction;
  vertical: AgentVertical;
  status: AgentStatus;
  experience: AgentExperience;
  collections: string[];
  owner: string;
  previewInputs: string[];
  capabilities: string[];
  stack: string;
  launch: AgentLaunch;
};

export const statusLabels: Record<AgentStatus, string> = {
  shipped: "Shipped",
  in_build: "In Build",
  scoped: "Scoped",
};

export const experienceLabels: Record<AgentExperience, string> = {
  try_agent: "Live Agent",
  guided_tour: "Demo",
};

export const launchTypeLabels: Record<LaunchType, string> = {
  open_url: "Try Agent",
  guided_tour: "View Demo",
  unavailable: "Unavailable",
};

export type AgentCollection = {
  id: string;
  title: string;
  description: string;
};

export const collectionCatalog: AgentCollection[] = [
  {
    id: "featured",
    title: "Internal",
    description: "Internal workflows and operational assistant demos.",
  },
  {
    id: "qe-workflow",
    title: "QE",
    description: "Quality Engineering workflows and automation lifecycle agents.",
  },
  {
    id: "adlc-loop",
    title: "ADLC",
    description: "Application delivery lifecycle workflows across plan to release.",
  },
  {
    id: "marketing-sprint",
    title: "Marketing",
    description: "Placeholder collection for marketing-focused agents.",
  },
  {
    id: "retail-vertical",
    title: "Retail",
    description: "Placeholder collection for retail-focused agents.",
  },
];

export const functionOptions: AgentFunction[] = [
  "Internal",
  "Quality Engineering",
  "Development / ADLC",
  "Marketing",
  "Retail & Vertical",
];

export const teamOptions: AgentTeam[] = [
  "Internal",
  "Web Development",
  "QE",
  "Mobile",
  "Full Stack",
];

export const audienceOptions: AgentAudience[] = ["internal", "external"];

export const verticalOptions: AgentVertical[] = [
  "Cross-functional",
  "Retail",
  "Financial Services",
  "Healthcare",
];

export const statusOptions: AgentStatus[] = ["shipped", "in_build", "scoped"];

export const experienceOptions: AgentExperience[] = [
  "try_agent",
  "guided_tour",
];

export const agentLibrary: AgentLibraryEntry[] = [
  {
    id: "ai-news-agent",
    title: "AI News Agent",
    summary:
      "Publishes concise AI updates to keep teams informed on relevant market and tooling changes.",
    featured: true,
    team: "Internal",
    audience: "internal",
    function: "Internal",
    vertical: "Cross-functional",
    status: "shipped",
    experience: "try_agent",
    collections: ["featured"],
    owner: "AI Garage Squad",
    previewInputs: ["Audience", "Topic scope", "Delivery format"],
    capabilities: ["News summarization", "Signal prioritization", "Digest output"],
    stack: "AI Espresso + content workflows",
    launch: { launchType: "open_url", launchUrl: "/espresso" },
  },
  {
    id: "skill-builder-agent",
    title: "Skill Builder Agent",
    summary:
      "Helps teams define, refine, and package reusable agent skills for repeatable delivery workflows.",
    featured: true,
    team: "Internal",
    audience: "internal",
    function: "Internal",
    vertical: "Cross-functional",
    status: "in_build",
    experience: "guided_tour",
    collections: ["featured"],
    owner: "AI Garage Squad",
    previewInputs: ["Workflow goal", "Skill scope", "Quality criteria"],
    capabilities: ["Skill scaffolding", "Prompt structuring", "Iteration guidance"],
    stack: "Agent skill framework",
    launch: { launchType: "guided_tour", launchUrl: "/epics" },
  },
  {
    id: "test-case-generation-agent",
    title: "Test Case Generation Agent",
    summary:
      "Creates test cases from stories in a standardized format for downstream QE workflows.",
    featured: false,
    team: "QE",
    audience: "external",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "shipped",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Story description", "Acceptance criteria", "Platform target"],
    capabilities: ["Case generation", "Coverage expansion", "Structured output"],
    stack: "LangGraph + Zebrunner",
    launch: { launchType: "guided_tour", launchUrl: "/epics" },
  },
  {
    id: "normalization-agent",
    title: "Normalization Agent",
    summary:
      "Normalizes generated test cases to determine automation viability and metadata completeness.",
    featured: true,
    team: "QE",
    audience: "external",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "shipped",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Generated cases", "Execution context", "Automation constraints"],
    capabilities: ["Case triage", "Automatability scoring", "Metadata enrichment"],
    stack: "Playwright MCP + workflow agents",
    launch: { launchType: "guided_tour", launchUrl: "/epics" },
  },
  {
    id: "code-generation-agent",
    title: "Code Generation Agent",
    summary:
      "Generates automation code for normalized cases and packages output for review.",
    featured: true,
    team: "QE",
    audience: "external",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "shipped",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Normalized case set", "Target framework", "Repo context"],
    capabilities: ["Automation code generation", "PR packaging", "Framework alignment"],
    stack: "Code generation pipeline",
    launch: { launchType: "guided_tour", launchUrl: "/epics" },
  },
  {
    id: "execution-agent",
    title: "Execution Agent",
    summary:
      "Runs generated automation against the target environment and returns run outcomes.",
    featured: true,
    team: "QE",
    audience: "external",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "shipped",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Generated tests", "Environment target", "Execution trigger"],
    capabilities: ["Grid execution", "Result capture", "Status publishing"],
    stack: "Zebrunner execution grid",
    launch: { launchType: "guided_tour", launchUrl: "/epics" },
  },
  {
    id: "self-healing-agent",
    title: "Self-Healing Agent",
    summary:
      "Repairs brittle tests and selectors when UI or flow drift causes failures.",
    featured: false,
    team: "QE",
    audience: "external",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "shipped",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Failure logs", "DOM snapshot", "Recent change set"],
    capabilities: ["Failure diagnosis", "Selector repair", "Retry orchestration"],
    stack: "Self-healing workflow",
    launch: { launchType: "guided_tour", launchUrl: "/epics" },
  },
  {
    id: "failure-analysis-agent",
    title: "Failure Analysis Agent",
    summary:
      "Analyzes execution failures and produces actionable root-cause summaries.",
    featured: true,
    team: "QE",
    audience: "external",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "in_build",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Failed run bundle", "Stack trace", "Historical failures"],
    capabilities: ["Root-cause clustering", "Fix recommendation", "Impact summary"],
    stack: "Failure diagnostics pipeline",
    launch: {
      launchType: "unavailable",
      availabilityReason:
        "In active build — launch opens once failure-analysis pipelines are connected.",
    },
  },
  {
    id: "notifications-agent",
    title: "Notifications Agent",
    summary:
      "Routes workflow outcomes and failure alerts to the right channels and stakeholders.",
    featured: false,
    team: "QE",
    audience: "internal",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "in_build",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Run summary", "Priority level", "Recipient mapping"],
    capabilities: ["Alert formatting", "Channel routing", "Escalation rules"],
    stack: "Workflow notifications layer",
    launch: {
      launchType: "unavailable",
      availabilityReason:
        "In active build — launch opens once channel-routing integration is connected.",
    },
  },
  {
    id: "reporting-agent",
    title: "Reporting Agent",
    summary:
      "Builds release and regression reports from workflow and execution data.",
    featured: true,
    team: "QE",
    audience: "internal",
    function: "Quality Engineering",
    vertical: "Cross-functional",
    status: "in_build",
    experience: "guided_tour",
    collections: ["qe-workflow"],
    owner: "QE",
    previewInputs: ["Execution window", "Environment", "Coverage scope"],
    capabilities: ["Release reporting", "Trend summaries", "Stakeholder views"],
    stack: "Reporting and analytics agents",
    launch: {
      launchType: "unavailable",
      availabilityReason:
        "In active build — launch opens once the reporting data pipeline is connected.",
    },
  },
];

export function getAgentById(agentId: string) {
  return agentLibrary.find((entry) => entry.id === agentId);
}
