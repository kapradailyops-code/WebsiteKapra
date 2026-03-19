import Head from "next/head";
import { Layout } from "../components/Layout";
import { ContactForm } from "../components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact | Kapra Web AI</title>
        <meta
          name="description"
          content="Start a conversation with Kapra Web AI. Share the essentials and we will come back with the most sensible next move."
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
