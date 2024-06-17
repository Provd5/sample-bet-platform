"use client";

import { type FC, useEffect } from "react";

import { updateSession } from "~/lib/auth/session";

export const RefreshSession: FC = ({}) => {
  useEffect(() => {
    async function refresh() {
      await updateSession();
    }
    void refresh();
  }, []);

  return null;
};
