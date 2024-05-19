"use server";

import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { type UserInterface } from "~/types/users";

import ROUTES from "~/constants/routes";

import { auth, db } from "../firebase";

export async function logOut() {
  await signOut(auth).then(() => {
    cookies().delete("session");
    redirect(ROUTES.root);
  });
}

export const getUser = cache(
  async (userId: string): Promise<UserInterface | null> => {
    try {
      const usersRef = doc(db, "users", userId);
      const user = await getDoc(usersRef);
      if (!user.exists()) return null;
      const userData = user.data() as UserInterface;

      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  ["cache-getUser"],
  {
    tags: ["cache-getUser"],
    revalidate: 120, // revalidate every 2 minutes
  }
);
