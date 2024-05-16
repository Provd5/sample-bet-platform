"use client";

import type { FC } from "react";
import { RotateCw } from "lucide-react";

import { RefreshButton } from "./refresh-button";

export const DataLoadError: FC = ({}) => {
  return (
    <div className="flex gap-3 items-center">
      <RefreshButton className="self-center size-12" variant="custom">
        <RotateCw className="size-6 shrink-0" />
      </RefreshButton>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">
          Oops! Wystąpił problem z wczytaniem danych 😥
        </h1>
        <p>Spróbuj ponownie za chwilę!</p>
      </div>
    </div>
  );
};
