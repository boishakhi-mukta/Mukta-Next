"use client";

import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import Magnetic from "../Motion/Magnetic";

const Home = () => {
  return (
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-base-200">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div
        className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center py-10 px-2 md:px-8">
          <Fade direction="up" duration={800} damping={0.1}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight text-base-content">
              Hello, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent inline-block pb-2">
                Boishakhi
              </span>
            </h1>
          </Fade>

          <Fade direction="up" duration={800} delay={100}>
            <h2 className="mt-4 text-xl md:text-2xl font-medium text-base-content/65 min-h-8 md:min-h-9">
              I&apos;m a{" "}
              <span className="text-primary border-b-2 border-primary/30">
                <Typewriter
                  words={["Software Engineer", "Full-Stack Developer", "Researcher"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
            </h2>
          </Fade>

          <Fade direction="up" duration={800} delay={200}>
            <p className="mt-5 max-w-xl mx-auto text-[15px] md:text-base text-base-content/60 leading-7">
              With a background in Computer Science and Engineering, I build
              applications with a strong focus on reliability, usability, and
              performance. I combine testing mindset with development skills to
              deliver high quality software. Looking for my next role in Norway.
            </p>
          </Fade>

          <Fade direction="up" duration={800} delay={260}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] md:text-sm font-medium text-base-content/60">
              <Magnetic strength={0.18} max={8}>
                <a
                  href="mailto:bgmukta11@gmail.com"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                  data-cursor="hover"
                  aria-label="Email Boishakhi"
                >
                  <FaEnvelope className="text-primary" />
                  bgmukta11@gmail.com
                </a>
              </Magnetic>

              <div className="inline-flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                Oslo, Norway
              </div>

              <Magnetic strength={0.18} max={8}>
                <a
                  href="https://www.linkedin.com/in/boishakhimukta/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                  data-cursor="hover"
                  aria-label="LinkedIn profile"
                >
                  <FaLinkedin className="text-primary" />
                  LinkedIn
                </a>
              </Magnetic>

              <Magnetic strength={0.18} max={8}>
                <a
                  href="https://github.com/boishakhi-mukta"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                  data-cursor="hover"
                  aria-label="GitHub profile"
                >
                  <FaGithub className="text-primary" />
                  GitHub
                </a>
              </Magnetic>
            </div>
          </Fade>

          <Fade direction="up" duration={800} delay={380}>
            <div className="mt-8 flex flex-wrap justify-center gap-3 w-full sm:w-auto">
              <Magnetic strength={0.2} max={10}>
                <button
                  onClick={() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn btn-primary px-8 h-11 min-h-11 rounded-full text-sm font-semibold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/35 transition-all border-none"
                  data-cursor="hover"
                >
                  See My Works
                </button>
              </Magnetic>

              <Magnetic strength={0.2} max={10}>
                <a
                  href="/BoishakhiGh_CV.pdf"
                  download
                  className="btn btn-outline px-8 h-11 min-h-11 rounded-full text-sm font-semibold border hover:bg-base-content hover:text-base-100 transition-all flex items-center gap-2"
                  data-cursor="hover"
                >
                  Download CV
                  <MdOutlineFileDownload className="text-lg" />
                </a>
              </Magnetic>
            </div>
          </Fade>
        </div>
      </div>

    </section>
  );
};

export default Home;
