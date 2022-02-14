import { Info } from "./info";
import { Post } from "./post";
import { Role } from "@prisma/client";

export class User {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;

  email: string;

  roles: Role[];

  info: Info;

  infoId: string;

  posts: Post[];
}
