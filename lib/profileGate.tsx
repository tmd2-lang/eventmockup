"use client";

import { createContext, useContext, type ReactNode } from "react";

export type ProfileGateValue = {
  tier: "t0" | "t1" | "t2";
  identityVisible: boolean;
  isConnectionNight: boolean;
};

const DEFAULT_GATE: ProfileGateValue = {
  tier: "t2",
  identityVisible: true,
  isConnectionNight: false,
};

export const ProfileGateContext = createContext<ProfileGateValue>(DEFAULT_GATE);

export function useProfileGate() {
  return useContext(ProfileGateContext);
}

export function ProfileGateProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileGateContext.Provider value={DEFAULT_GATE}>
      {children}
    </ProfileGateContext.Provider>
  );
}
