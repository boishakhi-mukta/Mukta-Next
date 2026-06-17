"use client";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="boishakhi-light"
      themes={["boishakhi-light", "boishakhi-dark"]}
      enableSystem={false}
    >
      {children}
    </ThemeProvider>
  );
}
