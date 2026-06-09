import { launchTypeLabels, type AgentLaunch } from "@/lib/agent-library";

const openClasses =
  "rounded-sm bg-[var(--accent)] px-3 py-2 text-sm font-medium text-white no-underline hover:opacity-90";
const tourClasses =
  "rounded-sm border border-[var(--rule)] px-3 py-2 text-sm text-[var(--ink-soft)] no-underline hover:bg-[var(--paper-warm)]";
const unavailableClasses =
  "cursor-not-allowed rounded-sm border border-dashed border-[var(--rule)] bg-[var(--paper-warm)] px-3 py-2 text-sm text-[var(--ink-faint)]";

export function LaunchAction({ launch }: { launch: AgentLaunch }) {
  if (launch.launchType === "unavailable" || !launch.launchUrl) {
    if (!launch.availabilityReason) return null;
    return (
      <span
        aria-disabled="true"
        title={launch.availabilityReason}
        className={unavailableClasses}
      >
        {launchTypeLabels.unavailable}
      </span>
    );
  }

  const isOpen = launch.launchType === "open_url";
  return (
    <a href={launch.launchUrl} className={isOpen ? openClasses : tourClasses}>
      {isOpen ? launchTypeLabels.open_url : launchTypeLabels.guided_tour}
    </a>
  );
}

export function LaunchReason({ launch }: { launch: AgentLaunch }) {
  if (launch.launchType !== "unavailable" || !launch.availabilityReason) {
    return null;
  }
  return (
    <p className="mt-3 text-[13px] leading-5 text-[var(--ink-faint)]">
      {launch.availabilityReason}
    </p>
  );
}
