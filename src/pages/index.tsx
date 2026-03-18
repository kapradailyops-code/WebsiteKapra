import Head from "next/head";
import { CanvasSequence } from "../components/CanvasSequence";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Journey } from "../components/Journey";
import { Layout } from "../components/Layout";
import { PostSequenceStage } from "../components/PostSequenceStage";
import { ServicesArsenal } from "../components/ServicesArsenal";
import { CANVAS_SEQUENCE } from "../config/animation";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Kapra Web AI | Premium AI-Native Web Experiences</title>
        <meta
          name="description"
          content="A premium landing page for Kapra Web AI Makers Pvt. Ltd. with cinematic scroll motion, service storytelling, and a canvas sequence ready for real frames."
        />
        <meta property="og:title" content="Kapra Web AI" />
        <meta
          property="og:description"
          content="Premium web, mobile, and AI experiences presented through cinematic motion design."
        />
      </Head>

      <Layout>
        <Hero />

        <div id="journey" className="scroll-mt-24">
          <CanvasSequence
            frameCount={CANVAS_SEQUENCE.frameCount}
            imagePath="/frames"
            imagePrefix="frame"
          />
        </div>
        <PostSequenceStage>
          <Journey />
          <ServicesArsenal />
          <Footer />
        </PostSequenceStage>
      </Layout>
    </>
  );
}
