export function isPlainString(value: unknown, min = 1): value is string {
  return typeof value === "string" && value.trim().length >= min;
}
