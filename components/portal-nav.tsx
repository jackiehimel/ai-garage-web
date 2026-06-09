"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { libraryTeamTabs, navGroups } from "@/lib/garage-content";

export function PortalNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedLibraryTeam = searchParams.get("fn");
  const onLibraryRoute = pathname === "/library";
  const [libraryOpen, setLibraryOpen] = useState(false);
  const libraryExpanded = onLibraryRoute || libraryOpen;

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="block border-b border-[var(--rule)] bg-[var(--paper)] px-4 py-2 md:hidden"
      >
        <div className="flex gap-2 overflow-x-auto">
          {navGroups.flatMap((group) => group.links).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-sm px-3 py-1.5 text-sm ${
                  isActive
                    ? "border-l-2 border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "text-[var(--ink-soft)] hover:bg-[var(--paper-warm)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <aside className="hidden md:block portal-sidebar">
        <div className="portal-brand">
          <span className="portal-brand-mark">
            AI <em>Garage</em>
          </span>
          <span className="portal-brand-sub">Solvd · Internal</span>
        </div>

        <nav aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
              <ul>
                {group.links.map((item) => {
                  const isActive = pathname === item.href;
                  const isLibraryRoot = item.href === "/library";
                  return (
                    <li key={item.href}>
                      {isLibraryRoot ? (
                        <div className="portal-tree">
                          <div className={`portal-link-row ${isActive ? "active" : ""}`}>
                            <Link
                              href="/library"
                              className={`portal-link portal-link-grow ${
                                onLibraryRoute ? "active" : ""
                              }`}
                            >
                              {item.label}
                            </Link>
                            <button
                              type="button"
                              aria-expanded={libraryExpanded}
                              aria-label={
                                libraryExpanded
                                  ? "Collapse library teams"
                                  : "Expand library teams"
                              }
                              className="portal-tree-toggle"
                              onClick={() => setLibraryOpen((open) => !open)}
                            >
                              {libraryExpanded ? "▾" : "▸"}
                            </button>
                          </div>
                          {libraryExpanded ? (
                            <ul className="portal-subtabs ml-6 mt-1 space-y-1 border-l border-dashed border-[var(--rule)] pl-3">
                              {libraryTeamTabs.map((team) => {
                                const teamHref = `/library?fn=${encodeURIComponent(team.query)}`;
                                const teamActive =
                                  pathname === "/library" && selectedLibraryTeam === team.query;
                                return (
                                  <li key={team.query}>
                                    <Link
                                      href={teamHref}
                                      className={`portal-subtab-link ${
                                        teamActive ? "active" : ""
                                      }`}
                                    >
                                      {team.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`portal-link ${isActive ? "active" : ""}`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
