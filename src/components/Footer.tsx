const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@kapraweb.ai";
const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91-98765-43210";
const location = process.env.NEXT_PUBLIC_CONTACT_LOCATION ?? "Vytilla, Kochi";

const socialLinks = [
  {
    label: "LinkedIn",
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#"
  },
  {
    label: "X",
    href: process.env.NEXT_PUBLIC_TWITTER_URL ?? "#"
  },
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#"
  }
];

const serviceLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" }
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-white/10 px-6 py-16 sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.45em] text-accent-300/85">
            Kapra Web AI Makers Pvt. Ltd.
          </p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight text-white">
            Premium digital experiences for teams that want velocity without visual compromise.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">
            Built for Kapra Web AI Makers Pvt. Ltd., a subsidiary of Kapra Highness
            Ventures. Founded in 2024 and staged from {location}.
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-white/45">
            Navigate
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {serviceLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white/70 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.35em] text-white/45">
            Contact
          </p>
          <div className="mt-5 flex flex-col gap-3 text-white/70">
            <a href={`mailto:${email}`} className="transition hover:text-white">
              {email}
            </a>
            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="transition hover:text-white">
              {phone}
            </a>
            <span>{location}</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} className="button-secondary px-4 py-2 text-sm">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>For antigravity to decide on their own.</p>
        <p>{new Date().getFullYear()} Kapra Web AI Makers Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
