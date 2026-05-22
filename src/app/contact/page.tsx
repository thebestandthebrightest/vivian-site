import type { Metadata } from "next";
import { MotionReveal } from "@/components/site/MotionReveal";
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
      <main className="flex flex-1">
        <Section className="pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-14">
          <MotionReveal className="w-full">
            <div className="max-w-xl sm:ml-[6vw] lg:ml-[10vw]">
              <h1 className="font-display text-5xl font-medium leading-none text-foreground sm:text-6xl lg:text-7xl">
                Contact
              </h1>
              <div className="mt-8 max-w-[32rem] space-y-4 text-base leading-8 text-muted sm:text-lg">
                <p>Based in New Jersey.</p>
                <p>
                  Open to thoughtful conversations, collaborations, and coffee
                  chats.
                </p>
              </div>
              <div className="mt-10 max-w-[32rem] space-y-2 text-base leading-8 text-muted sm:text-lg">
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
