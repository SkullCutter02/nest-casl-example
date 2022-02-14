import { Request } from "express";
import { User } from "@prisma/client";

export interface ReqWithUser extends Request {
  user: User;
}
