"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaUserGraduate,
  FaBriefcase,
  FaWhatsapp,
} from "react-icons/fa";
import { Fade, Zoom } from "react-awesome-reveal";
import profile from "../../assets/Mukta (1).jpg";

const About = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = ["about", "experience", "education", "achievements"];

  return (
    <section id="about" className="bg-base-200 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Zoom triggerOnce duration={550}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About Me
          </h2>
        </Zoom>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Zoom triggerOnce duration={650} delay={80}>
            <div className="flex justify-center items-center">
              <Image
                src={profile}
                alt="Boishakhi"
                className="w-full max-w-md rounded-3xl object-cover shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              />
            </div>
          </Zoom>

          <Fade triggerOnce duration={650} delay={120}>
            <div>
              <Fade triggerOnce cascade damping={0.08} duration={350}>
                <div className="flex flex-wrap gap-3 mb-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-3 rounded-xl font-medium transition ${
                        activeTab === tab
                          ? "bg-base-100 text-primary shadow-md"
                          : "text-base-content hover:text-primary"
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
                    <div className="bg-base-100 rounded-3xl p-8 shadow-md border border-base-300">
                      <p className="text-lg font-semibold mb-4">
                        Hi, This is Boishakhi.
                      </p>
                      <div className="space-y-5 text-base-content/75 leading-8">
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
                            href="https://wa.me/4748685891"
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
                            <p className="text-base-content/75 leading-8">
                              Worked as a Frontend Developer with additional
                              responsibilities in Quality Assurance, contributing
                              to UI enhancement, bug fixing, and system quality.
                              <li>Built and maintained a library of reusable components following modern component based architecture patterns.</li>
                              <li>Delivered data driven UI features by integrating REST APIs and managing complex application state for dynamic, real time interfaces.</li>
                              <li>Optimised rendering performance through efficient component design, reducing unnecessary re-renders across key application flows.</li>
                              <li>Collaborated across design, backend, and QA in a cross-functional team during full product launch cycle, contributing to usability testing and iterative UI improvements.</li>
                            </p>
                          ),
                        },
                        {
                          title: "IT Assistant",
                          org: "Media Mondays Oslo",
                          period: "November 2024 – October 2025 | Oslo, Norway",
                          body: (
                            <p className="text-base-content/75 leading-8">
                              Managed digital data and supported technical event
                              operations. Also contributed to market and audience
                              research to support engagement and communication
                              efforts.
                            </p>
                          ),
                        },
                        {
                          title: "Software Quality Assurance Engineer",
                          org: "DataSoft System Limited",
                          period: "May 2019 – August 2019 | Dhaka, Bangladesh",
                          body: (
                            <p className="text-base-content/75 leading-8">
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
                          <div className="bg-base-100 rounded-3xl p-6 shadow-md border border-base-300 w-full">
                            <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                            <p className="text-primary font-medium mb-1">{job.org}</p>
                            <p className="text-sm text-base-content/60 mb-4">{job.period}</p>
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
                          school: "International University of Business, Agriculture & Technology",
                          period: "January 2015 – December 2019 | Dhaka, Bangladesh",
                          body: "Built a strong foundation in programming, databases, data structures, and software development fundamentals.",
                        },
                      ].map((edu) => (
                        <div key={edu.degree} className="flex gap-5">
                          <div className="flex flex-col items-center">
                            <FaUserGraduate className="text-primary text-2xl" />
                            <div className="w-[2px] flex-1 bg-primary/40 mt-2"></div>
                          </div>
                          <div className="bg-base-100 rounded-3xl p-6 shadow-md border border-base-300 w-full">
                            <h3 className="text-2xl font-semibold mb-2">{edu.degree}</h3>
                            <p className="text-primary font-medium mb-1">{edu.school}</p>
                            <p className="text-sm text-base-content/60 mb-4">{edu.period}</p>
                            <p className="text-base-content/75 leading-8">{edu.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "achievements" && (
                    <div className="space-y-8">
                      <div className="bg-base-100 rounded-3xl p-6 shadow-md border border-base-300 w-full">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                          Certifications & Courses
                        </h3>
                        <ul className="list-disc list-inside text-base-content/75 leading-8 space-y-2">
                          <li>Microsoft Certified - Azure Fundamentals</li>
                          <li>Microsoft Certified - Security, Compliance &amp; Identity Fundamentals</li>
                        </ul>
                      </div>

                      <div className="bg-base-100 rounded-3xl p-6 shadow-md border border-base-300 w-full">
                        <h3 className="text-2xl font-semibold mb-4 text-primary">
                          Publications
                        </h3>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-lg">
                              Gamification in Learning Management Systems: A Systematic Literature Review (2025)
                            </h4>
                            <p className="text-sm text-base-content/60 mb-2">Co-author — (Information, MDPI)</p>
                            <p className="text-base-content/75">
                              Focused on gamification techniques and user engagement in digital learning platforms
                            </p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">
                              A Collaborative Digital Platform for Charity Thrift Store Workers (2024)
                            </h4>
                            <p className="text-sm text-base-content/60 mb-2">Co-author — (IARIA Conference)</p>
                            <p className="text-base-content/75">
                              Research on collaborative systems and user centered design in real world applications
                            </p>
                          </div>
                        </div>
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
