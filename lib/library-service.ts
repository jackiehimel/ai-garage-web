import {
  agentLibrary,
  collectionCatalog,
  experienceOptions,
  functionOptions,
  getAgentById,
  statusOptions,
  verticalOptions,
  type AgentCollection,
  type AgentLibraryEntry,
} from "./agent-library";

export type LibraryFilters = {
  view: "all" | "featured";
  fn: string;
  vertical: string;
  status: string;
  experience: string;
  collection: string;
};

export type LibraryQueryInput = {
  view?: string | null;
  fn?: string | null;
  industry?: string | null;
  status?: string | null;
  exp?: string | null;
  collection?: string | null;
};

export type FilterFieldError = {
  field: string;
  value: string;
  allowed: string[];
};

const collectionIds = collectionCatalog.map((collection) => collection.id);

const allowedValues: Record<keyof LibraryFilters, string[]> = {
  view: ["all", "featured"],
  fn: ["all", ...functionOptions],
  vertical: ["all", ...verticalOptions],
  status: ["all", ...statusOptions],
  experience: ["all", ...experienceOptions],
  collection: ["all", ...collectionIds],
};

const inputKeyByField: Record<keyof LibraryFilters, keyof LibraryQueryInput> = {
  view: "view",
  fn: "fn",
  vertical: "industry",
  status: "status",
  experience: "exp",
  collection: "collection",
};

function coerce(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "all";
  return value;
}

/**
 * Lenient normalization for the UI: unknown values fall back to "all" so a
 * hand-edited query string never breaks the page.
 */
export function sanitizeFilters(input: LibraryQueryInput): LibraryFilters {
  const result = {} as LibraryFilters;
  (Object.keys(allowedValues) as (keyof LibraryFilters)[]).forEach((field) => {
    const raw = coerce(input[inputKeyByField[field]]);
    const value = allowedValues[field].includes(raw) ? raw : "all";
    (result[field] as string) = value;
  });
  return result;
}

/**
 * Strict validation for the API contract: unknown values surface as errors so
 * external callers get a clean, explicit rejection.
 */
export function validateFilters(
  input: LibraryQueryInput,
):
  | { ok: true; filters: LibraryFilters }
  | { ok: false; errors: FilterFieldError[] } {
  const errors: FilterFieldError[] = [];
  const result = {} as LibraryFilters;

  (Object.keys(allowedValues) as (keyof LibraryFilters)[]).forEach((field) => {
    const raw = coerce(input[inputKeyByField[field]]);
    if (!allowedValues[field].includes(raw)) {
      errors.push({
        field: inputKeyByField[field],
        value: raw,
        allowed: allowedValues[field],
      });
      return;
    }
    (result[field] as string) = raw;
  });

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, filters: result };
}

function entryMatches(entry: AgentLibraryEntry, filters: LibraryFilters) {
  if (filters.view === "featured" && !entry.featured) return false;
  if (filters.fn !== "all" && entry.function !== filters.fn) return false;
  if (filters.vertical !== "all" && entry.vertical !== filters.vertical)
    return false;
  if (filters.status !== "all" && entry.status !== filters.status) return false;
  if (filters.experience !== "all" && entry.experience !== filters.experience)
    return false;
  if (
    filters.collection !== "all" &&
    !entry.collections.includes(filters.collection)
  )
    return false;
  return true;
}

export function listAgents(filters: LibraryFilters): AgentLibraryEntry[] {
  return agentLibrary.filter((entry) => entryMatches(entry, filters));
}

export type AgentDetail = {
  agent: AgentLibraryEntry;
  collections: AgentCollection[];
};

export function getAgentDetail(agentId: string): AgentDetail | null {
  const agent = getAgentById(agentId);
  if (!agent) return null;
  const collections = collectionCatalog.filter((collection) =>
    agent.collections.includes(collection.id),
  );
  return { agent, collections };
}

const AGENT_ID_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export function isValidAgentIdFormat(agentId: string): boolean {
  return (
    typeof agentId === "string" &&
    agentId.length > 0 &&
    agentId.length <= 80 &&
    AGENT_ID_PATTERN.test(agentId)
  );
}

export { collectionCatalog };
