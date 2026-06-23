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
      {/* ── Page header ── */}
      <header className="w-11/12 max-w-6xl mx-auto pt-6 pb-10">
        <Fade direction="up" duration={600} triggerOnce>
          <div className="flex flex-col items-center text-center gap-4">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-base-content leading-tight">
              {project.title}
            </h1>

            <p className="text-[15px] text-base-content/50 max-w-xl leading-7">
              {project.summary}
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-1">
              {project.live && (
                <ShineLink
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm rounded-full gap-2"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Live Preview
                </ShineLink>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm rounded-full gap-2 hover:shadow-md transition duration-300"
              >
                <FaGithub />
                GitHub Repo
              </a>
            </div>
          </div>
        </Fade>
      </header>

      <div className="w-11/12 max-w-6xl mx-auto border-b border-base-300" />

      {/* ── Main ── */}
      <main className="w-11/12 max-w-6xl mx-auto py-14 pb-28 space-y-20">
        {/* About + Image side by side */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          {/* Left: About the Project */}
          <Fade direction="up" duration={650} triggerOnce>
            <section className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">
                About the Project
              </h2>
              <p className="text-base-content/60 leading-7 text-[15px]">
                {project.description}
              </p>
            </section>
          </Fade>

          {/* Right: Browser mockup + tech stack */}
          <Zoom duration={600} delay={120} triggerOnce>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-base-300 shadow-xl shadow-base-content/10 hover:shadow-primary/10 hover:border-primary/20 transition duration-300">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-3 px-4 h-9 bg-base-200 border-b border-base-300 shrink-0">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    </div>
                    <div className="flex-1 mx-1">
                      <div className="w-full max-w-xs mx-auto h-5 rounded-full bg-base-100 border border-base-300 flex items-center px-3 gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/60 shrink-0" />
                        <span className="text-[10px] text-base-content/35 font-mono truncate">
                          {project.live
                            ? project.live.replace("https://", "")
                            : `github.com/boishakhi-mukta/${project.slug}`}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <div className="relative w-full rounded-2xl shadow-2xl aspect-video bg-base-200 overflow-hidden">
                    <Image
                      src={image}
                      alt={project.title}
                      fill
                      priority
                      className="object-cover object-top hover:scale-[1.03] transition duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-base-200 border border-base-300 text-xs font-semibold text-base-content/60 hover:border-primary/30 hover:text-primary transition duration-200 cursor-default"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Zoom>
        </div>

        {/* Challenges */}
        <Fade direction="up" duration={650} triggerOnce>
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-8">Challenges</h2>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {project.challenges.map((c, i) => (
                <div key={i} className="flex gap-5 group">
                  <span className="text-4xl font-black text-base-content/8 group-hover:text-primary/20 transition-colors leading-none shrink-0 select-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-2 border-t border-base-300 shadow-md w-full">
                    <p className="text-base-content/60 leading-7 text-[13px] md:text-sm">
                      {c}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Fade>

        {/* Future Improvements */}
        <section>
          <Fade direction="up" duration={650} triggerOnce>
            <h2 className="text-xl md:text-2xl font-bold mb-8">
              Future Improvements
            </h2>
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
                        <span className="text-primary text-xs font-bold">
                          {i + 1}
                        </span>
                      </span>
                      <p className="text-base-content/60 leading-6 text-[13px]">
                        {imp}
                      </p>
                    </div>
                  </div>
                </Tilt>
              ))}
            </div>
          </Fade>
        </section>

        {/* Back link */}
        <Fade direction="up" duration={500} triggerOnce>
          <div className="pt-10 border-t border-base-300 flex justify-center">
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
