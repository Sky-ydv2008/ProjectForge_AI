import { HeroSection } from "@/components/landing/HeroSection";
import { RescuePreview } from "@/components/landing/RescuePreview";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { WorkflowSection } from "@/components/landing/WorkflowSection";
import { PitchBanner } from "@/components/landing/PitchBanner";

export default function HomePage() {
  return (
    <article className="flex flex-col min-h-screen">
      <HeroSection />
      <RescuePreview />
      <FeaturesGrid />
      <WorkflowSection />
      <PitchBanner />
    </article>
  );
}
