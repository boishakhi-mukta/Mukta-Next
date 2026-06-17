"use client";

import { Fade } from "react-awesome-reveal";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <div className="flex flex-col gap-5">
        <Fade direction="up" duration={600}>
          <div>
            <p>© {new Date().getFullYear()} - All right reserved by Boishakhi</p>
          </div>
        </Fade>
      </div>
    </footer>
  );
};

export default Footer;
