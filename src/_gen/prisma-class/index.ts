import { User as _User } from "./user";
import { Info as _Info } from "./info";
import { Post as _Post } from "./post";

export namespace PrismaModel {
  export class User extends _User {}
  export class Info extends _Info {}
  export class Post extends _Post {}

  export const extraModels = [User, Info, Post];
}
