import type { FC } from "react";

import { Logo } from "../logo";
import { Rules } from "../rules";
import { ThemeToggler } from "../Theme/theme-toggler";
import { NavigationLinks } from "./navigation-links";

export const NavigationBar: FC = ({}) => {
  return (
    <div className="flex justify-between p-1">
      <Logo className="shrink-0 self-start mr-1" />
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 justify-end w-full">
        <NavigationLinks />
        <div className="flex gap-1 items-center">
          <Rules />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
};
