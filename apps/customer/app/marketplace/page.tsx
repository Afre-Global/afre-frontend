import MarketplaceHeader from "@/app/marketplace/components/marketplace-header";
import ComingSoonBanner from "@/app/marketplace/components/coming-soon-banner";

export default function Marketplace() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 py-8">
        <ComingSoonBanner />
      </div>
    </div>
  );
}
