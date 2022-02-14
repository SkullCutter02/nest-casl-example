import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { Transform } from "class-transformer";

export class CursorPaginateDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsUUID()
  @IsOptional()
  cursor?: string;

  @IsString()
  @IsOptional()
  filter?: string;
}
