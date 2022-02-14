import { IsEmail, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class ChangeUserDetailsDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}
