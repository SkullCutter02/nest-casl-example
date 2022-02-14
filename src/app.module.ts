import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Role } from "@prisma/client";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { configModuleOptions } from "./config/configModuleOptions";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { RedisModule } from "./redis/redis.module";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { PostModule } from "./post/post.module";
import { CaslModule } from "nest-casl";

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    UserModule,
    AuthModule,
    MailModule,
    RedisModule,
    PrismaService,
    PrismaModule,
    PostModule,
    CaslModule.forRoot<Role>({
      superuserRole: Role.admin,
      getUserFromRequest: (request) => request.user,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
