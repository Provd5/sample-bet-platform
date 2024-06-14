import type { FC } from "react";
import { Award, CircleUser, Goal } from "lucide-react";

import { CURRENT_EVENT } from "~/constants/current-event";
import ROUTES from "~/constants/routes";
import { getUser } from "~/lib/actions/users";
import { readSessionId } from "~/lib/auth/session";

import { Logout } from "../Auth/logout";
import { NavigationLink } from "./navigation-link";

export const NavigationLinks: FC = async ({}) => {
  const session = await readSessionId();

  if (!session) return;

  const user = await getUser(session.userId);

  return (
    <>
      <div className="mr-auto flex flex-col self-start">
        <h1 className="-mb-0.5 text-sm font-semibold">{CURRENT_EVENT}</h1>
        <h1 className="flex items-center gap-1">
          <CircleUser className="size-5" />
          <span className="text-lg font-bold">{user?.username}</span>
        </h1>
      </div>

      <nav>
        <div className="flex flex-wrap items-center justify-end gap-1">
          <NavigationLink href={ROUTES.games}>
            <Goal className="size-4 shrink-0" />
            <span>Mecze</span>
          </NavigationLink>
          <NavigationLink href={ROUTES.results}>
            <Award className="size-4 shrink-0" />
            <span>Punktacja</span>
          </NavigationLink>
          <Logout />
        </div>
      </nav>
    </>
  );
};
