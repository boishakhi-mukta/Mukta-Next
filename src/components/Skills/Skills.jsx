"use client";

import { Fade } from "react-awesome-reveal";
import Tilt from "../Motion/Tilt";
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGithub,
  FaFigma,
  FaNodeJs,
  FaCode,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiDaisyui,
  SiMongodb,
  SiExpress,
  SiPostman,
  SiSlack,
  SiJira,
  SiBootstrap,
  SiFirebase,
  SiMysql,
  SiTypescript,
  SiOpenai,
  SiGoogle,
  SiClaude,
  SiNextdotjs,
  SiGooglegemini,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend",
    subtitle: "Building responsive, user-friendly interfaces",
    accentClass: "bg-primary",
    skills: [
      { name: "React", icon: <FaReact color="#61DAFB" /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
      { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
      { name: "HTML5", icon: <FaHtml5 color="#E34F26" /> },
      { name: "CSS3", icon: <FaCss3Alt color="#1572B6" /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#06B6D4" /> },
      { name: "DaisyUI", icon: <SiDaisyui color="#1AD1A5" /> },
      { name: "Bootstrap", icon: <SiBootstrap color="#7952B3" /> },
    ],
  },
  {
    title: "Backend & Data",
    subtitle: "Working with APIs and databases",
    accentClass: "bg-secondary",
    skills: [
      { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
      { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" /> },
    ],
  },
  {
    title: "Tools & Workflow",
    subtitle: "Collaboration, testing, and design tools",
    accentClass: "bg-accent",
    skills: [
      { name: "GitHub", icon: <FaGithub /> },
      { name: "Figma", icon: <FaFigma color="#F24E1E" /> },
      { name: "Postman", icon: <SiPostman color="#FF6C37" /> },
      { name: "Slack", icon: <SiSlack color="#4A154B" /> },
      { name: "Jira", icon: <SiJira color="#0052CC" /> },
    ],
  },
  {
    title: "AI-Assisted Development",
    subtitle: "Using AI tools to speed up planning, coding, and iteration",
    accentClass: "bg-primary",
    skills: [
      { name: "Codex", icon: <SiOpenai /> },
      { name: "Cursor", icon: <FaCode /> },
      { name: "Gemini", icon: <SiGooglegemini color="#4285F4" /> },
      { name: "Google Antigravity", icon: <SiGoogle color="#4285F4" /> },
      { name: "Claude", icon: <SiClaude color="#D97757" /> },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto">
        <Fade direction="up" duration={650}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
              Skills &amp; Technologies
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-sm text-base-content/60 leading-7 mb-4">
              I focus on building clean, responsive user-friendly interfaces and
              improving user experience with modern frontend tools.
            </p>
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <span className="badge badge-primary">Responsive UI</span>
              <span className="badge badge-secondary">Reusable Components</span>
              <span className="badge badge-accent">Clean UX</span>
              <span className="badge badge-primary">AI-Assisted Development</span>
            </div>
          </div>
        </Fade>

        <Fade cascade damping={0.08} duration={600}>
          <div className="grid gap-6 lg:grid-cols-2">
            {skillGroups.map((group) => (
              <Tilt key={group.title} className="rounded-2xl h-full" maxTilt={5}>
                <article className="group flex flex-col h-full min-h-72 rounded-2xl bg-base-100 p-5 md:p-6 shadow-sm hover:shadow-xl transition duration-300 border border-base-300 hover:border-primary/30">
                  <div className={`mb-4 h-1 w-10 rounded-full ${group.accentClass}`}></div>
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-base-content">{group.title}</h3>
                    <p className="mt-1 text-[13px] text-base-content/55 leading-6">
                      {group.subtitle}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 rounded-full border border-base-300 bg-base-200/70 px-3.5 py-2 text-sm font-medium text-base-content/80 transition group-hover:border-base-300 hover:bg-primary/10 hover:text-primary"
                        data-cursor="hover"
                      >
                        <span className="text-base">{skill.icon}</span>
                        <span>{skill.name}</span>
                      </div>
                    ))}
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

export default Skills;
