import Link from "next/link";

const navItems = [
  { label: "about", href: "/about" },
  { label: "work", href: "/work" },
  { label: "contact", href: "/contact" },
];

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#fbfaf7] px-6 py-10 text-foreground sm:px-10 lg:px-14">
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <h1 className="font-display text-[clamp(3.6rem,13vw,10.5rem)] font-medium uppercase leading-[0.84] text-foreground">
          VIVIAN GLENN
        </h1>
        <nav
          className="mt-12 flex flex-col items-center gap-4 sm:mt-14 sm:gap-5"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring group relative inline-flex px-1 py-1 text-[clamp(1.5rem,3vw,2.45rem)] font-medium lowercase leading-none text-foreground transition duration-300 ease-out hover:translate-x-1 hover:opacity-80"
            >
              <span>{item.label}</span>
              <span className="absolute -bottom-1 left-1 h-px w-0 bg-foreground transition-[width] duration-300 ease-out group-hover:w-[calc(100%-0.5rem)]" />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
