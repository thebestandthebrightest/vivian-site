import Link from "next/link";

const navItems = [
  { label: "WORK", href: "/work" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-5 py-12 text-foreground sm:px-10 lg:px-14">
      <div className="flex w-full max-w-[46rem] flex-col items-center text-center">
        <h1 className="font-display text-[clamp(3.35rem,8vw,6.35rem)] font-semibold uppercase leading-[0.88] text-foreground">
          VIVIAN GLENN
        </h1>
        <nav
          className="mt-7 flex flex-col items-center gap-5 sm:mt-9 sm:gap-6 md:mt-10 md:gap-7"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring group relative inline-flex font-display text-[clamp(2.7rem,6.6vw,5.15rem)] font-medium uppercase leading-[0.88] tracking-[0.015em] text-foreground transition duration-300 ease-out hover:-translate-y-0.5 hover:opacity-75"
            >
              <span>{item.label}</span>
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
