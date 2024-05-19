export interface UserInterface {
  id: string;
  username: string;
  isActive: boolean;
}

export const userRequiredFields: Partial<keyof UserInterface>[] = [
  "id",
  "username",
  "isActive",
] as const;
