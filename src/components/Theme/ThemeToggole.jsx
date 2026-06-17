"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  // Start with default theme to match server render, read localStorage after mount
  const [theme, setTheme] = useState("boishakhi-light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "boishakhi-light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === "boishakhi-light" ? "boishakhi-dark" : "boishakhi-light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost border border-base-300"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {theme === "boishakhi-light" ? (
        <FiMoon className="text-lg" />
      ) : (
        <FiSun className="text-lg" />
      )}
    </button>
  );
};

export default ThemeToggle;
