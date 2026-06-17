import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

import { projectsData } from "@/data/projects";

import petCareImg from "@/assets/petcare.png";
import civicCleanImg from "@/assets/CivicClean.png";
import smartDealImg from "@/assets/smartdeals.png";
import portfolioImg from "@/assets/portfolio.png";

const imageMap = {
  petcare: petCareImg,
  CivicClean: civicCleanImg,
  smartdeals: smartDealImg,
  portfolio: portfolioImg,
};

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Boishakhi Mukta`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  const image = imageMap[project.imageSrc];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top bar */}
      <div className="fixed top-0 left-0 z-50 w-full glass-nav">
        <div className="w-11/12 mx-auto h-16 flex items-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-base-content/70 hover:text-primary transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <main className="pt-24 pb-20 w-10/12 max-w-5xl mx-auto">

        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-base-content/65 max-w-2xl leading-8 mb-8">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-full gap-2 px-7"
              >
                <FaExternalLinkAlt className="text-xs" />
                Live Preview
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline rounded-full gap-2 px-7"
            >
              <FaGithub />
              GitHub Repo
            </a>
          </div>

          <div className="relative w-full h-64 md:h-[420px] rounded-3xl overflow-hidden border border-base-300 shadow-xl">
            <Image
              src={image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          </div>
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* About */}
          <section className="md:col-span-2 bg-base-200 rounded-3xl p-8 border border-base-300">
            <h2 className="text-2xl font-bold mb-4">About the Project</h2>
            <p className="text-base-content/70 leading-8">{project.description}</p>
          </section>

          {/* Tech Stack */}
          <section className="bg-base-200 rounded-3xl p-8 border border-base-300">
            <h2 className="text-2xl font-bold mb-5">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section className="bg-base-200 rounded-3xl p-8 border border-base-300">
            <h2 className="text-2xl font-bold mb-5">Challenges</h2>
            <ul className="space-y-4">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex gap-3 text-base-content/70 leading-7 text-sm">
                  <span className="text-primary font-bold shrink-0 mt-0.5">✦</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Future Improvements */}
          <section className="md:col-span-2 bg-base-200 rounded-3xl p-8 border border-base-300">
            <h2 className="text-2xl font-bold mb-5">Future Improvements</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {project.improvements.map((imp, i) => (
                <li key={i} className="flex gap-3 text-base-content/70 leading-7 text-sm">
                  <span className="text-secondary font-bold shrink-0 mt-0.5">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>
      </main>
    </div>
  );
}
