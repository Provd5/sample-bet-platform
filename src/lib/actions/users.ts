"use server";

import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { type UserInterface } from "~/types/users";

import ROUTES from "~/constants/routes";

import { errorHandler } from "../error-handler";
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

      return user.data() as UserInterface;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  ["cache-getUser"],
  {
    tags: ["cache-getUser"],
    revalidate: 600, // revalidate every 10 minutes
  }
);

export const getAllUsers = cache(
  async (): Promise<UserInterface[]> => {
    try {
      const usersRef = collection(db, "users");
      const users = await getDocs(usersRef);

      if (users.empty) return [];

      const usersArray = users.docs.map((doc) => doc.data());
      return usersArray as UserInterface[];
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  ["cache-getAllUsers"],
  {
    tags: ["cache-getAllUsers"],
    revalidate: 600, // revalidate every 10 minutes
  }
);
