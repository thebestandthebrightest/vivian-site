import type { Metadata } from "next";
import { AboutContent } from "@/components/site/AboutContent";
import { PageShell } from "@/components/site/PageShell";
import { getTravelItems } from "@/lib/travel-items";

export const metadata: Metadata = {
  title: "About | Vivian Glenn",
  description:
    "About Vivian Glenn, a Public Health student at Rutgers interested in strategy, analytics, operations, and systems.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <main>
        <AboutContent travelItems={getTravelItems()} />
      </main>
    </PageShell>
  );
}
