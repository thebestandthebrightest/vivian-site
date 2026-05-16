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
    <PageShell>
      <main className="flex flex-1">
        <Section className="flex flex-1 items-center pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
          <MotionReveal className="w-full">
            <div className="max-w-3xl">
              <h1 className="font-display text-6xl font-medium leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
                Contact
              </h1>
              <div className="mt-8 flex max-w-2xl flex-col gap-4 text-base leading-8 text-muted sm:text-lg">
                <p>Based in New Jersey.</p>
                <p>
                  Open to thoughtful conversations, collaborations, and the
                  occasional coffee chat.
                </p>
              </div>
              <div className="mt-12 grid max-w-2xl border-t border-line sm:grid-cols-2">
                <div className="border-b border-line py-6 sm:border-r sm:pr-8">
                  <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                    Email
                  </p>
                  <a
                    className="focus-ring mt-3 inline-flex text-base leading-7 text-foreground transition-opacity duration-300 hover:opacity-70 sm:text-lg"
                    href="mailto:gvivian321@gmail.com"
                  >
                    gvivian321@gmail.com
                  </a>
                </div>
                <div className="border-b border-line py-6 sm:pl-8">
                  <p className="text-xs font-medium uppercase leading-5 tracking-[0.18em] text-quiet">
                    LinkedIn
                  </p>
                  <a
                    className="focus-ring mt-3 inline-flex text-base leading-7 text-foreground transition-opacity duration-300 hover:opacity-70 sm:text-lg"
                    href="https://www.linkedin.com/in/vivianglenn"
                  >
                    linkedin.com/in/vivianglenn
                  </a>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
