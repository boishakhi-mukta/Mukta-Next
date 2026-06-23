"use client";

import { Fade } from "react-awesome-reveal";
import {
  FaReact, FaJs, FaGithub, FaFigma, FaNodeJs, FaCode,
} from "react-icons/fa";
import {
  SiTailwindcss, SiDaisyui, SiMongodb, SiExpress, SiPostman, SiSlack, SiJira,
  SiFirebase, SiMysql, SiTypescript, SiOpenai, SiGoogle, SiClaude,
  SiNextdotjs, SiGooglegemini,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend Development",
    col: "md:col-span-2",
    skills: [
      { name: "React",       icon: <FaReact color="#61DAFB" /> },
      { name: "Next.js",     icon: <SiNextdotjs /> },
      { name: "JavaScript",  icon: <FaJs color="#F7DF1E" /> },
      { name: "TypeScript",  icon: <SiTypescript color="#3178C6" /> },
      { name: "Tailwind",    icon: <SiTailwindcss color="#06B6D4" /> },
      { name: "DaisyUI",     icon: <SiDaisyui color="#1AD1A5" /> },
    ],
  },
  {
    title: "Backend & Data",
    col: "",
    skills: [
      { name: "Node.js",  icon: <FaNodeJs color="#339933" /> },
      { name: "Express",  icon: <SiExpress /> },
      { name: "MongoDB",  icon: <SiMongodb color="#47A248" /> },
      { name: "MySQL",    icon: <SiMysql color="#4479A1" /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" /> },
    ],
  },
  {
    title: "Tools & Workflow",
    col: "",
    skills: [
      { name: "GitHub",  icon: <FaGithub /> },
      { name: "Figma",   icon: <FaFigma color="#F24E1E" /> },
      { name: "Postman", icon: <SiPostman color="#FF6C37" /> },
      { name: "Slack",   icon: <SiSlack color="#4A154B" /> },
      { name: "Jira",    icon: <SiJira color="#0052CC" /> },
    ],
  },
  {
    title: "AI-Assisted Development",
    col: "md:col-span-2",
    skills: [
      { name: "Codex",            icon: <SiOpenai /> },
      { name: "Cursor",           icon: <FaCode /> },
      { name: "Gemini",           icon: <SiGooglegemini color="#4285F4" /> },
      { name: "Google AI Studio", icon: <SiGoogle color="#4285F4" /> },
      { name: "Claude",           icon: <SiClaude color="#D97757" /> },
    ],
  },
];

function Chip({ name, icon }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl
                 bg-base-200 border border-base-300
                 hover:bg-primary/8 hover:border-primary/20 hover:text-primary
                 text-[13px] font-medium text-base-content/70
                 transition-colors duration-200 cursor-default select-none"
      data-cursor="hover"
    >
      <span className="text-[15px] leading-none shrink-0">{icon}</span>
      {name}
    </span>
  );
}

function CategoryCard({ group, delay }) {
  return (
    <Fade direction="up" duration={550} delay={delay} triggerOnce>
      <div className={`rounded-2xl bg-base-100 border border-base-300 p-6 md:p-7
                       hover:border-primary/20 hover:shadow-md
                       transition-all duration-300 h-full ${group.col}`}>
        {/* Category label */}
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] font-black tracking-[0.2em] uppercase text-primary">
            {group.title}
          </span>
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <Chip key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </Fade>
  );
}

const Skills = () => (
  <section id="skills" className="relative py-24 px-6 bg-base-200">
    <div className="relative max-w-5xl mx-auto">

      {/* Section header */}
      <Fade direction="up" duration={650} triggerOnce>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Skills &amp; Technologies
          </h2>
          <p className="text-[15px] text-base-content/55 max-w-lg mx-auto leading-7">
            Tools and technologies I use to build clean, performant,
            and user-focused products.
          </p>
        </div>
      </Fade>

      {/* Card grid — full / half+half / full */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillGroups.map((group, i) => (
          <CategoryCard key={group.title} group={group} delay={i * 80} />
        ))}
      </div>

    </div>
  </section>
);

export default Skills;
