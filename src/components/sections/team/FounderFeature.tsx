import { Tag } from "@/components/ui/Card";
import { PullQuote } from "@/components/ui/PullQuote";
import { Reveal } from "@/components/ui/Reveal";
import { Container, SectionHeading } from "@/components/ui/Section";
import { founder, isPlaceholderName } from "@/data/team";
import type { CommonDict, TeamDict } from "@/i18n/types";
import { PortraitTile } from "./PortraitTile";

/**
 * The founder block: a 5/7 split with the portrait plate on the left and the
 * editorial column on the right, the pull quote hanging back into the gutter.
 *
 * While the founder's name is still a placeholder the heading is her *post*
 * rather than an invented name, with the "to follow" chip standing in the
 * name's place. Nothing on the page presents a placeholder as a real person.
 */
export function FounderFeature({
  index,
  dict,
  placeholder,
}: {
  index: number;
  dict: TeamDict["founder"];
  placeholder: CommonDict["placeholder"];
}) {
  const anonymous = isPlaceholderName(founder.name);

  return (
    <Container>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5 lg:self-start">
          <PortraitTile
            member={founder}
            aspect="portrait"
            caption={placeholder.photo}
            captionPlacement="below"
            sizes="(min-width: 1024px) 34vw, 100vw"
          />
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            index={index}
            eyebrow={dict.eyebrow}
            title={anonymous ? dict.role : founder.name}
          />

          <Reveal delay={110}>
            <div className="mt-4">
              {anonymous ? (
                <Tag tone="muted">{placeholder.badge}</Tag>
              ) : (
                <p className="text-[0.9375rem] font-semibold text-navy-600">
                  {dict.role}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-7 flex flex-col gap-5 text-[1.0625rem] leading-[1.7] text-slate-600">
              {dict.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <PullQuote className="mt-10 lg:-ml-10 xl:-ml-16">{dict.quote}</PullQuote>
          </Reveal>
        </div>
      </div>
    </Container>
  );
}
