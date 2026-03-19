import Head from "next/head";
import { Footer } from "../components/Footer";
import { Layout } from "../components/Layout";
import { Careers } from "../components/Careers";

export default function CareersPage() {
  return (
    <>
      <Head>
        <title>Careers | Kapra Web AI</title>
        <meta
          name="description"
          content="Join Kapra Web AI and help us shape the surface of the future. We're looking for brilliant engineers, designers, and strategists."
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
