import { HeroSection } from "@/components/landing/hero-section";
import { StatsCounter } from "@/components/landing/stats-counter";
import { ScanCategories } from "@/components/landing/scan-categories";
import { EVMBenchSection } from "@/components/landing/evmbench-section";
import { FeatureCards } from "@/components/landing/feature-cards";
import { HowItWorks } from "@/components/landing/how-it-works";
import { CTASection } from "@/components/landing/cta-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "OpenBench",
          description:
            "EVMBench-powered smart contract security scanner. Detect honeypots, hidden taxes, and rug pull risks.",
          url: "https://openbench.xyz",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
      <HeroSection />
      <StatsCounter />
      <ScanCategories />
      <EVMBenchSection />
      <FeatureCards />
      <HowItWorks />
      <CTASection />
    </>
  );
}
