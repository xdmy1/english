import { programmeGroupIds } from "@/data/catalogue";
import type { ProgrammesDict } from "@/i18n/types";

/**
 * The masthead's right-hand column: a contents list for the page, so a parent
 * who came for one thing can jump straight to it.
 */
export function GroupIndex({ dict }: { dict: ProgrammesDict }) {
  return (
    <nav aria-label={dict.hero.eyebrow} className="w-full lg:w-[20.5rem]">
      <ol className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {programmeGroupIds.map((group, index) => (
          <li key={group}>
            <a
              href={`#${group}`}
              className="group/idx press flex items-center gap-4 px-5 py-4 transition-[background-color,transform] duration-200 ease-out-quint can-hover:hover:bg-navy-50"
            >
              <span className="eyebrow w-5 shrink-0 text-red-500 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[1.0625rem] leading-snug font-medium text-navy-900">
                {dict.groups[group].title}
              </span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="ml-auto size-4 shrink-0 text-navy-400 transition-transform duration-200 ease-out-quint can-hover:group-hover/idx:translate-y-0.5"
              >
                <path
                  d="M8 3v10m0 0 3.75-3.75M8 13 4.25 9.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
