import Head from "next/head";
import { AnimatedCarousel } from "../components/AnimatedCarousel";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Layout } from "../components/Layout";
import { PostSequenceStage } from "../components/PostSequenceStage";
import { ServicesArsenal } from "../components/ServicesArsenal";
import { RevealText } from "../components/RevealText";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Kapra Web AI | Premium AI-Native Web Experiences</title>
        <meta
          name="description"
          content="A premium landing page for Kapra Web AI Makers Pvt. Ltd. focused on service storytelling, launch-ready execution, and premium digital product design."
        />
        <meta property="og:title" content="Kapra Web AI" />
        <meta
          property="og:description"
          content="Premium web, mobile, and AI experiences presented through a polished studio landing page."
        />
      </Head>

      <Layout>
        <Hero />
        <div className="py-8 px-6 text-center">
          <p className="mb-2 font-mono text-[0.7rem] uppercase tracking-[0.45em] text-white/30">
            Create
          </p>
          <RevealText
            text="DIGITAL"
            textColor="text-white/15"
            overlayColor="text-accent-300"
            letterDelay={0.06}
          />
          <RevealText
            text="MASTERPIECE"
            textColor="text-white/15"
            overlayColor="text-white"
            letterDelay={0.06}
            overlayDelay={0.04}
          />
        </div>
        <PostSequenceStage>
          <ServicesArsenal />
          <AnimatedCarousel />
          <Footer />
        </PostSequenceStage>
      </Layout>
    </>
  );
}
