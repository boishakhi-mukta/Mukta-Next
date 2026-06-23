"use client";

import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const socials = [
  { label: "Email",    href: "mailto:bgmukta11@gmail.com",                icon: <FaEnvelope />,  external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/boishakhimukta/", icon: <FaLinkedin />, external: true },
  { label: "GitHub",   href: "https://github.com/boishakhi-mukta",          icon: <FaGithub />,   external: true },
  { label: "WhatsApp", href: "https://wa.me/4748685891",                     icon: <FaWhatsapp />, external: true },
];

const Footer = () => (
  <footer className="bg-base-200 border-t border-base-300 py-10">
    <div className="flex flex-col items-center gap-5">

      {/* Social icons */}
      <div className="flex items-center gap-4">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noreferrer" : undefined}
            aria-label={s.label}
            className="w-10 h-10 rounded-full bg-base-300 hover:bg-primary hover:text-primary-content
                       flex items-center justify-center text-base-content/60 text-base
                       transition-all duration-200"
            data-cursor="hover"
          >
            {s.icon}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-[12px] text-base-content/45 text-center">
        © {new Date().getFullYear()} Boishakhi Ghosh Mukta. All rights reserved.
      </p>

    </div>
  </footer>
);

export default Footer;
