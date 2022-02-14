import { IsEmail, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ForgotPasswordDto {
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}
