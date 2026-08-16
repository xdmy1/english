import { ArrowRight, Button } from "@/components/ui/Button";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import type { TeamDict } from "@/i18n/types";

/**
 * A compact recruitment band. Deliberately quieter than the closing call to
 * action that follows it — this one speaks to teachers, not to parents — so it
 * sits on chalk rather than navy, is half the height, carries the brand rule at
 * its top edge and uses the outline button rather than the solid one.
 */
export function JoinBand({
  locale,
  dict,
}: {
  locale: Locale;
  dict: TeamDict["join"];
}) {
  return (
    <Section tone="chalk" size="sm" className="border-t border-line">
      <span
        aria-hidden="true"
        className="brand-rule absolute inset-x-0 top-0 block h-[6px]"
      />

      <Container>
        <SectionHeading
          title={dict.title}
          lead={dict.body}
          actions={
            <Button
              href={href(locale, "contact")}
              variant="outline"
              size="lg"
              trailing={<ArrowRight />}
            >
              {dict.cta}
            </Button>
          }
        />
      </Container>
    </Section>
  );
}
