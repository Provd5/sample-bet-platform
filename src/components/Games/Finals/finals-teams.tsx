import type { FC } from "react";

import { type TeamBetInterface } from "~/types/teams";

interface FinalsTeamsProps {
  teams: TeamBetInterface[];
}

export const FinalsTeams: FC<FinalsTeamsProps> = ({ teams }) => {
  if (teams.length !== 2) return;

  const sortedTeams = teams.sort((a, b) => {
    if (a.teamName < b.teamName) return -1;
    if (a.teamName > b.teamName) return 1;
    return 0;
  });

  return (
    <p className="leading-tight">{`${sortedTeams[0].teamName} - ${sortedTeams[1].teamName}`}</p>
  );
};
