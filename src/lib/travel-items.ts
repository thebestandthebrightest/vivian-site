import { readdirSync } from "node:fs";
import { extname, join, parse } from "node:path";
import type { TravelItem } from "@/components/site/TravelScrollStrip";

const supportedTravelExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".mp4",
  ".mov",
]);

const travelLabels: Record<string, string> = {
  "6.png": "Dublin, Ireland",
  "amsterdam.png": "Amsterdam, Netherlands",
  "antigua.png": "St. John's, Antigua",
  "barcelona-1.JPG": "Barcelona, Spain",
  "barcelona-2.JPG": "Barcelona, Spain",
  "bath.JPG": "Bath, United Kingdom",
  "boston.png": "Boston, Massachusetts",
  "brussels.png": "Brussels, Belgium",
  "budapest.png": "Budapest, Hungary",
  "chicago.png": "Chicago, Illinois",
  "copenhagen.JPG": "Copenhagen, Denmark",
  "hawaii-1.mp4": "Honolulu, Hawaii",
  "hawaii-2.mp4": "Big Island, Hawaii",
  "london-1.JPG": "London, United Kingdom",
  "london-2.JPG": "London, United Kingdom",
  "london-3.JPG": "London, United Kingdom",
  "malmo.png": "Malmö, Sweden",
  "mexico.png": "Mexico City, Mexico",
  "morocco-2.png": "Sahara Desert, Morocco",
  "morroco-1.JPG": "Marrakech, Morocco",
  "munich.JPG": "Munich, Germany",
  "nyc.png": "New York, New York",
  "paris.JPG": "Paris, France",
  "prague.png": "Prague, Czech Republic",
  "providence.png": "Providence, Rhode Island",
  "seattle.png": "Seattle, Washington",
  "seven sisters.JPG": "Seven Sisters, United Kingdom",
  "slovakia.JPG": "Bratislava, Slovakia",
  "vienna.png": "Vienna, Austria",
};

function formatTravelLabel(filename: string) {
  return parse(filename)
    .name.replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getTravelItems(): TravelItem[] {
  const travelDirectory = join(process.cwd(), "public", "travel");

  return readdirSync(travelDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((filename) =>
      supportedTravelExtensions.has(extname(filename).toLowerCase()),
    )
    .map((filename) => {
      const extension = extname(filename).toLowerCase();
      const kind: TravelItem["kind"] =
        extension === ".mp4" || extension === ".mov" ? "video" : "image";

      return {
        filename,
        kind,
        label: travelLabels[filename] ?? formatTravelLabel(filename),
        src: `/travel/${encodeURIComponent(filename)}`,
      };
    })
    .sort((first, second) =>
      first.label.localeCompare(second.label, undefined, {
        sensitivity: "base",
      }),
    );
}
