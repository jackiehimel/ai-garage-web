import { isPlainString } from "./validation-utils";

export const TEAM_OPTIONS = [
  "Mobile",
  "Backend",
  "Full Stack",
  "QE",
  "Digital",
  "Data Engineering",
  "UX/UI",
] as const;

export type Team = (typeof TEAM_OPTIONS)[number];

export type TalkSubmission = {
  name: string;
  team: Team;
  talkTitle: string;
  talkOverview: string;
  keyTakeaways: string;
  speakerBio: string;
  preferredDate: string;
};

export type ValidationError = {
  field: keyof TalkSubmission;
  message: string;
};

function isFridayISO(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return false;
  return d.getUTCDay() === 5;
}

export function validateTalkSubmission(
  payload: unknown,
): { ok: true; value: TalkSubmission } | { ok: false; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const p = (payload ?? {}) as Record<string, unknown>;

  if (!isPlainString(p.name)) {
    errors.push({ field: "name", message: "Name is required." });
  }
  if (!TEAM_OPTIONS.includes(p.team as Team)) {
    errors.push({ field: "team", message: "Team must be one of the listed options." });
  }
  if (!isPlainString(p.talkTitle)) {
    errors.push({ field: "talkTitle", message: "Talk title is required." });
  }
  if (!isPlainString(p.talkOverview, 10)) {
    errors.push({ field: "talkOverview", message: "Talk overview should be 1–3 sentences." });
  }
  if (!isPlainString(p.keyTakeaways, 10)) {
    errors.push({ field: "keyTakeaways", message: "Provide three key takeaways." });
  }
  if (!isPlainString(p.speakerBio, 10)) {
    errors.push({ field: "speakerBio", message: "Speaker bio should be 2–3 sentences." });
  }
  if (typeof p.preferredDate !== "string" || !isFridayISO(p.preferredDate)) {
    errors.push({
      field: "preferredDate",
      message: "Preferred date must be a Friday.",
    });
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name: (p.name as string).trim(),
      team: p.team as Team,
      talkTitle: (p.talkTitle as string).trim(),
      talkOverview: (p.talkOverview as string).trim(),
      keyTakeaways: (p.keyTakeaways as string).trim(),
      speakerBio: (p.speakerBio as string).trim(),
      preferredDate: p.preferredDate as string,
    },
  };
}

export function isFridayDateString(date: string): boolean {
  return isFridayISO(date);
}
