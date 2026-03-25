import Head from "next/head";
import { Layout } from "../components/Layout";
import { ServicesPage } from "../components/ServicesPage";
import { Footer } from "../components/Footer";

export default function ServicesRoute() {
  return (
    <>
      <Head>
        <title>Custom AI & Mobile App Development Services | Kapra Web AI</title>
        <meta
          name="description"
          content="Need custom AI and mobile app development? Kapra Web AI builds intelligent iOS/Android apps and custom AI solutions for startups and enterprises. Contact us."
        />
      </Head>

      <Layout>
        <ServicesPage />
        <Footer />
      </Layout>
    </>
  );
}
