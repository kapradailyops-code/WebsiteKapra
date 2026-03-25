import Head from "next/head";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { Careers } from "../components/Careers";

export default function CareersPage() {
  return (
    <>
      <Head>
        <title>AI Agency Careers | Join Kapra Web AI</title>
        <meta
          name="description"
          content="Explore remote tech jobs at Kapra Web AI. We're hiring engineers, designers, and strategists to build custom AI and mobile apps. View open roles."
        />
      </Head>

      <Layout>
        <div className="pt-24 min-h-screen flex flex-col justify-between">
          <Careers />
          <Footer />
        </div>
      </Layout>
    </>
  );
}
