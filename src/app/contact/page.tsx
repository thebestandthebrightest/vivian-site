import type { Metadata } from "next";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageIntro } from "@/components/site/PageIntro";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "Contact | Vivian Glenn",
  description:
    "Contact links for Vivian Glenn, including email and LinkedIn.",
};

export default function ContactPage() {
  return (
    <PageShell hideFooter>
      <main>
        <PageIntro title="Contact" />
        <Section className="pb-24 lg:pb-32">
          <MotionReveal>
            <div className="max-w-xl">
              <div className="space-y-4 text-base leading-8 text-muted sm:text-lg">
                <p>Based in New Jersey.</p>
                <p>
                  Open to thoughtful conversations, collaborations, and coffee
                  chats.
                </p>
              </div>
              <div className="mt-10 space-y-2 text-base leading-8 text-muted sm:text-lg">
                <p>
                  <a
                    className="focus-ring text-foreground underline decoration-foreground/25 underline-offset-4 transition-opacity duration-300 hover:opacity-70"
                    href="mailto:gvivian321@gmail.com"
                  >
                    gvivian321@gmail.com
                  </a>
                </p>
                <p>
                  <a
                    className="focus-ring text-foreground underline decoration-foreground/25 underline-offset-4 transition-opacity duration-300 hover:opacity-70"
                    href="https://www.linkedin.com/in/vivianglenn"
                  >
                    linkedin.com/in/vivianglenn
                  </a>
                </p>
              </div>
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
