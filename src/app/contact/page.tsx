import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/ButtonLink";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Contact | Vivian Glenn",
  description:
    "Contact links for Vivian Glenn, including email and LinkedIn.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <main>
        <Section className="pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="max-w-2xl">
            <h1 className="font-display text-6xl font-medium leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
              Contact
            </h1>
            <div className="mt-8 flex max-w-xl flex-col gap-4 text-base leading-8 text-muted sm:text-lg">
              <p>Based in New Jersey.</p>
              <p>
                Open to conversations about public health systems, strategy,
                analytics, and AI-assisted workflows.
              </p>
            </div>
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:gap-9">
              <ButtonLink href="mailto:gvivian321@gmail.com">Email</ButtonLink>
              <ButtonLink href="https://www.linkedin.com/in/vivianglenn">
                LinkedIn
              </ButtonLink>
            </div>
          </div>
        </Section>
      </main>
    </PageShell>
  );
}
