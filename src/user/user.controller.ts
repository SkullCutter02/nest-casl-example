import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { User } from "../_gen/prisma-class/user";

import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { ChangeUserDetailsDto } from "./dto/changeUserDetails.dto";
import { GetUser } from "../decorators/getUser.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  changeUserDetails(@GetUser() user: User, @Body() changeUserDetailsDto: ChangeUserDetailsDto) {
    return this.userService.setDetails(user.id, changeUserDetailsDto);
  }
}
