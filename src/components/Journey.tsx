import { ScrollText } from "./ScrollText";
import { GlowBox } from "./GlowBox";

const storyPoints = [
  {
    eyebrow: "Scene 01",
    title: "Your story deserves a",
    highlight: "better stage",
    body:
      "Kapra Web AI is framed as a digital experience first. The scroll journey slows the visitor down, builds anticipation, and gives every line of copy room to land."
  },
  {
    eyebrow: "Scene 02",
    title: "We build products that",
    highlight: "carry signal",
    body:
      "From flagship sites to internal systems, the work is meant to feel precise on first touch and dependable once the novelty wears off."
  },
  {
    eyebrow: "Scene 03",
    title: "Mobile and AI move with",
    highlight: "the same intent",
    body:
      "The service mix is designed to feel unified: premium interfaces, fast execution, and intelligent systems that make decisions easier, not noisier."
  }
];

export function Journey() {
  return (
    <div className="relative z-10 pb-20">
      <div className="mx-auto max-w-7xl px-6 pt-16 sm:px-10 lg:px-14">
        <GlowBox className="glass-panel max-w-2xl p-8">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.4em] text-accent-300/85">
            Journey Overlay
          </p>
          <p className="mt-4 text-base leading-8 text-foreground/72">
            This section stays synchronized to scroll. Add your own JPEG sequence later,
            or let the built-in preview carry the motion while you refine the story.
          </p>
        </GlowBox>
      </div>

      {storyPoints.map((storyPoint, index) => (
        <ScrollText
          key={storyPoint.eyebrow}
          align={index % 2 === 0 ? "left" : "right"}
          eyebrow={storyPoint.eyebrow}
          title={storyPoint.title}
          highlight={storyPoint.highlight}
          body={storyPoint.body}
        />
      ))}

      <div className="mx-auto max-w-5xl px-6 pb-24 sm:px-10 lg:px-14">
        <GlowBox className="glass-panel flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.4em] text-accent-300/85">
              Ready for the next scene
            </p>
            <h3 className="mt-3 font-display text-3xl text-foreground">
              Plug in the real frames, then make the copy unmistakably yours.
            </h3>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="button-primary">
              View Services
            </a>
            <a href="#contact" className="button-secondary">
              Contact Kapra
            </a>
          </div>
        </GlowBox>
      </div>
    </div>
  );
}
