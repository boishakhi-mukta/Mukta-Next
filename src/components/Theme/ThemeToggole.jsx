"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="btn btn-circle btn-ghost border border-base-300"
        aria-label="Toggle theme"
      />
    );
  }

  const isDark = theme === "boishakhi-dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "boishakhi-light" : "boishakhi-dark")}
      className="btn btn-circle btn-ghost border border-base-300"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {isDark ? (
        <FiSun className="text-lg" />
      ) : (
        <FiMoon className="text-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
