"use client";

import { Fade } from "react-awesome-reveal";
import { FiExternalLink } from "react-icons/fi";

const publications = [
  {
    title:
      "Gamification in Learning Management Systems: A Systematic Literature Review",
    year: "2024",
    venue: "Information, 16(12), 1094 — MDPI",
    authors: "Lampropoulos, G., Ghosh Mukta, B., & Anastasiadis, T.",
    link: "https://doi.org/10.3390/info16120094",
  },
  {
    title:
      "A Collaborative Digital Platform for Charity Thrift Store Workers",
    year: "2024",
    venue:
      "ACHI 2024 — International Conference on Advances in Computer-Human Interactions, Østfold University College, Norway",
    authors: "Pathari, F. J., Kabir, E., Ghosh Mukta, B., & Karlsen, J.",
    link: "#",
  },
];

const Publications = () => (
  <section className="relative py-24 px-6 bg-base-100">
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <Fade direction="up" duration={650} triggerOnce>
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-3">
            Research
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Research Publications
          </h2>
          <p className="text-[15px] text-base-content/55 max-w-lg mx-auto leading-7">
            Peer-reviewed research in gamification, educational technology,
            and human-computer interaction.
          </p>
        </div>
      </Fade>

      {/* Publication cards */}
      <div className="space-y-4">
        {publications.map((pub, i) => (
          <Fade key={i} direction="up" duration={550} delay={i * 90} triggerOnce>
            <div className="group rounded-2xl bg-base-200 border border-base-300 hover:border-primary/30 hover:shadow-md p-6 md:p-7 transition-all duration-300">

              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-base-content leading-snug flex-1">
                  {pub.title}
                </h3>
                <span className="text-primary font-bold text-sm shrink-0 mt-0.5">
                  {pub.year}
                </span>
              </div>

              <p className="text-[13px] text-base-content/50 mt-2">{pub.authors}</p>
              <p className="text-[13px] text-base-content/45 italic mt-0.5">
                {pub.venue}
              </p>

              <a
                href={pub.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-4 text-[13px] font-semibold text-primary hover:underline underline-offset-2 transition-colors"
                data-cursor="hover"
              >
                View Publication
                <FiExternalLink className="text-xs" />
              </a>

            </div>
          </Fade>
        ))}
      </div>

    </div>
  </section>
);

export default Publications;
