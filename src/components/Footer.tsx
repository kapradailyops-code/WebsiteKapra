"use client";
import React from "react";
import type { ComponentProps, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Social Links",
    links: [
      { title: "Instagram", href: "https://www.instagram.com/kapradaily/", icon: InstagramIcon },
      { title: "LinkedIn", href: "https://www.linkedin.com/company/kapragroupin/posts/?feedView=all", icon: LinkedinIcon },
    ],
  },
];

export function Footer() {
  return (
    <footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-foreground/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.foreground/8%),transparent)] px-6 py-12 lg:py-16">
      <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <FrameIcon className="size-8 text-foreground/80" />
          <div className="flex flex-col gap-2 mt-8 md:mt-0 text-sm">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new Event("openAboutModal"));
              }} 
              className="text-left w-fit text-foreground/80 hover:text-foreground hover:underline transition-colors"
            >
              About Us
            </button>
            <p className="text-foreground/60">
              © {new Date().getFullYear()} Kapra Web AI. All rights reserved.
            </p>
          </div>
        </AnimatedContainer>

        <div className="mt-10 flex gap-8 xl:col-span-2 xl:mt-0 xl:justify-end">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-foreground/55">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/60">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="inline-flex items-center font-body transition-all duration-300 hover:text-foreground"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.icon && <link.icon className="me-2 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className as string}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className as string}
    >
      {children}
    </motion.div>
  );
}
