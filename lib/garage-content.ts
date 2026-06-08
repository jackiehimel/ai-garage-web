export const siteMeta = {
  title: "AI Garage — Solvd",
  subtitle: "Solvd workspace for building agents — for everyone.",
};

export const navGroups = [
  {
    title: "Overview",
    links: [{ href: "/", label: "Home" }],
  },
  {
    title: "The Three Links",
    links: [
      { href: "/epics", label: "Epics & Stories" },
      { href: "/plan", label: "Execution Plan" },
      { href: "/library", label: "Agentic Library" },
    ],
  },
  {
    title: "Programs",
    links: [
      { href: "/espresso", label: "AI Espresso" },
      { href: "/roundtable", label: "AI Roundtable" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/submit", label: "Submit an Idea" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export const tracks = [
  {
    id: "library",
    index: "01",
    status: "Track Open",
    title: "Agentic Library",
    description:
      "A categorized catalog of working agents the GTM team uses in customer conversations.",
  },
  {
    id: "workshop",
    index: "02",
    status: "Track Open",
    title: "Agentic Workshop",
    description:
      "A structured intake where anyone at Solvd can bring an idea, get it qualified, and ship a working agent.",
  },
];

export const categories = [
  {
    name: "Quality Engineering",
    summary:
      "Multi-agent QE workflow on Zebrunner — case gen, normalization, execution, self-healing.",
  },
  {
    name: "Development / ADLC",
    summary:
      "Closed-loop agents across Plan → Build → Quality → Release → Learn.",
  },
  {
    name: "Marketing",
    summary:
      "SEO scouting, email content + subject, accessibility checks, campaign tooling.",
  },
  {
    name: "Retail & Vertical",
    summary:
      "Personalization, recommendation, and content contract checks for headless commerce.",
  },
];

export const accomplishments = [
  {
    count: "5",
    label: "QE agents",
    note: "Shipped on Zebrunner — case gen, normalization, code gen, execution, self-healing.",
  },
  {
    count: "3",
    label: "ADLC agents",
    note: "In build across story refinement, code context, and release gating.",
  },
  {
    count: "5",
    label: "Marketing agents",
    note: "Scoped for the first sprint window — SEO, email subject, accessibility, campaign tooling.",
  },
  {
    count: "4",
    label: "Retail candidates",
    note: "Vertical agents identified from current account work, sequencing in progress.",
  },
];

export const epicCards = [
  {
    id: "01",
    title: "QE agent workflow",
    description: "Multi-agent Zebrunner flow — 5 shipped, 2 in build.",
  },
  {
    id: "02",
    title: "ADLC agents",
    description: "Closed-loop agents across Plan → Build → Quality → Release → Learn.",
  },
  {
    id: "03",
    title: "Internal workflows",
    description: "Timesheet, leave, and SOW workflows toward an internal platform.",
  },
];

export const qeAgents = [
  {
    agent: "Test case generation",
    status: "Shipped",
    description:
      "Takes a user story and produces test case documentation in manual QE format.",
  },
  {
    agent: "Normalization",
    status: "Shipped",
    description:
      "Determines whether generated test cases are automatable using browser metadata.",
  },
  {
    agent: "Code generation",
    status: "Shipped",
    description:
      "Generates automation code for automatable cases and opens a pull request.",
  },
  {
    agent: "Execution",
    status: "Shipped",
    description:
      "Runs generated tests on scalable Zebrunner grid and reports outcomes.",
  },
  {
    agent: "Self-healing",
    status: "Shipped",
    description:
      "Detects and repairs broken tests when underlying UI or flows change.",
  },
  {
    agent: "Failure analysis & notification",
    status: "In build",
    description:
      "Packages screenshots, stack traces, videos, and self-healing attempts into a fix-ready report.",
  },
  {
    agent: "Report generation",
    status: "In build",
    description:
      "Builds release and regression reports on demand via the Zebrunner MCP.",
  },
];
