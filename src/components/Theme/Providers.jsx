"use client";

import { ThemeProvider } from "next-themes";
import LenisProvider from "@/components/Motion/LenisProvider";
import ThemeToggle from "./ThemeToggole";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="boishakhi-light"
      themes={["boishakhi-light", "boishakhi-dark"]}
      enableSystem={false}
    >
      <LenisProvider>{children}</LenisProvider>

      {/* Fixed bottom-right theme toggle */}
      <div className="fixed bottom-5 right-5 z-60 rounded-full bg-base-100 border border-base-300 shadow-md">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
