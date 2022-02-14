import { Body, Controller, Delete, Get, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { User } from "@prisma/client";

import { SignupDto } from "./dto/signup.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { RefreshAuthGuard } from "./guards/refresh.guard";
import { ForgotPasswordDto } from "./dto/forgotPassword.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import { GetUser } from "../decorators/getUser.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signup(@Body() signupDto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const { refreshTokenCookie, accessTokenCookie, user } = await this.authService.signup(signupDto);
    res.setHeader("Set-Cookie", [refreshTokenCookie, accessTokenCookie]);
    return user;
  }

  @Post("/login")
  @UseGuards(LocalAuthGuard)
  async login(@GetUser() user: User, @Res({ passthrough: true }) res: Response) {
    const { refreshTokenCookie, accessTokenCookie } = await this.authService.login(user);
    res.setHeader("Set-Cookie", [refreshTokenCookie, accessTokenCookie]);
    return user;
  }

  @Get("/refresh")
  @UseGuards(RefreshAuthGuard)
  async refresh(@GetUser() user: User, @Res({ passthrough: true }) res: Response) {
    const { accessTokenCookie } = await this.authService.refresh(user.id);
    res.setHeader("Set-Cookie", accessTokenCookie);
    return user;
  }

  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  async logout(@GetUser() user: User, @Res({ passthrough: true }) res: Response) {
    const cookies = await this.authService.logout(user.id);
    res.setHeader("Set-Cookie", cookies);
    return user;
  }

  @Post("/forgot-password")
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Patch("/reset-password")
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Delete("/account")
  @UseGuards(JwtAuthGuard)
  deleteAccount(@GetUser() user: User) {
    return this.authService.deleteAccount(user.id);
  }

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  me(@GetUser() user: User) {
    return user;
  }
}
