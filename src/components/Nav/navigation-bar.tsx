import type { FC } from "react";

import { ThemeToggler } from "../Theme/theme-toggler";
import { NavigationLinks } from "./navigation-links";

export const NavigationBar: FC = ({}) => {
  return (
    <div className="flex items-center gap-3 p-1 justify-end">
      <NavigationLinks />
      <ThemeToggler />
    </div>
  );
};
