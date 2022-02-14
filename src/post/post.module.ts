import { Module } from "@nestjs/common";
import { CaslModule } from "nest-casl";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { PrismaModule } from "../prisma/prisma.module";
import { postPermissions as permissions } from "./permissions/post.permissions";

@Module({
  imports: [PrismaModule, CaslModule.forFeature({ permissions })],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
