import type { Metadata } from "next";
import { ButtonLink } from "@/components/site/ButtonLink";
import { PageIntro } from "@/components/site/PageIntro";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Contact | Vivian Glenn",
  description:
    "Contact links for Vivian Glenn, including email, LinkedIn, and resume.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <main>
        <PageIntro title="Contact" />
        <Section className="pb-24 lg:pb-32">
          <div className="flex max-w-xl flex-col items-start gap-6 border-t border-line pt-8 sm:flex-row sm:gap-9">
            <ButtonLink href="mailto:gvivian321@gmail.com">Email</ButtonLink>
            <ButtonLink href="https://www.linkedin.com/in/vivianglenn">
              LinkedIn
            </ButtonLink>
            <ButtonLink href="/resume">Resume</ButtonLink>
          </div>
        </Section>
      </main>
    </PageShell>
  );
}
