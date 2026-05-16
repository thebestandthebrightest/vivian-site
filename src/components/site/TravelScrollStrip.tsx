"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollX = useSpring(
    useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -360]),
    { stiffness: 90, damping: 28, mass: 0.5 },
  );

  return (
    <div
      className="relative overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="Travel image strip"
    >
      <motion.div className="flex w-max gap-5" style={{ x: scrollX }}>
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
                  sizes="(min-width: 1024px) 272px, (min-width: 640px) 256px, 224px"
                  className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
                />
              ) : (
                <video
                  aria-label={item.label}
                  autoPlay
                  className="h-full w-full object-cover transition duration-700 ease-out hover:scale-[1.02]"
                  loop
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
      </motion.div>
    </div>
  );
}
