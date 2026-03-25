import { GlowBox } from "./GlowBox";
import { X, CheckCircle2, MonitorSmartphone, Code2, Sparkles, TrendingUp } from "lucide-react";

export function ProblemSection() {
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-14 overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-rose-400/85">
          The Problem
        </p>
        <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.04em] text-foreground">
          Your Business Deserves More Than a Basic Website
        </h2>
        <p className="mt-6 text-lg leading-8 text-foreground/72">
          Most agencies stop at web design. But in 2025, your business needs more — a powerful mobile presence, smart automation, and AI tools that give you a real competitive edge. Juggling three different vendors for web, mobile, and AI is expensive, slow, and frustrating. There's a better way.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 text-left">
          {[
            "Web agencies that can't touch your mobile app",
            "AI consultants who don't understand development",
            "Slow timelines and ballooning budgets",
            "No single team that sees the full picture"
          ].map((item, i) => (
            <GlowBox key={i} className="flex items-center gap-4 p-5 border border-rose-500/20 bg-rose-500/[0.02] rounded-2xl">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <X className="h-4 w-4" strokeWidth={3} />
              </div>
              <span className="text-foreground/80 font-medium">{item}</span>
            </GlowBox>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionSection() {
  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-14 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.04),transparent_50%)] top-0 pointer-events-none" />
      <div className="mx-auto max-w-4xl text-center relative z-10">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">
          The Solution
        </p>
        <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] text-foreground">
          Full-Stack Web, Mobile, and AI Engineering.
        </h2>
        <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
          We replace fragmented offshore networks with a single, highly technical engineering team. By unifying high-performance web development, cross-platform mobile architecture, and custom LLM integrations, we build interconnected digital products that ship up to 30% faster — with zero vendor friction.
        </p>
        <p className="mt-4 text-base leading-7 text-foreground/60 max-w-2xl mx-auto">
          Whether you are launching a startup's core SaaS platform or deploying enterprise-grade AI automation, we deliver clean, scalable infrastructure that grows seamlessly alongside your user base.
        </p>
      </div>
    </section>
  );
}

export function FeaturesServicesSection() {
  const services = [
    {
      title: "Custom Web Development",
      desc: "Beautiful, high-performance websites and web apps built to convert. We craft every line of code with your users and your SEO in mind — so you rank, load fast, and keep visitors coming back.",
      icon: Code2
    },
    {
      title: "Mobile App Development",
      desc: "iOS, Android, or cross-platform — we build mobile apps that users actually love. From MVP to full-scale product, our mobile team delivers clean, intuitive apps on time and on budget.",
      icon: MonitorSmartphone
    },
    {
      title: "AI Solutions",
      desc: "From intelligent chatbots to predictive analytics and workflow automation, we design and deploy AI solutions tailored to your business. Not off-the-shelf tools — custom AI that fits the way you work.",
      icon: Sparkles
    },
    {
      title: "AI Consulting & Strategy",
      desc: "Not sure where to start with AI? We'll map out exactly where it can save you time, reduce costs, and open new revenue streams — then help you build it.",
      icon: TrendingUp
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="text-center md:text-left mb-16">
           <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">Services</p>
           <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-foreground">What We Build for You</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <GlowBox key={i} className="p-8 rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] backdrop-blur-md flex flex-col sm:flex-row gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-300">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-sm leading-7 text-foreground/60">{s.desc}</p>
                </div>
              </GlowBox>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyKapraSection() {
  const tableData = [
    { feature: "Web Development", traditional: true, kapra: true },
    { feature: "Mobile App Dev", traditional: false, kapra: true },
    { feature: "AI Solutions", traditional: false, kapra: true },
    { feature: "End-to-End Strategy", traditional: false, kapra: true },
    { feature: "Affordable Pricing", traditional: false, kapra: true },
    { feature: "Fast Delivery", traditional: false, kapra: true },
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-14 bg-foreground/[0.02]">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">Why Kapra Web AI?</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-foreground">
            The Full-Stack Tech Partner You've Been Looking For
          </h2>
        </div>

        {/* Mobile: comparison cards */}
        <div className="md:hidden space-y-3">
          {/* Header labels */}
          <div className="grid grid-cols-[1fr_1fr] gap-2 px-2 pb-1">
            <p className="text-center text-[0.7rem] font-mono uppercase tracking-widest text-foreground/40">Traditional</p>
            <p className="text-center text-[0.7rem] font-mono uppercase tracking-widest text-accent-300/80">Kapra Web AI</p>
          </div>
          {tableData.map((row, i) => (
            <GlowBox key={i} className="rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-xl p-4">
              <p className="text-sm font-semibold text-foreground mb-3">{row.feature}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.03] py-2">
                  {row.traditional ? (
                    <CheckCircle2 className="h-5 w-5 text-foreground/30" />
                  ) : (
                    <X className="h-5 w-5 text-rose-500/50" strokeWidth={2.5} />
                  )}
                </div>
                <div className="flex items-center justify-center rounded-xl border border-accent-500/20 bg-accent-500/10 py-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-400" />
                </div>
              </div>
            </GlowBox>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block overflow-x-auto rounded-[2rem] border border-foreground/10 bg-background/50 backdrop-blur-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-foreground/10">
                <th className="p-6 text-foreground/60 font-medium"></th>
                <th className="p-6 text-foreground/60 font-medium text-center border-l border-foreground/10">Traditional Agency</th>
                <th className="p-6 text-accent-300 font-bold text-center border-l border-foreground/10 bg-accent-500/5">Kapra Web AI</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i} className="border-b border-foreground/10 last:border-0 hover:bg-foreground/[0.02] transition-colors">
                  <td className="p-6 text-foreground font-medium">{row.feature}</td>
                  <td className="p-6 text-center border-l border-foreground/10">
                    {row.traditional ? (
                      <CheckCircle2 className="h-5 w-5 mx-auto text-foreground/30" />
                    ) : (
                      <X className="h-5 w-5 mx-auto text-rose-500/50" />
                    )}
                  </td>
                  <td className="p-6 text-center border-l border-foreground/10 bg-accent-500/5">
                    <div className="flex justify-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/10">
                        <CheckCircle2 className="h-5 w-5 text-accent-400" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}


export function SocialProofSection() {
  const testimonials = [
    {
      quote: "Kapra Web AI handled our website, mobile app, and AI chatbot — all at once. The result was seamless and the price was unbeatable.",
      author: "[Client Name]",
      company: "[Company]"
    },
    {
      quote: "We came for the web development and stayed for the AI consulting. They genuinely understand how to use technology to grow a business.",
      author: "[Client Name]",
      company: "[Company]"
    }
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-14 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">Social Proof</p>
        <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] text-foreground mb-16">
          Trusted by Businesses Across Every Industry
        </h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <GlowBox key={i} className="p-8 rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] backdrop-blur-lg text-left relative">
              <span className="absolute top-6 right-8 text-6xl text-foreground/10 font-serif">"</span>
              <p className="text-lg leading-8 text-foreground/80 mb-8 relative z-10 italic">"{t.quote}"</p>
              <div>
                <p className="font-bold text-foreground">{t.author}</p>
                <p className="text-sm text-foreground/50">{t.company}</p>
              </div>
            </GlowBox>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    { title: "Contact us", desc: "Share your goals and what you're looking to build." },
    { title: "We scope your solution", desc: "Web, mobile, AI, or all three — we map out the right approach." },
    { title: "We design & develop", desc: "Fast, transparent delivery with regular check-ins." },
    { title: "You launch & scale", desc: "Go live with a full digital ecosystem built for growth." }
  ];

  return (
    <section className="relative px-6 py-24 sm:px-10 lg:px-14">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.45em] text-accent-300/85">How It Works</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.04em] text-foreground">
            Simple Process, Exceptional Results
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center md:text-left flex flex-col items-center md:items-start group">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-500/20 bg-accent-500/10 text-xl font-bold text-accent-300 mb-6 group-hover:bg-accent-500 group-hover:text-background transition-colors">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-foreground/60 leading-6">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCtaSection() {
  return (
    <section className="relative px-6 py-32 sm:px-10 lg:px-14 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12),transparent_60%)] pointer-events-none" />
      <GlowBox className="mx-auto max-w-4xl rounded-[3rem] border border-accent-300/20 bg-foreground/[0.03] p-10 md:p-20 text-center backdrop-blur-xl relative z-10">
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-[-0.04em] text-foreground mb-6">
          Ready to Build Something Bigger?
        </h2>
        <p className="text-lg text-foreground/70 mb-10 max-w-2xl mx-auto leading-8">
          Web development. Mobile apps. AI solutions. Kapra Web AI delivers all three — faster, smarter, and more affordably than any traditional agency.
        </p>
        <button
          onClick={() => {
            document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-zinc-100 text-zinc-900 border border-foreground/20 relative text-sm font-medium rounded-full h-14 px-8 flex items-center justify-center group transition-all duration-300 hover:scale-105 mx-auto w-fit cursor-pointer"
        >
          <span className="font-bold uppercase tracking-widest text-[0.8rem]">Contact Us Today &rarr;</span>
        </button>
      </GlowBox>
    </section>
  );
}
