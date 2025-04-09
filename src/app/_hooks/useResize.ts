"use client";
import { useState, useEffect } from "react";

export const useResize = () => {
  const [gridWidth, setGridWidth] = useState<string>("");
  const [gridHeight, setGridHeight] = useState<string>("");

    // 初回+リサイズで Virtuoso Grid のサイズ調整
    useEffect(() => {
      const updateGridSize = () => {
        const width = window.innerWidth;
        if (width < 480) {
          setGridWidth("300px");
          setGridHeight("1700px");
        } else if (width >= 480 && width < 699) {
          setGridWidth("300px");
          setGridHeight("1700px");
        } else {
          setGridWidth("700px");
          setGridHeight("1700px");
        }
      };
      updateGridSize();
      window.addEventListener("resize", updateGridSize);
      return () => window.removeEventListener("resize", updateGridSize);
    }, []);
  return {gridWidth, gridHeight}
};
