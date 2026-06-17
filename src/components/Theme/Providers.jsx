"use client";

import { ThemeProvider } from "next-themes";
import LenisProvider from "@/components/Motion/LenisProvider";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="boishakhi-light"
      themes={["boishakhi-light", "boishakhi-dark"]}
      enableSystem={false}
    >
      <LenisProvider>{children}</LenisProvider>
    </ThemeProvider>
  );
}
