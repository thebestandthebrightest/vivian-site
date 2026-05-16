import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export function Section({ children, id, className = "" }: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </section>
  );
}
