import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import * as argon2 from "argon2";

import { ChangeUserDetailsDto } from "./dto/changeUserDetails.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(email: string, name: string, hash: string) {
    const user = await this.findByEmail(email);

    if (!!user) throw new BadRequestException("User with such email already exists");

    return this.prisma.user.create({
      data: {
        name,
        email,
        info: {
          create: {
            hash,
          },
        },
      },
    });
  }

  public findById(userId: string, includeInfo = false) {
    return this.prisma.user.findUnique({ where: { id: userId }, include: { info: includeInfo } });
  }

  public findByEmail(email: string, includeInfo = false) {
    return this.prisma.user.findUnique({ where: { email }, include: { info: includeInfo } });
  }

  public async findByRefreshToken(refreshToken: string, userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { info: true } });

    if (!user) throw new UnauthorizedException();

    if (await argon2.verify(user.info.currentHashedRefreshToken, refreshToken)) {
      return user;
    }
  }

  public async changeHash(hash: string, userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        info: {
          update: {
            hash,
          },
        },
      },
    });
  }

  public async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const hash = await argon2.hash(refreshToken);
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        info: {
          update: {
            currentHashedRefreshToken: hash,
          },
        },
      },
    });
  }

  public async removeCurrentRefreshToken(userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        info: {
          update: {
            currentHashedRefreshToken: null,
          },
        },
      },
    });
  }

  public async deleteById(userId: string) {
    return this.prisma.user.delete({ where: { id: userId } });
  }

  public async setDetails(userId: string, changeUserDetailsDto: ChangeUserDetailsDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: changeUserDetailsDto,
    });
  }
}
