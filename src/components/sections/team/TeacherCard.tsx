import { Card, Tag } from "@/components/ui/Card";
import { isPlaceholderName, type TeamMember } from "@/data/team";
import type { CommonDict, TeamDict } from "@/i18n/types";
import { PortraitTile } from "./PortraitTile";

/**
 * One entry in the staff directory.
 *
 * Credentials and the "teaching here since" line are optional in the data and
 * are currently empty for everyone; the card is built so that their absence
 * leaves no hole — the plate, the post and the description carry it on their
 * own, and the meta block only appears once there is something to put in it.
 */
export function TeacherCard({
  member,
  copy,
  sinceLabel,
  placeholder,
}: {
  member: TeamMember;
  copy: TeamDict["members"][keyof TeamDict["members"]];
  sinceLabel: string;
  placeholder: CommonDict["placeholder"];
}) {
  const anonymous = isPlaceholderName(member.name);
  const hasCredentials = member.credentials.length > 0;
  const hasMeta = hasCredentials || member.since !== null;

  // No hover lift: these cards do not lead anywhere, so they must not behave
  // as if they did.
  return (
    <Card tone="paper" className="h-full overflow-hidden p-0 sm:p-0">
      <PortraitTile
        member={member}
        aspect="square"
        caption={placeholder.photo}
        captionPlacement="overlay"
        className="rounded-none"
        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex-1">
          {anonymous ? (
            <>
              <Tag tone="muted">{placeholder.badge}</Tag>
              <h3 className="font-display mt-3.5 text-[1.1875rem] leading-[1.3] font-semibold tracking-[-0.012em] text-navy-900">
                {copy.role}
              </h3>
            </>
          ) : (
            <>
              <h3 className="font-display text-[1.1875rem] leading-[1.3] font-semibold tracking-[-0.012em] text-navy-900">
                {member.name}
              </h3>
              <p className="mt-1.5 text-[0.8125rem] font-semibold text-navy-600">
                {copy.role}
              </p>
            </>
          )}

          <p className="mt-3 text-[0.9375rem] leading-[1.65] text-slate-600">{copy.bio}</p>
        </div>

        {hasMeta ? (
          <div className="mt-6 border-t border-line pt-4">
            {hasCredentials ? (
              <ul className="flex flex-wrap gap-1.5">
                {member.credentials.map((credential) => (
                  <li key={credential}>
                    <Tag tone="navy">{credential}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}

            {member.since !== null ? (
              <p
                className={
                  "text-2xs font-semibold tracking-[0.08em] text-slate-500 uppercase" +
                  (hasCredentials ? " mt-3" : "")
                }
              >
                {sinceLabel}{" "}
                <span className="text-navy-800 tabular-nums">{member.since}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
