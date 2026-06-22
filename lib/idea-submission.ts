import { isPlainString } from "./validation-utils";

export type IdeaSubmission = {
  name: string;
  ideaTitle: string;
  problemStatement: string;
  businessCase: string;
  proposedSolution: string;
  expectedOutcome: string;
};

export type IdeaValidationError = {
  field: keyof IdeaSubmission;
  message: string;
};

export function validateIdeaSubmission(
  payload: unknown,
):
  | { ok: true; value: IdeaSubmission }
  | { ok: false; errors: IdeaValidationError[] } {
  const errors: IdeaValidationError[] = [];
  const p = (payload ?? {}) as Record<string, unknown>;

  if (!isPlainString(p.name)) {
    errors.push({ field: "name", message: "Name is required." });
  }
  if (!isPlainString(p.ideaTitle)) {
    errors.push({ field: "ideaTitle", message: "Idea title is required." });
  }
  if (!isPlainString(p.problemStatement, 10)) {
    errors.push({
      field: "problemStatement",
      message: "Describe the problem in a sentence or two.",
    });
  }
  if (!isPlainString(p.businessCase, 10)) {
    errors.push({
      field: "businessCase",
      message: "Describe the business case in a sentence or two.",
    });
  }
  if (!isPlainString(p.proposedSolution, 10)) {
    errors.push({
      field: "proposedSolution",
      message: "Describe the proposed solution in a sentence or two.",
    });
  }
  if (!isPlainString(p.expectedOutcome)) {
    errors.push({
      field: "expectedOutcome",
      message: "Expected outcome is required.",
    });
  }

  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name: (p.name as string).trim(),
      ideaTitle: (p.ideaTitle as string).trim(),
      problemStatement: (p.problemStatement as string).trim(),
      businessCase: (p.businessCase as string).trim(),
      proposedSolution: (p.proposedSolution as string).trim(),
      expectedOutcome: (p.expectedOutcome as string).trim(),
    },
  };
}
