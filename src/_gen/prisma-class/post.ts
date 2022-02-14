import { User } from "./user";

export class Post {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  title: string;

  body: string;

  user: User;

  userId: string;
}
