"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUserGraduate, FaBriefcase, FaWhatsapp } from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";
import profile from "../../assets/Mukta (1).jpg";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = ["about", "experience", "education", "achievements"];

  return (
    <section id="about" className="bg-base-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Zoom triggerOnce duration={550}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
            About Me
          </h2>
        </Zoom>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-10 items-start">
          <Zoom triggerOnce duration={650} delay={80}>
            <div className="flex justify-center items-center">
              {/* Circular frame: white ring → coloured backdrop → photo */}
              <div
                className="relative w-72 h-72 md:w-80 md:h-80 rounded-full shadow-xl shadow-base-content/15 hover:-translate-y-3 hover:shadow-2xl shrink-0"
                style={{
                  transition:
                    "transform 0.45s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.45s ease",
                }}
              >
                {/* White outer ring */}
                <div className="absolute inset-0 rounded-full bg-white p-3 shadow-xl">
                  {/* Coloured background circle */}
                  <div
                    className="w-full h-full rounded-full overflow-hidden relative"
                    style={{ background: "#b87a7a" }}
                  >
                    <Image
                      src={profile}
                      alt="Boishakhi"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 288px, 320px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Zoom>

          <Fade triggerOnce duration={650} delay={120}>
            <div>
              <Fade triggerOnce cascade damping={0.08} duration={350}>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                        activeTab === tab
                          ? "bg-base-100 text-primary shadow-sm"
                          : "text-base-content/70 hover:text-primary"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </Fade>

              <Zoom key={activeTab} duration={320} fraction={0.08}>
                <div>
                  {activeTab === "about" && (
                    <div className="bg-base-100 rounded-3xl p-6 shadow-md border border-base-300">
                      <p className="text-base font-semibold mb-3">
                        Hi, This is Boishakhi.
                      </p>
                      <div className="space-y-4 text-base-content/65 leading-7 text-[15px]">
                        <p>
                          Full-Stack Software Engineer with a Master&apos;s in
                          Applied Computer Science from Høgskolen i Østfold,
                          Norway. Published researcher in EdTech and
                          gamification (MDPI 2025; IARIA 2024), with hands on
                          experience delivering web applications using React,
                          TypeScript, Node.js and REST APIs. Strong background
                          in interaction design, user centred development, and
                          cross functional collaboration. Fluent in English with
                          working proficiency in Norwegian.
                        </p>
                        <div className="pt-3">
                          <a
                            href="https://wa.me/+4748685891"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border-primary p-2"
                          >
                            <FaWhatsapp className="text-xl" /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "experience" && (
                    <div className="space-y-8">
                      {[
                        {
                          title: "Frontend Developer",
                          org: "Innoscribe",
                          period: "November 2025 – April 2026 | Oslo, Norway",
                          body: (
                            <p className="text-[13px] text-base-content/65 leading-6">
                              Worked as a Frontend Developer with additional
                              responsibilities in Quality Assurance,
                              contributing to UI enhancement, bug fixing, and
                              system quality.
                              <li>
                                Built and maintained a library of reusable
                                components following modern component based
                                architecture patterns.
                              </li>
                              <li>
                                Delivered data driven UI features by integrating
                                REST APIs and managing complex application state
                                for dynamic, real time interfaces.
                              </li>
                              <li>
                                Optimised rendering performance through
                                efficient component design, reducing unnecessary
                                re-renders across key application flows.
                              </li>
                              <li>
                                Collaborated across design, backend, and QA in a
                                cross-functional team during full product launch
                                cycle, contributing to usability testing and
                                iterative UI improvements.
                              </li>
                            </p>
                          ),
                        },
                        {
                          title: "IT Assistant",
                          org: "Media Mondays Oslo",
                          period: "November 2024 – October 2025 | Oslo, Norway",
                          body: (
                            <p className="text-[13px] text-base-content/65 leading-6">
                              Managed digital data and supported technical event
                              operations. Also contributed to market and
                              audience research to support engagement and
                              communication efforts.
                            </p>
                          ),
                        },
                        {
                          title: "Software Quality Assurance Engineer",
                          org: "DataSoft System Limited",
                          period: "May 2019 – August 2019 | Dhaka, Bangladesh",
                          body: (
                            <p className="text-[13px] text-base-content/65 leading-6">
                              Executed test cases, reported defects, and gained
                              strong experience in interface quality, user
                              behavior, and collaboration across software teams
                              before major releases.
                            </p>
                          ),
                        },
                      ].map((job) => (
                        <div key={job.title} className="flex gap-5">
                          <div className="flex flex-col items-center">
                            <FaBriefcase className="text-primary text-2xl" />
                            <div className="w-[2px] flex-1 bg-primary/40 mt-2"></div>
                          </div>
                          <div className="bg-base-100 rounded-3xl p-5 shadow-md border border-base-300 w-full">
                            <h3 className="text-base font-semibold mb-1">
                              {job.title}
                            </h3>
                            <p className="text-primary text-sm font-medium mb-1">
                              {job.org}
                            </p>
                            <p className="text-xs text-base-content/50 mb-3">
                              {job.period}
                            </p>
                            {job.body}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "education" && (
                    <div className="space-y-8">
                      {[
                        {
                          degree: "Master in Applied Computer Science",
                          school: "Høgskolen i Østfold",
                          period: "August 2022 – June 2025 | Halden, Norway",
                          body: "Specialized in interaction design and information systems, with a strong focus on user-centered design. Through my master's, I developed a solid understanding of user experience, particularly in CSCW and Participatory Design (PD), shaping how I design intuitive, collaborative, and meaningful digital solutions. Thesis: Development & Assessment of a Gamified Learning Management System Targeting Higher Education Students.",
                        },
                        {
                          degree: "Bachelor in Computer Science & Engineering",
                          school:
                            "International University of Business, Agriculture & Technology",
                          period:
                            "January 2015 – December 2019 | Dhaka, Bangladesh",
                          body: "Built a strong foundation in programming, databases, data structures, and software development fundamentals.",
                        },
                      ].map((edu) => (
                        <div key={edu.degree} className="flex gap-5">
                          <div className="flex flex-col items-center">
                            <FaUserGraduate className="text-primary text-2xl" />
                            <div className="w-[2px] flex-1 bg-primary/40 mt-2"></div>
                          </div>
                          <div className="bg-base-100 rounded-3xl p-5 shadow-md border border-base-300 w-full">
                            <h3 className="text-base font-semibold mb-1">
                              {edu.degree}
                            </h3>
                            <p className="text-primary text-sm font-medium mb-1">
                              {edu.school}
                            </p>
                            <p className="text-xs text-base-content/50 mb-3">
                              {edu.period}
                            </p>
                            <p className="text-[13px] text-base-content/65 leading-6">
                              {edu.body}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "achievements" && (
                    <div className="space-y-5">
                      <div className="bg-base-100 rounded-3xl p-5 shadow-md border border-base-300 w-full">
                        <h3 className="text-base font-semibold mb-3 text-primary">
                          Certifications & Courses
                        </h3>
                        <ul className="list-disc list-inside text-[13px] text-base-content/65 leading-6 space-y-2">
                          <li>Microsoft Certified - Azure Fundamentals</li>
                          <li>
                            Microsoft Certified - Security, Compliance &amp;
                            Identity Fundamentals
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </Zoom>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default About;
