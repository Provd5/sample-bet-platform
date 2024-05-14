"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { type UserInterface } from "~/types/users";

import ROUTES from "~/utils/routes";

import { errorHandler } from "../error-handler";
import { auth, db } from "../firebase";

export async function logOut() {
  await signOut(auth).then(() => {
    cookies().delete("session");
    redirect(ROUTES.root);
  });
}

export async function getUser(id: string): Promise<UserInterface | undefined> {
  try {
    const user = await getDoc(doc(db, "users", id));

    return user.data() as UserInterface | undefined;
  } catch (e) {
    throw new Error(errorHandler(e));
  }
}
