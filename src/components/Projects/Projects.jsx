"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";
import Tilt from "../Motion/Tilt";
import Magnetic from "../Motion/Magnetic";

import { projectsData } from "@/data/projects";

import petCareImg from "../../assets/petcare.png";
import civicCleanImg from "../../assets/CivicClean.png";
import smartDealImg from "../../assets/smartdeals.png";
import portfolioImg from "../../assets/portfolio.png";

const imageMap = {
  petcare: petCareImg,
  CivicClean: civicCleanImg,
  smartdeals: smartDealImg,
  portfolio: portfolioImg,
};

const filters = [
  "All",
  "React",
  "Node.js",
  "MongoDB",
  "Firebase",
  "TypeScript",
  "AI Development",
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((p) => p.tech.some((t) => t.includes(activeFilter)));
  }, [activeFilter]);

  return (
    <section id="projects" className="py-20 bg-base-200">
      <div className="w-12/12 mx-auto">
        <Fade direction="up" duration={650}>
          <div className="mb-12 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Works</h2>
            <p className="max-w-3xl text-base-content/70 text-base md:text-lg leading-8">
              Here are some of my recent projects built with modern frontend and full-stack
              technologies — clean UI, practical features, and real user-focused experiences.
            </p>
          </div>
        </Fade>

        <Fade direction="up" duration={650} delay={80}>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
            {filters.map((filter) => (
              <Magnetic key={filter} strength={0.16} max={9}>
                <button
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    activeFilter === filter
                      ? "bg-primary text-primary-content shadow"
                      : "bg-base-100 hover:bg-base-300"
                  }`}
                  data-cursor="hover"
                >
                  {filter}
                </button>
              </Magnetic>
            ))}
          </div>
        </Fade>

        <Fade cascade damping={0.08} duration={600}>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {filteredProjects.map((project) => (
              <Tilt
                key={project.slug}
                className="rounded-2xl h-full flex flex-col"
                maxTilt={7}
              >
                <article className="group rounded-2xl bg-base-100 border border-base-300/80 shadow-md hover:-translate-y-1 hover:shadow-2xl transition duration-300 flex flex-col h-full overflow-hidden">

                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-base-200">
                    <Image
                      src={imageMap[project.imageSrc]}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover group-hover:scale-[1.04] transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-lg font-bold text-base-content leading-snug mb-3">
                      {project.title}
                    </h3>

                    {/* Top 3 tech badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full border border-primary/20 bg-primary/8 text-xs font-semibold text-primary"
                        >
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2.5 py-1 rounded-full border border-base-300 text-xs font-medium text-base-content/50">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="btn btn-primary w-full rounded-full min-h-10 h-10 text-sm"
                        data-cursor="hover"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                </article>
              </Tilt>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Projects;
