import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "./Footer";
import { TextLink } from "./TextLink";

type PageShellProps = {
  children: ReactNode;
};

const navItems = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
        <Link
          href="/"
          className="focus-ring text-base font-medium tracking-[0.01em] text-foreground"
          aria-label="Vivian Glenn homepage"
        >
          Vivian Glenn
        </Link>
        <nav
          className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-7"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <TextLink key={item.label} href={item.href}>
              {item.label}
            </TextLink>
          ))}
        </nav>
      </header>
      {children}
      <Footer />
    </div>
  );
}
