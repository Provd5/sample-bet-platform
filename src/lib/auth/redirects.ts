import { redirect } from "next/navigation";

import ROUTES from "~/constants/routes";

import { getUser } from "../actions/users";
import { readSessionId } from "./session";

export const redirectIfIsSession = async () => {
  const session = await readSessionId();
  if (!!session) redirect(ROUTES.games);
};

export const redirectIfSessionUser = async (redirectIfIsActive: boolean) => {
  const session = await readSessionId();
  if (!session) redirect(ROUTES.root);

  const user = await getUser(session.userId);

  if (redirectIfIsActive && !!user?.isActive) {
    redirect(ROUTES.games);
  }
  if (!redirectIfIsActive && !user?.isActive) {
    redirect(ROUTES.authCallback);
  }
};
