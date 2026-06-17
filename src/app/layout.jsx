import { Plus_Jakarta_Sans, Orbitron } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata = {
  title: "Boishakhi Ghosh Mukta | Software Engineer",
  description:
    "Portfolio of Boishakhi Ghosh Mukta — Full-Stack Software Engineer based in Oslo, Norway. Specializing in React, TypeScript, Node.js, and AI-assisted development.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Oslo",
    "Norway",
    "Boishakhi Mukta",
  ],
  authors: [{ name: "Boishakhi Ghosh Mukta" }],
  creator: "Boishakhi Ghosh Mukta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://boishakhimukta.netlify.app",
    title: "Boishakhi Ghosh Mukta | Software Engineer",
    description:
      "Portfolio of Boishakhi Ghosh Mukta — Full-Stack Software Engineer based in Oslo, Norway.",
    siteName: "Boishakhi Mukta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boishakhi Ghosh Mukta | Software Engineer",
    description:
      "Portfolio of Boishakhi Ghosh Mukta — Full-Stack Software Engineer based in Oslo, Norway.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${orbitron.variable}`}
    >
      <head>
        {/* Synchronously set theme from localStorage before first paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'boishakhi-light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-Q7J1NZEK64" />
    </html>
  );
}
