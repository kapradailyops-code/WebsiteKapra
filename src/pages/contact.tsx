import Head from "next/head";
import { Layout } from "../components/Layout";
import { ContactForm } from "../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Kapra Web AI | Hire Custom AI Developers</title>
        <meta
          name="description"
          content="Ready to build custom AI workflows or mobile apps? Contact Kapra Web AI. Share your project details for a consultation with our development team."
        />
      </Head>

      <Layout>
        <div className="pt-20">
          <ContactForm />
        </div>
      </Layout>
    </>
  );
}
