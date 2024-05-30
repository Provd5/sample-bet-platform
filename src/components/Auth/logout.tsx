"use client";

import type { FC } from "react";
import { LogOut } from "lucide-react";

import { logOut } from "~/lib/actions/users";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export const Logout: FC = ({}) => {
  const { toast } = useToast();

  return (
    <Button
      className="flex-row-reverse items-center gap-2 border border-input"
      variant={"secondary"}
      onClick={() => (
        toast({
          title: "Jeszcze sekundka ⌛",
          description: "Trwa wylogowywanie...",
          duration: 3000,
        }),
        logOut()
      )}
    >
      <LogOut className="size-4 shrink-0" />
      <span>Wyloguj</span>
    </Button>
  );
};
