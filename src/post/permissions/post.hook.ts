import { Injectable } from "@nestjs/common";
import { Request, SubjectBeforeFilterHook } from "nest-casl";
import { Post, User } from "@prisma/client";

import { PostService } from "../post.service";

@Injectable()
export class PostHook implements SubjectBeforeFilterHook<Post & { user: User }, Request> {
  constructor(private readonly postService: PostService) {}

  async run({ params }: Request) {
    return this.postService.getPost(params.id as string);
  }
}
