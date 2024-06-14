"use client";

import type { FC } from "react";

interface EggProps {
  children: React.ReactNode;
}

export const Egg: FC<EggProps> = ({ children }) => {
  function egg() {
    const p = document.querySelectorAll("p.text-sm");
    Array.from(p).forEach((element) => {
      element.firstChild?.replaceWith("wojtek to śmieć");
    });
  }

  return (
    <>
      <span onDoubleClick={() => egg()}>{children}</span>
    </>
  );
};
