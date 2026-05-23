"use client";

import { useRef } from "react";
import { SmoothImage, SmoothVideo } from "./SmoothImage";

export type TravelItem = {
  filename: string;
  kind: "image" | "video";
  label: string;
  src: string;
};

type TravelScrollStripProps = {
  items: TravelItem[];
};

export function TravelScrollStrip({ items }: TravelScrollStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    scrollLeft: 0,
    startX: 0,
  });

  const startDrag = (clientX: number) => {
    const strip = stripRef.current;
    if (!strip) return;

    dragRef.current = {
      active: true,
      scrollLeft: strip.scrollLeft,
      startX: clientX,
    };
  };

  const moveDrag = (clientX: number) => {
    const strip = stripRef.current;
    if (!strip || !dragRef.current.active) return;
    strip.scrollLeft =
      dragRef.current.scrollLeft - (clientX - dragRef.current.startX);
  };

  const stopDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <div className="relative min-w-0">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 justify-between sm:inset-x-3"
      >
        <span className="h-5 w-5 -rotate-45 border-l border-t border-foreground/35" />
        <span className="h-5 w-5 rotate-[135deg] border-l border-t border-foreground/35" />
      </div>

      <div
        ref={stripRef}
        className="relative w-full min-w-0 cursor-grab select-none overflow-x-auto active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Travel image strip"
        onMouseLeave={stopDrag}
        onMouseDown={(event) => {
          if (event.button !== 0) return;

          event.preventDefault();
          startDrag(event.clientX);

          const handleMouseMove = (moveEvent: MouseEvent) => {
            moveDrag(moveEvent.clientX);
          };
          const handleMouseUp = () => {
            stopDrag();
            window.removeEventListener("mousemove", handleMouseMove);
          };

          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("mouseup", handleMouseUp, { once: true });
        }}
        onDragStart={(event) => event.preventDefault()}
        onMouseUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        onPointerUp={stopDrag}
      >
        <div className="flex w-max gap-5">
          {items.map((item) => (
            <figure
              key={item.filename}
              className="group w-[14rem] flex-none sm:w-[16rem] lg:w-[17rem]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-background">
                {item.kind === "image" ? (
                  <SmoothImage
                    src={item.src}
                    alt={item.label}
                    fill
                    draggable={false}
                    sizes="(min-width: 1024px) 272px, (min-width: 640px) 256px, 224px"
                    wrapperClassName="h-full w-full"
                    className="object-cover group-hover:scale-[1.02] hover:scale-[1.02]"
                  />
                ) : (
                  <SmoothVideo
                    aria-label={item.label}
                    className="h-full w-full object-cover group-hover:scale-[1.02] hover:scale-[1.02]"
                    wrapperClassName="h-full w-full"
                    draggable={false}
                    muted
                    playsInline
                    preload="metadata"
                    src={item.src}
                  />
                )}
              </div>
              <figcaption className="mt-3 text-xs font-medium leading-6 text-quiet">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
