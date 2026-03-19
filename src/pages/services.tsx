import Head from "next/head";
import { Layout } from "../components/Layout";
import { ServicesPage } from "../components/ServicesPage";
import { Footer } from "../components/Footer";

export default function ServicesRoute() {
  return (
    <>
      <Head>
        <title>Services | Kapra Web AI</title>
        <meta
          name="description"
          content="Full-cycle web, mobile, AI, design, e-commerce, and strategy services from Kapra Web AI. High-fidelity digital products shipped to production."
        />
      </Head>

      <Layout>
        <ServicesPage />
        <Footer />
      </Layout>
    </>
  );
}
