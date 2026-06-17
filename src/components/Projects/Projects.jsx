"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import Tilt from "../Motion/Tilt";
import Magnetic from "../Motion/Magnetic";

import smartDealImg from "../../assets/smartdeals.png";
import petCareImg from "../../assets/petcare.png";
import civicCleanImg from "../../assets/CivicClean.png";
import portfolioGeneratorImg from "../../assets/portfolio.png";

const projectsData = [
  {
    title: "Pet Care Center",
    image: petCareImg,
    tech: ["React", "React Router", "Tailwind CSS", "Firebase"],
    description:
      "A responsive pet service platform that helps users browse services, book appointments, and explore pet-care information in one place. The project focuses on clean UI structure, authentication flow, and a smooth experience across different devices.",
    github: "https://github.com/Boishakhi11/Pet-Care-Center",
    live: "https://pet-care-center-in-norway.netlify.app/",
  },
  {
    title: "CivicClean",
    image: civicCleanImg,
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "TanStack Query",
      "Claude",
      "AI Development",
    ],
    description:
      "CivicClean is a full-stack civic issue reporting and management platform. Citizens report local problems, staff resolve them, and admins oversee the entire workflow all through role-based dashboards. The project emphasizes user-friendly design, real-time updates, and efficient issue tracking to foster community engagement and improve local services.",
    github: "https://github.com/Boishakhi11/CivicClean",
    live: "https://civic-clean-oslo.netlify.app/",
  },
  {
    title: "Smart Deal",
    image: smartDealImg,
    tech: [
      "React",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
    ],
    description:
      "Smart Deal is a secondhand marketplace where users can buy, sell, and bid on products in a clean and user-friendly interface. Users can post products for sale, place bids to buy, track their bids, manage their own products, and edit or delete listings from their dashboard.",
    github: "https://github.com/Boishakhi11/SecondLifeHub-client",
    live: "https://github.com/Boishakhi11/SecondLifeHub-client",
  },
  {
    title: "Portfolio Generator",
    image: portfolioGeneratorImg,
    tech: ["React", "Tailwind CSS", "TypeScript", "Google Antigravity", "AI Development"],
    description:
      "Developed a modern, responsive web application based on real-world brief from Nettverkshuset, a Norwegian organisation, to showcase their Scale-Up programme participants. Implemented user authentication, dynamic portfolio display, and a new visual identity using AI-directed development.",
    github: "https://github.com/Boishakhi11/Scale-up-project",
    live: "https://scale-up-woman.netlify.app/",
  },
];

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
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    return projectsData.filter((project) =>
      project.tech.includes(activeFilter),
    );
  }, [activeFilter]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 bg-base-200">
      <div className="w-12/12 mx-auto">
        <Fade direction="up" duration={650}>
          <div className="mb-12 flex flex-col justify-center items-center text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My Works</h2>
            <p className="max-w-3xl text-base-content/70 text-base md:text-lg leading-8">
              Here are some of my recent works demo, built with modern frontend
              and full stack technologies. They reflect my interest in clean UI,
              practical features, responsive design, and real user focused
              experiences.
            </p>
          </div>
        </Fade>

        <Fade direction="up" duration={650} delay={80}>
          <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
            {filters.map((filter) => (
              <Magnetic key={filter} strength={0.16} max={9}>
                <button
                  onClick={() => {
                    setActiveFilter(filter);
                    setShowAll(false);
                  }}
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
            {visibleProjects.map((project) => (
              <Tilt
                key={project.title}
                className="rounded-2xl h-full flex flex-col"
                maxTilt={7}
              >
                <article className="group rounded-2xl bg-base-100 border border-base-300/80 shadow-md hover:-translate-y-1 hover:shadow-2xl transition duration-300 flex flex-col h-full w-full overflow-hidden">
                  {/* image */}
                  <div className="p-3 pb-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-base-200 border border-base-300/70">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.02] transition duration-300"
                      />
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-center text-xl md:text-2xl font-bold leading-tight">
                      {project.title}
                    </h3>

                    <div className="mt-4 min-h-14 flex flex-wrap justify-center gap-2 content-start">
                      {project.tech.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 grow overflow-y-auto max-h-24 pr-1">
                      <p className="text-sm text-base-content/70 leading-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mt-5">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={project.live === "#"}
                        className={`btn btn-primary flex-1 rounded-full min-h-10 h-10 gap-2 ${
                          project.live === "#" ? "btn-disabled" : ""
                        }`}
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        Live Preview
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-disabled={project.github === "#"}
                        className={`btn btn-outline flex-1 rounded-full min-h-10 h-10 gap-2 ${
                          project.github === "#" ? "btn-disabled" : ""
                        }`}
                      >
                        <FaGithub className="text-lg" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              </Tilt>
            ))}
          </div>
        </Fade>

        {filteredProjects.length > 6 && (
          <Fade direction="up" duration={650}>
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 rounded-full bg-primary text-primary-content font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {showAll ? "See Less" : "See More"}
              </button>
            </div>
          </Fade>
        )}
      </div>
    </section>
  );
};

export default Projects;
