import { Section } from "./Section";

export function Footer() {
  return (
    <footer className="pb-8 pt-10">
      <Section>
        <div className="flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-foreground">
            Vivian Glenn
          </p>
          <div className="flex gap-6">
            <a
              className="transition-opacity duration-300 hover:opacity-70"
              href="mailto:gvivian321@gmail.com"
            >
              Email
            </a>
            <a
              className="transition-opacity duration-300 hover:opacity-70"
              href="https://www.linkedin.com/in/vivianglenn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Section>
    </footer>
  );
}
