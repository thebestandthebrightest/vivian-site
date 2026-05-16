import { MotionReveal } from "./MotionReveal";

type SectionHeaderProps = {
  title: string;
  copy?: string;
};

export function SectionHeader({ title, copy }: SectionHeaderProps) {
  return (
    <MotionReveal className="grid gap-6 pb-10 md:grid-cols-[0.82fr_1.4fr] md:items-end md:gap-14 lg:pb-14">
      <h2 className="font-display text-5xl font-medium leading-[0.96] text-foreground sm:text-6xl lg:text-7xl">
        {title}
      </h2>
      {copy ? (
        <p className="max-w-2xl text-sm leading-7 text-muted sm:text-[0.95rem]">
          {copy}
        </p>
      ) : null}
    </MotionReveal>
  );
}
