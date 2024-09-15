"use client";

import React from "react";
import { Icon } from "@iconify/react";
// import { useState, useEffect } from "react";

const Theme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        value={isDarkMode ? "lofi" : "black"}
      />

      {/* sun and moon icons */}
      <Icon className="swap-off text-2xl" icon="hugeicons:sun-03" />
      <Icon className="swap-on text-2xl" icon="hugeicons:moon-02" />
    </label>
  );
};

export default Theme;
