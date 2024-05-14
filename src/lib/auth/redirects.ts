import { redirect } from "next/navigation";

import ROUTES from "~/utils/routes";

import { getUser } from "../actions/users";
import { readSessionId } from "./session";

export const redirectIfIsSession = async () => {
  const session = await readSessionId();
  if (!!session) redirect(ROUTES.betting);
};

export const redirectIfSessionUserIsNotActive = async () => {
  const session = await readSessionId();
  if (!session) redirect(ROUTES.root);

  const user = await getUser(session.userId);
  if (!user?.isActive) {
    redirect(ROUTES.authCallback);
  }
};

export const redirectIfSessionUserIsActive = async () => {
  const session = await readSessionId();
  if (!session) redirect(ROUTES.root);

  const user = await getUser(session.userId);
  if (!!user?.isActive) redirect(ROUTES.betting);
};
