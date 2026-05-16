"use client";

import Image from "next/image";
import { useRef } from "react";

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
    if (!strip) {
      return;
    }

    dragRef.current = {
      active: true,
      scrollLeft: strip.scrollLeft,
      startX: clientX,
    };
  };

  const moveDrag = (clientX: number) => {
    const strip = stripRef.current;
    if (!strip || !dragRef.current.active) {
      return;
    }

    strip.scrollLeft =
      dragRef.current.scrollLeft - (clientX - dragRef.current.startX);
  };

  const stopDrag = () => {
    dragRef.current.active = false;
  };

  return (
    <div
      ref={stripRef}
      className="relative cursor-grab select-none overflow-x-auto scroll-smooth active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Travel image strip"
      onMouseDown={(event) => {
        if (event.button !== 0) {
          return;
        }

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
      onMouseLeave={stopDrag}
      onMouseMove={(event) => moveDrag(event.clientX)}
      onMouseUp={stopDrag}
      onPointerCancel={stopDrag}
      onPointerDown={(event) => {
        if (event.pointerType === "mouse" && event.button !== 0) {
          return;
        }

        startDrag(event.clientX);
        stripRef.current?.setPointerCapture(event.pointerId);
      }}
      onPointerLeave={stopDrag}
      onPointerMove={(event) => moveDrag(event.clientX)}
      onPointerUp={(event) => {
        stripRef.current?.releasePointerCapture(event.pointerId);
        stopDrag();
      }}
    >
      <div className="flex w-max gap-5">
        {items.map((item) => (
          <figure
            key={item.filename}
            className="w-[14rem] flex-none sm:w-[16rem] lg:w-[17rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-background">
              {item.kind === "image" ? (
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  draggable={false}
                  sizes="(min-width: 1024px) 272px, (min-width: 640px) 256px, 224px"
                  className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
                />
              ) : (
                <video
                  aria-label={item.label}
                  className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.02]"
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
  );
}
