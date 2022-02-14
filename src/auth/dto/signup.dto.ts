import { IsEmail, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";

import { passwordRegex } from "../../constants/passwordRegex";

export class SignupDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsString()
  @Matches(passwordRegex.regex, { message: passwordRegex.message })
  password: string;
}
