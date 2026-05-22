import Link from "next/link";

const navItems = [
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/work" },
  { label: "CONTACT", href: "/contact" },
];

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center bg-[#fbfaf7] px-5 py-10 text-foreground sm:px-10 lg:px-14">
      <div className="flex w-full max-w-6xl flex-col items-center text-center">
        <h1 className="font-display text-[3.2rem] font-medium uppercase leading-[0.86] text-foreground sm:text-[5rem] md:text-[6.4rem] lg:text-[8rem]">
          VIVIAN GLENN
        </h1>
        <nav
          className="mt-8 flex flex-col items-center gap-5 sm:mt-10 sm:gap-7 md:mt-12 md:gap-8"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring group relative inline-flex font-display text-[2.75rem] font-medium uppercase leading-[0.86] text-foreground transition duration-300 ease-out hover:-translate-y-0.5 hover:opacity-75 sm:text-[4.3rem] md:text-[5.5rem] lg:text-[6.85rem]"
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
