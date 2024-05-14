import type { FC } from "react";

import { Rules } from "../rules";
import { ThemeToggler } from "../Theme/theme-toggler";
import { NavigationLinks } from "./navigation-links";

export const NavigationBar: FC = ({}) => {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 p-1 justify-end">
      <NavigationLinks />
      <div className="flex gap-1">
        <Rules />
        <ThemeToggler />
      </div>
    </div>
  );
};
