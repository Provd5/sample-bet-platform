"use client";

import { type FC, useEffect, useState } from "react";
import { Coins, ListChecks, LoaderCircle } from "lucide-react";

import { Button } from "../ui/button";

export const GamesSwitcher: FC = ({}) => {
  const [show, setShow] = useState<"OPEN" | "CLOSED">();

  useEffect(() => {
    const storageShow = localStorage.getItem("show");

    if (storageShow === "OPEN") {
      handleShowGames("OPEN");
    } else {
      localStorage.setItem("show", "CLOSED");
      handleShowGames("CLOSED");
    }
  }, []);

  const handleShowGames = (newShow: "OPEN" | "CLOSED") => {
    localStorage.setItem("show", newShow);
    const openGames = document.querySelectorAll(".GAME_OPEN");
    const closedGames = document.querySelectorAll(".GAME_CLOSED");

    setShow(newShow);

    openGames.forEach((element) =>
      element.classList.toggle("hidden", newShow === "CLOSED"),
    );
    closedGames.forEach((element) =>
      element.classList.toggle("hidden", newShow === "OPEN"),
    );
  };

  if (!show)
    return (
      <LoaderCircle className="size-10 shrink-0 animate-spin max-sm:mx-auto" />
    );
  const isOpen = show === "OPEN";

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant={isOpen ? "default" : "outline"}
          onClick={() => handleShowGames("OPEN")}
        >
          Otwarte
          <Coins className="ml-1 size-4 shrink-0" />
        </Button>
        <Button
          variant={isOpen ? "outline" : "default"}
          onClick={() => handleShowGames("CLOSED")}
        >
          Zamknięte
          <ListChecks className="ml-1 size-4 shrink-0" />
        </Button>
      </div>
    </>
  );
};
