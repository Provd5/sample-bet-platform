import type { FC } from "react";
import { Award, Goal } from "lucide-react";

import { readSessionId } from "~/lib/auth/session";
import ROUTES from "~/constants/routes";

import { Logout } from "../Auth/logout";
import { NavigationLink } from "./navigation-link";

export const NavigationLinks: FC = async ({}) => {
  const session = await readSessionId();

  if (!session) return;

  return (
    <nav>
      <div className="flex flex-wrap justify-end gap-1 items-center">
        <NavigationLink href={ROUTES.games}>
          <Goal className="size-4" />
          <span>Mecze</span>
        </NavigationLink>
        <NavigationLink href={ROUTES.results}>
          <Award className="size-4" />
          <span>Punktacja</span>
        </NavigationLink>
        <Logout />
      </div>
    </nav>
  );
};
