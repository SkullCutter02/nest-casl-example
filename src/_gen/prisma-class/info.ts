import { User } from "./user";

export class Info {
  id: string;

  user?: User;

  hash: string;

  currentHashedRefreshToken?: string;
}
