import type { Metadata } from "next";
import Image from "next/image";
import { MotionReveal } from "@/components/site/MotionReveal";
import { PageIntro } from "@/components/site/PageIntro";
import { PageShell } from "@/components/site/PageShell";
import { Section } from "@/components/site/Section";

export const metadata: Metadata = {
  title: "About | Vivian Glenn",
  description:
    "About Vivian Glenn, a Public Health student at Rutgers interested in strategy, analytics, operations, and systems.",
};

const details = [
  "Rutgers University",
  "Public Health, Class of 2027",
  "GPA: 3.96",
];

const interests = ["Strategy", "Analytics", "Public health systems", "Travel"];

const travelImages = [
  "/travel/paris.JPG",
  "/travel/copenhagen.JPG",
  "/travel/barcelona-1.JPG",
  "/travel/london-1.JPG",
  "/travel/seven sisters.JPG",
];

function TravelStrip() {
  return (
    <div
      className="flex gap-4 overflow-x-auto pb-3"
      aria-label="Travel image strip"
    >
      {travelImages.map((src) => (
        <div
          key={src}
          className="group relative h-64 min-w-[13rem] overflow-hidden border border-line bg-background sm:h-72 sm:min-w-[17rem]"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 640px) 272px, 208px"
            className="object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <PageIntro title="Vivian Glenn">
          <p className="max-w-2xl text-base leading-8 text-muted sm:text-lg">
            I&apos;m a Public Health student at Rutgers interested in strategy,
            analytics, operations, and systems that help organizations make
            clearer decisions.
          </p>
        </PageIntro>

        <Section className="pb-20 lg:pb-24">
          <MotionReveal>
            <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none tracking-[0.005em] text-foreground sm:text-5xl">
                Details
              </h2>
              <div className="grid gap-5">
                {details.map((detail) => (
                  <p
                    key={detail}
                    className="border-t border-line pt-5 text-sm leading-7 text-muted first:border-t-0 first:pt-0"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-20 lg:pb-24">
          <MotionReveal>
            <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none tracking-[0.005em] text-foreground sm:text-5xl">
                Selected writing / publications
              </h2>
              <div>
                <div className="grid gap-3 border-t border-line pt-5 md:grid-cols-[0.7fr_1.3fr]">
                  <p className="text-sm font-medium leading-7 text-foreground">
                    Forthcoming
                  </p>
                  <p className="text-sm leading-7 text-muted">
                    Publication details pending.
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-20 lg:pb-24">
          <MotionReveal>
            <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-[0.9fr_1.4fr] md:gap-16">
              <h2 className="font-display text-4xl font-medium leading-none tracking-[0.005em] text-foreground sm:text-5xl">
                Interests
              </h2>
              <ul className="grid gap-4 text-sm leading-7 text-muted sm:grid-cols-2">
                {interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          </MotionReveal>
        </Section>

        <Section className="pb-24 lg:pb-32">
          <MotionReveal>
            <div className="border-t border-line pt-10">
              <TravelStrip />
            </div>
          </MotionReveal>
        </Section>
      </main>
    </PageShell>
  );
}
