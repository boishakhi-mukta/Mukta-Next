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

      {/* Fixed bottom-left theme toggle */}
      <div className="fixed bottom-5 left-5 z-50">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
