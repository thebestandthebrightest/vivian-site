import { HomeNavigation } from "@/components/site/HomeNavigation";
import { getTravelItems } from "@/lib/travel-items";

export default function Home() {
  return <HomeNavigation aboutTravelItems={getTravelItems()} />;
}
