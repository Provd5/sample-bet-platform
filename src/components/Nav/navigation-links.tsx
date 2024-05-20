import type { FC } from "react";
import { Award, CircleUser, Goal } from "lucide-react";

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
      <h1 className="mr-auto flex gap-1 items-center">
        <CircleUser className="size-5" />
        <span className="font-bold text-lg leading-loose">
          {user?.username}
        </span>
      </h1>

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
