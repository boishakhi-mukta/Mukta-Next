"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";
import Tilt from "@/components/Motion/Tilt";
import ShineLink from "@/components/Motion/ShineLink";

export default function ProjectDetailContent({ project, image }) {
  return (
    <div className="min-h-screen bg-base-100">

      {/* Top nav — glass bar only */}
      <div className="fixed top-0 left-0 z-50 w-full glass-nav">
        <div className="w-11/12 mx-auto h-16" />
      </div>

      {/* Hero */}
      <div className="w-11/12 max-w-6xl mx-auto pt-24 pb-14">

        {/* Title + summary */}
        <Fade direction="up" duration={700} triggerOnce>
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-base-content leading-tight mb-3">
              {project.title}
            </h1>
            <p className="text-[15px] text-base-content/55 max-w-xl mx-auto leading-7">
              {project.summary}
            </p>
          </div>
        </Fade>

        {/* Browser mockup */}
        <Zoom duration={600} delay={150} triggerOnce>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -top-10 -left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden border border-base-300 shadow-2xl shadow-base-content/10 transition duration-300 hover:shadow-primary/10 hover:border-primary/20">
              {/* Chrome bar */}
              <div className="flex items-center gap-3 px-4 h-11 bg-base-200 border-b border-base-300 shrink-0">
                <div className="flex gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-400/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 mx-2">
                  <div className="w-full max-w-sm mx-auto h-6 rounded-full bg-base-100 border border-base-300 flex items-center px-3 gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400/60 shrink-0" />
                    <span className="text-[11px] text-base-content/35 font-mono truncate">
                      {project.live
                        ? project.live.replace("https://", "")
                        : `github.com/boishakhi-mukta/${project.slug}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative w-full aspect-video bg-base-200 overflow-hidden">
                <Image
                  src={image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover object-top transition duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 90vw"
                />
              </div>
            </div>
          </div>
        </Zoom>

      </div>

      {/* Divider */}
      <div className="w-11/12 max-w-6xl mx-auto border-b border-base-300 mb-14" />

      {/* Main body */}
      <main className="w-11/12 max-w-6xl mx-auto pb-28">

        <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-14 items-start">

          {/* Left column */}
          <div className="space-y-16">

            {/* About */}
            <Fade direction="up" duration={650} triggerOnce>
              <section>
                <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">
                  Overview
                </p>
                <h2 className="text-xl md:text-2xl font-bold mb-4">About the Project</h2>
                <p className="text-base-content/60 leading-7 text-[15px]">
                  {project.description}
                </p>
              </section>
            </Fade>

            {/* Challenges */}
            <Fade direction="up" duration={650} delay={80} triggerOnce>
              <section>
                <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">
                  Process
                </p>
                <h2 className="text-xl md:text-2xl font-bold mb-8">Challenges</h2>
                <div className="space-y-8">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="flex gap-6 group">
                      <span className="text-5xl font-black text-base-content/8 group-hover:text-primary/20 transition-colors leading-none shrink-0 select-none tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="pt-3 border-t border-base-300 w-full">
                        <p className="text-base-content/60 leading-7 text-[13px] md:text-sm">
                          {c}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Fade>

          </div>

          {/* Sticky sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-4">

            {/* CTA links */}
            <Zoom duration={500} triggerOnce>
              <div className="rounded-2xl bg-base-200 border border-base-300 p-5 space-y-3 hover:border-primary/20 hover:shadow-lg transition duration-300">
                <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
                  Links
                </p>
                {project.live && (
                  <ShineLink
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary w-full rounded-full gap-2 text-sm"
                  >
                    <FaExternalLinkAlt className="text-xs" />
                    Live Preview
                  </ShineLink>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline w-full rounded-full gap-2 text-sm hover:shadow-md transition duration-300"
                >
                  <FaGithub />
                  GitHub Repo
                </a>
              </div>
            </Zoom>

            {/* Tech stack */}
            <Zoom duration={500} delay={80} triggerOnce>
              <div className="rounded-2xl bg-base-200 border border-base-300 p-5 hover:border-primary/20 hover:shadow-lg transition duration-300">
                <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-4">
                  Built With
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full bg-base-100 border border-base-300 text-xs font-semibold text-base-content/70 hover:border-primary/30 hover:text-primary transition duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Zoom>

          </aside>
        </div>

        {/* Future Improvements */}
        <section className="mt-16">
          <Fade direction="up" duration={650} triggerOnce>
            <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-2">
              Roadmap
            </p>
            <h2 className="text-xl md:text-2xl font-bold mb-8">Future Improvements</h2>
          </Fade>

          <Fade cascade damping={0.08} duration={550} triggerOnce>
            <div className="grid sm:grid-cols-2 gap-5">
              {project.improvements.map((imp, i) => (
                <Tilt key={i} className="rounded-2xl" maxTilt={6}>
                  <div className="group relative rounded-2xl bg-base-200 border border-base-300 hover:border-primary/30 hover:shadow-lg p-6 transition-all duration-300 overflow-hidden h-full">
                    <span className="absolute -top-3 -right-1 text-8xl font-black text-base-content/5 group-hover:text-primary/8 transition-colors leading-none select-none tabular-nums pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex gap-4 items-start">
                      <span className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition duration-300">
                        <span className="text-primary text-xs font-bold">{i + 1}</span>
                      </span>
                      <p className="text-base-content/60 leading-6 text-[13px]">{imp}</p>
                    </div>
                  </div>
                </Tilt>
              ))}
            </div>
          </Fade>
        </section>

        {/* Back to Portfolio */}
        <Fade direction="up" duration={500} delay={100} triggerOnce>
          <div className="mt-20 pt-10 border-t border-base-300 flex justify-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/50 hover:text-primary transition-colors duration-300 group"
            >
              <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Portfolio
            </Link>
          </div>
        </Fade>

      </main>
    </div>
  );
}
