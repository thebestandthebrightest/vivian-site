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
            <div className="max-w-xl sm:ml-[8vw] lg:ml-[12vw]">
              <h1 className="font-display text-5xl font-medium leading-none text-foreground sm:text-6xl lg:text-7xl">
                Contact
              </h1>
              <div className="mt-8 flex max-w-[32rem] flex-col gap-4 text-base leading-8 text-muted sm:text-lg">
                <p>Based in New Jersey.</p>
                <p>
                  Open to thoughtful conversations, collaborations, and coffee
                  chats.
                </p>
              </div>
              <div className="mt-10 flex max-w-[32rem] flex-col gap-3 border-t border-line pt-6 text-base leading-8 text-muted sm:text-lg">
                <a
                  className="focus-ring inline-flex w-fit text-foreground underline decoration-foreground/30 underline-offset-4 transition-opacity duration-300 hover:opacity-70"
                  href="mailto:gvivian321@gmail.com"
                >
                  gvivian321@gmail.com
                </a>
                <a
                  className="focus-ring inline-flex w-fit text-foreground transition-opacity duration-300 hover:opacity-70"
                  href="https://www.linkedin.com/in/vivianglenn"
                >
                  linkedin.com/in/vivianglenn
                </a>
              </div>
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
