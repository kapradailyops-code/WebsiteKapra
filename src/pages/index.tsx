import Head from "next/head";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Layout } from "../components/Layout";
import { PostSequenceStage } from "../components/PostSequenceStage";
import { ServicesArsenal } from "../components/ServicesArsenal";
import { RevealText } from "../components/RevealText";
import {
  ProblemSection,
  SolutionSection,
  FeaturesServicesSection,
  WhyKapraSection,
  HowItWorksSection,
  FinalCtaSection
} from "../components/HomepageContent";

const AnimatedCarousel = dynamic(
  () => import("../components/AnimatedCarousel").then((module) => module.AnimatedCarousel),
  { ssr: false }
);

const REVEAL_IMAGES = [
  "url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop)",
  "url(https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2748&auto=format&fit=crop)",
  "url(https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=3000&auto=format&fit=crop)",
  "url(https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=2187&auto=format&fit=crop)",
  "url(https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop)",
  "url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=3000&auto=format&fit=crop)",
  "url(https://images.unsplash.com/photo-1588693959663-1250325bdf25?q=80&w=2748&auto=format&fit=crop)",
];


export default function HomePage() {
  const [revealImages, setRevealImages] = useState<string[]>(REVEAL_IMAGES);

  useEffect(() => {
    fetch("/api/reveal-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setRevealImages(data.images.map((img: string) => `url(${img})`));
        }
      })
      .catch((err) => console.error("Error loading reveal images:", err));
  }, []);

  return (
    <>
      <Head>
        <title>Web, Mobile & AI Solutions | Kapra Web AI</title>
        <meta
          name="description"
          content="Kapra Web AI delivers custom web development, mobile app development & AI solutions for businesses of all sizes. Faster, smarter, more affordable. Contact us."
        />
        <meta property="og:title" content="Web, Mobile & AI Solutions | Kapra Web AI" />
        <meta
          property="og:description"
          content="Kapra Web AI delivers custom web development, mobile app development & AI solutions for businesses of all sizes. Faster, smarter, more affordable. Contact us."
        />
      </Head>

      <Layout>
        <Hero />
        <div className="py-8 px-6 text-center">
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.45em] text-foreground/30">
            Create
          </p>
          <RevealText
            text="DIGITAL"
            textColor="text-foreground/50"
            overlayColor="text-accent-300"
            letterDelay={0.06}
            letterImages={revealImages}
          />
          <RevealText
            text="MASTERPIECE"
            textColor="text-foreground/50"
            overlayColor="text-foreground"
            letterDelay={0.06}
            overlayDelay={0.04}
            letterImages={revealImages}
          />
        </div>
        <PostSequenceStage>
          <ProblemSection />
          <SolutionSection />
          <FeaturesServicesSection />
          <WhyKapraSection />
          <AnimatedCarousel />
          <HowItWorksSection />
          <FinalCtaSection />
          <Footer />
        </PostSequenceStage>
      </Layout>
    </>
  );
}
