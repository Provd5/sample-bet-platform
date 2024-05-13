"use client";

import type { FC } from "react";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";

import { auth } from "~/lib/firebase";

import { Button } from "../ui/button";

export const Logout: FC = ({}) => {
  if (!auth.currentUser) return;

  return (
    <Button
      className="flex-row-reverse gap-2 items-center"
      variant={"secondary"}
      onClick={() => signOut(auth)}
    >
      <LogOut className="size-4" />
      <span>Wyloguj</span>
    </Button>
  );
};
