import type { ReactNode } from "react";
import { MotionReveal } from "./MotionReveal";
import { Section } from "./Section";

type PageIntroProps = {
  title: string;
  copy?: string;
  children?: ReactNode;
};

export function PageIntro({ title, copy, children }: PageIntroProps) {
  return (
    <Section className="pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
      <MotionReveal>
        <div className="max-w-3xl">
          <h1 className="font-display text-6xl font-medium leading-[0.92] tracking-[0.01em] text-foreground sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          {copy ? (
            <p className="mt-8 max-w-2xl text-base leading-8 text-muted sm:text-lg">
              {copy}
            </p>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </MotionReveal>
    </Section>
  );
}
