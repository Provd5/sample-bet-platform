"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";

import { Button } from "./ui/button";

export const DataLoadError: FC = ({}) => {
  const router = useRouter();

  return (
    <div className="flex gap-3 items-center">
      <Button
        className="self-center size-12"
        variant={"outline"}
        onClick={() => router.refresh()}
      >
        <RotateCw className="size-6 shrink-0" />
      </Button>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">
          Oops! Wystąpił problem z wczytaniem danych 😥
        </h1>
        <p>Spróbuj ponownie za chwilę!</p>
      </div>
    </div>
  );
};
