import CanvasSequence from "./components/CanvasSequence";
import ClosingCTA from "./components/ClosingCTA";
import FeaturesSection from "./components/FeaturesSection";
import SpecsSection from "./components/SpecsSection";

export default function HomePage() {
  return (
    <main>
      <CanvasSequence framePath="/assets/frames/webp/frame_" frameCount={240}>
        <section className="hero-copy" aria-labelledby="page-title">
          <p className="eyebrow">THH Blueprinted · Signal System</p>
          <h1 id="page-title">Precision, revealed.</h1>
          <p className="intro">
            A scroll-driven study of a watch engineered from object to mechanism.
          </p>
          <a className="hero-link" href="#features">
            Explore the system
          </a>
        </section>
      </CanvasSequence>
      <FeaturesSection />
      <SpecsSection />
      <ClosingCTA />
    </main>
  );
}
