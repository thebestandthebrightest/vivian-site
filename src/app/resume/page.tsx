import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ButtonLink } from "@/components/site/ButtonLink";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";
import { resumeHref } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resume | Vivian Glenn",
  description: "Resume page for Vivian Glenn.",
};

function hasResumePdf() {
  return existsSync(join(process.cwd(), "public", "Vivian-Glenn-Resume.pdf"));
}

export default function ResumePage() {
  const resumeExists = hasResumePdf();

  return (
    <PageShell>
      <main>
        <Section className="flex min-h-[62vh] items-center justify-center py-20 sm:py-24 lg:py-28">
          <MotionReveal className="mx-auto max-w-xl text-center">
            <h1 className="font-display text-6xl font-medium leading-[0.92] tracking-[0.01em] text-foreground sm:text-7xl lg:text-8xl">
              Resume
            </h1>
            <p className="mx-auto mt-8 max-w-lg text-base leading-8 text-muted sm:text-lg">
              A concise overview of experience across public health, strategy,
              analytics, and operations.
            </p>
            <div className="mt-10 flex justify-center border-t border-line pt-8">
              {resumeExists ? (
                <ButtonLink href={resumeHref} target="_blank" rel="noreferrer">
                  Open resume
                </ButtonLink>
              ) : (
                <p className="max-w-md text-sm leading-7 text-muted">
                  Resume PDF coming soon.
                </p>
              )}
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
