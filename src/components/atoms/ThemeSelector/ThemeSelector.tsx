"use client";

import { useEffect, useState } from "react";
import { DarkIcon } from "./DarkIcon";
import { LightIcon } from "./LightIcon";
import styles from "./ThemeSelector.module.css";
import { Button } from "../Button/Button";

export const ThemeSelector = () => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    setTheme(currentTheme);
  }, []);

  const onThemeSelected = async (theme: "light" | "dark") => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <Button
      mode="transparent"
      before={theme === "light" ? <LightIcon /> : <DarkIcon />}
      after={
        <span className={styles.currentTheme}>
          {theme === "light" ? "Light" : "Dark"} mode
        </span>
      }
      onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light";
        onThemeSelected(newTheme);
      }}
    >
      <span>Theme</span>
    </Button>
  );
};
