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
    <Section className="pb-14 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
      <MotionReveal>
        <div className="max-w-3xl">
          <h1 className="font-display text-6xl font-medium leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
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
