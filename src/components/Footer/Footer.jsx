"use client";

import { Fade } from "react-awesome-reveal";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const socials = [
  {
    label: "Email",
    href: "mailto:bgmukta11@gmail.com",
    icon: <FaEnvelope className="text-base" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/boishakhimukta/",
    icon: <FaLinkedin className="text-base" />,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/boishakhi-mukta",
    icon: <FaGithub className="text-base" />,
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/4748685891",
    icon: <FaWhatsapp className="text-base" />,
    external: true,
  },
];

const navLinks = [
  { name: "Home",         href: "#home" },
  { name: "About",        href: "#about" },
  { name: "Skills",       href: "#skills" },
  { name: "Projects",     href: "#projects" },
  { name: "Publications", href: "#publications" },
];

const Footer = () => (
  <footer className="bg-base-300 text-base-content">

    {/* Main footer body */}
    <Fade direction="up" duration={600} triggerOnce>
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <a
            href="#home"
            className="text-xl font-bold italic tracking-wide text-primary orbitron"
          >
            BOISHAKHI
          </a>
          <p className="mt-3 text-[13px] text-base-content/60 leading-6 max-w-xs">
            Full-Stack Software Engineer based in Oslo, Norway. Building clean,
            performant, and user-focused web applications.
          </p>
          <div className="flex items-center gap-2 mt-4 text-[13px] text-base-content/50">
            <FaMapMarkerAlt className="text-primary shrink-0" />
            Oslo, Norway
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-[13px] text-base-content/65 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-[11px] font-black tracking-[0.2em] uppercase text-primary mb-5">
            Connect
          </h3>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2.5 text-[13px] text-base-content/65 hover:text-primary transition-colors duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Fade>

    {/* Bottom bar */}
    <div className="border-t border-base-content/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-base-content/45 text-center sm:text-left">
          © {new Date().getFullYear()} Boishakhi Ghosh Mukta. All rights reserved.
        </p>
        {/* Social icon row */}
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noreferrer" : undefined}
              aria-label={s.label}
              className="w-8 h-8 rounded-full bg-base-content/8 hover:bg-primary hover:text-primary-content
                         flex items-center justify-center text-base-content/55
                         transition-all duration-200"
              data-cursor="hover"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>

  </footer>
);

export default Footer;
