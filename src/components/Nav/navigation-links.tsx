import type { FC } from "react";
import { Award, CircleUser, Goal } from "lucide-react";

import { CURRENT_EVENT } from "~/constants/currentEvent";
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
      <div className="mr-auto flex flex-col">
        <h1 className="text-sm font-semibold -mb-1">{CURRENT_EVENT}</h1>
        <h1 className="flex gap-1 items-center">
          <CircleUser className="size-5" />
          <span className="font-bold text-lg">{user?.username}</span>
        </h1>
      </div>

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
    </>
  );
};
