import { Actions, InferSubjects, Permissions } from "nest-casl";
import { Role } from "@prisma/client";

import { Post } from "../../_gen/prisma-class/post";

export type PostPermissionsSubjects = InferSubjects<Post>;

export const postPermissions: Permissions<Role, PostPermissionsSubjects, Actions> = {
  everyone({ can }) {
    can(Actions.read, Post);
  },

  user({ can, user }) {
    can(Actions.create, Post);
    can(Actions.update, Post, { userId: user.id });
    can(Actions.delete, Post, { userId: user.id });
  },
};
