import { PartialType } from "@nestjs/mapped-types";

import { CreatePostDto } from "./createPost.dto";

export class EditPostDto extends PartialType(CreatePostDto) {}
