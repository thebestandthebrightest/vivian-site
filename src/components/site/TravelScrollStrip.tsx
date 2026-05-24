"use client";

import { useEffect, useRef } from "react";
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

const LOOP_COPIES = 3;

export function TravelScrollStrip({ items }: TravelScrollStripProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const dragRef = useRef({
    active: false,
    scrollLeft: 0,
    startX: 0,
  });

  const looped =
    items.length > 0
      ? Array.from({ length: LOOP_COPIES }, () => items).flat()
      : items;

  const getSetWidth = () => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.scrollWidth / LOOP_COPIES;
  };

  // Position at the start of the middle copy so the first alphabetized
  // image sits at the left edge but there is room to scroll either way.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || items.length === 0) return;

    const align = () => {
      const setWidth = getSetWidth();
      if (setWidth > 0) strip.scrollLeft = setWidth;
    };

    align();
    const id = window.requestAnimationFrame(align);
    window.addEventListener("resize", align);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", align);
    };
  }, [items]);

  // Invisible loop: when nearing either boundary, jump by one set width.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip || items.length === 0) return;

    const handleScroll = () => {
      const setWidth = getSetWidth();
      if (setWidth <= 0) return;
      if (strip.scrollLeft <= setWidth * 0.25) {
        strip.scrollLeft += setWidth;
      } else if (strip.scrollLeft >= setWidth * 1.75) {
        strip.scrollLeft -= setWidth;
      }
    };

    strip.addEventListener("scroll", handleScroll, { passive: true });
    return () => strip.removeEventListener("scroll", handleScroll);
  }, [items]);

  // Only hijack wheel-to-horizontal while the cursor is over the strip.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const setHover = (value: boolean) => () => {
      hoverRef.current = value;
    };
    const enter = setHover(true);
    const leave = setHover(false);

    const handleWheel = (event: WheelEvent) => {
      if (!hoverRef.current) return;
      const horizontal =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;
      if (horizontal === 0) return;
      event.preventDefault();
      strip.scrollLeft += horizontal;
    };

    strip.addEventListener("pointerenter", enter);
    strip.addEventListener("pointerleave", leave);
    strip.addEventListener("mouseenter", enter);
    strip.addEventListener("mouseleave", leave);
    strip.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      strip.removeEventListener("pointerenter", enter);
      strip.removeEventListener("pointerleave", leave);
      strip.removeEventListener("mouseenter", enter);
      strip.removeEventListener("mouseleave", leave);
      strip.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
        onMouseEnter={() => {
          hoverRef.current = true;
        }}
        onMouseLeave={() => {
          hoverRef.current = false;
          stopDrag();
        }}
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
        onPointerUp={stopDrag}
      >
        <div ref={trackRef} className="flex w-max gap-5">
          {looped.map((item, index) => (
            <figure
              key={`${item.filename}-${index}`}
              className="group w-[14rem] flex-none sm:w-[16rem] lg:w-[17rem]"
              aria-hidden={index >= items.length ? true : undefined}
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
