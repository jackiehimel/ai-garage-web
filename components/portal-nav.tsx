"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "@/lib/garage-content";

export function PortalNav() {
  const pathname = usePathname();

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
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`portal-link ${isActive ? "active" : ""}`}
                      >
                        {item.label}
                      </Link>
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
