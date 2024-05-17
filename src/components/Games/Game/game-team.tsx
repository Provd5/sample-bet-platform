import type { FC } from "react";
import Image from "next/image";

import { cn, translateConstantsToPolish } from "~/lib/utils";

interface GameTeamProps {
  teamName: string;
  teamIcon: string;
  teamSide: "HOME_TEAM" | "AWAY_TEAM";
  winner?: string;
  secondary?: boolean;
}

export const GameTeam: FC<GameTeamProps> = ({
  teamName,
  teamIcon,
  teamSide,
  winner,
  secondary = false,
}) => {
  return (
    <div
      className={cn(
        "flex items-center flex-row-reverse gap-2 text-end",
        !secondary && teamSide === "AWAY_TEAM" && "flex-row text-start"
      )}
    >
      <Image width={30} height={30} src={teamIcon} alt={`${teamName} icon`} />
      <div className="flex flex-col">
        <h2 className="-mb-0.5 text-sm text-gray-500">
          {translateConstantsToPolish(teamSide)}
        </h2>
        <h1
          className={cn(
            "leading-none sm:w-48",
            secondary ? "w-full line-clamp-1" : "w-24",
            winner === teamSide && "text-green-600"
          )}
        >
          {teamName}
        </h1>
      </div>
    </div>
  );
};
