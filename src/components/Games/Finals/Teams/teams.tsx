"use client";

import { type FC, useState } from "react";
import { type UseFormSetValue } from "react-hook-form";

import {
  type BetFinalsInterface,
  type TeamBetInterface,
  type TeamInterface,
} from "~/types/teams";

import { type betFinalsSchemaType } from "~/lib/validatorSchemas/bet";

import { ModalCarousel } from "../../modal-carousel";
import { TeamCarouselItem } from "./team-carousel-item";

interface TeamsProps {
  setValue: UseFormSetValue<betFinalsSchemaType>;
  teams: TeamInterface[];
  sessionBetFinals: BetFinalsInterface | null;
}

export const Teams: FC<TeamsProps> = ({
  setValue,
  teams,
  sessionBetFinals,
}) => {
  const [betState, setBetState] = useState(
    sessionBetFinals ? sessionBetFinals.teamBet : []
  );

  const setValueFunc = (values: TeamBetInterface) => {
    const isInBet = betState.some((bet) => bet.teamId === values.teamId);

    if (isInBet) {
      const newBet = betState.filter((bet) => bet.teamId !== values.teamId);
      setBetState(newBet);
      setValue("teams", newBet, { shouldDirty: true });
    } else {
      const newBet = [...betState, values];
      setBetState(newBet);
      setValue("teams", newBet, { shouldDirty: true });
    }
  };

  return (
    <ModalCarousel>
      {teams.map((team) => (
        <TeamCarouselItem
          key={`Teams-TeamCarouselItem-${team.id}`}
          team={team}
          setValueFunc={setValueFunc}
          betState={betState}
        />
      ))}
    </ModalCarousel>
  );
};
