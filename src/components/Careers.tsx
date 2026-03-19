import { Briefcase, ArrowUpRight } from "lucide-react";
import { GlowBox } from "./GlowBox";
import { Globe } from "./Globe";

const openRoles = [
  {
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote (Global)",
  },
  {
    title: "AI Solutions Architect",
    department: "Engineering",
    location: "Remote (Global)",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Kochi, India",
  },
];

export function Careers() {
  return (
    <section id="careers" className="relative isolate py-24 sm:py-32 [overflow-x:hidden] px-6 lg:px-14">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-accent-300/30 bg-accent-500/10 px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.32em] text-accent-300">
              Work with us
            </div>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
              Help us shape the <br className="hidden sm:block" />
              <span className="gradient-text">surface of the future</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
              Kapra is a premier digital experience studio. We are constantly looking for
              brilliant engineers, designers, and strategists to launch the next era of web and AI experiences.
            </p>
          </div>

          <div className="hidden lg:flex justify-end relative h-[500px] w-full items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden flex items-center justify-center opacity-75 mix-blend-screen pointer-events-auto">
              <Globe
                size={800}
                dotColor="rgba(56, 189, 248, ALPHA)"
                arcColor="rgba(125, 211, 252, 0.4)"
                markerColor="rgba(56, 189, 248, 1)"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {openRoles.map((role) => (
            <GlowBox key={role.title} className="group relative rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-white">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-white">{role.title}</h3>
              <p className="mt-2 font-body text-sm text-white/60">
                {role.department} • {role.location}
              </p>

              <a
                href={`mailto:hello@kapraweb.ai?subject=Application for ${role.title}`}
                className="mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.24em] text-accent-300 transition-colors hover:text-white"
              >
                Apply Now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </GlowBox>
          ))}
        </div>
      </div>
    </section>
  );
}
