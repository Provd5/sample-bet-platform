"use client";

import type { FC } from "react";
import { LogOut } from "lucide-react";

import { logOut } from "~/lib/actions/users";

import { Button } from "../ui/button";

export const Logout: FC = ({}) => {
  return (
    <Button
      className="flex-row-reverse gap-2 items-center"
      variant={"secondary"}
      onClick={() => logOut()}
    >
      <LogOut className="size-4" />
      <span>Wyloguj</span>
    </Button>
  );
};
