import { Inter, Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Providers from "@/components/Theme/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    url: "https://boishakhi.netlify.app",
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
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
      <GoogleAnalytics gaId="G-Q7J1NZEK64" />
    </html>
  );
}
