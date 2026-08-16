import Image from "next/image";

import { OwlMark } from "@/components/site/Logo";
import { monogram, type TeamMember } from "@/data/team";
import { cn } from "@/lib/cn";

/**
 * A staff portrait plate.
 *
 * The centre has not supplied photographs yet, so a member without `photo`
 * renders as a navy monogram plate rather than a broken frame or a stock face.
 * The plate is captioned honestly — it never pretends to be a picture of
 * anyone. When a real portrait is dropped into /public/team the same component
 * renders it at the identical crop, so the grid does not shift on the day the
 * photographs arrive.
 */
export function PortraitTile({
  member,
  aspect = "square",
  caption,
  captionPlacement = "overlay",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw",
  priority,
  className,
}: {
  member: TeamMember;
  aspect?: "square" | "portrait";
  /** Honest label for the missing photograph, e.g. common.placeholder.photo. */
  caption?: string;
  /** "overlay" sets it inside the plate; "below" hangs it under a hairline. */
  captionPlacement?: "overlay" | "below";
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const portrait = aspect === "portrait";
  const photo = member.photo;
  const showCaption = Boolean(caption) && !photo;

  const plate = (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        portrait ? "aspect-[4/5]" : "aspect-square",
        photo ? "bg-navy-100" : "grain bg-navy-900",
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={member.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="ruled pointer-events-none absolute inset-0 opacity-[0.22] invert"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span
              className={cn(
                "font-display leading-none font-semibold tracking-[-0.03em] text-white/10 select-none",
                portrait ? "text-[8rem] sm:text-[11rem]" : "text-[5rem] sm:text-[5.5rem]",
              )}
            >
              {monogram(member)}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/10 ring-inset"
          />

          <OwlMark
            className={cn(
              "absolute right-4 bottom-4 w-auto text-white/25",
              portrait ? "h-7" : "h-6",
            )}
            eyeClassName="fill-white/30"
          />

          {showCaption && captionPlacement === "overlay" ? (
            <span className="absolute bottom-4 left-4 text-2xs font-semibold tracking-[0.14em] text-navy-200 uppercase">
              {caption}
            </span>
          ) : null}
        </>
      )}
    </div>
  );

  if (showCaption && captionPlacement === "below") {
    return (
      <figure className="flex flex-col">
        {plate}
        <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-3 text-2xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
          <span aria-hidden="true" className="brand-rule block h-[6px] w-8 shrink-0" />
          {caption}
        </figcaption>
      </figure>
    );
  }

  return plate;
}
