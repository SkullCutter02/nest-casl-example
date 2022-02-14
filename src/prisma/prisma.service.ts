import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(async (params, next) => {
      const before = Date.now();

      const result = await next(params);

      const after = Date.now();

      console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);

      return result;
    });

    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
