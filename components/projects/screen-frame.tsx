import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import { cn } from "@/lib/utils";

/** Shows a screenshot in a light browser or phone frame, or a photo as-is. */
export function ScreenFrame({
  image,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
  showCaption = true,
}: {
  image: ProjectImage;
  priority?: boolean;
  sizes?: string;
  className?: string;
  showCaption?: boolean;
}) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      className="h-auto w-full"
    />
  );

  let body = img;
  if (image.kind === "mobile") {
    body = (
      <div className="mx-auto w-full max-w-[300px] rounded-[2.2rem] border border-border-strong bg-surface-2 p-2 shadow-2xl shadow-black/20">
        <div className="overflow-hidden rounded-[1.7rem]">{img}</div>
      </div>
    );
  } else if (image.kind === "screen") {
    body = (
      <div className="overflow-hidden rounded-2xl border border-border-strong bg-surface-2 shadow-2xl shadow-black/20">
        <div className="flex h-8 items-center gap-1.5 border-b border-border px-3" aria-hidden>
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        {img}
      </div>
    );
  } else {
    body = <div className="overflow-hidden rounded-2xl border border-border">{img}</div>;
  }

  return (
    <figure className={cn("w-full", className)}>
      {body}
      {showCaption && image.caption && (
        <figcaption className="mt-3 text-center text-sm text-subtle">{image.caption}</figcaption>
      )}
    </figure>
  );
}
