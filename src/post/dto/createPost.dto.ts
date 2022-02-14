import { IsString, MaxLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @MaxLength(500)
  title: string;

  @IsString()
  body: string;
}
